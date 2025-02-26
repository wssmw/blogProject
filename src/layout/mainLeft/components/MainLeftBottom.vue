<template>
  <div class="main_left_bootom bg-white rounded-md p-3">
    <div class="text-base">热门分类</div>
    <el-divider class="divider"></el-divider>
    <div class="content">
      <div :class="`item ${currentRoutePath=='/frontend'?'active':''}`" @click="changeRouter('/frontend')">
        <img class="w-5 h-5 mr-2" src="@/assets/svg/8_3前端开发.svg" alt="" />
        前端
      </div>
      <div :class="`item ${currentRoutePath=='/backend'?'active':''}`" @click="changeRouter('/backend')">
        <img class="w-5 h-5 mr-2" src="@/assets/svg/后端.svg" alt="" />
        后端
      </div>
      <div :class="`item ${currentRoutePath=='/android'?'active':''}`" @click="changeRouter('/android')">
        <img class="w-5 h-5 mr-2" src="@/assets/svg/Android.svg" alt="" />
        Android
      </div>
      <div :class="`item ${currentRoutePath=='/ios'?'active':''}`" @click="changeRouter('/ios')">
        <img class="w-5 h-5 mr-2" src="@/assets/svg/ios.svg" alt="" />
        iOS
      </div>
      <div :class="`item ${currentRoutePath=='/ai'?'active':''}`" @click="changeRouter('/ai')">
        <img class="w-5 h-5 mr-2" src="@/assets/svg/8_8人工智能.svg" alt="" />
        人工智能
      </div>
      <div :class="`item ${currentRoutePath=='/freebie'?'active':''}`" @click="changeRouter('/freebie')">
        <img class="w-5 h-5 mr-2" src="@/assets/svg/开发工具.svg" alt="" />
        开发工具
      </div>
      <div :class="`item ${currentRoutePath=='/operatingSystem'?'active':''}`" @click="changeRouter('/operatingSystem')">
        <img class="w-5 h-5 mr-2" src="@/assets/svg/操作系统.svg" alt="" />
        操作系统
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
const currentRoutePath = computed(()=>route.path)
const changeRouter = (route) => {
  router.push(route)
}
</script>
<style scoped lang="less">
.main_left_bootom {
  .divider {
    margin: 10px 0;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .item {
      display: flex;
      align-items: center;
      width: 140px;
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      font-size: 14px;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background: #f7f8fa;
        color: #1e80ff;
      }
    }
  }
}
.active {
  background-color: #eaf2ff!important;
  color: #1e80ff;
}
</style>
