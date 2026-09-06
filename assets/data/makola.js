/**
 * makola.js — content for the Makola campus map.
 *
 * places
 *   pin    the plan coordinate the pointer's tip rests on, in the plan's own
 *          1512 x 1036 space
 *   shape  the polygon that lights up when the place is picked, same space
 *   rooms  what is inside the building, listed on the details card and indexed
 *          by the search box
 *   also   extra search terms that should find this place
 *
 * services
 *   Emergency services get their own layer: one button each, their own colour,
 *   and a pointer on every place that service can actually be found. A point
 *   with its own `shape` gets a stronger fill than the building holding it.
 */
window.GSL = window.GSL || {};

window.GSL.campus = {

  plan: { width: 1512, height: 1036 },

  places: {
    'main-entrance': {
      name: 'Main Entrance', near: 'Entrance Construction', pin: [575, 226],
      shape: '547,194 593,184 616,221 597,244 542,244',
      desc: 'The main campus entrance on the Independence Avenue side. All visitors pass the security checkpoint here.',
      rooms: ['Security Checkpoint at the gate'],
      also: ['Gate', 'Independence Avenue', 'Security', 'Checkpoint']
    },

    'entrance-construction': {
      name: 'Entrance Construction', near: 'Main Entrance', pin: [690, 150],
      shape: '644,52 722,55 776,126 754,207 683,222 616,183 611,105',
      desc: 'An ongoing construction site. Access is restricted.',
      also: ['Silver roof', 'Building site']
    },

    'shaded-seating-area': {
      name: 'Shaded Seating Area', near: 'Main Entrance', pin: [672, 300],
      shape: '624,220 656,215 742,287 720,322 678,310 612,250',
      desc: 'Trees and shaded seating close to the entrance, between the car park and the construction area.',
      also: ['Trees', 'Benches', 'Rest area']
    },

    'main-car-park': {
      name: 'Main Car Park', near: 'Main Entrance', pin: [549, 444],
      shape: '318,407 445,270 565,246 644,287 775,382 757,462 686,486 686,560 600,696 486,619 375,516',
      desc: 'General and student parking on the left of the plan. The pedestrian exit leads toward the centre of campus.',
      also: ['Student parking', 'General parking', 'Visitor parking']
    },

    'canteen': {
      name: 'Canteen', near: 'Main Washroom & Stores Block', pin: [903, 300],
      shape: '837,178 968,278 958,375 851,373 850,244',
      desc: 'The campus canteen, serving meals and refreshments through the day. The Campus Clinic shares the same roof, at the far end of the block.',
      rooms: ['Campus Clinic, far end of the block on the rear path'],
      also: ['Food', 'Dining', 'Lunch', 'Refreshments', 'Eatery', 'Clinic', 'First aid']
    },

    'washroom-stores-block': {
      name: 'Main Washroom & Stores Block', near: 'Canteen', pin: [1012, 330],
      shape: '974,268 1058,336 1050,374 971,374 972,312',
      desc: 'Student washrooms on the ground floor, with the procurement and stores units on the upper floor.',
      rooms: ['Main Washroom, ground floor', 'Procurement Unit, upper floor', 'Stores Unit, upper floor'],
      also: ['Toilet', 'Restroom', 'WC', 'Procurement', 'Stores']
    },

    'library-block': {
      name: 'Library & Academic Block', near: 'Administration Block', pin: [1020, 440],
      shape: '858,387 1062,386 1064,454 1036,468 1000,457 965,466 930,456 893,466 858,454',
      desc: 'The main teaching and library building. This is a working label; the official building name is still to be confirmed.',
      rooms: [
        'HOD Offices, ground floor',
        'East Wing Washroom, far right end of the ground floor',
        'Part One Classroom, first floor',
        'IT Office (DTI), first floor',
        'General Legal Council (GLC), second floor',
        'Main Library, third floor',
        'Reading Room, third floor',
        'West Wing Washroom, far left end of every floor',
        'Walkway to the Administration Block, first floor'
      ],
      also: ['Library', 'Reading room', 'HOD', 'GLC', 'DTI', 'IT office', 'Part one', 'Classroom']
    },

    'disability-path': {
      name: 'Disability Access Path', near: 'Library & Academic Block', pin: [833, 438],
      shape: '806,377 854,378 856,444 808,440',
      desc: 'The step-free route into the Library & Academic Block. The first-floor walkway across to the Administration Block runs above it.',
      also: ['Accessible entrance', 'Wheelchair', 'Ramp', 'Step-free', 'Walkway']
    },

    'administration-block': {
      name: 'Administration Block', near: 'Justice Fountain', pin: [835, 590],
      shape: '810,479 863,479 881,514 881,662 866,698 866,867 805,867 805,698 789,662 789,514',
      desc: 'Registry and administrative services, with classrooms on the first floor.',
      rooms: [
        'Registry, ground floor',
        'Records, ground floor',
        'Help Desk, ground floor',
        "Deputy Registrar's Office, ground floor",
        'Staff Common Room, ground floor',
        'Finance Unit, first floor',
        'Part Two Classroom, first floor',
        'Post Call Classroom, first floor',
        'Walkway to the Library & Academic Block, first floor'
      ],
      also: ['Registry', 'Records', 'Finance', 'Admin', 'Part two', 'Post call']
    },

    'justice-fountain': {
      name: 'Justice Fountain', near: 'Administration Block', pin: [990, 548],
      shape: '910,490 1047,490 1047,551 910,551',
      desc: "A rectangular pool with a central fountain and a raised scales-of-justice figure. The campus's main landmark.",
      also: ['Pool', 'Scales of justice', 'Water feature', 'Statue']
    },

    'restricted-building': {
      name: 'Restricted Access Building', near: 'Justice Fountain', pin: [1081, 518],
      shape: '1061,479 1093,479 1093,558 1061,558',
      desc: 'The building on the far right of the pool. Students do not have access.',
      restricted: true,
      also: ['No entry', 'Staff only', 'Restricted']
    },

    'the-dome': {
      name: 'The Dome', near: 'Justice Fountain', pin: [1001, 740],
      shape: '923,588 1079,589 1080,871 922,871',
      desc: 'The large domed building facing the fountain. Pre-Bar classes are held here.',
      also: ['Dome', 'Pre-Bar', 'Prebar', 'Auditorium', 'Hall']
    },

    'management-car-park': {
      name: 'Management Car Park', near: 'Administration Block', pin: [713, 637],
      shape: '693,486 733,486 733,788 693,788',
      desc: 'Reserved parking for management, screened by the planted line behind it.',
      also: ['Reserved parking', 'Staff parking']
    },

    'services-block': {
      name: 'Services Block', near: 'Management Car Park', pin: [624, 730],
      shape: '603,704 644,704 644,868 603,868',
      desc: 'Three service units arranged from top to bottom along the western path.',
      rooms: ['Printing Press, top section', 'Transport Unit, middle section', 'Works Department Office, bottom section'],
      also: ['Printing', 'Transport', 'Works']
    },

    'southern-student-services': {
      name: 'Southern Student Services', near: 'Services Block', pin: [683, 916],
      shape: '618,880 748,880 748,949 618,949',
      desc: 'Three student services in a row, running left to right across the block.',
      rooms: ['Cafeteria, left', 'SRC Secretariat, centre', 'Bookshop, right'],
      also: ['Cafeteria', 'SRC', 'Bookshop', 'Books', 'Student services']
    }
  },

  services: {
    clinic: {
      name: 'Clinic', tone: 'red', button: 'btnClinic',
      points: [{
        key: 'clinic', name: 'Campus Clinic', parent: 'canteen', pin: [904, 364],
        shape: '879,322 930,322 931,371 878,371',
        desc: 'First aid and campus health services.',
        where: 'Under the same roof as the Canteen, at the far end of the block. Take the path that runs behind the Library & Academic Block toward the Main Washroom. The clinic is on your right at the end of that stretch.'
      }]
    },

    washroom: {
      name: 'Washrooms', tone: 'blue', button: 'btnWc',
      points: [
        {
          key: 'wc-main', name: 'Main Washroom', parent: 'washroom-stores-block', pin: [1012, 368],
          desc: 'The main student washroom block.',
          where: 'Ground floor of the Main Washroom & Stores Block, at the end of the path that runs behind the Library & Academic Block.'
        },
        {
          key: 'wc-east', name: 'East Wing Washroom', parent: 'library-block', pin: [1048, 450],
          desc: 'Washroom in the Library & Academic Block.',
          where: 'Ground floor, at the far right (east) end of the block.'
        },
        {
          key: 'wc-west', name: 'West Wing Washroom', parent: 'library-block', pin: [872, 450],
          desc: 'Washroom in the Library & Academic Block.',
          where: 'Far left (west) end of the block, one on every floor.'
        }
      ]
    }
  }
};
