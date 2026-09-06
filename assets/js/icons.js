/**
 * icons.js — the inline SVG markup used across the site.
 *
 * These are kept as strings rather than as files because they are stamped into
 * HTML templates and need to inherit `currentColor` from whatever element they
 * land in, which an <img> or a CSS background cannot do.
 *
 * Load before any script that builds markup.
 */
window.GSL = window.GSL || {};

window.GSL.icons = {

  /* The downward game pointer. Its tip is the plan coordinate, so the whole
     pin element is anchored bottom-centre. */
  ARROW:
    '<svg class="arrow" viewBox="0 0 30 34" aria-hidden="true">' +
      '<path class="body" d="M15 32.4c-.9 0-1.5-.5-1.9-1.1L4.3 16.2C1.7 12 4.7 6.2 9.6 6.2h10.8c4.9 0 7.9 5.8 5.3 10L16.9 31.3c-.4.6-1 1.1-1.9 1.1z"/>' +
      '<circle class="eye" cx="15" cy="14.2" r="3.6"/>' +
    '</svg>',

  /* Map pointer, for list rows that name a place. */
  PIN:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>' +
    '</svg>',

  /* Door, for list rows that name a room inside a place. */
  DOOR:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M4 21h16M9 21V4.6a1 1 0 0 1 1.2-1l6 -1.4a1 1 0 0 1 1.3 1V21"/>' +
      '<circle cx="14" cy="12" r="1" fill="currentColor" stroke="none"/>' +
    '</svg>',

  /* Crosshair, for the "near X" fact chip. */
  NEAR:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>' +
    '</svg>',

  /* Building, for the "n listings" fact chip. */
  ROOM:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M3 21h18M5 21V6l7-3 7 3v15"/><path d="M10 21v-5h4v5"/>' +
    '</svg>',

  /* Padlock, for restricted-access places. */
  LOCK:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<rect x="4" y="10.5" width="16" height="10.5" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>' +
    '</svg>',

  /* Medical cross, for the clinic service. */
  CROSS:
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path fill="currentColor" d="M10 2.6h4c.8 0 1.4.6 1.4 1.4v4.6H20c.8 0 1.4.6 1.4 1.4v4c0 .8-.6 1.4-1.4 1.4h-4.6V20c0 .8-.6 1.4-1.4 1.4h-4c-.8 0-1.4-.6-1.4-1.4v-4.6H4c-.8 0-1.4-.6-1.4-1.4v-4c0-.8.6-1.4 1.4-1.4h4.6V4c0-.8.6-1.4 1.4-1.4z"/>' +
    '</svg>',

  /* Two figures, for the washroom service. */
  WC:
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">' +
      '<circle cx="6.6" cy="4.2" r="2.1"/>' +
      '<path d="M4.3 7.9h4.6c.7 0 1.2.6 1.1 1.3l-.9 4.2H8.2v7.2c0 .5-.4.9-.9.9H5.9c-.5 0-.9-.4-.9-.9v-7.2H4.1l-.9-4.2c-.1-.7.4-1.3 1.1-1.3z"/>' +
      '<circle cx="17.4" cy="4.2" r="2.1"/>' +
      '<path d="M17.4 7.9c1.7 0 2.7 1 3.1 2.4l1.1 3.9c.1.5-.2.9-.7.9h-1v5.5c0 .5-.4.9-.9.9h-3.2c-.5 0-.9-.4-.9-.9v-5.5h-1c-.5 0-.8-.4-.7-.9l1.1-3.9c.4-1.4 1.4-2.4 3.1-2.4z"/>' +
    '</svg>',

  /* Road, for the "which road" fact chip on the precinct maps. */
  ROAD:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M8 3L5 21M16 3l3 18M12 4v3M12 11v3M12 18v3"/>' +
    '</svg>',

  /* External link, for the Google Maps button. */
  MAPS:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M15 3h6v6"/><path d="M21 3l-9 9"/>' +
      '<path d="M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/>' +
    '</svg>',

  /* Dismiss the details card. */
  CLOSE:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">' +
      '<path d="M6 6l12 12M18 6L6 18"/>' +
    '</svg>',

  /* Rightward arrow, for the campus cards on the index page. */
  GO:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M5 12h13M13 6.5l5.5 5.5L13 17.5"/>' +
    '</svg>'
};
