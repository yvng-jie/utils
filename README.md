# utils

> A collection of common JavaScript utility functions.

## Functions

### Time
- `formatDate(date)` — Format date to "YYYY-MM-DD HH:mm:ss"

### Object
- `objDeepCopy(source)` — Deep clone an object or array

### Device Detection
- `isMobile()` — Check if mobile device
- `isAppleMobileDevice()` — Check if Apple mobile
- `isAndroidMobileDevice()` — Check if Android
- `getOS()` — Detect Windows/Mac
- `getBrowserInfo()` — Detect browser type and version
- `getBuiltInBrowser()` — Check WeChat/QQ browser

### URL
- `getQueryStringArgs()` — Parse query string to object
- `params2Url(obj)` — Object to query string
- `funcUrlDel(name)` — Remove param from URL

### String
- `randomString(len)` — Generate random string
- `getMostFrequentChar(str)` — Find most frequent character
- `firstLetterUpper(str)` — Capitalize first letter

### Array
- `mergeArr(arr)` — Merge array items by id
- `flatten(arr)` — Flatten nested array
- `arrScrambling(arr)` — Shuffle array
- `sample(arr)` — Get random element

### Performance
- `throttle(fn, delay)` — Throttle function calls
- `debounce(fn, delay)` — Debounce function calls

### Number
- `formatNumber(n)` — Thousands separator
- `digitUppercase(n)` — Number to Chinese currency

### Validation
- `isEmail(value)` — Validate email
- `isTel(value)` — Validate Chinese phone
- `isIPv6(str)` — Validate IPv6 address
- `isEmojiCharacter(value)` — Check for emoji
- `checkCardNo(value)` — Validate Chinese ID card

### Scroll
- `scrollToTop()` — Scroll to top
- `smoothScroll(selector)` — Scroll to element
- `requestFullscreen()` — Enter fullscreen
- `exitFullscreen()` — Exit fullscreen

### Storage
- `localStorageSet(key, value)` — Set localStorage
- `localStorageGet(key)` — Get localStorage
- `localStorageRemove(key)` — Remove from localStorage
