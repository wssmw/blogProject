import wsRequest from '@/api/index.js'

// 新增AI对话
export const createConversationRequest = async data => {
    return wsRequest.post({
        url: `/ai/conversations/create`,
        data,
    })
}
// 继续AI对话
export const sendMessageRequest = async data => {
    const id = data.id
    return wsRequest.post({
        url: `/ai/conversations/${id}/send`,
        data: {message: data.message},
    })
}
// 查询当前用户的对话列表
export const getConversationListRequest = async data => {
    return wsRequest.post({
        url: `/ai/conversations`,
        data,
    })
}
// 查询对应对话的聊天记录
export const getConversationMessagesRequest = async data => {
    let id = data.id
    return wsRequest.post({
        url: `/ai/conversations/${id}/messages`,
        data,
    })
}
// 删除对应对话
export const deleteConversationRequest = async data => {
    return wsRequest.post({
        url: `/ai/conversations/delete`,
        data,
    })
}