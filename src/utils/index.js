import { isDate, isNumber } from './typeUtil'

export const setLocalStorage = (key, item) => {
    localStorage.setItem(key, JSON.stringify(item))
}
export const getLocalStorage = key => {
    return JSON.parse(localStorage.getItem(key))
}
export const getSessionStorage = key => {
    return JSON.parse(sessionStorage.getItem(key))
}
export const transDate = (ms, type) => {
    ms = new Date(ms)
    let hasY = type.includes('yyyy')
    let hasM = type.includes('MM')
    let hasD = type.includes('dd')
    let hasH = type.includes('HH')
    let hasm = type.includes('mm')
    let hasS = type.includes('ss')
    let allHas = (hasY || hasM || hasD) && (hasm || hasH || hasS)
    const time = new Date(ms)
    const y = time.getFullYear()
    const m = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1 + ''
    const d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    const h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
    const mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
    const s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
    return (
        (!hasY ? '' : y + '-') +
        (!hasM ? '' : m + '-') +
        (!hasD ? '' : d) +
        (allHas ? ' ' : '') +
        (!hasH ? '' : h + ':') +
        (!hasm ? '' : mm + ':') +
        (hasS ? s : '')
    )
}
