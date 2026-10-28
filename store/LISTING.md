# Store listing (copy-paste)

Same text for Edge Add-ons (Partner Center) and the Chrome Web Store.

Upload: `dist/so-tired-of-scrolling-<version>.zip` (build it with `python tools/package.py`).

## Name

I'm so tired of scrolling

## Short description / summary (≤ 132 characters)

Stop the endless scroll on YouTube Shorts and Instagram Reels. A pause, a daily count, and one video if you really mean it.

## Description

You open YouTube for one thing and look up forty minutes later, deep in Shorts. This extension catches you right
before that happens.

WHAT IT DOES
• Opening a YouTube Short or an Instagram Reel shows a calm stop page instead: "Not today.", how many times you've
  tried today, and one question: what were you about to do?
• Still want it? After 10 seconds, "Watch just this one" opens that single video, in the normal YouTube player or as
  a single Instagram post. No swipe, no next, no feed after it.
• The ways in are hidden: Shorts shelves, the Shorts tab and Shorts in search results on YouTube; the Reels and
  Explore buttons on Instagram.
• Everything else is left alone: normal videos, subscriptions, your Instagram feed, posts, profiles and DMs.

NOT A PRISON, JUST A PAUSE
A wall you resent gets uninstalled. The urge lasts a few seconds; a pause and a counter are usually enough to break it.

PRIVATE BY DESIGN
• No data collected, no analytics, no accounts, no ads.
• It stores only today's date and today's try count, in your browser.
• Free and open source (MIT): https://github.com/wmCmo/so-tired-of-scrolling

Website: https://wmcmo.github.io/so-tired-of-scrolling/

## Category

Productivity (Chrome: "Productivity → Workflow & Planning" if asked; Edge: "Productivity")

## Language

English

## Links

- Website / homepage: https://wmcmo.github.io/so-tired-of-scrolling/
- Support: https://github.com/wmCmo/so-tired-of-scrolling/issues
- Privacy policy: https://wmcmo.github.io/so-tired-of-scrolling/privacy.html

## Images (in this folder)

| Asset | File | Store |
|---|---|---|
| Icon 128×128 | `../icons/icon-128.png` (also inside the zip) | both |
| Logo 300×300 | `logo-300.png` | Edge |
| Screenshot 1280×800 | `screenshot-1280x800.png` | both |
| Small promo tile 440×280 | `promo-440x280.png` | Chrome |

## Privacy / permission answers

- **Single purpose:** Interrupts the habit of endlessly scrolling YouTube Shorts and Instagram Reels by showing a stop
  page, and hides the links into them.
- **storage:** Keeps today's date and today's count of stop-page visits, so the stop page can show "tries today". Stored
  locally; never transmitted.
- **Host access (content scripts on youtube.com and instagram.com):** Needed to recognise Shorts, Reels and Explore pages,
  redirect them to the stop page, and hide their links. No page content is read, stored or sent anywhere.
- **Remote code:** No. All code ships in the package.
- **Data collection:** None of the listed data types are collected.
- I certify the data usage complies with the developer programme policies: yes (nothing is collected).
