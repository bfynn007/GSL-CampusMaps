/**
 * knust.js — content for the KNUST (Kumasi) campus map.
 * Same shape as gimpa.js; see that file for what each field means.
 */
window.GSL = window.GSL || {};

window.GSL.campus = {

  places: {
    'gsl-kumasi': {
      name: 'ICIL Building',
      sub: 'International Center for Innovative Learning. The main law school building.',
      road: 'Mango Road',
      x: 51.8, y: 11.6, r: '13%',
      shot: 'assets/img/knust/gsl-kumasi-campus.webp',
      where: 'A standalone building with a pitched roof, set back from Mango Road among the trees, north of the dense hostel blocks.',
      classes: [
        { day: 'Wednesday and Thursday', what: 'Pre-Bar class' },
        { what: 'Part Two classes' },
        { what: 'Post Call classes' }
      ],
      gps: '6.6791449,-1.5641091'
    },

    'new-college-block': {
      name: 'New Agriculture and Natural Resource Building',
      sub: 'College of Agriculture and Natural Resources, KNUST',
      road: 'Near the KNUST Library Mall',
      x: 34.3, y: 30.3, r: '17%',
      shot: 'assets/img/knust/new-college-block.webp',
      where: 'The long green L-shaped roof beside the turfed open ground, a short walk from the Library Mall.',
      classes: [
        { day: 'Friday and Saturday', what: 'Pre-Bar weekend class', room: 'Ground floor and first floor' }
      ],
      gps: '6.6774736,-1.5647474'
    },

    'new-cabe-building': {
      name: 'New CABE Building',
      sub: 'College of Art and Built Environment',
      road: 'Nana Kese Avenue',
      x: 42.9, y: 84.5, r: '11%',
      shot: 'assets/img/knust/new-cabe-building.webp',
      where: 'The curved, fan-shaped roof wrapping a courtyard, south of the Faculty of Social Sciences.',
      classes: [
        { day: 'Monday and Tuesday', what: 'Pre-Bar regular class', room: 'LH3 GF, LH3 FF and LH3 SF' }
      ],
      gps: '6.6748828,-1.5644005'
    }
  },

  // Coordinates are in the plan's own 1254 x 1254 space.
  landmarks: {
    roads: [
      { name: 'Mango Road',          x: 852,  y: 136,  rot: 14 },
      { name: 'Poku Transport Road', x: 304,  y: 265,  rot: -71 },
      { name: 'Ayeduase Road',       x: 150,  y: 340,  rot: 32.5 },
      { name: 'Nana Kese Avenue',    x: 688,  y: 900,  rot: 87 }
    ],
    places: [
      { name: 'KNUST Library Mall',         x: 492,  y: 428 },
      { name: 'CCB Auditorium',             x: 332,  y: 692 },
      { name: 'Faculty of Social Sciences', x: 500,  y: 884 },
      { name: 'KNUST Engineering Gate',     x: 302,  y: 1178 },
      { name: 'Beacon Hostel',              x: 800,  y: 302 },
      { name: 'West End Hostel',            x: 906,  y: 484 },
      { name: 'Dr Sarfo Hostel',            x: 1078, y: 250 },
      { name: 'The Octopus',                x: 1092, y: 642 }
    ]
  }
};
