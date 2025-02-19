import wsRequest from '@/api/index.js'

// 查看标签
export const getTagListRequest = async () => {
    return wsRequest.get({
        url: `/tag/getTagList`,
    })
}
