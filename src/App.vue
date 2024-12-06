<script setup lang="ts">
import Layout from '@/layout/index.vue'
import { onMounted } from 'vue'
import { appStore } from './store/module/app'
import { getLocalStorage, setLocalStorage } from './utils'
const store = appStore()
setLocalStorage('userInfo', {
    cookie: 'qqqq',
    id: '11',
    name: 'wss',
    career: '前端开发工程师',
})

const userInfo = getLocalStorage('userInfo')
console.log(userInfo)
if (userInfo) {
    store.userInfoChange(userInfo)
}
onMounted(() => {
    window.addEventListener('scroll', () => {
        store.windowScrollYChange(window.scrollY)
    })
})
</script>

<template>
    <div class="box">
        <Layout></Layout>
    </div>
</template>

<style scoped>
.box {
    background: #f2f3f5;
}
</style>
