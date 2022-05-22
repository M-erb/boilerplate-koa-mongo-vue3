export default schema => {
  return async (ctx, next) => {
    try {
      await schema.validateAsync(ctx.request.body)
      await next()
    } catch (error) {
      console.log('error: ', error)
      ctx.throw(400, error, error.details)
    }
  }
}
