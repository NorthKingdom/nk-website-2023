/**
 * This script detects WebP support, and adds a "nowebp" class to the body element
 * if support is not present.
 *
 * It uses two detections:
 * 1) The first quick and synchroneous one checks if the browser
 *    can encode a canvas into a WebP Data URL. It returns true right away on Chrome.
 * 2) The second longer and asynchroneous one checks if the browser
 *    can decode a lossy image WebP Data URL. It returns true on all browsers that
 *    actually support WebP.
 *
 * Tested on:
 * 1) WebP supported (no class added): Chrome, Safari (Big Sur+), iOS 14+ Safari, Firefox, MS Edge 18+
 * 2) WebP not supported (class added): iOS 13.x- Safari, MacOS Safari (older than Big Sur), IE 11, MS Edge 17-
 * See: https://caniuse.com/?search=webp
 **/

const webp_support_level = 'lossy' // Change this to "alpha" or "animation" if required.
const isSSR = typeof window === 'undefined'
// Quick WebP detection support (check encoding): reports synchroneously true on most browsers, except Safari
function check_webp_decoding() {
  if (isSSR) return false
  const elem = document.createElement('canvas')
  if (!!(elem.getContext && elem.getContext('2d'))) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0
  }
  return false
}
// Long WebP detection (check decoding): reports asynchroneously true on all browsers, that's the method used by Google
export function checkWebpSupport(feature: any, callback: (...args: any[]) => void) {
  if (isSSR) return callback(false)
  const kTestImages = {
    lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    alpha:
      'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
    animation:
      'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
  }
  const img = new Image()
  img.onload = function () {
    const result = img.width > 0 && img.height > 0
    callback(feature, result)
  }
  img.onerror = function () {
    callback(feature, false)
  }
  img.src = 'data:image/webp;base64,' + kTestImages[feature as keyof typeof kTestImages]
}

if (!isSSR && !check_webp_decoding()) {
  checkWebpSupport(webp_support_level, function (feature, isSupported) {
    if (!isSupported) {
      // console.info('WebP: Unsupported (long method)')
      document.body.classList.add('nowebp')
    } else {
      // console.info('WebP: Supported (long method)')
    }
  })
} else {
  // console.info('WebP: Supported (quick method)')
}
