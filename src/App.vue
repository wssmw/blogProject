<script setup lang="ts">
import Layout from '@/layout/index.vue'
import { onMounted, onUnmounted } from 'vue'
import { appStore } from './store/module/app'
import { getLocalStorage } from './utils'
import { debounce } from 'lodash-es'
import { getUnreadNotificationsRequest } from './api/module/notification'

console.log('测试jenkins')
console.log('测试jenkins1')
console.log('测试jenkins2')
console.log('测试jenkins3')
console.log('测试jenkins4')
console.log('测试jenkins5')
console.log('测试jenkins6')
console.log('测试jenkins7')
console.log('测试jenkins8')
console.log('测试jenkins9')

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

const handleResize = debounce(() => {
    console.log('这里执行')
    store.windowInnerWidthChange(window.innerWidth)
}, 200)
const handleScroll = debounce(() => {
    store.windowScrollYChange(window.scrollY)
}, 200)
onMounted(() => {
    window.scrollTo(0, 0) // 页面加载时滚动到顶部
    store.windowScrollYChange(0)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <Layout></Layout>
</template>

<style scoped></style>
