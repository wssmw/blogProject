import wsRequest from '@/api/index.js'

// 新增分类
export const createCollectionsRequest = data => {
    return wsRequest.post({
        url: `/collection/create`,
        data,
    })
}
// 查看分类
export const getUserCollectionsRequest = data => {
    return wsRequest.post({
        url: `/collection/getUserCollections`,
        data,
    })
}
// 删除分类
export const deleteUserCollectionsRequest = data => {
    return wsRequest.post({
        url: `/collection/delete`,
        data,
    })
}
// 编辑分类
export const updateUserCollectionsRequest = data => {
    return wsRequest.post({
        url: `/collection/update`,
        data,
    })
}
