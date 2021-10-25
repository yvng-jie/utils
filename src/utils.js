// ======================================= 时间格式化函数 ==============================================
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

// ======================================= 对象操作 ==============================================
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

// ======================================= 环境/设备/浏览器判断 ==============================================
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
 * 作用: 判断是移动还是PC设备
 * @param: { Null } 
 * @return { String } 
 */
function isMobile() {
  if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
  return 'mobile';
  }
  return 'desktop';
}

/**
 * 作用: 判断是否是苹果还是安卓移动设备
 * @param: { Null } 
 * @return { Boolean } 
 */
function isAppleMobileDevice() {
  let reg = /iphone|ipod|ipad|Macintosh/i;
  return reg.test(navigator.userAgent.toLowerCase());
}

/**
 * 作用: 判断是否是安卓移动设备
 * @param: { Null } 
 * @return { Boolean } 
 */
function isAndroidMobileDevice() {
    return /android/i.test(navigator.userAgent.toLowerCase());
}

/**
 * 作用: 判断是Windows还是Mac系统
 * @param: { Null } 
 * @return { Boolean } 
 */
function isAndroidMobileDevice() {
    const agent = navigator.userAgent.toLowerCase();
    const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
   const isWindows = agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0 || agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0;
    if (isWindows) {
        return "windows";
    }
    if(isMac){
        return "mac";
    }
}

/**
 * 作用: 判断是否是微信/QQ内置浏览器
 * @param: { Null } 
 * @return { Boolean } 
 */
function isAndroidMobileDevice() {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return "weixin";
    } else if (ua.match(/QQ/i) == "qq") {
        return "QQ";
    }
    return false;
}

/**
 * 作用: 浏览器型号和版本
 * @param: { Null } 
 * @return { Boolean } 
 */
function isAndroidMobileDevice() {
    let t = navigator.userAgent.toLowerCase();
    return 0 <= t.indexOf("msie") ? { //ie < 11
        type: "IE",
        version: Number(t.match(/msie ([\d]+)/)[1])
    } : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
        type: "IE",
        version: 11
    } : 0 <= t.indexOf("edge") ? {
        type: "Edge",
        version: Number(t.match(/edge\/([\d]+)/)[1])
    } : 0 <= t.indexOf("firefox") ? {
        type: "Firefox",
        version: Number(t.match(/firefox\/([\d]+)/)[1])
    } : 0 <= t.indexOf("chrome") ? {
        type: "Chrome",
        version: Number(t.match(/chrome\/([\d]+)/)[1])
    } : 0 <= t.indexOf("opera") ? {
        type: "Opera",
        version: Number(t.match(/opera.([\d]+)/)[1])
    } : 0 <= t.indexOf("Safari") ? {
        type: "Safari",
        version: Number(t.match(/version\/([\d]+)/)[1])
    } : {
        type: t,
        version: -1
    }
}

// ======================================= URL操作 ==============================================
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
 * 作用: 检测URL是否有效
 *  @param: { String }
 *  @return { Boolean }
 * 
 */
function getUrlState(URL) {
  let xmlhttp = new ActiveXObject("microsoft.xmlhttp");
  xmlhttp.Open("GET", URL, false);
  try {
    xmlhttp.Send();
  } catch (e) {
  } finally {
    let result = xmlhttp.responseText;
    if (result) {
      if (xmlhttp.Status == 200) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

/**
 * 作用: 键值对拼接成URL参数
 *  @param: { Object }
 *  @return { Boolean }
 * 
 */
function params2Url(obj) {
     let params = []
     for (let key in obj) {
       params.push(`${key}=${obj[key]}`);
     }
     return encodeURIComponent(params.join('&'))
}

/**
 * 作用: 删除URL中指定参数
 *  @param: { String }
 *  @return { String }
 * 
 */
function funcUrlDel(name) {
  const baseUrl = location.origin + location.pathname + "?";
  const query = location.search.substr(1);
  if (query.indexOf(name) > -1) {
    const obj = {};
    const arr = query.split("&");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      obj[arr[i][0]] = arr[i][1];
    }
    delete obj[name];
    return baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
  }
}

// ======================================= 字符串操作 ==============================================
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
 * 作用: 生成随机字符串
 * @param: { Number } 随机生成的字符串长度 
 * @return { String } 字符串
 */
function randomString(len) {
    let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
    let strLen = chars.length;
    let randomStr = '';
    for (let i = 0; i < len; i++) {
        randomStr += chars.charAt(Math.floor(Math.random() * strLen));
    }
    return randomStr;
}

/**
 * 作用: 字符串首字母大写
 * @param: { String }  
 * @return { String } 
 */
function fistLetterUpper(len) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ======================================= 数组操作 ==============================================
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
            Array.isArray(x) ? flatten(x) : x;
        })
    )
}

