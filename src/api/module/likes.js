import wsRequest from '@/api/index.js'

// 新增文章点赞
export const likeArticleRequest = async data => {
    return wsRequest.post({
        url: `/like/article`,
        data,
    })
}
// 新增评论点赞
export const likeCommentRequest = async data => {
    return wsRequest.post({
        url: `/like/comment`,
        data,
    })
}


