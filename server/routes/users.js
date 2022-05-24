import Router from '@koa/router'
import koaBody from 'koa-body'
import User from '../models/users.js'
import apiQuery from 'api-query-params'
import joi from 'joi'
import validate from '../middleware/joiValidator.js'
import jwtProtect from '../middleware/jwtProtect.js'
import config from '../config.js'
import jwt from 'jsonwebtoken'

const router = new Router()
router.prefix('/api')

// Get users
router.get('/users', jwtProtect, async (ctx) => {
  const { filter, skip, limit, sort } = apiQuery(ctx.query)
  const results = await User.find(filter ?? {})
    .skip(skip)
    .limit(limit)
    .sort(sort)

  const cleaned = await User.sanitizeOutPut(results, ctx.state.user)
  ctx.body = cleaned
})

// Create user
router.post('/users',
  koaBody(),
  validate(
    joi.object({
      userName: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required()
    })
  ),
  async ctx => {
    const payload = {
      ...ctx.request.body,
      active: true
    }

    try {
      const users = await User.create(payload)
      if (users) {
        const cleaned = await User.sanitizeOutPut(users, ctx.state.user)
        ctx.body = cleaned
      } else ctx.body = users
    } catch (error) {
      const isDup = error.message?.includes('duplicate key error collection')

      if (isDup) {
        const dupKey = Object.keys(error.keyValue)[0] ?? ''
        const payload = {
          key: dupKey,
          message: `${dupKey} is already taken`
        }

        ctx.status = 400
        ctx.body = payload
      } else {
        console.error('create user error: ', error)
        ctx.status = 500
        throw new Error('Could not create user')
      }
    }
  }
)

// Authorize a user and give token
router.post('/users/authorize',
  koaBody(),
  validate(
    joi.object({
      email: joi.string().email().required(),
      password: joi.string().required()
    })
  ),
  async (ctx) => {
    const {
      email,
      password
    } = ctx.request.body
    const foundUser = await User.findOne({ email })

    if (foundUser) {
      const isMatched = await foundUser.comparePassword(password)
      if (isMatched) {
        // Generate and return jwt token
        const token = jwt.sign({ id: foundUser.id }, config.auth.secret, config.auth.options)
        const user = await User.sanitizeOutPut(foundUser, foundUser)

        ctx.body = {
          token,
          user
        }
      } else {
        loginFailed()
      }
    } else {
      loginFailed()
    }

    function loginFailed () {
      ctx.status = 401
      ctx.body = {
        status: ctx.status,
        message: 'Username or password is incorrect'
      }
    }
  }
)

export default router
