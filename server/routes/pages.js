import Router from '@koa/router'
const router = new Router()

// For a SPA "application" part of the frontend
router.get('/app/:splat*', async (ctx, next) => {
  await ctx.render('app', {/* pass data here to the HTML document, then edit the "views/app.njk" with the new keys */})
})

// For the "marketing" side of the project
router.get('/', async (ctx, next) => {
  const content = {
    title: 'You found the home page',
    message: 'This could be the best home page ever! Fight me!',
    link: {
      label: 'About',
      url: '/about'
    }
  }

  await ctx.render('page', content)
})

router.get('/about', async (ctx, next) => {
  const content = {
    title: 'About page',
    message: 'Are you not entertained!??!!',
    link: {
      label: 'Home',
      url: '/'
    }
  }

  await ctx.render('page', content)
})

router.get('/:splat*', async (ctx, next) => {
  const content = {
    title: '404',
    message: 'Well... we could not find that, try again.',
    link: {
      label: 'Home',
      url: '/'
    }
  }

  ctx.status = 404
  await ctx.render('page', content)
})

export default router
