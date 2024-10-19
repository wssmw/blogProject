import { ref } from 'vue'
import { defineStore } from 'pinia'

export const appStore = defineStore('App', () => {
  // 窗口滚动距离
  const windowScrollY = ref(0)
  const windowScrollYChange = e => {
    windowScrollY.value = e
  }

  // 是否登录
  const isLogin = ref(false)
  const isLoginChange = e => {
    isLogin.value = e
  }

  // 用户信息
  const userInfo = ref()
  const userInfoChange = e => {
    userInfo.value = e
    if (e) {
      isLoginChange(true)
    } else {
      isLoginChange(false)
    }
  }
  return {
    windowScrollY,
    windowScrollYChange,
    isLogin,
    isLoginChange,
    userInfo,
    userInfoChange,
  }
})
