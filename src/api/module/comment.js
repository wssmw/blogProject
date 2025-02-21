import wsRequest from '@/api/index.js'

// 新增评论
export const createCommentRequest = async data => {
    return wsRequest.post({
        url: `/comment/create`,
        data,
    })
}

// 查看评论
export const getCommentListRequest = async data => {
    return wsRequest.post({
        url: `/comment/getCommentList`,
        data,
    })
}
