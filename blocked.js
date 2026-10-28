// Stop page: counts today's tries; after a 10 s wait, "Watch just this one" opens that one video
// in the normal player (no swiping to the next one).
const WAIT_SECONDS = 10
const params = new URLSearchParams(location.search)
const videoId = params.get('v')
// YouTube Shorts (default) or Instagram Reels. Both share one daily count: it's the same habit.
const site = params.get('site') === 'ig' ? 'ig' : 'yt'
// One reel alone, as a post: no swipe-to-next feed after it
const watchUrl = id =>
  site === 'ig'
    ? `https://www.instagram.com/p/${encodeURIComponent(id)}/`
    : `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`

document.getElementById('what').textContent = 'Shorts & Reels'

const today = () => new Date().toLocaleDateString('sv-SE')

const countThisTry = async () => {
  const { day, tries } = await chrome.storage.local.get(['day', 'tries'])
  const next = day === today() ? (tries ?? 0) + 1 : 1
  await chrome.storage.local.set({ day: today(), tries: next })

  return next
}

countThisTry().then(tries => {
  document.getElementById('count').textContent = String(tries)
})

document.getElementById('close').addEventListener('click', () => {
  window.close()
  // If the tab can't be closed (e.g. it's the last one), leave the site instead
  setTimeout(() => location.replace('about:blank'), 200)
})

const watch = document.getElementById('watch')

if (videoId === null) {
  watch.remove()
} else {
  let left = WAIT_SECONDS
  const tick = setInterval(() => {
    left -= 1

    if (left > 0) {
      watch.textContent = `Watch just this one (${left})`

      return
    }

    clearInterval(tick)
    watch.textContent = 'Watch just this one'
    watch.disabled = false
  }, 1000)

  watch.addEventListener('click', () => {
    location.replace(watchUrl(videoId))
  })
}
