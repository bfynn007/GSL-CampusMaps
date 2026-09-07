/**
 * campus-list.js — builds the campus directory on campuses.html.
 *
 * A campus with an `href` becomes a row linking to its map. The rest are named
 * in the upcoming panel underneath, so a campus with no map never looks like
 * one that has it, and never offers a dead link.
 *
 * Requires icons.js and data/campuses.js.
 */
(function (GSL) {
  'use strict';

  /** A quiet abstract plan, for a campus whose artwork has not arrived yet. */
  var BLANK_PLAN =
    '<svg viewBox="0 0 320 220" aria-hidden="true">' +
      '<rect width="320" height="220" fill="#f4efe4"/>' +
      '<g stroke="#ded8cb" stroke-width="2" fill="none">' +
        '<path d="M-10 150 L120 60 L210 108 L340 40"/><path d="M60 230 L120 60"/><path d="M210 108 L250 230"/>' +
      '</g>' +
      '<g fill="#e6e0d2">' +
        '<rect x="30" y="70" width="46" height="34" rx="3"/><rect x="140" y="120" width="58" height="40" rx="3"/>' +
        '<rect x="228" y="66" width="40" height="30" rx="3"/><rect x="76" y="150" width="40" height="30" rx="3"/>' +
      '</g>' +
      '<g fill="#dfe6dc">' +
        '<circle cx="255" cy="150" r="15"/><circle cx="278" cy="168" r="11"/><circle cx="102" cy="42" r="13"/>' +
      '</g>' +
    '</svg>';

  /**
   * Build one directory row.
   * @param {object} campus an entry from GSL.campuses
   * @param {number} i position in the list, for the arrival stagger
   * @returns {HTMLLIElement}
   */
  function buildRow(campus, i) {
    var row = document.createElement('li');
    row.className = 'campus';
    row.style.setProperty('--i', i);

    var link = document.createElement('a');
    link.className = 'campus-link';
    link.href = campus.href;

    var plan = document.createElement('span');
    plan.className = 'plan';
    if (campus.thumb) {
      var img = document.createElement('img');
      img.src = campus.thumb;
      img.alt = 'Plan of the ' + campus.name;
      img.loading = 'lazy';
      if (campus.frame) {
        if (campus.frame.zoom) img.style.setProperty('--zoom', campus.frame.zoom);
        if (campus.frame.x) img.style.setProperty('--fx', campus.frame.x);
      }
      // The plan artwork for a campus can arrive after its map does.
      img.addEventListener('error', function () {
        plan.classList.add('blank');
        plan.innerHTML = BLANK_PLAN;
      });
      plan.appendChild(img);
    } else {
      plan.classList.add('blank');
      plan.innerHTML = BLANK_PLAN;
    }

    var marksEl = null;
    if (campus.classTypes && campus.classTypes.length) {
      var marks = document.createElement('span');
      marks.className = 'marks';

      var label = document.createElement('span');
      label.className = 'marks-label';
      label.textContent = 'Classes';
      marks.appendChild(label);

      campus.classTypes.forEach(function (text) {
        var mark = document.createElement('span');
        mark.className = 'mark';
        mark.textContent = text;
        marks.appendChild(mark);
      });
      marksEl = marks;
    }

    var detail = document.createElement('span');
    detail.className = 'detail';

    var name = document.createElement('span');
    name.className = 'name';
    name.textContent = campus.name;

    var place = document.createElement('span');
    place.className = 'place';
    place.innerHTML = GSL.icons.PIN;
    place.appendChild(document.createTextNode(campus.place));

    var note = document.createElement('span');
    note.className = 'note';
    note.textContent = campus.note;

    detail.append(name, place, note);

    var go = document.createElement('span');
    go.className = 'go';
    go.innerHTML = GSL.icons.GO;

    // DOM order is the reading order; the grid handles the visual placement.
    link.appendChild(plan);
    link.appendChild(detail);
    if (marksEl) link.appendChild(marksEl);
    link.appendChild(go);
    row.appendChild(link);
    return row;
  }

  /**
   * Name the campuses that have no map yet, without pretending they do.
   * @param {HTMLElement} host
   * @param {object[]} campuses
   */
  function renderUpcoming(host, campuses) {
    if (!campuses.length) return;

    var lead = document.createElement('b');
    lead.textContent = 'Coming next';

    var list = document.createElement('ul');
    campuses.forEach(function (campus) {
      var item = document.createElement('li');
      item.textContent = campus.name;
      list.appendChild(item);
    });

    var aside = document.createElement('p');
    aside.className = 'aside';
    aside.textContent = 'These campuses are being mapped out.';

    host.append(lead, list, aside);
    host.hidden = false;
  }

  var mapped = GSL.campuses.filter(function (c) { return Boolean(c.href); });
  var upcoming = GSL.campuses.filter(function (c) { return !c.href; });

  var list = document.getElementById('list');
  mapped.forEach(function (campus, i) { list.appendChild(buildRow(campus, i)); });

  renderUpcoming(document.getElementById('upcoming'), upcoming);
}(window.GSL));
