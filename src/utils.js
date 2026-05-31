/**
 * Utility functions — A collection of common JavaScript utilities
 *
 * @Author: Jie.Yang
 * @Date: 2020-09
 * @Refactored: 2026-05
 */

// ======================================= Time Formatting =============================================

/**
 * Format a date string to "YYYY-MM-DD HH:mm:ss" format
 * @param {string} date - Date string, e.g. "2019-10-28"
 * @returns {string} Formatted date string
 */
function formatDate(date) {
  if (date && typeof date === 'string') {
    date = date.replace(/(-|\.)/g, '/')
    date = new Date(date)
  } else {
    throw TypeError('Must be a String like "2019-1-12 12:2:23"')
  }

  const zero = (val) => (val < 10 ? '0' + val : val)

  return (
    date.getFullYear() +
    '-' +
    zero(date.getMonth() + 1) +
    '-' +
    zero(date.getDate()) +
    ' ' +
    zero(date.getHours()) +
    ':' +
    zero(date.getMinutes()) +
    ':' +
    zero(date.getSeconds())
  )
}

// ======================================= Object Operations ===========================================

/**
 * Deep clone an object or array
 * @param {Object|Array} source - Source to clone
 * @returns {Object|Array} Cloned copy
 */
function objDeepCopy(source) {
  const sourceCopy = source instanceof Array ? [] : {}
  for (const item in source) {
    if (Object.prototype.hasOwnProperty.call(source, item)) {
      sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item]
    }
  }
  return sourceCopy
}

// ======================================= Environment / Device Detection ===============================

/**
 * Check if running in browser or Node.js
 * @returns {string} 'Browser' or 'Node'
 */
function isJavaScript() {
  return typeof window === 'undefined' ? 'Node' : 'Browser'
}

/**
 * Check if device is mobile or desktop
 * @returns {string} 'mobile' or 'desktop'
 */
function isMobile() {
  return /iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone/i.test(navigator.userAgent)
    ? 'mobile'
    : 'desktop'
}

/**
 * Check if device is Apple mobile (iPhone, iPad, iPod)
 * @returns {boolean}
 */
function isAppleMobileDevice() {
  return /iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase())
}

/**
 * Check if device is Android
 * @returns {boolean}
 */
function isAndroidMobileDevice() {
  return /android/i.test(navigator.userAgent.toLowerCase())
}

/**
 * Detect OS type: Windows or Mac
 * @returns {string} 'windows', 'mac', or 'unknown'
 */
function getOS() {
  const ua = navigator.userAgent.toLowerCase()
  if (/win64|wow64|win32|wow32/i.test(ua)) return 'windows'
  if (/macintosh|mac os x/i.test(navigator.userAgent)) return 'mac'
  return 'unknown'
}

/**
 * Detect built-in browser (WeChat / QQ)
 * @returns {string|false} 'weixin', 'QQ', or false
 */
function getBuiltInBrowser() {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('micromessenger')) return 'weixin'
  if (ua.includes('qq')) return 'QQ'
  return false
}

/**
 * Detect browser type and version
 * @returns {Object} { type: string, version: number }
 */
function getBrowserInfo() {
  const t = navigator.userAgent.toLowerCase()

  if (t.includes('msie')) {
    return { type: 'IE', version: Number(t.match(/msie ([\d]+)/)[1]) }
  }
  if (/trident\/.+?rv:(([\d.]+))/.test(t)) {
    return { type: 'IE', version: 11 }
  }
  if (t.includes('edge')) {
    return { type: 'Edge', version: Number(t.match(/edge\/([\d]+)/)[1]) }
  }
  if (t.includes('firefox')) {
    return { type: 'Firefox', version: Number(t.match(/firefox\/([\d]+)/)[1]) }
  }
  if (t.includes('chrome')) {
    return { type: 'Chrome', version: Number(t.match(/chrome\/([\d]+)/)[1]) }
  }
  if (t.includes('opera')) {
    return { type: 'Opera', version: Number(t.match(/opera.([\d]+)/)[1]) }
  }
  if (t.includes('safari')) {
    return { type: 'Safari', version: Number(t.match(/version\/([\d]+)/)[1]) }
  }
  return { type: t, version: -1 }
}

