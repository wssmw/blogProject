import wsRequest from '@/api/index.js'

// 新增小记
export const addNoteRequest = async data => {
    return wsRequest.post({
        url: `/note/create`,
        data,
    })
}
// 查看小记列表
export const getNoteListRequest = async data => {
    return wsRequest.post({
        url: `/note/list`,
        data,
    })
}
// 删除小记
export const deleteNoteRequest = async data => {
    return wsRequest.post({
        url: `/note/delete`,
        data,
    })
}

// 修改小记
export const updateNoteRequest = async data => {
    return wsRequest.post({
        url: `/note/update`,
        data,
    })
}
