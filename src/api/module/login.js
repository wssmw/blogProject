import wsRequest from '@/api/index.js'

// 登录通过gitee
export const loginWidthGitee = async code => {
    return wsRequest.get({
        url: `/login/gitee/callback?code=${code}`,
    })
}
// 获取commit信息
export const getCommitMessageGitee = async () => {
    return wsRequest.get({
        url: `/users/getCommitMessage`,
    })
}
// 注册
export const registerRequest = async data => {
    return wsRequest.post({
        url: '/users/register',
        data,
    })
}
// 登录
export const loginRequest = async data => {
    return wsRequest.post({
        url: '/login',
        data,
    })
}
// 刷新登录
export const refreshTokenRequest = async data => {
    return wsRequest.post({
        url: '/refresh-token',
        data,
    })
}
// 登出接口
export const logoutRequest = async data => {
    return wsRequest.post({
        url: '/logout',
        data,
    })
}
