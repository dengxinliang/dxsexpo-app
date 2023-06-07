import $http from '../http'
const { get } = $http 

/**
 * 
 * 获取展会现场数据
 * @param {*} data
 * @returns 
 */
export function exhibitionScene(data) {
    return get('/stage-api/exhibition-scene', data)
}

/**
 * 
 * 获取展会现场详情数据
 * @param {*} data
 * @returns 
 */
export function exhibitionSceneDetail(id, data) {
    return get('/stage-api/exhibition-scene/' + id, data)
}