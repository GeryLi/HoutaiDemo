//常量路由

export const constantRoutes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    meta: {
      title: 'layout',
      hidden: false,
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/screen',
    name: 'screen',
    meta: {
      hidden: false,
      title: '数据大屏',
      icon: 'DataAnalysis',
    },
    component: () => import('@/views/screen/index.vue'),
  },
  {
    path: '/acl',
    name: 'acl',
    component: () => import('@/layout/index.vue'),
    meta: {
      hidden: false,
      title: '权限管理',
      icon: 'Lock',
    },
    children: [
      {
        path: '/acl/user',
        name: 'user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          hidden: false,
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        name: 'role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          hidden: false,
          title: '角色管理',
          icon: 'Lock',
        },
      },
      {
        path: '/acl/permission',
        name: 'permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          hidden: false,
          title: '菜单管理',
          icon: 'MessageBox',
        },
      },
    ],
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('@/layout/index.vue'),
    meta: {
      hidden: false,
      title: '商品管理',
      icon: 'Goods',
    },
    children: [
      {
        path: '/product/trademark',
        name: 'trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: {
          hidden: false,
          title: '品牌管理',
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/attr',
        name: 'attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          title: '属性管理',
          icon: 'Grid',
        },
      },
      {
        path: '/product/spu',
        name: 'spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          title: 'SPU管理',
          icon: 'Histogram',
        },
      },
      {
        path: '/product/sku',
        name: 'sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          title: 'SKU管理',
          icon: 'Crop',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: () => import('@/views/login/index.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    meta: {
      title: '404',
      hidden: true,
    },
    component: () => import('@/views/404/index.vue'),
  },
]
