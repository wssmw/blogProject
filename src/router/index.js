import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/page/home/index.vue'),
        },
        {
            path: '/:categoryId?',
            name: 'home',
            component: () => import('@/page/home/index.vue'),
        },
        {
            path: '/article/:id',
            name: 'article',
            component: () => import('@/page/article/index.vue'),
        },
        // 名言广场
        {
            path: '/notes',
            name: 'notes',
            component: () => import('@/page/notes/index.vue'),
        },
        // 工具箱
        {
            path: '/toolbox',
            name: 'toolbox',
            component: () => import('@/page/toolbox/index.vue'),
        },
        // 标签
        {
            path: '/label',
            name: 'label',
            component: () => import('@/page/label/index.vue'),
        },
        // 关于
        {
            path: '/about',
            name: 'about',
            component: () => import('@/page/about/index.vue'),
        },
        // 友链
        {
            path: '/friendChain',
            name: 'friendChain',
            component: () => import('@/page/friendChain/index.vue'),
        },
        // 关注
        {
            path: '/attention-article',
            name: 'attention-article',
            component: () => import('@/page/attentionArticle/index.vue'),
        },
        // 最新
        {
            path: '/last-article',
            name: 'last-article',
            component: () => import('@/page/lastArticle/index.vue'),
        },
        // 编辑
        {
            path: '/editor',
            name: 'editor',
            component: () => import('@/page/aieditor/index.vue'),
        },
        // 用户
        {
            path: '/user/:id',
            name: 'user',
            component: () => import('@/page/user/index.vue'),
        },
        // 修改我的信息
        {
            path: '/userSetting',
            name: 'userSetting',
            component: () => import('@/page/userSetting/index.vue'),
        },
        {
            path: '/news',
            name: 'news',
            component: () => import('@/page/news/index.vue'),
        },
    ],
})

export default router
