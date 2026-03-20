(function () {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = -200, my = -200, rx = -200, ry = -200;
  const LERP = 0.2;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
  });

  (function loop() {
    rx += (mx - rx - 14) * LERP;
    ry += (my - ry - 14) * LERP;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, .course-card, .teach-item, .blog-card, .cert-card, .skill-chip, .roadmap-domain, .contact-row, .why-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '44px'; ring.style.height = '44px';
      ring.style.borderColor = 'rgba(245,166,35,0.7)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '28px'; ring.style.height = '28px';
      ring.style.borderColor = 'rgba(245,166,35,0.4)';
    });
  });

  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
})();
