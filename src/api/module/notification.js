import wsRequest from '@/api/index.js'

// 获取通知列表
export const getNotificationsRequest = async data => {
    return wsRequest.post({
        url: `/notification/list`,
        data,
    })
}

// 获取未读通知数量
export const getUnreadNotificationsRequest = async () => {
    return wsRequest.get({
        url: `/notification/unread`,
    })
}
// 标记通知为已读
export const readNotificationsRequest = async data => {
    return wsRequest.post({
        url: `/notification/read`,
        data,
    })
}
