/**====================================================================================
 * 1.  时间格式化
 * 2.  对象深度克隆
 * 3.  判断JS执行环境
 * 4.  获取通用查询字符串参数
 * 5.  获取随机数字+字母组成的n位验证码
 * 6.  获取字符串中出现次数最多的字母和出现的次数
 * 7.  数组套对象根据id去重，然后合并其他属性
 * 8.  数组降维
 * 9.  函数节流
 * 10. 数据类型检测
 *=====================================================================================/ 

/**
 * 作用: 格式化时间 
 * @param {String: date}
 * @return 2019-10-28 16:44:30 (格式化后的时间字符串)
 * 
 */
function formatDate(date) {
    if (date && typeof date === 'string') {
        date = date.replace(/(-|\.)/g, '/');
        date = new Date(date);
    } else {
        const promptMst = '"2019-1-12 12:2:23"';
        throw TypeError(`Must be a String like ${promptMst}`);
    }

    function zero(val) {
        return val < 10 ? '0' + val : val;
    }
    const formatDate = {
        year: date.getFullYear() + '-',
        mon: zero(date.getMonth() + 1) + '-',
        day: zero(date.getDate()) + ' ',
        hour: zero(date.getHours()) + ':',
        minute: zero(date.getMinutes()) + ':',
        senc: zero(date.getSeconds())
    };

    return formatDate.year + formatDate.mon + formatDate.day +
        formatDate.hour + formatDate.minute + formatDate.senc;
}

/**
 * 作用: 对象深度克隆
 * @param: [Object source]
 * @return newObject
 *
 */
function objDeepCopy(source) {
    let sourceCopy = source instanceof Array ? [] : {};
    for (let item in source) {
        if (source.hasOwnProperty(item)) {
            sourceCopy[item] = typeof source[item] === 'object' ?
                objDeepCopy(source[item]) : source[item];
        }
    }
    return sourceCopy;
};

/**
 * 作用: 判断js执行环境
 * @param: window
 * @return String
 *
 * */
function isJavaScript() {
    if (typeof (window) === "undefined") {
        return "Node";
    }

    return "Browser";
}

/**
 * 作用: 获取通用查询字符串参数
 *  @param: null
 *  @return Object
 * 
 */
function getQueryStringArgs() {
    var qs = location.search.length > 0 ? location.search.substring(1) : "",
        args = {},
        items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length;

    for (i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(items[0]);
        value = decodeURIComponent(items[1]);

        if (name.length) {
            args[name] = value;
        }
    }

    return args;
}

/**
 * 作用: 获取随机数字+字母组成的n位验证码
 * @param {n} Number    参数是位数
 * @return {tem} String  返回随机字符串
 */
function randomString(n) {
    let str = 'abcdefghijklmnopqrstuvwxyz9876543210';
    let tmp = '',
        i = 0,
        l = str.length;
    for (i = 0; i < n; i++) {
        tmp += str.charAt(Math.floor(Math.random() * l));
    }
    return tmp;
}

/**
 * 作用: 获取随机数字+字母组成的n位验证码
 * @param {len} Number 参数是位数
 * @return {str} String 返回随机后的字符串
 */
function getRandomStr(len) {
    var str = "";
    for (; str.length < len; str += Math.random().toString(36).substr(2));
    return str.substr(0, len);
}


/**
 * 作用: 获取字符串中出现次数最多的字母和出现的次数
 * @param {str} 传入的字符串
 * @return {Object} 返回出现最多的字母和出现的次数
 */
function getStr(str) {
    if (typeof str !== 'string') return false

    let obj = {}
    let arr = str.split('')

    for (let i = 0; i < arr.length; i++) {
        let char = arr[i]
        obj[char] = obj[char] || 0
        obj[char] += 1
    }

    let maxChar
    let maxNum = 0

    for (let key in obj) {
        if (obj[key] > maxNum) {
            maxChar = key
            maxNum = obj[key]
        }
    }
    return { maxChar, maxNum }
}

/**
 * 作用: 数组套对象根据id去重，然后合并其他属性
 *
 * @param {arr} 需要处理的数组
 * @return {arr}} 处理好的新书组
 * 
 * let arr = [{ price: 300, id: 1 }, { price: 350, id: 1 }, { price: 200, id: 2 }, { price: 250, id: 2 }, { price: 500, id: 3 }]
 * return newArr = [{ price: [300, 350], id: 1 },{ price: [200, 250], id: 2 },{ price: 500, id: 3 }]
 */
function mergeArr(arr) {
    let newArr = [];
    arr.forEach(item => {
        if (newArr.length > 0) {
            let filtervalue = newArr.filter(v => {
                return v.id === item.id;
            })
            if (filtervalue.length > 0) {
                newArr.forEach(n => {
                    if (n.id === filtervalue[0].id) {
                        n.price = [filtervalue[0].price, item.price]
                    }
                })
            } else {
                newArr.push(item)
            }
        } else {
            newArr.push(item)
        }
    })
    return newArr;
}

/**
 * 作用: 数组降维
 * @param: { Array } 数组
 * @return { Aaary } 降维后的数组
 */
function flatten(arr) {
    return [].concat(
        ...arr.map(x => {
            Aaary.isArray(x) ? flatten(x) : x;
        })
    )
}

/**
 * 作用： 函数节流
 * @param: { fn } 一个函数
 * @param: { delay } 一个时间段
 * 示例1: 滚动事件
 * 示例2: 过滤掉重复的验证事件（用户输入停止300ms后开启验证）
 */
function throttle(fn, delay = 60) {
    let lock = false;
    return (...args) => {
        if (lock) {
            return
        }
        fn(...args);
        lock = true;
        setTimeout(() => {
            lock = false;
        }, delay);
    }
}
function throttle(fn, delay = 300, I = null) {
    return (...args) => {
        clearInterval(I);
        I = setTimeout(fn.bind(null, ...args), delay);
    }
}

/**
 * 作用: 数据类型检测
 * @param: { data } 任意数据
 * @resturn data type 
 */
function typeCheck(data) {
    const toString = Object.prototype.toString;
    const dataType = (
        data instanceof Element
            ? 'element'
            : toString.call(data)
                .replace(/\[object\s(.+)\]/, '$1')
                .toLowerCase()
    )
    return dataType;
}
