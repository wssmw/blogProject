import WsRequest from "./request";

const config = {
    baseURL: '/api',
    timeout: 10000,
    // 跨域时候允许携带凭证
    withCredentials: true,

}

export default new WsRequest(config)