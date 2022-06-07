import users from './users.js'
import pages from './pages.js'
import fourOFour from './404.js'

const routes = [
  users,
  pages
]

// 404 should always be last
routes.push(fourOFour)

export default routes
