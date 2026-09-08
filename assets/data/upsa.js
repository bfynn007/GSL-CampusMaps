/**
 * upsa.js — content for the UPSA campus map.
 *
 * Same shape as gimpa.js; see that file for what each field means.
 *
 * Unlike the other campuses, UPSA is a single building: the SRC Students Center
 * Building, on the UPSA campus at North Legon. The canteen is on the ground
 * floor; the lecture halls and the admin office are both on the second, facing
 * each other across the corridor. Only the car park is outside.
 *
 * Because the venues are stacked rather than spread out, every indoor venue
 * carries the same `gps` — the building's own reading. A coordinate cannot
 * separate two floors, and pointing all of them at the building is what makes
 * the Google Maps link useful. The car park has its own reading.
 *
 * The floor and the side of the corridor are what actually tell someone where
 * to go, so they are carried in `sub` and `where` rather than implied by the
 * pin. Pin positions are spread across the roof to stay legible, and are not a
 * claim about which part of the building each room sits over.
 *
 * The corridor itself is not a place here. Every floor has one, so naming it as
 * a destination tells nobody anything; it earns its keep in the `where` text of
 * the rooms it runs between.
 */
window.GSL = window.GSL || {};

window.GSL.campus = {

  places: {
    'lecture-hall-1': {
      name: 'Lecture Hall 1',
      sub: 'Room SCH6/405, second floor',
      road: 'SRC Students Center, UPSA campus, Accra',
      x: 43.0, y: 58.0, r: '12%',
      where: 'On the second floor. Take the stairs from the main entrance; the lecture halls run along one side of the corridor, with the admin office directly opposite.',
      gps: '5.66252,-0.16744'
    },

    'lecture-hall-2': {
      name: 'Lecture Hall 2',
      sub: 'Room SCH4/401, second floor',
      road: 'SRC Students Center, UPSA campus, Accra',
      x: 62.0, y: 58.0, r: '12%',
      where: 'On the second floor, along the same side of the corridor as Lecture Hall 1.',
      gps: '5.66252,-0.16744'
    },

    'admin-office': {
      name: 'Admin Office',
      sub: 'Room SCK402, second floor',
      road: 'SRC Students Center, UPSA campus, Accra',
      x: 52.0, y: 38.0, r: '12%',
      where: 'On the second floor, directly opposite the lecture halls across the corridor.',
      gps: '5.66252,-0.16744'
    },

    'canteen': {
      name: 'Canteen',
      sub: 'Ground floor',
      road: 'SRC Students Center, UPSA campus, Accra',
      x: 55.0, y: 66.0, r: '11%',
      where: 'On the ground floor, in from the entrance steps on the south side of the building. The lecture halls are one floor up.',
      gps: '5.66252,-0.16744'
    },

    'car-park': {
      name: 'Car Park',
      sub: 'Outside, north of the building',
      road: 'SRC Students Center, UPSA campus, Accra',
      x: 48.0, y: 19.0, r: '16%',
      where: 'The parking bays at the north end of the site, immediately outside the building.',
      gps: '5.66283,-0.16752'
    }
  },

  // Not yet surveyed for this campus.
  landmarks: { roads: [], places: [] }
};
