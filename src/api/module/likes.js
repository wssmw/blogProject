import wsRequest from '@/api/index.js'

// 新增文章点赞
export const likeArticleRequest = async data => {
    return wsRequest.post({
        url: `/like/article`,
        data,
    })
}
// 查看点赞文章
export const getUserLikedArticlesRequest = async data => {
    return wsRequest.post({
        url: `/like/getUserLikedArticles`,
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

// 查看点赞评论
export const getUserLikedCommentsRequest = async data => {
    return wsRequest.post({
        url: `/like/getUserLikedComments`,
        data,
    })
}
