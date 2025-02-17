import axios from 'axios'

import { ElLoading } from 'element-plus'
import { getSessionStorage } from '../../utils'

const DEAFULT_LOADING = true

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
                let token = (getSessionStorage('App') || {}).token
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config
            },
            error => {
                console.log(error)
            },
        )
        this.instance.interceptors.response.use(
            response => {
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
