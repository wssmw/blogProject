<script setup lang="ts">
import Layout from '@/layout/index.vue'
import { onMounted } from 'vue'
import { appStore } from './store/module/app'
import { getLocalStorage, setLocalStorage } from './utils'
const store = appStore()
// setLocalStorage('userInfo', {
//     cookie: 'qqqq',
//     id: '11',
//     name: 'wss',
//     career: '前端开发工程师',
// })

const userInfo = getLocalStorage('userInfo')
console.log(userInfo)
if (userInfo) {
    store.userInfoChange(userInfo)
}
onMounted(() => {
    window.scrollTo(0, 0) // 页面加载时滚动到顶部
    store.windowScrollYChange(0)
    window.addEventListener('scroll', () => {
        store.windowScrollYChange(window.scrollY)
    })
    window.addEventListener('resize', () => {
        console.log(store.windowInnerWidth, 'windowInnerWidth')
        store.windowInnerWidthChange(window.innerWidth)
    })
})
</script>

<template>
    <Layout></Layout>
</template>

<style scoped></style>
