import wsRequest from '@/api/index.js'

// 关注用户
export const followUserRequest = async data => {
    return wsRequest.post({
        url: `/follow/user`,
        data,
    })
}
// 关注标签
export const followTagRequest = async data => {
    return wsRequest.post({
        url: `/follow/tag`,
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
// 获取关注的标签列表
export const getFollowingTagsRequest = async data => {
    return wsRequest.post({
        url: `/follow/getFollowingTags`,
        data,
    })
}
