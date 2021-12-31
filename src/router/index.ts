import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { LAYOUT } from './constant'
import { AppRouteRecordRaw } from './types'

const baseRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: '',
    redirect: '/login',
    meta: {}
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
    component: () => import('@/views/404'),
    meta: {}
  }
]

export const asyncRoute: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: LAYOUT,
    redirect: '/dashboard/analysis',
    meta: {
      orderNo: 10,
      // icon: 'ion:grid-outline',
      title: 'Dashboard'
    },
    children: [
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('@/views/Dashboard/analysis'),
        meta: {
          // affix: true,
          title: '分析页'
        }
      },
      {
        path: 'workbench',
        name: 'Workbench',
        component: () => import('@/views/Dashboard/workbench'),
        meta: {
          // affix: true,
          title: '工作台'
        }
      }
    ]
  },
  {
    path: '/EIMS-EnterpriseManagement',
    component: LAYOUT,
    name: 'EIMS-EnterpriseManagement',
    meta: {
      title: '企业管理',
      icon: 'entprise'
    },
    children: [
      {
        path: '/EIMS-EnterpriseManagement',
        component: () => import('@/views/Dashboard/workbench'),
        name: 'EIMS-EnterpriseManagement',
        meta: { title: '企业管理', icon: 'entprise' }
      },
      {
        path: '/EIMS-EnterpriseInformation',
        component: () => import('@/views/Dashboard/workbench'),
        name: 'EIMS-EnterpriseInformation',
        meta: { title: '企业详情' }
      }
    ]
  },
  {
    path: '/RoleManaEIMS',
    component: LAYOUT,
    name: '角色管理',
    meta: {
      orderNo: 90000,
      hideChildrenInMenu: true,
      icon: 'whh:paintroll',
      title: '角色管理'
    },
    children: [
      {
        path: '/RoleManaEIMS',
        component: () => import('@/views/Dashboard/analysis'),
        name: '角色管理',
        meta: { title: '角色管理', icon: 'character' }
      }
    ]
  },
  {
    path: '/EIMS-UserManagement',
    component: LAYOUT,
    name: 'EIMS-UserManagement',
    meta: { title: '用户管理', icon: 'userManage' },
    children: [
      {
        path: '/EIMS-UserManagement',
        component: () => import('@/views/Dashboard/analysis'),
        name: 'EIMS-UserManagement',
        meta: { title: '用户信息', icon: 'userManage' }
      },
      {
        path: '/UserBindEIMS',
        component: () => import('@/views/Dashboard/analysis'),
        name: 'UserBindEIMS',
        meta: { title: '账号绑定', icon: 'userManage' }
      }
    ]
  }
]

// 此处由【new VueRouter】的方式修改为【createRouter】的方式 其余无变化
const router = createRouter({
  history: createWebHashHistory(), //路由模式的配置采用API调用的方式 不再是之前的字符串 此处采用的hash路由
  routes: [...asyncRoute, ...baseRoutes] as unknown as RouteRecordRaw[]
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
