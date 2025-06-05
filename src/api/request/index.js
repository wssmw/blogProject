import axios from 'axios'
import { refreshTokenRequest } from '@/api/module/login'
import { ElLoading } from 'element-plus'
import { appStore } from '@/store/module/app'
import { getLocalStorage, setLocalStorage } from '@/utils/index'
const DEAFULT_LOADING = false

class WsRequest {
    // axios实例
    instance
    // 是否展示loading
    isShowLoading
    // 局部请求拦截
    interceptors
    // loading实例
    loading
    constructor(config) {
        this.instance = axios.create(config)
        this.isShowLoading = config.isShowLoading ?? DEAFULT_LOADING
        this.interceptors = config.interceptors
        this.instance.interceptors.request.use(
            config => {
                if (this.isShowLoading) {
                    this.loading = ElLoading.service({
                        fullscreen: true,
                        text: '努力加载中！',
                        background: '#EEE',
                    })
                }
                let store = appStore()
                if (store.token && !config?.data?.refreshToken) {
                    config.headers.Authorization = `Bearer ${store.token}`
                } else if (config?.data?.refreshToken) {
                    config.headers.Authorization = `Bearer ${config.data.refreshToken}`
                    delete config.data.refreshToken
                }
                // let token = (getSessionStorage('App') || {}).token
                // if (token) {
                // }
                return config
            },
            error => {
                console.log(error)
            },
        )
        this.instance.interceptors.response.use(
            async response => {
                if (response.data.code === '410') {
                    // 刷新token
                    try {
                        const refreshToken = getLocalStorage('refreshToken')
                        console.log(refreshToken, 'refreshToken')
                        // 尝试刷新token，将refreshToken放在header中
                        const res = await refreshTokenRequest({
                            refreshToken,
                        })
                        const { token, refreshToken: newRefreshToken } = res.data
                        // 更新token
                        setLocalStorage('accessToken', token)
                        setLocalStorage('refreshToken', newRefreshToken)

                        // 更新store中的token
                        const store = appStore()
                        store.tokenChange(token)

                        // 重试原请求
                        response.config.headers.Authorization = `Bearer ${token}`
                        return this.request(response.config)
                    } catch (error) {
                        console.error('刷新token失败:', error)
                    }
                } else if (response.data.code === '411') {
                    // 刷新令牌已过期，请重新登录
                    const store = appStore()
                    store.isLoginChange(false)
                    store.userInfoChange({})
                    store.tokenChange('')
                }
                this.loading?.close()
                return response.data
            },
            err => {
                this.loading?.close()
                console.log(err)
            },
        )
    }
    request(config) {
        return new Promise((resolve, reject) => {
            this.instance
                .request(config)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    get(config) {
        return this.request({ ...config, method: 'GET' })
    }
    post(config) {
        return this.request({ ...config, method: 'POST' })
    }
}
export default WsRequest
