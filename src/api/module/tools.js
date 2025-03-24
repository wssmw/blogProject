import wsRequest from '@/api/index.js'

// 查看标签
export const getToolsListRequest = async () => {
    return wsRequest.get({
        url: `/tools`,
    })
}
