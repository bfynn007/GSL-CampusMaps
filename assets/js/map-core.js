/**
 * map-core.js — behaviour shared by every campus map page.
 *
 * The three map pages differ in what they draw on the plan (traced footprints
 * on Makola, halos on the precinct maps) but agree on everything around it:
 * the bouncing pointers, the locations dropdown, the anchored details card and
 * the labels toggle. That common half lives here.
 *
 * Requires icons.js. Load before the per-page controller.
 */
window.GSL = window.GSL || {};

(function (GSL) {
  'use strict';

  /** Below this width the details card becomes a bottom sheet in CSS. */
  var SHEET_BREAKPOINT = '(max-width:720px)';

  /**
   * Escape a value for interpolation into an HTML template string.
   * @param {*} value
   * @returns {string}
   */
  function esc(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /**
   * Give each pointer its own phase and period, so a dozen of them read as
   * alive rather than as one metronome.
   * @param {number} index position of the pointer in its layer
   * @returns {{delay:number, duration:string}}
   */
  function bobTiming(index) {
    return {
      delay: (index * 149) % 1900,
      duration: (1.8 + (index % 5) * 0.11).toFixed(2)
    };
  }

  /**
   * Markup for one bouncing map pointer.
   *
   * @param {object} options
   * @param {string} options.id          value for the data-id hook
   * @param {string} options.name        the label, also the accessible name
   * @param {number} options.xPercent    horizontal position within the plan
   * @param {number} options.yPercent    vertical position within the plan
   * @param {number} [options.index=0]   position in the layer, for the bob timing
   * @param {string} [options.className] extra classes, e.g. a colour tone
   * @param {object} [options.data]      extra data-* attributes
   * @param {boolean} [options.ring]     include the pulsing selection ring
   * @returns {string}
   */
  function pinHtml(options) {
    var timing = bobTiming(options.index || 0);
    var extraData = Object.keys(options.data || {})
      .map(function (key) { return ' data-' + key + '="' + esc(options.data[key]) + '"'; })
      .join('');

    return '<button type="button" class="pin' + (options.className ? ' ' + options.className : '') + '"' +
      ' data-id="' + esc(options.id) + '"' + extraData +
      ' style="left:' + options.xPercent.toFixed(2) + '%; top:' + options.yPercent.toFixed(2) + '%;' +
      ' --d:' + timing.delay + 'ms; --dur:' + timing.duration + 's"' +
      ' aria-label="' + esc(options.name) + '">' +
        '<span class="bob"><span class="chip">' + esc(options.name) + '</span>' + GSL.icons.ARROW + '</span>' +
        '<span class="ground"></span>' +
        (options.ring ? '<span class="ring"></span>' : '') +
      '</button>';
  }

  /**
   * Wire up the locations dropdown: the toggle button, click-outside to close,
   * and the aria-expanded state the CSS keys off.
   *
   * @param {object} options
   * @param {HTMLElement} options.button  the .browse-btn
   * @param {HTMLElement} options.panel   the .panel it controls
   * @param {Function} [options.onOpen]   run each time the panel opens
   * @returns {{open:Function, close:Function, isOpen:Function}}
   */
  function createDropdown(options) {
    var button = options.button;
    var panel = options.panel;

    function isOpen() {
      return !panel.hidden;
    }

    function open() {
      panel.hidden = false;
      button.setAttribute('aria-expanded', 'true');
      if (options.onOpen) options.onOpen();
    }

    function close(refocus) {
      if (panel.hidden) return;
      panel.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      if (refocus) button.focus();
    }

    button.addEventListener('click', function () {
      if (isOpen()) close(false); else open();
    });

    document.addEventListener('pointerdown', function (event) {
      if (isOpen() && !event.target.closest('.browse')) close(false);
    });

    return { open: open, close: close, isOpen: isOpen };
  }

  /**
   * Wire up a labels on/off toggle button.
   *
   * @param {HTMLElement} button
   * @param {function(boolean):void} onChange called with the new visible state
   */
  function createLabelsToggle(button, onChange) {
    button.addEventListener('click', function () {
      var visible = button.getAttribute('aria-pressed') !== 'true';
      button.setAttribute('aria-pressed', String(visible));
      onChange(visible);
    });
  }

  /**
   * Anchor the details card clear of the pointer's whole box (chip, arrow and
   * shadow) so the place you just picked is never hidden by the card
   * describing it. Clamped to stay inside the map.
   *
   * No-op on narrow screens, where the card is a bottom sheet instead.
   *
   * @param {HTMLElement} canvas the positioned map box
   * @param {HTMLElement} anchor the pointer to sit beside
   * @param {HTMLElement} card   the .info element
   * @param {number} [gap=16]    clearance between pointer and card, in px
   */
  function placeCard(canvas, anchor, card, gap) {
    if (window.matchMedia(SHEET_BREAKPOINT).matches) return;

    var space = gap == null ? 16 : gap;
    var edge = 10;
    var box = canvas.getBoundingClientRect();
    var pin = anchor.getBoundingClientRect();
    var width = card.offsetWidth;
    var height = card.offsetHeight;

    var pinLeft = pin.left - box.left;
    var pinRight = pin.right - box.left;
    var anchorY = (pin.top + pin.bottom) / 2 - box.top;

    // Prefer the right of the pointer, fall back to the left, then centre it.
    var left = pinRight + space;
    var originX = '0%';
    if (left + width > box.width - edge) {
      left = pinLeft - space - width;
      originX = '100%';
    }
    if (left < edge) {
      left = Math.min(
        Math.max(edge, (pinLeft + pinRight) / 2 - width / 2),
        Math.max(edge, box.width - width - edge)
      );
      originX = '50%';
    }

    var top = Math.min(Math.max(edge, anchorY - height / 2), Math.max(edge, box.height - height - edge));
    var originY = Math.min(100, Math.max(0, (anchorY - top) / height * 100)).toFixed(0) + '%';

    card.style.setProperty('--px', left.toFixed(1) + 'px');
    card.style.setProperty('--py', top.toFixed(1) + 'px');
    card.style.setProperty('--ox', originX);
    card.style.setProperty('--oy', originY);
  }

  /**
   * Replay the card's entrance animation for a fresh selection. The card is
   * positioned while the animation is suppressed, so it does not slide in from
   * wherever the previous selection left it.
   *
   * @param {HTMLElement} card
   * @param {Function} reposition runs with the animation suppressed
   */
  function replayEntrance(card, reposition) {
    card.style.animation = 'none';
    reposition();
    void card.offsetWidth;      // force a reflow so the animation restarts
    card.style.animation = '';
  }

  /**
   * A dozen looping pointers are not worth running while the map is off
   * screen; .rest pauses every loop inside the canvas.
   *
   * @param {HTMLElement} canvas
   */
  function pauseWhenOffscreen(canvas) {
    if (!window.IntersectionObserver) return;
    new IntersectionObserver(function (entries) {
      canvas.classList.toggle('rest', !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(canvas);
  }

  /**
   * Forward pointer, keyboard-focus and click events on any descendant
   * carrying data-id to the given handlers. Used to light a place up on hover
   * and select it on click.
   *
   * @param {HTMLElement|HTMLElement[]} roots
   * @param {object} handlers
   * @param {function(string, boolean):void} [handlers.onHot] id, entering
   * @param {function(string):void} [handlers.onSelect] id
   */
  function delegatePlaceEvents(roots, handlers) {
    [].concat(roots).forEach(function (root) {
      function hit(event) {
        return event.target.closest('[data-id]');
      }
      if (handlers.onHot) {
        root.addEventListener('pointerover', function (e) { var el = hit(e); if (el) handlers.onHot(el.dataset.id, true); });
        root.addEventListener('pointerout', function (e) { var el = hit(e); if (el) handlers.onHot(el.dataset.id, false); });
        root.addEventListener('focusin', function (e) { var el = hit(e); if (el) handlers.onHot(el.dataset.id, true); });
        root.addEventListener('focusout', function (e) { var el = hit(e); if (el) handlers.onHot(el.dataset.id, false); });
      }
      if (handlers.onSelect) {
        root.addEventListener('click', function (e) { var el = hit(e); if (el) handlers.onSelect(el.dataset.id); });
      }
    });
  }

  GSL.map = {
    SHEET_BREAKPOINT: SHEET_BREAKPOINT,
    esc: esc,
    pinHtml: pinHtml,
    createDropdown: createDropdown,
    createLabelsToggle: createLabelsToggle,
    placeCard: placeCard,
    replayEntrance: replayEntrance,
    pauseWhenOffscreen: pauseWhenOffscreen,
    delegatePlaceEvents: delegatePlaceEvents
  };
}(window.GSL));
