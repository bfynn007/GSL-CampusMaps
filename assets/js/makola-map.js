/**
 * makola-map.js — the Makola campus map.
 *
 * Makola is the fully surveyed campus: every building has a traced footprint,
 * the dropdown searches rooms as well as buildings, and the clinic and
 * washrooms each get their own overlay layer.
 *
 * Requires icons.js, map-core.js and data/makola.js.
 */
(function (GSL) {
  'use strict';

  var map = GSL.map;
  var esc = map.esc;
  var PLACES = GSL.campus.places;
  var SERVICES = GSL.campus.services;
  var PLAN = GSL.campus.plan;

  var canvas = document.getElementById('canvas');
  var shapes = document.getElementById('shapes');
  var pins = document.getElementById('pins');
  var svcpins = document.getElementById('svcpins');
  var info = document.getElementById('info');
  var list = document.getElementById('list');
  var badge = document.getElementById('badge');
  var search = document.getElementById('q');

  var shapeOf = function (id) { return shapes.querySelector('[data-id="' + id + '"]'); };
  // Deliberately document-wide: this also finds pointers in the service layer.
  var pinOf = function (id) { return document.querySelector('.pin[data-id="' + id + '"]'); };

  /** A plan coordinate as a percentage of the plan's own coordinate space. */
  function toPercent(point) {
    return { x: point[0] / PLAN.width * 100, y: point[1] / PLAN.height * 100 };
  }

  // ---- map layers -----------------------------------------------------------

  shapes.innerHTML =
    Object.entries(PLACES).map(function (entry) {
      return '<polygon class="shape" data-id="' + esc(entry[0]) + '" points="' + entry[1].shape + '"/>';
    }).join('') +
    // A service unit that occupies part of a building gets its own outline on top.
    Object.values(SERVICES).flatMap(function (service) {
      return service.points.filter(function (point) { return point.shape; }).map(function (point) {
        return '<polygon class="shape svc-shape" data-shape="' + esc(point.key) + '" points="' + point.shape + '"/>';
      });
    }).join('');

  pins.innerHTML = Object.entries(PLACES).map(function (entry, i) {
    var position = toPercent(entry[1].pin);
    return map.pinHtml({
      id: entry[0], name: entry[1].name,
      xPercent: position.x, yPercent: position.y,
      index: i, ring: true
    });
  }).join('');

  /** Every service point, reachable by key whichever layer it belongs to. */
  var SVC_POINTS = {};
  Object.entries(SERVICES).forEach(function (entry) {
    entry[1].points.forEach(function (point) {
      SVC_POINTS[point.key] = Object.assign({ service: entry[0], tone: entry[1].tone }, point);
    });
  });

  // ---- search index: every place, plus every room inside it ------------------

  var index = Object.entries(PLACES).flatMap(function (entry) {
    var id = entry[0];
    var place = entry[1];
    return [{
      id: id,
      label: place.name,
      sub: null,
      hay: (place.name + ' ' + (place.also || []).join(' ')).toLowerCase()
    }].concat((place.rooms || []).map(function (room) {
      return { id: id, label: room, sub: place.name, hay: room.toLowerCase() };
    }));
  });

  var selected = null;
  var svcSelected = null;
  var activeService = null;
  var rows = [];
  var activeRow = -1;

  badge.textContent = Object.keys(PLACES).length;

  /** Redraw the dropdown list for the current search term. */
  function renderList() {
    var needle = search.value.trim().toLowerCase();
    rows = needle
      ? index.filter(function (row) { return row.hay.includes(needle); })
      : index.filter(function (row) { return !row.sub; });   // buildings only, when idle
    activeRow = -1;

    if (!rows.length) {
      list.innerHTML = '<li class="empty"><b>No match for &ldquo;' + esc(search.value.trim()) + '&rdquo;</b>' +
        'Try a building name, or an office such as Registry or Bookshop.</li>';
      return;
    }

    list.innerHTML = rows.map(function (row, i) {
      var current = row.id === selected && !row.sub;
      return '<li role="none">' +
        '<button type="button" role="option" data-i="' + i + '" data-id="' + esc(row.id) + '"' +
        ' data-room="' + esc(row.sub ? row.label : '') + '"' +
        (current ? ' aria-current="true" aria-selected="true"' : ' aria-selected="false"') + '>' +
          '<span class="glyph">' + (row.sub ? GSL.icons.DOOR : GSL.icons.PIN) + '</span>' +
          '<span class="txt"><b>' + esc(row.label) + '</b>' +
          (row.sub ? '<small>in ' + esc(row.sub) + '</small>' : '') + '</span>' +
        '</button></li>';
    }).join('');
  }

  // ---- locations dropdown ---------------------------------------------------

  var dropdown = map.createDropdown({
    button: document.getElementById('browseBtn'),
    panel: document.getElementById('browsePanel'),
    onOpen: function () {
      search.value = '';
      renderList();
      search.focus();
    }
  });

  /** Move the keyboard highlight through the list, wrapping at both ends. */
  function setActiveRow(i) {
    var buttons = list.querySelectorAll('button[data-i]');
    if (!buttons.length) return;
    activeRow = (i + buttons.length) % buttons.length;
    buttons.forEach(function (button) { button.classList.remove('active'); });
    buttons[activeRow].classList.add('active');
    buttons[activeRow].scrollIntoView({ block: 'nearest' });
  }

  search.addEventListener('input', renderList);
  search.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveRow(activeRow + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveRow(activeRow - 1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      var row = rows[activeRow >= 0 ? activeRow : 0];
      if (row) pick(row.id, row.sub ? row.label : '');
    }
  });

  list.addEventListener('click', function (event) {
    var button = event.target.closest('button[data-id]');
    if (button) pick(button.dataset.id, button.dataset.room || '');
  });

  /**
   * Picking from the dropdown closes it first, so the panel and the details
   * card are never on screen together and the map stays readable on small
   * screens.
   */
  function pick(id, room) {
    dropdown.close(false);
    if (activeService) setService(null);
    select(id, room, true);
    canvas.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ---- pointers and shapes light each other up ------------------------------

  function hot(id, on) {
    var shape = shapeOf(id);
    var pin = pinOf(id);
    if (shape) shape.classList.toggle('hot', on && id !== selected);
    if (pin) pin.classList.toggle('hot', on && id !== selected);
  }

  map.delegatePlaceEvents([shapes, pins], {
    onHot: hot,
    onSelect: function (id) { select(id, ''); }
  });

  // ---- selection ------------------------------------------------------------

  function clear() {
    if (svcSelected) {
      var svcPin = pinOf(svcSelected);
      if (svcPin) svcPin.classList.remove('on');
      svcSelected = null;
      info.hidden = true;
    }
    if (!selected) return;
    var shape = shapeOf(selected);
    var pin = pinOf(selected);
    if (shape) shape.classList.remove('on', 'flash');
    if (pin) pin.classList.remove('on');   // dropping .on puts it back in the loop
    selected = null;
    info.hidden = true;
  }

  /**
   * Build the details card for one building.
   * @param {object} place an entry from GSL.campus.places
   * @param {string} room a room name to highlight, or ''
   * @returns {string}
   */
  function cardHtml(place, room) {
    var count = place.rooms ? place.rooms.length : 0;
    return '<button type="button" class="close" aria-label="Close details">' + GSL.icons.CLOSE + '</button>' +
      '<h2 id="info-title">' + esc(place.name) + '</h2>' +
      '<p class="desc">' + esc(place.desc) + '</p>' +
      '<div class="facts">' +
        '<span class="fact">' + GSL.icons.NEAR + 'Near ' + esc(place.near) + '</span>' +
        (count ? '<span class="fact tally">' + GSL.icons.ROOM + count +
          (count === 1 ? ' listing' : ' listings') + '</span>' : '') +
        (place.restricted ? '<span class="fact warn">' + GSL.icons.LOCK + 'No student access</span>' : '') +
      '</div>' +
      (count
        ? '<h3>Inside this building</h3><ul class="rooms">' +
          place.rooms.map(function (entry) {
            return '<li' + (entry === room ? ' class="match"' : '') + '>' + esc(entry) + '</li>';
          }).join('') +
          '</ul>'
        : '');
  }

  /**
   * @param {string} id
   * @param {string} room a room name to highlight in the card, or ''
   * @param {boolean} [flash] pulse the footprint, for a pick made from the list
   */
  function select(id, room, flash) {
    var place = PLACES[id];
    if (!place) return;

    if (selected) {
      var wasShape = shapeOf(selected);
      var wasPin = pinOf(selected);
      if (wasShape) wasShape.classList.remove('on', 'flash');
      if (wasPin) wasPin.classList.remove('on');
    }
    selected = id;

    var shape = shapeOf(id);
    shape.classList.remove('hot');
    shape.classList.add('on');
    if (flash) {
      shape.classList.remove('flash');
      void shape.getBBox();               // force a reflow so the pulse restarts
      shape.classList.add('flash');
    }

    var pin = pinOf(id);
    pin.classList.add('on');              // stops the bounce and lands the pointer
    pin.classList.remove('hot');

    info.innerHTML = cardHtml(place, room);
    info.hidden = false;
    map.replayEntrance(info, function () { map.placeCard(canvas, pin, info); });
    info.querySelector('.close').addEventListener('click', function () {
      clear();
      pin.focus();
    });
  }

  // ---- emergency service layers ---------------------------------------------

  /**
   * Show one service layer, or clear all of them. Calling this with the layer
   * that is already showing turns it off.
   * @param {string|null} key a key of GSL.campus.services
   */
  function setService(key) {
    clear();

    // Wipe whatever layer was showing.
    shapes.querySelectorAll('.tone-red,.tone-blue,.soft-red,.soft-blue').forEach(function (el) {
      el.classList.remove('tone-red', 'tone-blue', 'soft-red', 'soft-blue');
    });

    var turningOff = activeService === key || !key;
    Object.values(SERVICES).forEach(function (service) {
      document.getElementById(service.button)
        .setAttribute('aria-pressed', String(!turningOff && service === SERVICES[key]));
    });

    if (turningOff) {
      activeService = null;
      svcpins.hidden = true;
      svcpins.innerHTML = '';
      pins.classList.remove('dim');
      return;
    }

    var service = SERVICES[key];
    activeService = key;
    svcpins.innerHTML = service.points.map(function (point, i) {
      var position = toPercent(point.pin);
      return map.pinHtml({
        id: point.key, name: point.name,
        xPercent: position.x, yPercent: position.y,
        index: i, className: 'tone-' + service.tone,
        data: { svc: point.key }, ring: true
      });
    }).join('');
    svcpins.hidden = false;
    pins.classList.add('dim');

    // Tint every building that holds one of these, so the whole area reads at
    // a glance; where the unit has its own footprint, that gets the stronger fill.
    service.points.forEach(function (point) {
      var own = point.shape && shapes.querySelector('[data-shape="' + point.key + '"]');
      var parent = shapeOf(point.parent);
      if (parent) parent.classList.add((own ? 'soft-' : 'tone-') + service.tone);
      if (own) own.classList.add('tone-' + service.tone);
    });
  }

  function selectService(key) {
    var point = SVC_POINTS[key];
    if (!point) return;

    if (svcSelected) {
      var was = pinOf(svcSelected);
      if (was) was.classList.remove('on');
    }
    svcSelected = key;

    var pin = pinOf(key);
    pin.classList.add('on');

    var isClinic = point.service === 'clinic';
    info.innerHTML =
      '<button type="button" class="close" aria-label="Close details">' + GSL.icons.CLOSE + '</button>' +
      '<h2 id="info-title">' + esc(point.name) + '</h2>' +
      '<p class="desc">' + esc(point.desc) + '</p>' +
      '<div class="facts">' +
        '<span class="fact ' + (isClinic ? 'clinic' : 'wc') + '">' +
        (isClinic ? GSL.icons.CROSS : GSL.icons.WC) + esc(SERVICES[point.service].name) + '</span>' +
        '<span class="fact">' + GSL.icons.NEAR + 'In ' + esc(PLACES[point.parent].name) + '</span>' +
      '</div>' +
      '<p class="where"><b>How to find it</b>' + esc(point.where) + '</p>';

    info.hidden = false;
    map.replayEntrance(info, function () { map.placeCard(canvas, pin, info); });
    info.querySelector('.close').addEventListener('click', function () {
      clear();
      pin.focus();
    });
  }

  svcpins.addEventListener('click', function (event) {
    var el = event.target.closest('[data-svc]');
    if (el) selectService(el.dataset.svc);
  });

  Object.keys(SERVICES).forEach(function (key) {
    document.getElementById(SERVICES[key].button)
      .addEventListener('click', function () { setService(key); });
  });

  // ---- labels on / off ------------------------------------------------------

  map.createLabelsToggle(document.getElementById('btnLabels'), function (visible) {
    pins.classList.toggle('off', !visible);
  });

  // ---- dismissal and repositioning ------------------------------------------

  canvas.addEventListener('click', function (event) {
    if (!event.target.closest('[data-id]') && !event.target.closest('#info')) clear();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (dropdown.isOpen()) dropdown.close(true);
    else clear();
  });

  window.addEventListener('resize', function () {
    var open = selected || svcSelected;
    if (open) map.placeCard(canvas, pinOf(open), info);
  });

  map.pauseWhenOffscreen(canvas);
  renderList();
}(window.GSL));
