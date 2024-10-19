import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('@/page/home/index.vue'),
    },
    // 名言广场
    {
      path: '/famousSquare',
      name: 'famousSquare',
      component: import('@/page/famousSquare/index.vue'),
    },
    // 工具箱
    {
      path: '/toolbox',
      name: 'toolbox',
      component: import('@/page/toolbox/index.vue'),
    },
    // 标签
    {
      path: '/label',
      name: 'label',
      component: import('@/page/label/index.vue'),
    },
    // 关于
    {
      path: '/about',
      name: 'about',
      component: import('@/page/about/index.vue'),
    },
    // 友链
    {
      path: '/friendChain',
      name: 'friendChain',
      component: import('@/page/friendChain/index.vue'),
    },
  ],
})

export default router
