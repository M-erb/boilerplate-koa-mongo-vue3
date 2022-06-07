import Router from '@koa/router'
const router = new Router()

router.get('/:splat*', async (ctx, next) => {
  const content = {
    title: '404',
    message: 'Well... we could not find that, try again.',
    menu: [
      {
        label: 'Home',
        url: '/'
      },
      {
        label: 'App',
        url: '/app'
      }
    ]
  }

  ctx.status = 404

  if (ctx.accepts('html')) await ctx.render('page', content)
  else if (ctx.accepts('json')) ctx.body = { message: 'well... we could not find that, try again.', status: 404 }
})

export default router
