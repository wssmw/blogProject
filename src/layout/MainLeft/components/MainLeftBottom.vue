<template>
  <div class="main_left_bootom bg-white rounded-md p-3">
    <div class="text-base">热门分类</div>
    <el-divider class="divider"></el-divider>
    <div class="content">
      <div class="item">
        <img class="w-5 h-5 mr-2" src="@/assets/svg/8_3前端开发.svg" alt="" />
        前端
      </div>
      <div class="item">
        <img class="w-5 h-5 mr-2" src="@/assets/svg/后端.svg" alt="" />
        后端
      </div>
      <div class="item">
        <img class="w-5 h-5 mr-2" src="@/assets/svg/Android.svg" alt="" />
        Android
      </div>
      <div class="item">
        <img class="w-5 h-5 mr-2" src="@/assets/svg/ios.svg" alt="" />
        iOS
      </div>
      <div class="item">
        <img class="w-5 h-5 mr-2" src="@/assets/svg/8_8人工智能.svg" alt="" />
        人工智能
      </div>
      <div class="item">
        <img class="w-5 h-5 mr-2" src="@/assets/svg/开发工具.svg" alt="" />
        开发工具
      </div>
      <div class="item">
        <img class="w-5 h-5 mr-2" src="@/assets/svg/操作系统.svg" alt="" />
        操作系统
      </div>
    </div>
  </div>
</template>
<script setup></script>
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
        background: #ecf0f1;
      }
    }
  }
}
</style>
