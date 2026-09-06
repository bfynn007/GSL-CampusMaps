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
      name: 'Main Building',
      sub: 'Lecture Hall 1 is upstairs on the left, room LS221',
      road: 'GIMPA campus, Accra',
      x: 35.1, y: 35.6, r: '19%',
      shot: 'assets/img/gimpa/main-building.webp',
      where: 'The long block directly north of Lecture Hall 2, below the admin office. Lecture Hall 1 is up the stairs and to the left.',
      classes: [
        { what: 'Part One classes', room: 'Lecture Hall 1, room LS221' }
      ],
      gps: '5.63331,-0.20025'
    },

    'lecture-hall-2': {
      name: 'Lecture Hall 2',
      sub: 'Room LS002',
      road: 'GIMPA campus, Accra',
      x: 46.3, y: 51.3, r: '22%',
      shot: 'assets/img/gimpa/lecture-hall-2.webp',
      where: 'The long building with the hipped roof and the glazed frontage along its southern side, directly south of the Main Building.',
      classes: [
        { what: 'Part Two classes', room: 'Room LS002' }
      ],
      gps: '5.63325,-0.20036'
    },

    'washrooms': {
      name: 'Washrooms',
      sub: 'Rooms LS019 and LS021',
      road: 'GIMPA campus, Accra',
      x: 55.0, y: 34.6, r: '13%',
      shot: 'assets/img/gimpa/washrooms.webp',
      where: 'At the eastern end of the main block, a short walk from Lecture Hall 1.',
      gps: '5.63337,-0.20020'
    },

    'canteen': {
      name: 'Canteen',
      sub: 'Food and refreshments',
      road: 'GIMPA campus, Accra',
      x: 28.9, y: 68.8, r: '14%',
      shot: 'assets/img/gimpa/canteen.webp',
      where: 'The small block on the west side of the forecourt, below Lecture Hall 2 and beside the car park.',
      gps: '5.63299,-0.20042'
    },

    'admin-office': {
      name: 'Admin Office',
      sub: 'Campus administration and front desk',
      road: 'GIMPA campus, Accra',
      x: 54.5, y: 26.5, r: '14%',
      shot: 'assets/img/gimpa/admin-office.webp',
      where: 'The block north of the main teaching range, on the eastern side of the entrance drive.',
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

  // Not yet surveyed for this campus.
  landmarks: { roads: [], places: [] }
};
