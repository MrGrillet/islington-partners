(() => {
  const header = document.querySelector('header');

  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.setAttribute('aria-expanded', String(!menu.classList.contains('hidden')));
    toggle.addEventListener('click', () => {
      requestAnimationFrame(() => {
        toggle.setAttribute('aria-expanded', String(!menu.classList.contains('hidden')));
      });
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const sections = [...document.querySelectorAll('main > section')];
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    sections.forEach((section, index) => {
      if (index === 0) return;
      section.classList.add('reveal-ready');
      observer.observe(section);
    });
  }
})();
