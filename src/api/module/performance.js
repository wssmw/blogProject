import request from '../index'

/**
 * 上报性能数据
 * @param {Object} data 性能数据
 */
export const reportPerformance = data => {
    return request.post({
        url: '/performance/report',
        data,
    })
}
