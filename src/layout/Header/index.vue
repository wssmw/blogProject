<template>
  <div class="max-w-[1440px] h-15 flex m-auto justify-between">
    <div class="flex text-base items-center">
      <div class="flex items-center cursor-pointer">
        <img class="w-8 h-8" src="@/assets/svg/bird-duotone.svg" alt="" />
        <span class="mx-5">栖息地</span>
      </div>
      <el-menu class="el-menu-popper-demo w-[600px] flex-1" mode="horizontal">
        <el-menu-item index="2">名言广场</el-menu-item>
        <el-menu-item index="3">
          <img class="w-5 h-5" src="@/assets/svg/工具箱.svg" alt="" />
          工具箱
        </el-menu-item>
        <el-menu-item index="4">
          <img class="w-5 h-5" src="@/assets/svg/标签.svg" alt="" />
          标签
        </el-menu-item>
        <el-sub-menu index="6">
          <template #title>
            <img class="w-5 h-5" src="@/assets/svg/关于.svg" alt="" />
            关于
          </template>
          <el-menu-item index="6-1">关于本网站</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="7">
          <template #title> 友人帐 </template>
          <el-menu-item index="7-1">item one</el-menu-item>
          <el-menu-item index="7-2">item two</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="flex items-center justify-around">
      <div class="w-[280px]">
        <el-input class="h-10" placeholder="探索栖息地">
          <template #suffix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
      <el-dropdown class="ml-4 min-w-[141px]" size="large" split-button type="primary">
        创造者中心
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item> 
              <img class="w-5 h-5" src="@/assets/svg/用研.svg" alt="" />
              写文章 
            </el-dropdown-item>
            <el-dropdown-item>记录文言</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="w-[40px] h-10 mx-4 flex items-center">
        <el-badge :value="12" class="item">
          <img class="w-6 h-6" src="@/assets/svg/提示.svg" />
        </el-badge>
      </div>
      <div class="w-[50px]">
        <el-avatar :size="40">
          <el-icon><UserFilled /></el-icon>
        </el-avatar>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped lang="scss"></style>
