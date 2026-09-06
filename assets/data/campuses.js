/**
 * campuses.js — the campus list on the index page.
 *
 * One entry per campus. `href` and `thumb` stay null until that campus's map
 * exists, and the card renders as a placeholder instead of a dead link.
 */
window.GSL = window.GSL || {};

window.GSL.campuses = [
  {
    name: 'Makola Campus',
    place: 'Accra',
    note: 'The main campus off Independence Avenue. 15 locations, plus the clinic and every washroom.',
    href: 'makola-campus-map.html',
    thumb: 'assets/img/makola/makola-campus-plan.webp'
  },
  {
    name: 'KNUST Campus',
    place: 'Kumasi',
    note: 'Three class venues in the Ayeduase and Mango Road precinct.',
    href: 'knust-campus-map.html',
    thumb: 'assets/img/knust/knust-precinct-plan.webp'
  },
  {
    name: 'UPSA Campus',
    place: 'Accra',
    note: 'Map not yet available.',
    href: null,
    thumb: null
  },
  {
    name: 'GIMPA Campus',
    place: 'Accra',
    note: 'Part One and Part Two classes, the canteen and the washrooms on the GIMPA law campus.',
    href: 'gimpa-campus-map.html',
    thumb: 'assets/img/gimpa/gimpa-precinct-plan.webp'
  },
  {
    name: 'ACCE Campus',
    place: 'Accra',
    note: 'Map not yet available.',
    href: null,
    thumb: null
  }
];
