
<script setup lang="ts">
import Header from './Header/index.vue'
import MainLeft from './MainLeft/index.vue'
import MainRight from './MainRight/index.vue'
</script>

<template>
  <div class="layout">
    <el-container>
      <el-header class="bg-white">
        <Header></Header>
      </el-header>
      <el-container class="m-auto mt-5">
        <el-aside class="mx-4" width="160px">
            <MainLeft></MainLeft>
        </el-aside>
        <el-main class="w-[800px] bg-white">Main</el-main>
        <el-aside class="mx-4" width="260px">
            <MainRight></MainRight>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

</style>
