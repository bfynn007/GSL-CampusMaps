/**
 * home.js — builds the campus grid on the index page.
 *
 * Requires icons.js and data/campuses.js.
 */
(function (GSL) {
  'use strict';

  /** A quiet abstract plan, so an unmapped campus still looks designed. */
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
   * Replace a thumbnail with the placeholder art. Used both for campuses with
   * no map yet and for a plan image that fails to load.
   * @param {HTMLElement} thumb
   * @param {string} label text for the corner tag
   * @param {boolean} muted true for a campus with no map behind the card
   */
  function renderBlankThumb(thumb, label, muted) {
    thumb.classList.add('blank');
    thumb.innerHTML = BLANK_PLAN +
      '<span class="tag' + (muted ? ' soon' : '') + '">' + label + '</span>';
  }

  /**
   * Build one campus card. Live campuses become links; the rest are inert
   * divs, so there is never a dead link to click.
   * @param {object} campus an entry from GSL.campuses
   * @returns {HTMLElement}
   */
  function buildCard(campus) {
    var live = Boolean(campus.href);
    var card = document.createElement(live ? 'a' : 'div');
    card.className = 'card';
    if (live) card.href = campus.href;

    var thumb = document.createElement('div');
    thumb.className = 'thumb';

    if (live && campus.thumb) {
      var img = document.createElement('img');
      img.src = campus.thumb;
      img.alt = 'Plan of the ' + campus.name;
      img.loading = 'lazy';
      // The artwork for a campus can arrive after its map does.
      img.addEventListener('error', function () {
        renderBlankThumb(thumb, 'Open map', false);
      });
      thumb.appendChild(img);
      thumb.insertAdjacentHTML('beforeend', '<span class="tag">Open map</span>');
    } else {
      renderBlankThumb(thumb, 'Coming soon', true);
    }

    var body = document.createElement('div');
    body.className = 'card-body';

    var heading = document.createElement('h2');
    heading.textContent = campus.name;

    var place = document.createElement('p');
    place.textContent = campus.place;

    var note = document.createElement('p');
    note.textContent = campus.note;

    var foot = document.createElement('span');
    if (live) {
      foot.className = 'foot';
      foot.innerHTML = 'View campus map ' + GSL.icons.GO;
    } else {
      foot.className = 'foot muted';
      foot.textContent = 'Not yet available';
    }

    body.append(heading, place, note, foot);
    card.append(thumb, body);
    return card;
  }

  var grid = document.getElementById('grid');
  GSL.campuses.forEach(function (campus) {
    grid.appendChild(buildCard(campus));
  });
}(window.GSL));
