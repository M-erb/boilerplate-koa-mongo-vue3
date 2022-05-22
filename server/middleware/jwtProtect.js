import config from '../config.js'
import jwt from 'jsonwebtoken'
import User from '../models/users.js'

export default async (ctx, next) => {
  const parts = ctx.header.authorization ? ctx.header.authorization.trim().split(' ') : []

  if (parts.length === 2) {
    const scheme = parts[0]
    const token = parts[1]

    if (/^Bearer$/i.test(scheme)) {
      try {
        const payload = jwt.verify(token, config.auth.secret)

        if (payload.id) {
          const user = await User.findById(payload.id)

          if (user.active === true) ctx.state.user = user
          else ctx.throw(401, 'User account is not active')
        } else ctx.throw(401, 'Not Authorized')
      } catch (error) {
        console.error('jwt error: ', error)
        ctx.throw(401, error)
      }
    } else ctx.throw(401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"')
  } else ctx.throw(401, 'Missing Authorization')

  await next()
}
