import wsRequest from '@/api/index.js'

// 查看分类
export const getCategoryListRequest =  () => {
    return wsRequest.get({
        url: `/category/getCategoryList`,
    })
}



