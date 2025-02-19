<template>
  <div>
    <div class="flex p-4 items-center justify-between bg-white rounded-md">
      <div class="flex flex-col">
        <div class="mb-1 text-base font-medium text-black">晚上好</div>
        <div>点亮在栖息地的每一天</div>
      </div>
      <div class="">
        <el-button size="large">去签到</el-button>
      </div>
    </div>
    <div v-if="!isLogin" class="p-4 flex flex-col items-center cursor-pointer bg-white mt-4 rounded-md" @click="loginHandle">
      <el-icon size="40"><User /></el-icon>
      <div class="text-base">登录</div>
    </div>
    <div v-else class="p-4 flex flex-col items-center bg-white mt-4 rounded-md relative">
      <div class="flex justify-start w-full items-center">
        <el-avatar :size="40">
          <el-icon><UserFilled /></el-icon>
        </el-avatar>
        <div class="ml-3 flex flex-col justify-between">
          <div class="text-lg">{{ userInfo.name }}</div>
          <div> 职业-{{ userInfo.career }} </div>
        </div>
      </div>
      <el-divider class="divider"></el-divider>
      <div class="bottom w-full">
        <div class="item">
          <div class="num"> 1 </div>
          <div class="title"> 关注 </div>
        </div>
        <div class="item">
          <div class="num"> 1 </div>
          <div class="title"> 收藏 </div>
        </div>
        <div class="item">
          <div class="num"> 1 </div>
          <div class="title"> 文章 </div>
        </div>
        <div class="item">
          <div class="num"> 1 </div>
          <div class="title"> 名言 </div>
        </div>
      </div>
      <div class="red"></div>
      <div class="yellow"></div>
      <div class="blue"></div>
    </div>
    <div :style="fixedStyle" class="p-4 bg-white mt-4 rounded-md">
      <div class="flex justify-between mb-4">
        <div class="text-base">精选文章</div>
        <div class="flex items-center cursor-pointer">
          <el-icon><Refresh /></el-icon>
          <div>刷新</div>
        </div>
      </div>
      <div class="content">
        <template v-for="item in data" :key="item.id">
          <div class="flex items-center my-4 cursor-pointer hover:text-indigo-500">
            <div class="border-solid border-2 border-indigo-500 h-5 mr-2"></div>
            <div class="text-base overflow-hidden w-full">{{ item.title }}</div>
          </div>
        </template>
      </div>
      <el-divider class="divider"></el-divider>
      <div class="text-center text-base cursor-pointer"> 查看更多> </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { appStore } from '../../store/module/app'
const store = appStore()
const isLogin = computed(() => store.isLogin)
const userInfo = computed(() => store.userInfo)
const data = ref([
  {
    title: '我的名字1',
    id: '1',
  },
  {
    title: '我的名字2',
    id: '2',
  },
  {
    title: '我的名字3',
    id: '3',
  },
  {
    title: '我的名字4',
    id: '4',
  },
  {
    title: '我的名字5',
    id: '5',
  },
])
const fixedStyle = computed(() => {
  if (store.windowScrollY > 800) {
    return {
      position:"fixed",
      top:'20px',
      width:'240px',
      marginTop:0,
      transform: 'translateY(0)',
      transition: '.4s'
    }
  } else {
    return {}
  }
})

const loginHandle = () => {
  store.showLoginModalChange(true)
}
</script>
<style scoped lang="less">
.divider {
  margin: 10px 0 !important;
}
.bottom {
  display: flex;
  .item {
    width: 25%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .num {
      color: #fa8739;
      font-size: 14px;
      font-weight: 500;
    }
    .title {
      font-size: 16px;
    }
  }
}
.red,
.yellow,
.blue {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.red {
  background-color: red;
  top: 10px;
  right: 40px;
}
.yellow {
  background-color: rgb(246, 185, 69);
  top: 10px;
  right: 25px;
}
.blue {
  background-color: rgb(59, 203, 81);
  top: 10px;
  right: 10px;
}
</style>
