<script setup lang="ts">
import { computed } from 'vue'
import Header from './Header/index.vue'
import MainLeft from './MainLeft/index.vue'
import MainRight from './MainRight/index.vue'
import { appStore } from '../store/module/app'
import { useRoute } from 'vue-router'
const store = appStore()
const route = useRoute()
const isShow = computed(() => ['/editor'].includes(route.path))
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
            <el-container class="m-auto mt-5">
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
    </div>
</template>
<style scoped lang="less">
.el-header {
    padding: 0;
}
</style>
