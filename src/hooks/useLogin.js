import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { appStore } from '../store/module/app'
export function useLogin() {
    const store = appStore()
    const { isLogin } = storeToRefs(store)

    // 执行需要登录的操作
    const withLogin = async callback => {
        if (!isLogin.value) {
            ElMessage.warning('请先登录')
            store.showLoginModalChange(true)
            return false
        }

        return await callback()
    }

    return {
        withLogin,
    }
}
