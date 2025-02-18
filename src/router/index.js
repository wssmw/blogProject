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
            path: '/article/:id',
            name: 'article',
            component: () => import('@/page/article/index.vue'),
        },
        // 名言广场
        {
            path: '/famousSquare',
            name: 'famousSquare',
            component: () => import('@/page/famousSquare/index.vue'),
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
        // 前端
        {
            path: '/frontend',
            name: 'frontend',
            component: () => import('@/page/frontend/index.vue'),
        },
        // 后端
        {
            path: '/backend',
            name: 'backend',
            component: () => import('@/page/backend/index.vue'),
        },
        // Android
        {
            path: '/android',
            name: 'android',
            component: () => import('@/page/android/index.vue'),
        },
        // iOS
        {
            path: '/ios',
            name: 'ios',
            component: () => import('@/page/ios/index.vue'),
        },
        // 人工智能
        {
            path: '/ai',
            name: 'ai',
            component: () => import('@/page/ai/index.vue'),
        },
        // 开发工具
        {
            path: '/freebie',
            name: 'freebie',
            component: () => import('@/page/freebie/index.vue'),
        },
        // 操作系统
        {
            path: '/operatingSystem',
            name: 'operatingSystem',
            component: () => import('@/page/operatingSystem/index.vue'),
        },
        {
            path: '/editor',
            name: 'editor',
            component: () => import('@/page/aieditor/index.vue'),
        },
    ],
})

export default router
