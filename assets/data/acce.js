/**
 * acce.js — content for the ACCE campus map.
 *
 * Same shape as gimpa.js; see that file for what each field means.
 *
 * The Ghana School of Law is hosted on the Accra College of Education campus at
 * East Legon Extension. The venues here are spread across the college grounds,
 * roughly 250 m north to south, so unlike UPSA each one has its own reading.
 *
 * `gps` values are the readings taken on site. Checked against OpenStreetMap,
 * every one falls on the ACCE campus, and the library reading lands inside the
 * footprint OSM independently names "College library building". The GSL
 * administration and the auditorium share a reading: they are the same central
 * block, so their pins are offset to keep both clickable.
 *
 * `x` and `y` were projected from those readings onto the plan and then checked
 * against the drawing. The car park and the library sit where the plan draws
 * them rather than exactly where the projection landed, the drawing being an
 * illustration rather than a survey; the `gps` is what the Maps link uses.
 */
window.GSL = window.GSL || {};

window.GSL.campus = {

  places: {
    'auditorium': {
      name: 'Auditorium',
      sub: 'The lecture hall',
      road: 'Accra College of Education, East Legon',
      x: 50.0, y: 51.0, r: '10%',
      where: 'The central block with the long red roof, in the middle of the college grounds. The GSL administration offices are in the same building.',
      classes: [
        { what: 'Pre-Bar classes' }
      ],
      gps: '5.65785,-0.16108'
    },

    'gsl-administration': {
      name: 'GSL Administration',
      sub: 'Ghana School of Law offices',
      road: 'Accra College of Education, East Legon',
      x: 49.0, y: 41.0, r: '10%',
      where: 'In the central red-roofed block, the same building as the auditorium.',
      gps: '5.65785,-0.16108'
    },

    'library': {
      name: 'Library',
      sub: 'The college library',
      road: 'Accra College of Education, East Legon',
      x: 43.5, y: 15.5, r: '14%',
      where: 'The cross-shaped building with the green roof, towards the north of the campus and up the path from the car park.',
      gps: '5.65857,-0.16132'
    },

    'canteen': {
      name: 'Canteen',
      sub: 'Food and refreshments',
      road: 'Accra College of Education, East Legon',
      x: 77.4, y: 10.7, r: '14%',
      where: 'The long red-roofed building at the north-east corner of the campus, past the open field.',
      gps: '5.65900,-0.16022'
    },

    'islamic-mosque': {
      name: 'Islamic Mosque',
      sub: 'Place of prayer',
      road: 'Accra College of Education, East Legon',
      x: 30.7, y: 80.9, r: '13%',
      where: 'At the south end of the campus, the domed building set back among the trees.',
      gps: '5.65669,-0.16163'
    },

    'car-park': {
      name: 'Car Park',
      sub: 'Visitor and staff parking',
      road: 'Accra College of Education, East Legon',
      x: 17.5, y: 35.5, r: '16%',
      where: 'The open lot on the west side of the campus, south-west of the library.',
      gps: '5.65810,-0.16158'
    }
  },

  // Not yet surveyed for this campus.
  landmarks: { roads: [], places: [] }
};
