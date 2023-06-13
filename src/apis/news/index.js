import $http from '../http'
const { get } = $http 

/**
 * 
 * 获取行业信息
 * @param {*} data
 * @returns 
 */
export function information(data) {
    return get('/stage-api/information', data)
}

/**
 * 
 * 获取行业详情信息
 * @param {*} data
 * @returns 
 */
export function informationDetail(id, data) {
    return get('/stage-api/information/' + id, data)
}