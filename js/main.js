// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      e.preventDefault();
      const headerOffset = 72;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Menu mobile
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('open');
  });
}

// Ícone do hambúrguer animado (opcional)
if (toggle) {
  toggle.addEventListener('click', () => {
    const spans = toggle.querySelectorAll('span');
    spans[0].style.transform = toggle.classList.contains('open')
      ? 'translateY(5px) rotate(45deg)'
      : '';
    spans[1].style.opacity = toggle.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = toggle.classList.contains('open')
      ? 'translateY(-5px) rotate(-45deg)'
      : '';
  });
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-question');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Fecha outros
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('open');
      }
    });

    // Toggle atual
    if (!isOpen) {
      item.classList.add('open');
    } else {
      item.classList.remove('open');
    }
  });
});
