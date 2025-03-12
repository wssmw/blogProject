import wsRequest from '@/api/index.js'

// 关注用户
export const followUserRequest = async data => {
    return wsRequest.post({
        url: `/follow/user`,
        data,
    })
}
// 获取关注的用户列表
export const getFollowingUsersRequest = async data => {
    return wsRequest.post({
        url: `/follow/getFollowingUsers`,
        data,
    })
}
