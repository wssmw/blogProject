<script setup lang="ts">
import { computed } from 'vue'
import Header from './Header/index.vue'
import MainLeft from './MainLeft/index.vue'
import MainRight from './MainRight/index.vue'
import { appStore } from '../store/module/app'
const store = appStore()
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
    <el-container>
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
        <el-main class="w-[800px] h-[2000px] bg-white rounded-md">
          <router-view></router-view>
        </el-main>
        <el-aside class="mx-4" width="260px">
          <MainRight></MainRight>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped lang="less">
.el-header {
  padding: 0;
}
</style>
