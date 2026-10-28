"""Build the store upload: dist/so-tired-of-scrolling-<version>.zip

    python tools/package.py

Only the files the extension uses go in (no docs/, tools/ or .git), plus the licence and notices.
Chrome Web Store and Edge Add-ons both take this same zip.
"""
import json
import os
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILES = [
    "manifest.json",
    "content.js", "hide.css",
    "ig.js", "ig-hide.css",
    "blocked.html", "blocked.js",
    "icons/face.svg", "icons/icon-16.png", "icons/icon-32.png", "icons/icon-48.png", "icons/icon-128.png",
    "LICENSE", "THIRD_PARTY_NOTICES.md",
]


def main():
    with open(os.path.join(ROOT, "manifest.json"), encoding="utf-8") as f:
        manifest = json.load(f)
    # Everything the manifest points at must be in the zip
    wanted = set(manifest.get("icons", {}).values())
    for cs in manifest.get("content_scripts", []):
        wanted.update(cs.get("js", []) + cs.get("css", []))
    for war in manifest.get("web_accessible_resources", []):
        wanted.update(war.get("resources", []))
    missing = wanted - set(FILES)
    if missing:
        raise SystemExit(f"manifest uses files not in FILES: {sorted(missing)}")

    os.makedirs(os.path.join(ROOT, "dist"), exist_ok=True)
    out = os.path.join(ROOT, "dist", f"so-tired-of-scrolling-{manifest['version']}.zip")
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        for name in FILES:
            z.write(os.path.join(ROOT, name), name)
    print(f"wrote {os.path.relpath(out, ROOT)} ({os.path.getsize(out):,} bytes, {len(FILES)} files)")


if __name__ == "__main__":
    main()
