/**
 * gimpa.js — content for the GIMPA campus map.
 *
 * places
 *   x, y     percentages of the plan image, so the page does not depend on the
 *            illustration's pixel dimensions
 *   r        diameter of the halo under the pointer, as a percentage
 *   shot     illustrated view shown at the top of the details card; the card
 *            hides the image if the file is not there yet
 *   classes  what is taught here, listed on the details card
 *   gps      "lat,lon", shown on the card and linked to Google Maps
 *
 * landmarks
 *   Roads and landmarks that only orient you. They carry no arrow and no card,
 *   exactly as a printed map names the streets around a building. Coordinates
 *   are in the viewBox declared on the <svg class="landmarks"> in the page.
 *   `rot` is the road's angle in degrees.
 *
 * Names and coordinates come from the school's verified class-venue list.
 */
window.GSL = window.GSL || {};

window.GSL.campus = {

  places: {
    'main-building': {
      name: 'Lecture Hall 1',
      sub: 'Pre-Bar classes, second floor, room LS221',
      road: 'GIMPA campus, Accra',
      x: 46.0, y: 34.0, r: '16%',
      shot: 'assets/img/gimpa/main-building.webp',
      where: 'On the second floor of the central teaching block labelled Lecture Hall 1, directly above Lecture Hall 2.',
      classes: [
        { what: 'Pre-Bar classes', room: 'Second floor, room LS221' }
      ],
      gps: '5.63331,-0.20025'
    },

    'lecture-hall-2': {
      name: 'Lecture Hall 2',
      sub: 'Part Two classes, ground floor, room LS002',
      road: 'GIMPA campus, Accra',
      x: 41.0, y: 54.5, r: '16%',
      shot: 'assets/img/gimpa/lecture-hall-2.webp',
      where: 'On the ground floor of the same central teaching block as Lecture Hall 1, beside the front walkway.',
      classes: [
        { what: 'Part Two classes', room: 'Ground floor, room LS002' }
      ],
      gps: '5.63325,-0.20036'
    },

    'library': {
      name: 'Library',
      sub: 'Topmost floor of the central teaching block',
      road: 'GIMPA campus, Accra',
      x: 50.0, y: 52.0, r: '14%',
      where: 'On the topmost floor of the same building as Lecture Halls 1 and 2.'
    },

    'canteen-1': {
      name: 'Canteen',
      sub: 'Food and refreshments',
      road: 'GIMPA campus, Accra',
      x: 34.0, y: 39.5, r: '11%',
      where: 'Between the Admin Office and Lecture Hall 2, on the west side of the central teaching block.'
    },

    'canteen': {
      name: 'Canteen 2',
      sub: 'Food and refreshments',
      road: 'GIMPA campus, Accra',
      x: 28.9, y: 68.8, r: '14%',
      shot: 'assets/img/gimpa/canteen.webp',
      where: 'The lower canteen on the west side of the forecourt, below Lecture Hall 2 and beside the lower car park.',
      gps: '5.63299,-0.20042'
    },

    'parking-2': {
      name: 'Parking 2',
      sub: 'Parking for the lecture-hall frontage',
      road: 'GIMPA campus, Accra',
      x: 46.5, y: 67.0, r: '12%',
      where: 'To the right of Canteen 2, facing the front of Lecture Hall 2.'
    },

    'admin-office': {
      name: 'Admin Office',
      sub: 'Campus administration and front desk',
      road: 'GIMPA campus, Accra',
      x: 35.5, y: 26.5, r: '12%',
      shot: 'assets/img/gimpa/admin-office.webp',
      where: 'The block north-west of Lecture Hall 1, beside the upper car park and entrance drive.',
      gps: '5.63348,-0.20006'
    },

    'parking': {
      name: 'Parking',
      sub: 'Visitor and staff parking',
      road: 'GIMPA campus, Accra',
      x: 29.6, y: 24.4, r: '12%',
      shot: 'assets/img/gimpa/parking.webp',
      where: 'The paved lot north-west of the admin office, at the top of the entrance drive.',
      gps: '5.63347,-0.20042'
    }
  },

  notices: {
    washrooms: {
      button: 'btnWashrooms',
      name: 'Washrooms',
      text: 'Washrooms are available in every block and on every floor across the campus.'
    }
  },

  // Not yet surveyed for this campus.
  landmarks: { roads: [], places: [] }
};
