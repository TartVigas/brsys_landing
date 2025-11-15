// ===============================
// Smooth Scroll para links internos
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      event.preventDefault();
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


// ===============================
// Menu Mobile (abrir/fechar)
// ===============================
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('open');
  });
}


// ===============================
// Animação do botão hambúrguer
// ===============================
if (toggle) {
  toggle.addEventListener('click', () => {
    const spans = toggle.querySelectorAll('span');

    if (spans.length === 3) {
      const isOpen = toggle.classList.contains('open');

      spans[0].style.transform = isOpen
        ? 'translateY(6px) rotate(45deg)'
        : '';

      spans[1].style.opacity = isOpen ? '0' : '1';

      spans[2].style.transform = isOpen
        ? 'translateY(-6px) rotate(-45deg)'
        : '';
    }
  });
}


// ===============================
// FAQ Accordion
// ===============================
document.querySelectorAll('.faq-item').forEach(item => {
  const button = item.querySelector('.faq-question');

  if (!button) return;

  button.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Fecha todas antes de abrir a atual
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('open');
      }
    });

    // Toggle da atual
    item.classList.toggle('open', !isOpen);
  });
});