// ======================================= URL Operations ===============================================

/**
 * Parse URL query string into an object
 * @returns {Object} Key-value pairs from query string
 */
function getQueryStringArgs() {
  const qs = location.search.length > 0 ? location.search.substring(1) : ''
  const args = {}
  if (!qs) return args

  qs.split('&').forEach((item) => {
    const [name, value] = item.split('=')
    if (name) {
      args[decodeURIComponent(name)] = decodeURIComponent(value || '')
    }
  })
  return args
}

/**
 * Convert an object to URL query string
 * @param {Object} obj - Key-value pairs
 * @returns {string} URL-encoded query string
 */
function params2Url(obj) {
  const params = Object.entries(obj).map(([k, v]) => `${k}=${v}`)
  return encodeURIComponent(params.join('&'))
}

/**
 * Delete a parameter from the current URL
 * @param {string} name - Parameter name to remove
 * @returns {string} New URL without the parameter
 */
function funcUrlDel(name) {
  const baseUrl = location.origin + location.pathname + '?'
  const query = location.search.substr(1)
  if (!query.includes(name)) return location.href

  const obj = {}
  query.split('&').forEach((pair) => {
    const [k, v] = pair.split('=')
    obj[k] = v
  })
  delete obj[name]
  return (
    baseUrl +
    JSON.stringify(obj)
      .replace(/[\"\{\}]/g, '')
      .replace(/\:/g, '=')
      .replace(/\,/g, '&')
  )
}

// ======================================= String Operations ============================================

/**
 * Generate a random alphanumeric string
 * @param {number} len - Length of the string
 * @returns {string} Random string
 */
function randomString(len) {
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789'
  let result = ''
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Generate a random string using Math.random base-36 conversion
 * @param {number} len - Length of the string
 * @returns {string} Random string
 */
function getRandomStr(len) {
  let str = ''
  for (; str.length < len; str += Math.random().toString(36).substr(2));
  return str.substr(0, len)
}

/**
 * Find the most frequent character in a string
 * @param {string} str - Input string
 * @returns {Object|false} { maxChar, maxNum } or false if input is invalid
 */
function getMostFrequentChar(str) {
  if (typeof str !== 'string') return false

  const obj = {}
  for (const char of str) {
    obj[char] = (obj[char] || 0) + 1
  }

  let maxChar = ''
  let maxNum = 0
  for (const [char, count] of Object.entries(obj)) {
    if (count > maxNum) {
      maxChar = char
      maxNum = count
    }
  }
  return { maxChar, maxNum }
}

/**
 * Capitalize the first letter of a string
 * @param {string} str - Input string
 * @returns {string} String with first letter uppercased
 */
function firstLetterUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// ======================================= Array Operations =============================================

/**
 * Merge array items by id, combining price into an array
 * @param {Array} arr - Array of objects with id and price
 * @returns {Array} Merged array
 */
function mergeArr(arr) {
  const newArr = []
  arr.forEach((item) => {
    const existing = newArr.find((n) => n.id === item.id)
    if (existing) {
      existing.price = Array.isArray(existing.price) ? [...existing.price, item.price] : [existing.price, item.price]
    } else {
      newArr.push({ ...item })
    }
  })
  return newArr
}

/**
 * Flatten a nested array
 * @param {Array} arr - Nested array
 * @returns {Array} Flattened array
 */
function flatten(arr) {
  return [].concat(...arr.map((x) => (Array.isArray(x) ? flatten(x) : x)))
}

/**
 * Shuffle an array (Fisher-Yates algorithm)
 * @param {Array} arr - Array to shuffle
 * @returns {Array} Shuffled array
 */
function arrScrambling(arr) {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i
    ;[arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
  }
  return arr
}

/**
 * Get a random element from an array
 * @param {Array} arr - Input array
 * @returns {*} Random element
 */
function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ======================================= Throttle & Debounce =========================================

/**
 * Throttle a function (limit execution rate)
 * @param {Function} fn - Function to throttle
 * @param {number} delay - Minimum interval in ms (default: 60)
 * @returns {Function} Throttled function
 */
function throttle(fn, delay = 60) {
  let lock = false
  return (...args) => {
    if (lock) return
    fn(...args)
    lock = true
    setTimeout(() => {
      lock = false
    }, delay)
  }
}

/**
 * Debounce a function (delay execution until after a pause)
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Wait time in ms (default: 300)
 * @returns {Function} Debounced function
 */
function debounce(fn, delay = 300) {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

// ======================================= Type Detection ===============================================

/**
 * Detect the data type of a value
 * @param {*} data - Any value
 * @returns {string} Type name in lowercase
 */
function typeCheck(data) {
  if (data instanceof Element) return 'element'
  return Object.prototype.toString
    .call(data)
    .replace(/\[object\s(.+)\]/, '$1')
    .toLowerCase()
}

// ======================================= Number Operations ============================================

/**
 * Generate a random integer in a range [min, max]
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Format a number with thousands separators
 * @param {number} n - Number to format
 * @returns {string} Formatted string
 */
function formatNumber(n) {
  const num = n.toString()
  const len = num.length
  if (len <= 3) return num

  const remainder = len % 3
  const parts = num.slice(remainder, len).match(/\d{3}/g)
  if (remainder > 0) {
    return num.slice(0, remainder) + ',' + parts.join(',')
  }
  return parts.join(',')
}

// ======================================= Utility Functions ============================================

/**
 * Mask the middle 4 digits of a phone number
 * @param {number|string} tel - Phone number
 * @returns {string} Masked phone number (e.g. 138****1234)
 */
function telFormat(tel) {
  const s = String(tel)
  return s.substr(0, 3) + '****' + s.substr(7)
}

/**
 * Convert camelCase to kebab-case
 * @param {string} str - camelCase string
 * @returns {string} kebab-case string
 */
function getKebabCase(str) {
  return str.replace(/[A-Z]/g, (item) => '-' + item.toLowerCase())
}

/**
 * Convert kebab-case to camelCase
 * @param {string} str - kebab-case string
 * @returns {string} camelCase string
 */
function getCamelCase(str) {
  return str.replace(/-([a-z])/g, (_i, item) => item.toUpperCase())
}

/**
 * Convert full-width characters to half-width
 * @param {string} str - Full-width string
 * @returns {string} Half-width string
 */
function toCDB(str) {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i)
    if (code >= 65281 && code <= 65374) {
      result += String.fromCharCode(code - 65248)
    } else if (code === 12288) {
      result += String.fromCharCode(code - 12288 + 32)
    } else {
      result += str.charAt(i)
    }
  }
  return result
}

/**
 * Convert half-width characters to full-width
 * @param {string} str - Half-width string
 * @returns {string} Full-width string
 */
function toDBC(str) {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i)
    if (code >= 33 && code <= 126) {
      result += String.fromCharCode(code + 65248)
    } else if (code === 32) {
      result += String.fromCharCode(code + 12288 - 32)
    } else {
      result += str.charAt(i)
    }
  }
  return result
}

