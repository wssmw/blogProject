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
