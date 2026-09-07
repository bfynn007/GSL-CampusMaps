/**
 * campuses.js — the campus list on campuses.html.
 *
 * One entry per campus. `href` and `thumb` stay null until that campus's map
 * exists, and the campus is listed as upcoming instead of linked.
 *
 * `classTypes` are the kinds of class held on that campus, shown under its
 * plan so someone can pick the right campus without opening three maps.
 */
window.GSL = window.GSL || {};

window.GSL.campuses = [
  {
    name: 'Makola Campus',
    place: 'Accra',
    note: 'The main campus off Independence Avenue. 15 locations, plus the clinic and every washroom.',
    classTypes: ['Pre-Bar', 'Part II', 'Post Call'],
    href: 'makola-campus-map.html',
    // The wider precinct view, matching how KNUST and GIMPA are shown here.
    // The map page itself still uses the close-up traced plan.
    thumb: 'assets/img/makola/makola-precinct-plan.webp'
  },
  {
    name: 'KNUST Campus',
    place: 'Kumasi',
    note: 'Three class venues in the Ayeduase and Mango Road precinct.',
    classTypes: ['Pre-Bar', 'Part II'],
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
    classTypes: ['Pre-Bar', 'Part II'],
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