/**
 * Convert a number to Chinese uppercase currency format
 * @param {number} n - Amount
 * @returns {string} Chinese uppercase amount string
 */
function digitUppercase(n) {
  const fraction = ['角', '分']
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ]

  n = Math.abs(n)
  let s = ''
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)

  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }

  return s
    .replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整')
}

// ======================================= Validation ===================================================

/**
 * Check if a string is a valid Chinese ID card number
 * @param {number|string} value - ID card number
 * @returns {boolean}
 */
function checkCardNo(value) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
}

/**
 * Check if a string contains Chinese characters
 * @param {string} value - Input string
 * @returns {boolean}
 */
function haveCNChars(value) {
  return /[\u4e00-\u9fa5]/.test(value)
}

/**
 * Check if a string is a valid Chinese postal code
 * @param {number|string} value - Postal code
 * @returns {boolean}
 */
function isPostCode(value) {
  return /^[1-9][0-9]{5}$/.test(value.toString())
}

/**
 * Check if a string is a valid IPv6 address
 * @param {string} str - IPv6 address
 * @returns {boolean}
 */
function isIPv6(str) {
  const hasColons = (str.match(/:/g) || []).length <= 7
  if (!hasColons) return false

  if (/::/.test(str)) {
    return /^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str)
  }
  return /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str)
}

