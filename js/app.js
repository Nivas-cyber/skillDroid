/* SkillDroid.in — App */

// Nav scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
function toggleMenu() {
  document.getElementById('navLinks')?.classList.toggle('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('nav')) document.getElementById('navLinks')?.classList.remove('open');
});

// Reveal
let observer = null;
function initReveal() {
  if (observer) observer.disconnect();
  observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } });
  }, { threshold: 0.06 });
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.revealed)').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('revealed');
      else observer.observe(el);
    });
  }, 100);
}

// Page nav
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id)?.classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('nav-' + id)?.classList.add('active');
  document.getElementById('navLinks')?.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  initReveal();
  if (id === 'home') animateCounters();
}

// Counters
const SUFFIXES = { 500: '+', 6: '', 15: '+', 98: '%' };
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = SUFFIXES[target] ?? '';
    let count = 0;
    const step = target / 60;
    function tick() {
      count += step;
      if (count < target) { el.textContent = Math.ceil(count) + suffix; requestAnimationFrame(tick); }
      else el.textContent = target + suffix;
    }
    tick();
  });
}

// Contact form
function handleContactSubmit() {
  const inputs = document.querySelectorAll('.contact-inner .form-input');
  const name   = inputs[0]?.value.trim() || 'a visitor';
  const select = document.querySelector('.contact-inner .form-select');
  const course = select?.value || 'your courses';
  const msg = encodeURIComponent(`Hi, I'm ${name}. I'm interested in: ${course}.`);
  window.open(`https://wa.me/916305847394?text=${msg}`, '_blank');
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  setTimeout(animateCounters, 500);
});
