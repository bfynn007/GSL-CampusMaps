/**
 * home.js — builds the campus list on the index page.
 *
 * A campus with an `href` gets a full card. The rest are named in a quieter
 * strip underneath, so a campus that has no map yet never looks like one that
 * does, and never offers a dead link.
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
   * Build one campus card. Every card here links to a working map, so the card
   * is always an anchor.
   * @param {object} campus an entry from GSL.campuses
   * @param {number} i position in the grid, for the arrival stagger
   * @returns {HTMLAnchorElement}
   */
  function buildCard(campus, i) {
    var card = document.createElement('a');
    card.className = 'card';
    card.href = campus.href;
    card.style.setProperty('--i', i);

    var thumb = document.createElement('div');
    thumb.className = 'thumb';

    if (campus.thumb) {
      var img = document.createElement('img');
      img.src = campus.thumb;
      img.alt = 'Plan of the ' + campus.name;
      img.loading = 'lazy';
      // The plan artwork for a campus can arrive after its map does.
      img.addEventListener('error', function () {
        thumb.classList.add('blank');
        thumb.innerHTML = BLANK_PLAN + '<span class="tag">Open map</span>';
      });
      thumb.appendChild(img);
    } else {
      thumb.classList.add('blank');
      thumb.innerHTML = BLANK_PLAN;
    }
    thumb.insertAdjacentHTML('beforeend', '<span class="tag">Open map</span>');

    var body = document.createElement('div');
    body.className = 'card-body';

    var name = document.createElement('h3');
    name.textContent = campus.name;

    var place = document.createElement('p');
    place.className = 'place';
    place.innerHTML = GSL.icons.PIN;
    place.appendChild(document.createTextNode(campus.place));

    var note = document.createElement('p');
    note.className = 'note';
    note.textContent = campus.note;

    var foot = document.createElement('span');
    foot.className = 'foot';
    foot.innerHTML = 'View campus map ' + GSL.icons.GO;

    body.append(name, place, note, foot);
    card.append(thumb, body);
    return card;
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

  var grid = document.getElementById('grid');
  mapped.forEach(function (campus, i) { grid.appendChild(buildCard(campus, i)); });

  renderUpcoming(document.getElementById('upcoming'), upcoming);

  // The hero pointers loop, so let them rest once the preview scrolls away.
  var heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas && window.IntersectionObserver) {
    new IntersectionObserver(function (entries) {
      heroCanvas.classList.toggle('rest', !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(heroCanvas);
  }
}(window.GSL));