/**
 * Check if a string is a valid email address
 * @param {string} value - Email address
 * @returns {boolean}
 */
function isEmail(value) {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
}

/**
 * Check if a string is a valid Chinese phone number
 * @param {number|string} value - Phone number
 * @returns {boolean}
 */
function isTel(value) {
  return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value.toString())
}

/**
 * Check if a string contains emoji characters
 * @param {string} value - Input string
 * @returns {boolean}
 */
function isEmojiCharacter(value) {
  value = String(value)
  for (let i = 0; i < value.length; i++) {
    const hs = value.charCodeAt(i)
    if (hs >= 0xd800 && hs <= 0xdbff) {
      if (value.length > 1) {
        const ls = value.charCodeAt(i + 1)
        const uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000
        if (uc >= 0x1d000 && uc <= 0x1f77f) return true
      }
    } else {
      if (
        (hs >= 0x2100 && hs <= 0x27ff) ||
        (hs >= 0x2b05 && hs <= 0x2b07) ||
        (hs >= 0x2934 && hs <= 0x2935) ||
        (hs >= 0x3297 && hs <= 0x3299) ||
        [0xa9, 0xae, 0x303d, 0x3030, 0x2b55, 0x2b1c, 0x2b1b, 0x2b50].includes(hs)
      ) {
        return true
      }
    }
  }
  return false
}

// ======================================= Scroll & Viewport ===========================================

/**
 * Smooth scroll to the top of the page
 */
function scrollToTop() {
  const height = document.documentElement.scrollTop || document.body.scrollTop
  if (height > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, height - height / 8)
  }
}

/**
 * Scroll to the bottom of the page
 */
function scrollToBottom() {
  window.scrollTo(0, document.documentElement.clientHeight)
}

/**
 * Smooth scroll to a specific element
 * @param {string} selector - CSS selector of the target element
 */
function smoothScroll(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Get the viewport height
 * @returns {number} Viewport height in pixels
 */
function getClientHeight() {
  const body = document.body
  const html = document.documentElement
  return Math.min(body.clientHeight, html.clientHeight)
}

/**
 * Get the viewport width
 * @returns {number} Viewport width in pixels
 */
function getClientWidth() {
  return (document.compatMode === 'BackCompat' ? document.body : document.documentElement).clientWidth
}

/**
 * Request fullscreen for the document body
 */
function requestFullscreen() {
  const el = document.body
  const fn = el.requestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen || el.webkitRequestFullScreen
  fn.call(el)
}

/**
 * Exit fullscreen mode
 */
function exitFullscreen() {
  const fn =
    document.exitFullscreen ||
    document.msExitFullscreen ||
    document.mozCancelFullScreen ||
    document.webkitExitFullscreen
  fn.call(document)
}

// ======================================= Local Storage ================================================

/**
 * Set a value in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
function localStorageSet(key, value) {
  if (!key) return
  window.localStorage.setItem(key, typeof value !== 'string' ? JSON.stringify(value) : value)
}

/**
 * Get a value from localStorage
 * @param {string} key - Storage key
 * @returns {string|null} Stored value
 */
function localStorageGet(key) {
  if (!key) return null
  return window.localStorage.getItem(key)
}

/**
 * Remove a value from localStorage
 * @param {string} key - Storage key
 */
function localStorageRemove(key) {
  if (!key) return
  window.localStorage.removeItem(key)
}
