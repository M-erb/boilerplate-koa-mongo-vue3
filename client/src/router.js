import { createRouter, createWebHistory } from 'vue-router'

// Pages
import Explore from '~/pages/explore.vue'
import the404 from '~/pages/the404.vue'
import componentsPage from '~/pages/componentsPage.vue'
import loginPage from '~/pages/loginPage.vue'
import registerPage from '~/pages/registerPage.vue'
import settingsPage from '~/pages/settingsPage.vue'

// partials
import appNav from '~/partials/appNav.vue'

const baseUrl = '/app/'
const routerConfig = {
  history: createWebHistory(baseUrl),
  routes: [
    {
      path: '/',
      name: 'login',
      components: {
        default: loginPage
      }
    },
    {
      path: '/register',
      name: 'register',
      components: {
        default: registerPage
      }
    },
    {
      path: '/explore',
      name: 'explore',
      components: {
        default: Explore,
        nav: appNav
      }
    },
    {
      path: '/settings',
      name: 'settings',
      components: {
        default: settingsPage,
        nav: appNav
      }
    },

    // 404 template
    {
      path: '/:pathMatch(.*)',
      components: {
        default: the404,
        nav: appNav
      }
    }
  ]
}

if (process.env.NODE_ENV === 'development') {
  routerConfig.routes.push({
    path: '/components',
    components: {
      default: componentsPage
    }
  })
}

const router = createRouter(routerConfig)
export default router
