<script setup lang="ts">
import { computed, ref } from 'vue'
import Header from './Header/index.vue'
import MainLeft from './left/mainLeft.vue'
import MainRight from './right/mainRight.vue'
import Login from '../page/login/index.vue'
import { appStore } from '../store/module/app'
import { useRoute, useRouter } from 'vue-router'
import { loginWidthGitee } from '../api/module/login'
import ArticleLeft from './left/articleLeft.vue'
import ArticleRight from './right/articleRight.vue'
const store = appStore()
const route = useRoute()
const router = useRouter()
const isShow = computed(() => route.path.includes('/editor'))
const isArticle = computed(() => route.path.includes('/article'))
console.log(route, 'route')
const headerStyle = computed(() => {
    if (store.windowScrollY > 400) {
        return {
            transition: 'transform .2s ease-in-out',
            transform: 'translate3d(0,-60px,0)',
        }
    } else {
        return {
            transition: 'transform .2s ease-in-out',
            transform: 'translate3d(0,0,0)',
        }
    }
})

// 检查 URL 中是否有回调的 code
const checkCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    if (code) {
        const res = await loginWidthGitee(code)
        let { token, userInfo } = res
        store.userInfoChange(userInfo)
        store.tokenChange(token)
        console.log(res, 'res')
        router.push('/')
    }
}
checkCallback()

</script>

<template>
    <div class="layout">
        <el-container v-if="!isShow">
            <el-header class="el-header">
                <div
                    ref="headerRef"
                    :style="headerStyle"
                    class="header fixed z-50 w-full h-[60px] flex justify-center bg-white"
                >
                    <Header></Header>
                </div>
            </el-header>
            <el-container class="m-auto mt-5" v-if="isArticle">
                <el-aside class="mx-4" width="60px">
                    <ArticleLeft :style="headerStyle"></ArticleLeft>
                </el-aside>
                <div class="min-h-[900px]">
                    <el-main class="w-[760px] bg-white rounded-md">
                        <router-view></router-view>
                    </el-main>
                </div>
                <el-aside class="mx-4" width="260px">
                    <ArticleRight></ArticleRight>
                </el-aside>
            </el-container>
            <el-container class="m-auto mt-5" v-else>
                <el-aside class="mx-4" width="160px">
                    <MainLeft :style="headerStyle"></MainLeft>
                </el-aside>
                <div class="min-h-[900px]">
                    <el-main class="w-[760px] bg-white rounded-md">
                        <router-view></router-view>
                    </el-main>
                </div>
                <el-aside class="mx-4" width="260px">
                    <MainRight></MainRight>
                </el-aside>
            </el-container>
        </el-container>
        <router-view v-else></router-view>
        <Login ref="loginRef" :showDialog="showLoginModal"></Login>
    </div>
</template>
<style scoped lang="less">
.el-header {
    padding: 0;
}
</style>
