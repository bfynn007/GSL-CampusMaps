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
    note: 'Explore the main campus off Independence Avenue with an interactive map.',
    classTypes: ['Pre-Bar', 'Part II', 'Post Call'],
    href: 'makola-campus-map.html',
    // The wider precinct view, matching how KNUST and GIMPA are shown here.
    // The map page itself still uses the close-up traced plan.
    thumb: 'assets/img/makola/makola-precinct-plan.webp'
  },
  {
    name: 'KNUST Campus',
    place: 'Kumasi',
    note: 'Find three lecture venues across the Ayeduase and Mango Road precincts.',
    classTypes: ['Pre-Bar', 'Part II'],
    href: 'knust-campus-map.html',
    thumb: 'assets/img/knust/knust-precinct-plan.webp'
  },
  {
    name: 'UPSA Campus',
    place: 'Accra',
    note: 'Find the lecture halls, canteen and admin office inside the SRC Students Center.',
    classTypes: ['Part II'],
    href: 'upsa-campus-map.html',
    // The wider precinct view, matching the other campuses here. The map page
    // itself uses the close-up of the building, the whole campus being the one
    // block.
    thumb: 'assets/img/upsa/upsa-precinct-plan.webp'
  },
  {
    name: 'GIMPA Campus',
    place: 'Accra',
    note: 'View the locations of the lecture halls, along with other essential campus facilities.',
    classTypes: ['Pre-Bar', 'Part II'],
    href: 'gimpa-campus-map.html',
    thumb: 'assets/img/gimpa/gimpa-precinct-plan.webp'
  },
  {
    name: 'ACCE Campus',
    place: 'Accra',
    note: 'Find the auditorium, GSL offices, library and canteen on the Accra College of Education grounds.',
    classTypes: ['Pre-Bar'],
    href: 'acce-campus-map.html',
    thumb: 'assets/img/acce/acce-precinct-plan.webp'
  }
];