/**
 * 作用: 数组乱序
 * @param: { Array } 
 * @return { Array } 乱序后的数组
 */
function arrScrambling(arr) {
    for (let i = 0; i < arr.length; i++) {
      const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
}

/**
 * 作用: 数组中获取随机数
 * @param: { Array } 
 * @return { Number } item
 */
function sample(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// ======================================= 节流防抖 ==============================================
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

// ======================================= 数据类型检测 ==============================================
/**
 * 作用: 数据类型检测
 * @param: { data } 任意数据
 * @return data type 
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

// ======================================= 数字操作 ==============================================
/**
 * 作用: 生成指定范围内的随机数
 * @param: { Number } 
 * @return 随机数
 */
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 作用: 数字千分位分隔
 * @param: { Number } 
 * @return { String } 分割好的字符串
 */
function format(n) {
    let num = n.toString();
    let len = num.length;
    if(len <= 3) {
        return num;
    } else {
        let temp = ''
        let remainder = len % 3;
        if(remainder > 0 ) {
            // 不是3的整倍数
            return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp;
        } else {
            // 是3的整倍数
             return num.slice(0, len).match(/\d{3}/g).join(',') + temp; 
        }
    }
}

// ======================================= 工具类 ==============================================
/**
 * 作用: 手机号中间四位变成*
 * @param: { Number | String }  
 * @return { String } 
 */
function telFormat(tel) {
    typeof tel !== 'string' ? String(tel) : null; 
    return tel.substr(0,3) + "****" + tel.substr(7);
}

/**
 * 作用: 驼峰命名转换成短横线命名
 * @param: { String }  
 * @return { String } 
 */
function getKebabCase(str) {
    return str.replace(/[A-Z]/g, (item) => '-' + item.toLowerCase())
}

/**
 * 作用: 短横线命名转换成驼峰命名
 * @param: { String }  
 * @return { String } 
 */
function getCamelCase(str) {
    return str.replace( /-([a-z])/g, (i, item) => item.toUpperCase())
}

/**
 * 作用: 全角转换为半角
 * @param: { String }  
 * @return { String } 
 */
function toCDB(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code >= 65281 && code <= 65374) {
      result += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else if (code == 12288) {
      result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}

/**
 * 作用: 半角转换为全角
 * @param: { String }  
 * @return { String } 
 */
function toDBC(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code >= 33 && code <= 126) {
      result += String.fromCharCode(str.charCodeAt(i) + 65248);
    } else if (code == 32) {
      result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}

/**
 * 作用: 数字转化为大写金额
 * @param: { Number }  
 * @return { String } 
 */
function digitUppercase(n) {
    const fraction = ['角', '分'];
    const digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    const unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    n = Math.abs(n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
}

/**
 * 作用: 校验身份证号码
 * @param: { Number } 
 * @return { Boolean } 
 */
function checkCardNo(value) {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(value);
}

/**
 * 作用: 校验是否包含中文
 * @param: { String } 
 * @return { Boolean } 
 */
function haveCNChars(value) {
    return /[\u4e00-\u9fa5]/.test(value);
}

/**
 * 作用: 校验是否为中国大陆的邮政编码
 * @param: { Number } 
 * @return { Boolean } 
 */
function isPostCode(value) {
    return /^[1-9][0-9]{5}$/.test(value.toString());
}

/**
 * 作用: 校验是否为IPv6地址
 * @param: { String } 
 * @return { Boolean } 
 */
function isIPv6(str) {
     return Boolean(str.match(/:/g)
        ?str.match(/:/g).length<=7:false && /::/.test(str)?/^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str)
        :/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str));
}

/**
 * 作用: 校验是否为邮箱地址
 * @param: { String } 
 * @return { Boolean } 
 */
function isEmail(value) {
     return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
}

/**
 * 作用: 校验是否为中国大陆手机号
 * @param: { String } 
 * @return { Boolean } 
 */
function isTel(value) {
     return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value.toString());
}

/**
 * 作用: 校验是否包含emoji表情
 * @param: { String } 
 * @return { Boolean } 
 */
function isEmojiCharacter(value) {
   value = String(value);
    for (let i = 0; i < value.length; i++) {
        const hs = value.charCodeAt(i);
        if (0xd800 <= hs && hs <= 0xdbff) {
            if (value.length > 1) {
                const ls = value.charCodeAt(i + 1);
                const uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                if (0x1d000 <= uc && uc <= 0x1f77f) {
                    return true;
                }
            }
        } else if (value.length > 1) {
            const ls = value.charCodeAt(i + 1);
            if (ls == 0x20e3) {
                return true;
            }
        } else {
            if (0x2100 <= hs && hs <= 0x27ff) {
                return true;
            } else if (0x2B05 <= hs && hs <= 0x2b07) {
                return true;
            } else if (0x2934 <= hs && hs <= 0x2935) {
                return true;
            } else if (0x3297 <= hs && hs <= 0x3299) {
                return true;
            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                    || hs == 0x2b50) {
                return true;
            }
        }
    }
   return false;
}

/**
 * 作用: 校验是否为中国大陆手机号
 * @param: { String } 
 * @return { Boolean } 
 */
function isTel(value) {
     return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value.toString());
}

