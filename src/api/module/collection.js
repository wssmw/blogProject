import wsRequest from '@/api/index.js'

// 新增收藏
export const createCollectionsRequest = data => {
    return wsRequest.post({
        url: `/collection/create`,
        data,
    })
}
// 查看收藏
export const getUserCollectionsRequest = data => {
    return wsRequest.post({
        url: `/collection/getUserCollections`,
        data,
    })
}
// 删除收藏
export const deleteUserCollectionsRequest = data => {
    return wsRequest.post({
        url: `/collection/delete`,
        data,
    })
}
// 编辑收藏
export const updateUserCollectionsRequest = data => {
    return wsRequest.post({
        url: `/collection/update`,
        data,
    })
}

// 编辑收藏
export const addArticleCollectionsRequest = data => {
    return wsRequest.post({
        url: `/collection/addArticle`,
        data,
    })
}
