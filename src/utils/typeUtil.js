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

export default {
    isType(obj, type) {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']'
    },

    isString(obj) {
        return this.isType(obj, 'String')
    },

    isArray(obj) {
        return this.isType(obj, 'Array')
    },

    isObject(obj) {
        return this.isType(obj, 'Object')
    },
    isNumber(obj) {
        return this.isType(obj, 'Number')
    },
    isFormData(obj) {
        return this.isType(obj, 'FormData')
    },

    isFunction(obj) {
        return this.isType(obj, 'Function')
    },
    isPositiveInteger(value) {
        value = value + ''
        value = value.trim()
        return /^\+?[1-9][0-9]*$/.test(value + '')
    },
    isNoneZeroFloat(value) {
        value = preProcessValue(value)
        return Number(value) !== 0 && this.isFloat(value)
    },
    isNegativeInteger(value) {
        value = preProcessValue(value)
        return /^-[1-9][0-9]*$/.test(value + '')
    },
    isInteger(value) {
        value = preProcessValue(value)
        return /^[+-]?(([1-9][0-9]*)|0)$/.test(value + '')
    },
    isPositiveFloat(value) {
        value = preProcessValue(value)
        return this.isPositiveInteger(value) || /^\+?(0|([1-9][0-9]*))\.{1}\d+$/.test(value)
    },
    isNegativeFloat(value) {
        value = preProcessValue(value)
        return this.isNegativeInteger(value) || /^-(0|([1-9][0-9]*))\.{1}\d+$/.test(value)
    },
    isFloat(value) {
        value = preProcessValue(value)
        return this.isInteger(value) || /^[+-]?(0|([1-9][0-9]*))\.{1}\d+$/.test(value)
    },
    isPercent(value) {
        value = preProcessValue(value)

        let numberValue = value
        const flagIndex = value.indexOf('%')
        if (flagIndex !== -1) {
            numberValue = value.substring(0, flagIndex)
        }
        return this.isFloat(numberValue)
    },
    // 取出特殊字符
    getspacialchar(str) {
        const reg = "∏¥§℅€£℉№℡‰¢∮※？?<>[]'&"
        let spacialchar = ''
        for (let i = 0; i < str.length; i++) {
            const char = str.substring(i, i + 1)
            if (reg.indexOf(char) > 0 && spacialchar.indexOf(char) < 0) {
                spacialchar += char + ','
            }
        }
        return spacialchar
    },
    // 验证特殊字符 带空格
    validateSpecial(val) {
        if (val) {
            val = val.trim()
        }
        // let reg = /[/'∏¥§℅€£℉№℡‰¢∮※？?&<>【】[\]\s]/
        const reg = /[∏¥§℅€£℉№℡‰¢∮※？?<>[\]'&\s]/
        return reg.test(val)
    },
    // 没有空格的 特殊字符 应用于 购方名称
    validateNoSpaceSpecial(val) {
        if (val) {
            val = val.trim()
        }
        // let reg = /[/'∏¥§℅€£℉№℡‰¢∮※？?&<>【】[\]]/
        const reg = /[∏¥§℅€£℉№℡‰¢∮※？?<>[\]'&]/
        return reg.test(val)
    },
    // 获取字符串字节长度
    getStrLength(str) {
        return getStrLength(str)
    },
    // 验证税号 长度15-20
    validateTaxNo(val) {
        if (val) {
            val = val.trim()
        }
        const reg = /^[A-Z0-9]{15,20}$/
        return reg.test(val)
    },
    // 验证税号 长度7-20 (服务器版允许纳税人识别号为7-20数字或者大写字母（不支持特殊字符）比如护照)
    validateTaxNo7(val) {
        if (val) {
            val = val.trim()
        }
        const reg = /^[A-Za-z0-9]{7,20}$/
        return reg.test(val)
    },
    // 验证身份证
    validateIdentity(val) {
        if (val) {
            val = val.trim()
        }
        const reg18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        const reg15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/
        return reg18.test(val) || reg15.test(val)
    },
    // 车辆识别号 / 车架号码
    validateCarID(val) {
        if (val) {
            val = val.trim()
        }
        const reg = /^[A-Z0-9]{5,20}$/
        return reg.test(val)
    },
    // 价税合计为大于0的数
    validateGtZero(val) {
        if (val) {
            val = val.trim()
        }
        const d = Number(val) !== 0
        return d || this.isFloat(val)
    },
    // 字母和数字和 - 或 空格 或 _
    validateCarInfo(val) {
        if (val) {
            val = val.trim()
        }
        const reg = /^[A-Z0-9\-\s_]$/
        return reg.test(val)
    },
    // 添加用户用户名验证手机号
    validateAdduserPhone(val) {
        if (val) {
            val = val.trim()
        }
        const reg = /^1[3|4|5|6|7|8|9]\d{9}$/
        // const reg = /^[0-9-]{5,15}$/
        return reg.test(val)
    },
    // 验证手机号
    validatePhone(val) {
        if (val) {
            val = val.trim()
        }
        // let reg = /^1[3|4|5|6|7|8|9]\d{9}$/
        const reg = /^[0-9-]{5,15}$/
        return reg.test(val)
    },
    // 验证座机
    validateTelephone(val) {
        if (val) {
            val = val.trim()
        }
        // let reg = /^(86|0)((\d{2}-\d{8})|(\d{3}-\d{7,8}))$/
        const reg = /^[0-9-]{5,15}$/
        return reg.test(val)
    },
    // 验证邮箱http://jira.51baiwang.com/browse/BWP-4827
    validateEmail(val) {
        var emailRegular =
            '/^([a-zA-Z0-9]+[_|_|.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.|-]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,3}$/'
        if (val) {
            val = val.trim()
        }
        let reg = eval(emailRegular) // eslint-disable-line
        // let reg = /^([a-zA-Z0-9]+[_|_|.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        // /^([a-zA-Z0-9]+[_|_|.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        return reg.test(val) && this.getStrLength(val) < 101
    },
    // 验证企业名称，营业地址，开户银行  字母数字汉字
    validateName(val) {
        return validateName(val)
    },
    // 验证开户账号
    validateAccount(val) {
        if (val) {
            val = val.trim()
        }
        // let reg = /^[0-9a-zA-Z]+$/g
        const reg = /[/∏¥§℅€£℉№℡‰¢∮※？?<>[\]'&\u4e00-\u9fa5\s]/
        return reg.test(val)
    },
    // 用户账号 字母数字汉字_ 4-32位字符
    validateUserAccount(val) {
        if (val) {
            val = val.trim()
        }
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5_]+$/
        return reg.test(val) && this.getStrLength(val) > 3 && this.getStrLength(val) < 33
    },
    // 字典标识 字母——
    validateDictCode(val) {
        if (val) {
            val = val.trim()
        }
        const reg = /^[A-Za-z_]+$/
        return reg.test(val) && this.getStrLength(val) < 31
    },
    // 验证机构代码
    ValidateOrgCode(val) {
        if (val) {
            val = val.trim()
        }
        const reg = /^[A-Za-z0-9]{0,36}$/
        return reg.test(val)
    },
    // 验证接入代码\下横排号\设备编号
    ValidateCrossNo(val) {
        if (val) {
            val = val.trim()
        }
        const reg = /^[0-9]{0,50}$/
        return reg.test(val)
    },
    // 法人代表、收件人
    ValidateLegalNameReg(val) {
        if (val) {
            val = val.trim()
        }
        const reg = /^[A-Za-z\u4e00-\u9fa5.,，]+$/
        return reg.test(val) && this.getStrLength(val) < 51
    },
    // 用户账号不能为纯数字校验
    ValidateAllNumber(val) {
        if (val) {
            val = val.trim()
        }
        const reg = /^(?![0-9]+$)/
        return reg.test(val)
    },
    userRegValidate16(rule, value, callback) {
        if (value && (!validateName(value) || getStrLength(value) > 16)) {
            return callback(new Error('汉字、字母、数字且长度不能超过16'))
        } else {
            callback()
        }
    },
    userRegValidate20(rule, value, callback) {
        if (value && (!validateName(value) || getStrLength(value) > 20)) {
            return callback(new Error('汉字、字母、数字且长度不能超过20'))
        } else {
            callback()
        }
    },
    // 纯数字校验
    ValidateNumber(val) {
        const reg = /^(0|[1-9][0-9]*)$/
        return reg.test(val)
    },
    //  商品编码支持字母，数字，字符 . - _ ，长度30个字符
    customGoodsCodeValidate(val) {
        const reg = /^[0-9a-zA-Z.\-_]{1,30}$/
        return reg.test(val)
    },
    // 客户编码、供应商编码 汉字、字母、数字 （）
    bianmaValidate(val) {
        if (val) {
            val = val.trim()
        }
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5()]+$/
        return reg.test(val) && this.getStrLength(val) < 32
    },
}

function isType(obj, type) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']'
}

function isString(obj) {
    return isType(obj, 'String')
}

function isArray(obj) {
    return isType(obj, 'Array')
}

function isObject(obj) {
    return isType(obj, 'Object')
}

function isFormData(obj) {
    return isType(obj, 'FormData')
}

function isFunction(obj) {
    return isType(obj, 'Function')
}

function isBoolean(obj) {
    return isType(obj, 'Boolean')
}

function isNumber(obj) {
    return isType(obj, 'Number')
}

function isUndefined(obj) {
    return isType(obj, 'Undefined')
}

function isNull(obj) {
    return isType(obj, 'Null')
}

function isDate(obj) {
    return isType(obj, 'Date')
}

function isRegExp(obj) {
    return isType(obj, 'RegExp')
}

function dataType(obj) {
    const toString = Object.prototype.toString
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object',
    }
    return map[toString.call(obj)]
}

export {
    isString,
    isArray,
    isObject,
    isFormData,
    isFunction,
    isBoolean,
    isNumber,
    isUndefined,
    isNull,
    isDate,
    isRegExp,
    isType,
    dataType,
}
