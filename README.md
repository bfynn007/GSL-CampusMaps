# Ghana School of Law — Campus Maps

Interactive maps of the five Ghana School of Law campuses. A student opens the
site, picks their campus, and finds the lecture hall, library, canteen or exam
venue without having to ask anyone.

Static HTML, CSS and JavaScript. No build step, no dependencies, no backend.

## Status

All five campus maps are live.

| Campus | Location | Classes | Map style | Building artwork |
|---|---|---|---|---|
| Makola | Accra | Pre-Bar, Part II, Post Call | traced footprints | — (uses room lists) |
| KNUST | Kumasi | Pre-Bar, Part II | precinct | 3 of 3 drawn |
| GIMPA | Accra | Pre-Bar, Part II | precinct | 0 of 7 drawn |
| UPSA | Accra | Part II | precinct | none planned |
| ACCE | Accra | Pre-Bar | precinct | none planned |

See [Known gaps](#known-gaps) for what the missing artwork means in practice.

## Requirements

### Browser

The site targets browsers from 2022 onward:

| Browser | Minimum |
|---|---|
| Chrome / Edge | 88 |
| Firefox | 89 |
| Safari (macOS / iOS) | 15.4 |

That floor is set by the CSS the layout depends on — `aspect-ratio`,
`:focus-visible`, `inset`, `clamp()`, custom properties and grid. Below it the
pages still render, but panels and cards will be mis-sized.

**JavaScript must be enabled.** Pins, the search dropdown and the details cards
are all built at runtime from the campus data file; with scripting off a map
page shows its plan image and nothing else.

Three features are progressive enhancements and degrade quietly where they are
missing, so they do not raise the floor:

- `text-wrap: balance` on headings and pin labels (Chrome 114, Firefox 121,
  Safari 17.5) — lines simply break less evenly without it.
- `backdrop-filter` on the sticky header — the header already carries a 90%
  opaque background underneath.
- `IntersectionObserver`, used to stop animations off screen. Guarded with a
  feature check; without it the pointers keep looping.

### Hosting

Any static file host. There is no server-side code, no database, no API key and
no environment configuration — upload the folder as it stands.

The pages also open directly from disk over `file://`, which is why scripts are
classic scripts rather than ES modules (see [Conventions](#conventions)).

### Development

A text editor. Nothing is compiled, installed or generated, so there is no
package manager, lockfile or toolchain to set up.

## Pages

```
index.html                  landing page — hero, and the link into the directory
campuses.html               the campus directory, built from assets/data/campuses.js
makola-campus-map.html      Makola campus, Accra
gimpa-campus-map.html       GIMPA campus, Accra
knust-campus-map.html       KNUST campus, Kumasi
upsa-campus-map.html        UPSA campus, Accra
acce-campus-map.html        ACCE campus, Accra
```

`index.html` is static markup. `campuses.html` is where a campus without a map
is handled: an entry whose `href` is `null` is listed in the upcoming panel
rather than linked, so it never renders as a dead link.

## Project layout

```
assets/
  css/
    base.css                design tokens, reset, page shell   (every page)
    home.css                the landing page                   (index only)
    campuses.css            the campus directory               (campuses only)
    map.css                 the shared map shell               (all 5 map pages)
    map-makola.css          traced footprints, service layers  (Makola only)
    map-precinct.css        halos, landmark labels             (all but Makola)
  js/
    icons.js                inline SVG icon set
    map-core.js             behaviour shared by all map pages
    home.js                 pauses the hero animation off screen
    campus-list.js          builds the campus directory
    makola-map.js           the Makola page controller
    precinct-map.js         the controller for all but Makola (one file, 4 pages)
  data/
    campuses.js             the campus list on campuses.html
    makola.js               Makola buildings, rooms and services
    gimpa.js                GIMPA venues
    knust.js                KNUST venues and landmark labels
    upsa.js                 UPSA venues
    acce.js                 ACCE venues
  img/
    makola/ gimpa/ knust/   campus plans and building illustrations
    upsa/ acce/
```

**Content lives in `assets/data/`, behaviour lives in `assets/js/`.** Adding a
building or fixing a room name means editing one data file and nothing else.

## Architecture

### The two kinds of map

| | Makola | Every other campus |
|---|---|---|
| Buildings marked by | traced polygon footprints | a soft halo under the pointer |
| Coordinates | pixels in the plan's own space | percentages of the plan image |
| Dropdown | searches buildings **and** rooms | lists venues |
| Extras | clinic and washroom overlay layers | class times, photo, GPS link |

GIMPA, KNUST, UPSA and ACCE are the same page driven by different data, so they
share `precinct-map.js` and `map-precinct.css`. Makola is different enough to
warrant its own controller, but still uses the shared shell.

### The `GSL` global

One global, `window.GSL`, is the whole public surface:

| Key | Set by | Holds |
|---|---|---|
| `GSL.icons` | `icons.js` | the inline SVG icon set |
| `GSL.campuses` | `data/campuses.js` | the campus list, for the directory |
| `GSL.campus` | the one loaded `data/<campus>.js` | that page's places |
| `GSL.map` | `map-core.js` | the shared map helpers |

`GSL.map` exposes `esc`, `pinHtml`, `createDropdown`, `createLabelsToggle`,
`placeCard`, `replayEntrance`, `pauseWhenOffscreen`, `delegatePlaceEvents` and
the `SHEET_BREAKPOINT` constant.

### Stylesheet order

Order matters — each page loads them most-general first:

```
base.css  →  map.css  →  map-makola.css | map-precinct.css
base.css  →  home.css
base.css  →  campuses.css
```

The variant stylesheet overrides a small number of shared values (panel width,
chip width, card padding, close button). Keep it that way: put anything used by
more than one map page in `map.css`.

## Conventions

- **No build step.** Scripts are plain classic scripts loaded with `defer`, not
  ES modules. Modules are blocked by CORS on `file://`, which would stop the
  pages opening straight from disk.
- **ES5 syntax.** The JavaScript uses `var` and IIFEs throughout — no arrow
  functions, `const`/`let`, template literals or optional chaining. Nothing
  transpiles the code, so what is written is what ships.
- **One global, `window.GSL`.** Each file adds to it; no other globals are
  created.
- **Every data file sets `GSL.campus`**, so a page loads exactly one of them and
  the controller does not need to know which campus it is on.
- **Values interpolated into HTML go through `GSL.map.esc()`.**
- **Motion respects `prefers-reduced-motion`.** Every stylesheet that animates
  carries a reduce block; keep new animation inside that pattern.

## Adding a campus

1. Drop the plan into `assets/img/<campus>/`.
2. Copy `assets/data/gimpa.js` to `assets/data/<campus>.js` and replace the
   places. `x` and `y` are percentages of the plan image; `r` sizes the halo.
3. Copy `gimpa-campus-map.html`, change the title, the `<img class="plan">`
   source, the landmark `viewBox` and the data file it loads.
4. Add the campus to `assets/data/campuses.js` so it appears in the directory.
   Leave `href` and `thumb` as `null` until the map is ready and the card
   renders as a "coming soon" placeholder instead of a dead link.

## Known gaps

- The GIMPA building illustrations (`assets/img/gimpa/*.webp`, other than the
  plan) have not been drawn yet, although the seven venues already reference
  them. The details card detects the missing file and hides the image, so the
  page is correct either way.
- UPSA is one building, not a spread of them, so four of its five venues share
  the building's own `gps`. A coordinate cannot separate two floors; the floor
  and the side of the corridor live in `sub` and `where` instead. Pin positions
  are spread across the roof only to keep them legible.
- Neither UPSA nor ACCE has building illustrations, so no venue there carries a
  `shot`; the card renders without an image until the artwork arrives.
- In the page header, `.bar` sets its own vertical padding and so cancels the
  horizontal padding `.wrap` would give it. The header content therefore sits
  flush to the screen edge on phones and about 20px wider than the map box on
  desktop. This is inherited from the original pages and was left as-is; giving
  `.bar` `padding-top`/`padding-bottom` instead of the `padding` shorthand would
  line the header up with the content below it.
