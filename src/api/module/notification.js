import wsRequest from '@/api/index.js'

// 获取通知列表
export const getNotificationsRequest = async data => {
    return wsRequest.post({
        url: `/notification/getNotifications`,
        data,
    })
}

// 获取未读通知数量
export const getUnreadNotificationsRequest = async () => {
    return wsRequest.get({
        url: `/notification/unread`,
    })
}
