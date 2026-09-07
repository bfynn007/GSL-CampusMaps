/**
 * precinct-map.js — the illustrated precinct maps (GIMPA and KNUST).
 *
 * Both campuses use the same page, differing only in their data file. A venue
 * is marked by a bouncing pointer over a soft halo; picking one opens a card
 * with the illustrated view, the classes held there and a Google Maps link.
 *
 * Requires icons.js, map-core.js, and a data file that sets GSL.campus.
 */
(function (GSL) {
  'use strict';

  var map = GSL.map;
  var esc = map.esc;
  var PLACES = GSL.campus.places;
  var LANDMARKS = GSL.campus.landmarks;
  var entries = Object.entries(PLACES);

  var canvas = document.getElementById('canvas');
  var plan = document.getElementById('plan');
  var pins = document.getElementById('pins');
  var info = document.getElementById('info');
  var list = document.getElementById('list');
  var badge = document.getElementById('badge');

  var selected = null;

  var pinOf = function (id) { return pins.querySelector('.pin[data-id="' + id + '"]'); };
  var haloOf = function (id) { return pins.querySelector('[data-halo="' + id + '"]'); };

  // ---- map layer ------------------------------------------------------------

  pins.innerHTML = entries.map(function (entry, i) {
    var id = entry[0];
    var place = entry[1];
    return '<span class="halo" data-halo="' + esc(id) + '"' +
      ' style="left:' + place.x + '%; top:' + place.y + '%; --r:' + (place.r || '12%') + '"></span>' +
      map.pinHtml({
        id: id, name: place.name, xPercent: place.x, yPercent: place.y, index: i
      });
  }).join('');

  // Draw the static labels once. Roads follow their own angle; landmarks get a
  // name only, positioned where the feature sits on the plan.
  document.getElementById('landmarks').innerHTML =
    LANDMARKS.roads.map(function (road) {
      return '<text class="road" x="' + road.x + '" y="' + road.y + '" text-anchor="middle"' +
        ' transform="rotate(' + road.rot + ' ' + road.x + ' ' + road.y + ')">' + esc(road.name) + '</text>';
    }).join('') +
    LANDMARKS.places.map(function (spot) {
      return '<text class="spot" x="' + spot.x + '" y="' + spot.y + '" text-anchor="middle">' +
        esc(spot.name) + '</text>';
    }).join('');

  // ---- locations dropdown ---------------------------------------------------

  badge.textContent = entries.length;

  list.innerHTML = entries.map(function (entry) {
    return '<li role="none">' +
      '<button type="button" role="option" data-id="' + esc(entry[0]) + '" aria-selected="false">' +
        '<span class="glyph">' + GSL.icons.PIN + '</span>' +
        '<span class="txt"><b>' + esc(entry[1].name) + '</b>' +
        '<small>' + esc(entry[1].sub) + '</small></span>' +
      '</button></li>';
  }).join('');

  /** Keep the list in step with what is selected on the map. */
  function markList() {
    list.querySelectorAll('button[data-id]').forEach(function (button) {
      var on = button.dataset.id === selected;
      button.setAttribute('aria-selected', String(on));
      if (on) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
  }

  var dropdown = map.createDropdown({
    button: document.getElementById('browseBtn'),
    panel: document.getElementById('browsePanel')
  });

  list.addEventListener('click', function (event) {
    var button = event.target.closest('button[data-id]');
    if (!button) return;
    // Close first, so the panel and the details card are never on screen
    // together and the map stays readable on small screens.
    dropdown.close(false);
    select(button.dataset.id);
    canvas.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // ---- labels on / off ------------------------------------------------------

  map.createLabelsToggle(document.getElementById('btnLabels'), function (visible) {
    pins.classList.toggle('off', !visible);
    canvas.classList.toggle('nolabels', !visible);   // road and landmark names go too
  });

  // ---- hover and selection --------------------------------------------------

  function hot(id, on) {
    if (id === selected) return;
    var pin = pinOf(id);
    var halo = haloOf(id);
    if (pin) pin.classList.toggle('hot', on);
    if (halo) halo.classList.toggle('hot', on);
  }

  map.delegatePlaceEvents(pins, { onHot: hot, onSelect: function (id) { select(id); } });

  function deselect(id) {
    var pin = pinOf(id);
    var halo = haloOf(id);
    if (pin) pin.classList.remove('on');
    if (halo) halo.classList.remove('on', 'hot');
  }

  function clear() {
    if (!selected) return;
    deselect(selected);
    selected = null;
    info.hidden = true;
    markList();
  }

  /**
   * Build the details card for one venue.
   * @param {object} place an entry from GSL.campus.places
   * @returns {string}
   */
  function cardHtml(place) {
    return '<button type="button" class="close" aria-label="Close details">' + GSL.icons.CLOSE + '</button>' +
      (place.shot
        ? '<img class="shot" src="' + esc(place.shot) + '" alt="Illustrated view of ' + esc(place.name) + '">'
        : '') +
      '<div class="pad">' +
        '<h2 id="info-title">' + esc(place.name) + '</h2>' +
        '<p class="sub">' + esc(place.sub) + '</p>' +
        '<div class="facts"><span class="fact">' + GSL.icons.ROAD + esc(place.road) + '</span></div>' +
        (place.classes
          ? '<h3>Classes held here</h3><ul class="classes">' +
            place.classes.map(function (session) {
              return '<li>' +
                (session.day ? '<b>' + esc(session.day) + '</b>' : '') +
                '<span>' + esc(session.what) + '</span>' +
                (session.room ? '<small>' + esc(session.room) + '</small>' : '') +
              '</li>';
            }).join('') +
            '</ul>'
          : '') +
        '<p class="where"><b>How to find it</b>' + esc(place.where) + '</p>' +
        (place.gps
          ? '<p class="coords"><b>Coordinates</b><span>' + esc(place.gps.replace(',', ', ')) + '</span></p>' +
            // "lat,lon" is already URL-safe, and Google Maps wants the comma literal.
            '<a class="maps" href="https://www.google.com/maps?q=' + esc(place.gps) + '"' +
            ' target="_blank" rel="noopener">' + GSL.icons.MAPS + 'Locate on Google Maps</a>'
          : '') +
      '</div>';
  }

  function select(id) {
    var place = PLACES[id];
    if (!place) return;

    if (selected) deselect(selected);
    selected = id;

    var pin = pinOf(id);
    var halo = haloOf(id);
    pin.classList.add('on');
    pin.classList.remove('hot');
    halo.classList.add('on');
    halo.classList.remove('hot');

    info.innerHTML = cardHtml(place);
    info.hidden = false;
    map.replayEntrance(info, function () { map.placeCard(canvas, pin, info, 18); });

    // .shot reserves its space up front, so the card is measured correctly on
    // a fresh load. Re-anchor once the image settles anyway: a venue whose
    // illustration has not been drawn yet loses that space again, which
    // changes the height the card was positioned against.
    var shot = info.querySelector('.shot');
    if (shot) {
      var reanchor = function () {
        if (selected === id) map.placeCard(canvas, pin, info, 18);
      };
      shot.addEventListener('load', reanchor);
      shot.addEventListener('error', function () {
        shot.classList.add('missing');
        reanchor();
      });
    }

    info.querySelector('.close').addEventListener('click', function () {
      clear();
      pin.focus();
    });
    markList();
  }

  // ---- dismissal and repositioning ------------------------------------------

  canvas.addEventListener('click', function (event) {
    if (!event.target.closest('[data-id]') && !event.target.closest('#info')) clear();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (dropdown.isOpen()) dropdown.close(true);
    else clear();
  });

  function reposition() {
    if (selected) map.placeCard(canvas, pinOf(selected), info, 18);
  }
  window.addEventListener('resize', reposition);
  plan.addEventListener('load', reposition);   // the plan sets the canvas height

  map.pauseWhenOffscreen(canvas);
  markList();
}(window.GSL));
