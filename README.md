# Ghana School of Law — Campus Maps

Interactive maps of the Ghana School of Law campuses. Static HTML, CSS and
JavaScript with no build step and no dependencies.

## Running it

Open `index.html` in a browser. That is all — the pages work straight from disk
(`file://`), so there is nothing to install and no server to start.

If you prefer to serve it (recommended before deploying, so paths behave exactly
as they will in production):

```sh
python -m http.server 8000     # then open http://localhost:8000
```

To deploy, upload the whole folder as-is to any static host.

## Layout

```
index.html                  campus picker
makola-campus-map.html      Makola campus, Accra
gimpa-campus-map.html       GIMPA campus, Accra
knust-campus-map.html       KNUST campus, Kumasi

assets/
  css/
    base.css                design tokens, reset, page shell   (every page)
    home.css                the campus picker                  (index only)
    map.css                 the shared map shell               (all 3 map pages)
    map-makola.css          traced footprints, service layers  (Makola only)
    map-precinct.css        halos, landmark labels             (GIMPA + KNUST)
  js/
    icons.js                inline SVG icon set                (every page)
    map-core.js             behaviour shared by all map pages
    home.js                 builds the campus grid
    makola-map.js           the Makola page controller
    precinct-map.js         the GIMPA and KNUST controller (one file, both pages)
  data/
    campuses.js             the campus list on the index page
    makola.js               Makola buildings, rooms and services
    gimpa.js                GIMPA venues
    knust.js                KNUST venues and landmark labels
  img/
    makola/ gimpa/ knust/   campus plans and building illustrations
```

**Content lives in `assets/data/`, behaviour lives in `assets/js/`.** Adding a
building or fixing a room name means editing one data file and nothing else.

### The two kinds of map

| | Makola | GIMPA and KNUST |
|---|---|---|
| Buildings marked by | traced polygon footprints | a soft halo under the pointer |
| Coordinates | pixels in the plan's own space | percentages of the plan image |
| Dropdown | searches buildings **and** rooms | lists venues |
| Extras | clinic and washroom overlay layers | class times, photo, GPS link |

GIMPA and KNUST are the same page driven by different data, so they share
`precinct-map.js` and `map-precinct.css`. Makola is different enough to warrant
its own controller, but still uses the shared shell.

### Stylesheet order

Order matters — each page loads them most-general first:

```
base.css  →  map.css  →  map-makola.css | map-precinct.css
base.css  →  home.css
```

The variant stylesheet overrides a small number of shared values (panel width,
chip width, card padding, close button). Keep it that way: put anything used by
more than one map page in `map.css`.

## Conventions

- **No build step.** Scripts are plain classic scripts loaded with `defer`, not
  ES modules. Modules are blocked by CORS on `file://`, which would stop the
  pages opening straight from disk.
- **One global, `window.GSL`**, holding `icons`, `map`, `campus` and `campuses`.
  Each file adds to it; no other globals are created.
- **Every data file sets `GSL.campus`**, so a page loads exactly one of them and
  the controller does not need to know which campus it is on.
- Values interpolated into HTML go through `GSL.map.esc()`.

## Adding a campus

1. Drop the plan into `assets/img/<campus>/`.
2. Copy `assets/data/gimpa.js` to `assets/data/<campus>.js` and replace the
   places. `x` and `y` are percentages of the plan image; `r` sizes the halo.
3. Copy `gimpa-campus-map.html`, change the title, the `<img class="plan">`
   source, the landmark `viewBox` and the data file it loads.
4. Add the campus to `assets/data/campuses.js` so it appears on the index. Leave
   `href` and `thumb` as `null` until the map is ready and the card renders as a
   "coming soon" placeholder instead of a dead link.

## Known gaps

- The GIMPA building illustrations (`assets/img/gimpa/*.webp`, other than the
  plan) have not been drawn yet. The details card detects this and hides the
  image, so the page is correct either way.
- UPSA and ACCE have no maps yet and show as placeholders on the index.
- In the page header, `.bar` sets its own vertical padding and so cancels the
  horizontal padding `.wrap` would give it. The header content therefore sits
  flush to the screen edge on phones and about 20px wider than the map box on
  desktop. This is inherited from the original pages and was left as-is; giving
  `.bar` `padding-top`/`padding-bottom` instead of the `padding` shorthand would
  line the header up with the content below it.
