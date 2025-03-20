import { ref } from 'vue'
import { defineStore } from 'pinia'
export const appStore = defineStore(
    'App',
    () => {
        // 窗口滚动距离
        const windowScrollY = ref(0)
        const windowScrollYChange = e => {
            windowScrollY.value = e
        }

        const windowInnerWidth = ref(1280)
        const windowInnerWidthChange = e => {
            windowInnerWidth.value = e
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
            if (Object.keys(e).length) {
                isLoginChange(true)
            } else {
                isLoginChange(false)
            }
        }

        // token
        let token = ref()
        const tokenChange = e => {
            token.value = e
        }
        // token
        let showLoginModal = ref(false)
        const showLoginModalChange = e => {
            showLoginModal.value = e
        }

        // token
        let newsNumObj = ref({
            total: 0,
            likeAndCollectNum: 0,
            commentNum: 0,
            followNum: 0,
        })
        const newsNumObjChange = e => {
            newsNumObj.value = e
        }
        return {
            windowScrollY,
            windowScrollYChange,
            windowInnerWidth,
            windowInnerWidthChange,
            isLogin,
            isLoginChange,
            userInfo,
            userInfoChange,
            token,
            tokenChange,
            showLoginModal,
            showLoginModalChange,
            newsNumObj,
            newsNumObjChange,
        }
    },
    {
        persist: {
            enabled: true, // true 表示开启持久化保存
        },
    },
)
