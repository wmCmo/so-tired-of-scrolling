// Instagram is a single-page app too: catch Reels and Explore on load, on in-app navigation and on link clicks.
// /reel/<code>/ is one reel (can be watched alone as a post); /reels/ is the endless feed; /explore/ is the grid feed.
const IG_REEL = /^\/reels?\/([A-Za-z0-9_-]{5,})/
const IG_FEED = /^\/(reels|explore)(\/|$)/

let isStopping = false

const stop = code => {
  if (isStopping) {
    return
  }

  isStopping = true
  const blocked = new URL(chrome.runtime.getURL('blocked.html'))
  blocked.searchParams.set('site', 'ig')
  if (code) {
    blocked.searchParams.set('v', code)
  }
  location.replace(blocked.href)
}

// Returns the reel code, '' for a feed with no single reel, or null when the path is fine
const blockedTarget = pathname => {
  const reel = pathname.match(IG_REEL)
  if (reel !== null && reel[1] !== 'audio') {
    return reel[1]
  }

  return IG_FEED.test(pathname) ? '' : null
}

const stopIfReels = () => {
  const target = blockedTarget(location.pathname)

  if (target !== null) {
    stop(target)
  }
}

document.addEventListener(
  'click',
  event => {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null
    if (link === null) {
      return
    }

    const url = new URL(link.href, location.href)
    if (url.hostname !== location.hostname) {
      return
    }

    const target = blockedTarget(url.pathname)
    if (target !== null) {
      event.preventDefault()
      event.stopImmediatePropagation()
      stop(target)
    }
  },
  true,
)

stopIfReels()
window.addEventListener('popstate', stopIfReels)
setInterval(stopIfReels, 500)