/**
 * 作用: 滚动到页面顶部
 * @param: { Null } 
 * @return { Null } 
 */
function scrollToTop() {
  const height = document.documentElement.scrollTop || document.body.scrollTop;
  if (height > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, height - height / 8);
  }
}

/**
 * 作用: 滚动到页面底部
 * @param: { Null } 
 * @return { Null } 
 */
function scrollToBottom() {
    window.scrollTo(0, document.documentElement.clientHeight);  
}

/**
 * 作用: 滚动到指定元素区域
 * @param: { Element } 
 * @return { Null } 
 */
function smoothScroll(element) {
    document.querySelector(element).scrollIntoView({
        behavior: 'smooth'
    });
}

/**
 * 作用: 获取可视窗口高度
 * @param: { Null } 
 * @return { String } 
 */
function getClientHeight() {
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
}

/**
 * 作用: 获取可视窗口宽度
 * @param: { Null } 
 * @return { String } 
 */
function smoothScroll(element) {
    return (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth;
}

/**
 * 作用: 打开浏览器全屏
 * @param: { Null } 
 * @return { Null } 
 */
function smoothScroll(element) {
    let element = document.body;
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen()
    }
}

/**
 * 作用: 退出浏览器全屏
 * @param: { Null } 
 * @return { Null } 
 */
function smoothScroll(element) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
}

// ======================================= 本地存储 ==============================================
/**
 * 作用: 存储loalStorage
 * @param: { String }
 * @param: { String }  
 * @return { Null } 
 */
function loalStorageSet(key , value) {
    if(!key) return;
    if(typeof value !== 'string') {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
}

/**
 * 作用: 获取localStorage
 * @param: { String } 
 * @return { String } 
 */
function loalStorageGet(key) {
    if(!key) return;
    return window.localStorage.getItem(key);
}

/**
 * 作用: 删除localStorage
 * @param: { String } 
 * @return { Null } 
 */
function loalStorageRemove(key) {
    if(!key) return;
    window.localStorage.removeItem(key);
}