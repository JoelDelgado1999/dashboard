// Composables
import { createRouter, createWebHistory, createMemoryHistory, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Login.vue'),
    name: 'default',
    meta: {
      default: true
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/layouts/Dashboard.vue'),
    children: [
      {
        path: '/centroacopio',
        component: () => import('@/views/dashboard/GatheringCenter.vue'),
        name: 'centroacopio'
      },
      {
        path: '/ordenes',
        component: () => import('@/views/dashboard/Order.vue'),
        name: 'ordenes'
      },
      {
        path: '/premios',
        component: () => import('@/views/dashboard/Products.vue'),
        name: 'premios'
      },
      {
        path: '/orderpremios',
        component: () => import('@/views/dashboard/OrderProduct.vue'),
        name: 'orderpremios'
      },
      {
        path: '/information',
        component: () => import('@/views/dashboard/Information.vue'),
        name: 'information'
      }, {
        path: '/reportproduct',
        component: () => import('@/views/dashboard/ReportProduct.vue'),
        name: 'reportproduct'
      },
       {
        path: '/reportcentroacopio',
        component: () => import('@/views/dashboard/ReportCentroAcopio.vue'),
        name: 'reportcentroacopio'
      },
    ],
    meta: {
      auth: true
    },

  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    name: 'login'
  }
]
const createHistory = process.env.SERVER
? createMemoryHistory
: (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

const router = createRouter({
  history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.default) {
    const token = localStorage.getItem('token')
    if (token != null) {
      return next('/dashboard')
    } else {
      const requiredAuth = to.meta.auth
      if (requiredAuth) {
        const token = localStorage.getItem('token')
        if (!token)
          return next('/login')
        else
          return next()
      }
      return next()
    }
  } else {
    const requiredAuth = to.meta.auth
    if (requiredAuth) {
      const token = localStorage.getItem('token')
      if (!token)
        return next('/login')
      else
        return next()
    }
    return next()
  }

})
export default router
