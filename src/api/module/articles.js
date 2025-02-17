import wsRequest from '@/api/index.js'

// 新增文章
export const createArticleRequest = async data => {
    return wsRequest.post({
        url: `/article/create`,
        data,
    })
}
// 查看文章
export const getArticleRequest = async data => {
    return wsRequest.post({
        url: `/article/getArticle`,
        data,
    })
}
