const preProcessValue = value => {
    value = value + ''
    value = value.trim()
    return value
}
const validateName = val => {
    if (val) {
        val = val.trim()
    }
    const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/g
    return reg.test(val)
}
const getStrLength = str => {
    let strLength = 0
    str += ''
    if (str) {
        strLength = str.replace(/[^\x00-\xff]/g, '**').length // eslint-disable-line
    }
    return strLength
}

export const isType = (obj, type) => {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']'
}

export const isString = obj => {
    return isType(obj, 'String')
}

export const isArray = obj => {
    return isType(obj, 'Array')
}

export const isObject = obj => {
    return isType(obj, 'Object')
}
export const isNumber = obj => {
    return isType(obj, 'Number')
}
export const isFormData = obj => {
    return isType(obj, 'FormData')
}

export const isFunction = obj => {
    return isType(obj, 'Function')
}
export const isPositiveInteger = value => {
    value = value + ''
    value = value.trim()
    return /^\+?[1-9][0-9]*$/.test(value + '')
}
export const isNoneZeroFloat = value => {
    value = preProcessValue(value)
    return Number(value) !== 0 && isFloat(value)
}
export const isNegativeInteger = value => {
    value = preProcessValue(value)
    return /^-[1-9][0-9]*$/.test(value + '')
}
export const isInteger = value => {
    value = preProcessValue(value)
    return /^[+-]?(([1-9][0-9]*)|0)$/.test(value + '')
}
export const isPositiveFloat = value => {
    value = preProcessValue(value)
    return isPositiveInteger(value) || /^\+?(0|([1-9][0-9]*))\.{1}\d+$/.test(value)
}
export const isNegativeFloat = value => {
    value = preProcessValue(value)
    return isNegativeInteger(value) || /^-(0|([1-9][0-9]*))\.{1}\d+$/.test(value)
}
export const isFloat = value => {
    value = preProcessValue(value)
    return isInteger(value) || /^[+-]?(0|([1-9][0-9]*))\.{1}\d+$/.test(value)
}
export const isPercent = value => {
    value = preProcessValue(value)

    let numberValue = value
    const flagIndex = value.indexOf('%')
    if (flagIndex !== -1) {
        numberValue = value.substring(0, flagIndex)
    }
    return isFloat(numberValue)
}
// 取出特殊字符
export const getspacialchar = str => {
    const reg = "∏¥§℅€£℉№℡‰¢∮※？?<>[]'&"
    let spacialchar = ''
    for (let i = 0; i < str.length; i++) {
        const char = str.substring(i, i + 1)
        if (reg.indexOf(char) > 0 && spacialchar.indexOf(char) < 0) {
            spacialchar += char + ','
        }
    }
    return spacialchar
}
// 验证特殊字符 带空格
export const validateSpecial = val => {
    if (val) {
        val = val.trim()
    }
    // let reg = /[/'∏¥§℅€£℉№℡‰¢∮※？?&<>【】[\]\s]/
    const reg = /[∏¥§℅€£℉№℡‰¢∮※？?<>[\]'&\s]/
    return reg.test(val)
}
// 没有空格的 特殊字符 应用于 购方名称
export const validateNoSpaceSpecial = val => {
    if (val) {
        val = val.trim()
    }
    // let reg = /[/'∏¥§℅€£℉№℡‰¢∮※？?&<>【】[\]]/
    const reg = /[∏¥§℅€£℉№℡‰¢∮※？?<>[\]'&]/
    return reg.test(val)
}
// 验证税号 长度15-20
export const validateTaxNo = val => {
    if (val) {
        val = val.trim()
    }
    const reg = /^[A-Z0-9]{15,20}$/
    return reg.test(val)
}
// 验证税号 长度7-20 (服务器版允许纳税人识别号为7-20数字或者大写字母（不支持特殊字符）比如护照)
export const validateTaxNo7 = val => {
    if (val) {
        val = val.trim()
    }
    const reg = /^[A-Za-z0-9]{7,20}$/
    return reg.test(val)
}
// 验证身份证
export const validateIdentity = val => {
    if (val) {
        val = val.trim()
    }
    const reg18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    const reg15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/
    return reg18.test(val) || reg15.test(val)
}
// 车辆识别号 / 车架号码
export const validateCarID = val => {
    if (val) {
        val = val.trim()
    }
    const reg = /^[A-Z0-9]{5,20}$/
    return reg.test(val)
}
// 价税合计为大于0的数
export const validateGtZero = val => {
    if (val) {
        val = val.trim()
    }
    const d = Number(val) !== 0
    return d || isFloat(val)
}
// 字母和数字和 - 或 空格 或 _
export const validateCarInfo = val => {
    if (val) {
        val = val.trim()
    }
    const reg = /^[A-Z0-9\-\s_]$/
    return reg.test(val)
}
// 添加用户用户名验证手机号
export const validateAdduserPhone = val => {
    if (val) {
        val = val.trim()
    }
    const reg = /^1[3|4|5|6|7|8|9]\d{9}$/
    // const reg = /^[0-9-]{5,15}$/
    return reg.test(val)
}
// 验证手机号
export const validatePhone = val => {
    if (val) {
        val = val.trim()
    }
    console.log(val, 'val')
    // let reg = /^1[3|4|5|6|7|8|9]\d{9}$/
    const reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
    return reg.test(val)
}
// 验证座机
export const validateTelephone = val => {
    if (val) {
        val = val.trim()
    }
    // let reg = /^(86|0)((\d{2}-\d{8})|(\d{3}-\d{7,8}))$/
    const reg = /^[0-9-]{5,15}$/
    return reg.test(val)
}
// 验证邮箱http://jira.51baiwang.com/browse/BWP-4827
export const validateEmail = val => {
    var emailRegular = '/^([a-zA-Z0-9]+[_|_|.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.|-]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,3}$/'
    if (val) {
        val = val.trim()
    }
    let reg = eval(emailRegular)
    return reg.test(val) && getStrLength(val) < 101
}

// 验证手机号
export const validateQQ = val => {
    if (val) {
        val = val.trim()
    }
    console.log(val, 'val')
    const reg = /^[1-9][0-9]{4,14}$/
    return reg.test(val)
}
// 验证微信号
export const validateWX = val => {
    if (val) {
        val = val.trim()
    }
    const reg = /^[a-zA-Z_][a-zA-Z0-9_]{5,29}$/
    return reg.test(val)
}

// 无用

// 验证开户账号
export const validateAccount = val => {
    if (val) {
        val = val.trim()
    }
    // let reg = /^[0-9a-zA-Z]+$/g
    const reg = /[/∏¥§℅€£℉№℡‰¢∮※？?<>[\]'&\u4e00-\u9fa5\s]/
    return reg.test(val)
}
// 用户账号 字母数字汉字_ 4-32位字符
export const validateUserAccount = val => {
    if (val) {
        val = val.trim()
    }
    const reg = /^[A-Za-z0-9\u4e00-\u9fa5_]+$/
    return reg.test(val) && getStrLength(val) > 3 && getStrLength(val) < 33
}
// 字典标识 字母——
export const validateDictCode = val => {
    if (val) {
        val = val.trim()
    }
    const reg = /^[A-Za-z_]+$/
    return reg.test(val) && getStrLength(val) < 31
}
// 验证机构代码
export const ValidateOrgCode = val => {
    if (val) {
        val = val.trim()
    }
    const reg = /^[A-Za-z0-9]{0,36}$/
    return reg.test(val)
}
// 验证接入代码\下横排号\设备编号
export const ValidateCrossNo = val => {
    if (val) {
        val = val.trim()
    }
    const reg = /^[0-9]{0,50}$/
    return reg.test(val)
}
// 法人代表、收件人
export const ValidateLegalNameReg = val => {
    if (val) {
        val = val.trim()
    }
    const reg = /^[A-Za-z\u4e00-\u9fa5.,，]+$/
    return reg.test(val) && getStrLength(val) < 51
}
// 用户账号不能为纯数字校验
export const ValidateAllNumber = val => {
    if (val) {
        val = val.trim()
    }
    const reg = /^(?![0-9]+$)/
    return reg.test(val)
}
export const userRegValidate16 = (rule, value, callback) => {
    if (value && (!validateName(value) || getStrLength(value) > 16)) {
        return callback(new Error('汉字、字母、数字且长度不能超过16'))
    } else {
        callback()
    }
}
export const userRegValidate20 = (rule, value, callback) => {
    if (value && (!validateName(value) || getStrLength(value) > 20)) {
        return callback(new Error('汉字、字母、数字且长度不能超过20'))
    } else {
        callback()
    }
}
// 纯数字校验
export const ValidateNumber = val => {
    const reg = /^(0|[1-9][0-9]*)$/
    return reg.test(val)
}
//  商品编码支持字母，数字，字符 . - _ ，长度30个字符
export const customGoodsCodeValidate = val => {
    const reg = /^[0-9a-zA-Z.\-_]{1,30}$/
    return reg.test(val)
}
// 客户编码、供应商编码 汉字、字母、数字 （）
export const bianmaValidate = val => {
    if (val) {
        val = val.trim()
    }
    const reg = /^[A-Za-z0-9\u4e00-\u9fa5()]+$/
    return reg.test(val) && getStrLength(val) < 32
}
