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
// 查看单个文章
export const getArticleByIdRequest = async id => {
    return wsRequest.get({
        url: `/article/getArticle/${id}`,
    })
}
// 上传文章中的图片
export const articleUploadRequest = async data => {
    return wsRequest.post({
        url: `/article/upload`,
        data,
    })
}
// 获取当前用户下的文章
export const getUserArticlesRequest = async data => {
    return wsRequest.post({
        url: `/article/getUserArticles`,
        data,
    })
}
// 查看热度最高的文章列表
export const getHotArticlesRequest = async data => {
    return wsRequest.post({
        url: `/article/getHotArticles`,
        data,
    })
}
