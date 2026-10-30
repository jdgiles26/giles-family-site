# The Giles of Adair County, Kentucky

A family-history website for **Joshua Giles**: seven generations, from Elijah Giles (born about 1794 in Virginia) to the present day.

It is a plain static site, made of HTML, CSS and vanilla JavaScript. It has **no build step and no outside services**. Fonts, maps and images are all bundled, so the site works fully offline.

## Pages

| Page | What it is |
|---|---|
| `index.html` | The story. A cinematic scroll through seven generations: parallax hero, chapters, Then & Now, family by the numbers, "On this day", the Kentucky household in Indiana, "Sons and Daughters" stories for all eleven children, and the second branch at Pellyton |
| `tree.html` | Interactive family tree with zoom and pan. Click any person for a profile card. Also has a fan chart, a generation counter, search, an "How am I related?" explorer and a poster download |
| `war.html` | **Rifleman, 9th Infantry.** William Cecil Giles in WWII. Includes a zoomable discharge viewer with 18 annotated hotspots and an animated Normandy route map that ends at 3 Aug 1944 |
| `timeline.html` | A timeline from 1790 to today. Drag it, step with the keys or autoplay it. Family events and world events |
| `places.html` | Offline SVG migration map in six journeys: Virginia → Kentucky → Adair County → Tennessee → Indiana/Ohio → home |
| `census.html` | Census time machine for 1840–1950, with illustrated household cards |
| `quiz.html` | "Ask the Family", a scored 14-question quiz |
| `legend.html` | The Dragging Canoe family legend scroll. It is also hidden as an Easter egg: click the tree logo |
| `poster.html` | Printable tree poster (Print / Save as PDF, or download the SVG) |
| `memories.html` | **Memory Wall.** Family members pin short memories about anyone in the tree (family passcode required; switched on once Blob storage is connected) |
| `sources.html` | Sources & Notes, written in plain language |

Site-wide features:
- Search: the 🔍 button, or press `/` or `Ctrl/⌘+K`.
- Lantern (dark) mode.
- Optional ambient music, generated live with WebAudio and **off by default**.
- Page-turn transitions.
- Share-card generator (PNG), from any profile card.
- `prefers-reduced-motion` is respected.

## Open it locally

Double-click `index.html`, and it works from `file://`.

For the most faithful preview, serve the folder:

```bash
cd giles-family-site
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a new repository on GitHub (for example `giles-family`), then push:
   ```bash
   git remote add origin https://github.com/<you>/giles-family.git
   git branch -M main
   git push -u origin main
   ```
2. On GitHub, go to **Settings → Pages → Build and deployment**. Choose **Deploy from a branch**, then branch `main` and folder `/ (root)`. Save.
3. After a minute the site is live at `https://<you>.github.io/giles-family/`.
   The `.nojekyll` file is already included.

## Deploy to Vercel

**Option A, the dashboard:**
1. Go to **vercel.com → Add New → Project** and import the GitHub repo.
2. Set Framework preset to **Other**. Leave the build command empty and set the output directory to `.` (root).
3. Click **Deploy**.

**Option B, the CLI:**
```bash
npm i -g vercel
cd giles-family-site
vercel        # preview
vercel --prod # production
```

`vercel.json` is included and sets clean caching headers.

## Social previews

`assets/img/og-card.png` (1200×630) is the share image. Some social networks need an absolute URL for `og:image`. After you deploy, you can replace `assets/img/og-card.png` in each page's `<head>` with the full URL, for example `https://<you>.github.io/giles-family/assets/img/og-card.png`.

## Editing the family

- People, relationships and profile text: `assets/js/data.js`
- Timeline events, census households and quiz questions: `assets/js/stories.js`
- Discharge hotspots and the Normandy route: `assets/js/war.js`
- Journeys on the map: `assets/js/places.js`
- `tools/make_art.py` regenerates the decorative ridge artwork in `assets/js/art.js`.

Living family members appear by first name and family role only.

## Family editing (shared, live)

Anyone in the family can add, change, or delete people, and the change is saved for every visitor.

- **Open the editor:** on the Family Tree page, tap **✎ Edit family**, or tap **✎ Edit this person** on any profile card.
- **Passcode:** there is one shared family passcode. It's checked on the server (env var `FAMILY_PASSCODE`) and limited to 5 wrong tries per 15 minutes. Anyone can view the site without it. The owner keeps the passcode in `.family-passcode.txt`, which is gitignored and never committed.
- **What you can do:** add a person; edit their name, dates, places, role, story and facts; link parents, spouses and children; upload a photo (it's shrunk on the phone first); or delete a person (you're asked to confirm).
- **History and undo:** every save records who made it, when, and what changed. Use **Change history & undo** to put back any earlier version, or the original tree. A restore is itself a new version, so you can undo it too.
- **Privacy:** for living people, the server removes birth and death dates, places and cities. Show them by first name and family role only.

### Storage
Saved trees go in **Vercel Blob**: every save is a new, unchangeable JSON version. If the API can't be reached, pages fall back to the tree bundled in `assets/js/data.js`.
To switch on saving, open the Vercel dashboard → **Storage** → **Create** → **Blob**, connect the store to project `giles-family` (this sets `BLOB_READ_WRITE_TOKEN`), then redeploy. Until then the site is view-only, and saving shows a "not switched on yet" message.

### Local development
```bash
npm install
FAMILY_PASSCODE=your-test-passcode npm run dev   # http://localhost:3000, data saved in /tmp/giles-store
npm run seed    # rebuild api/_lib/seed.json after you edit assets/js/data.js
```

## Corrections log

See `FACTCHECK.md` (factual corrections and their sources) and `CHANGES-respect.md` (wording changes, before and after). The WWII discharge papers were kept by Aunt Alice (Giles) Poynter and given to Joshua.
