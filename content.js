// YouTube is a single-page app, so /shorts/ is caught on every in-app navigation, not only on page load
const SHORTS_PATH = /^\/shorts\/([A-Za-z0-9_-]{6,})/

// Several triggers (page load, YouTube's navigation events, the periodic check) can fire for one navigation.
// Stop only once, or the stop page loads several times and inflates the try count.
let isStopping = false

// location.replace, so the Back button can't return to the Short
const stop = videoId => {
  if (isStopping) {
    return
  }

  isStopping = true
  const blocked = new URL(chrome.runtime.getURL('blocked.html'))
  blocked.searchParams.set('v', videoId)
  location.replace(blocked.href)
}

const stopIfShorts = () => {
  const match = location.pathname.match(SHORTS_PATH)

  if (match !== null) {
    stop(match[1])
  }
}

// Intercept clicks on Shorts links before YouTube navigates
document.addEventListener(
  'click',
  event => {
    const link = event.target instanceof Element ? event.target.closest('a[href*="/shorts/"]') : null

    if (link === null) {
      return
    }

    const match = new URL(link.href, location.href).pathname.match(SHORTS_PATH)

    if (match !== null) {
      event.preventDefault()
      event.stopImmediatePropagation()
      stop(match[1])
    }
  },
  true,
)

// On load, on YouTube's own navigation, on Back/Forward, and a periodic check for any other URL change
stopIfShorts()
document.addEventListener('yt-navigate-start', stopIfShorts)
document.addEventListener('yt-navigate-finish', stopIfShorts)
window.addEventListener('popstate', stopIfShorts)
setInterval(stopIfShorts, 500)
