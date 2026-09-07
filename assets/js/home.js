/**
 * home.js — the landing page.
 *
 * The page is static markup; the only behaviour it needs is to stop the
 * pointers looping once the illustrated plan has scrolled out of view.
 */
(function () {
  'use strict';

  var canvas = document.getElementById('heroCanvas');
  if (!canvas || !window.IntersectionObserver) return;

  new IntersectionObserver(function (entries) {
    canvas.classList.toggle('rest', !entries[0].isIntersecting);
  }, { threshold: 0 }).observe(canvas);
}());
