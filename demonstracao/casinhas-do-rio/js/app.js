// /js/app.js
// Demo Casinhas do Rio — BRsys

(function () {
  // WhatsApp oficial — Denise (Casinhas do Rio)
  const WHATSAPP_NUMBER = "554191530772";

  const defaultMessage =
    "Olá, Denise! 😊 Vim pela demonstração do site das Casinhas do Rio. " +
    "Gostaria de ver disponibilidade/valores e tirar uma dúvida, quando puder.";

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultMessage)}`;

  const ids = [
    "ctaHeroWhatsapp",
    "ctaCasinhasWhatsapp",
    "ctaReserveWhatsapp",
    "waFloat"
  ];

  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute("href", url);
  });

  // UX: esconder botão flutuante quando o hero estiver visível
  const waFloat = document.getElementById("waFloat");
  const hero = document.querySelector(".hero");

  if (waFloat && hero) {
    const obs = new IntersectionObserver(
      (entries) => {
        const inView = entries[0]?.isIntersecting;
        waFloat.style.opacity = inView ? "0" : "1";
        waFloat.style.pointerEvents = inView ? "none" : "auto";
        waFloat.style.transform = inView ? "translateY(8px)" : "translateY(0)";
      },
      { threshold: 0.35 }
    );
    obs.observe(hero);
  }
})();

