import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { LAYOUT } from './constant'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      type: 'home'
    },
    component: () => import('@/views/home')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: LAYOUT,
    redirect: '/dashboard/analysis',
    meta: {
      orderNo: 10
      // icon: 'ion:grid-outline',
      // title: t('routes.dashboard.dashboard'),
    },
    children: [
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('@/views/Dashboard/analysis'),
        meta: {
          // affix: true,
          // title: t('routes.dashboard.analysis')
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      type: 'login'
    },
    component: () => import('@/views/Login/login')
  },
  {
    path: '/:pathMatch(.*)*', // 注意此处 404页面匹配规则和以前不相同，得采用这种配置方式才行
    name: '404',
    component: () => import('@/views/404')
  }
]

// 此处由【new VueRouter】的方式修改为【createRouter】的方式 其余无变化
const router = createRouter({
  history: createWebHashHistory(), //路由模式的配置采用API调用的方式 不再是之前的字符串 此处采用的hash路由
  routes
})

// 路由守卫和之前的实现方式一致 此处只是做了一个demo仅供演示
// router.beforeEach(
//   (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
//     // 获取userToken，根据业务场景可由localStorage也可由cookie中获取
//     const user = localStorage.getItem('user')
//     // 路由守卫判断
//     if (to.meta.type === 'login' && user) {
//       next({ name: 'home' })
//       return
//     }

//     if (to.meta.type === 'home' && !user) {
//       next({ name: 'login' })
//       return
//     }

//     next()
//   }
// )

export default router
