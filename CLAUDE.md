# CLAUDE.md

Personal project: artifacts in English. Published as **"I'm so tired of scrolling"** (repo `wmCmo/so-tired-of-scrolling`, site on GitHub Pages from `main` `/docs`).

## Don't rename this folder
The folder is still `no-shorts` on purpose: Zach loads it as an unpacked extension, and moving it would change the extension ID and reset its daily counter.

## Testing
- E2E: launch headless Edge with a temp `--user-data-dir` and `--load-extension`, and drive it over CDP.
- Use a **real** Shorts id — a non-Shorts id gets a 303 to `/watch` and tests nothing.
- Kill the whole Edge process tree afterwards (`taskkill /T /F`, and wait for it), or the next run attaches to the stale browser.
- Instagram's `/reels/` can't be tested logged out (it redirects to login first). The logged-in nav hiding is unverified.
- Headless Edge `--screenshot` captures before SVGs and images load: use a DevTools-protocol script instead.

## Releasing
- `python tools/package.py` builds `dist/so-tired-of-scrolling-<version>.zip`.
- When the store listings go live, fill `STORES = { edge, chrome }` in `docs/index.html` (the buttons say "coming soon" until then). Store submission is Zach's: he has to create the accounts.
- The icon is Fluent Emoji (MIT): keep `THIRD_PARTY_NOTICES.md` in the repo and the zip.

Push as wmCmo, then switch back: `~/.claude/memory/gh-two-accounts-active-one-flips.md`.
