// js/menu-data.js
// Fonte única do menu (desktop + mobile)
// Edite só aqui para adicionar/remover páginas.

export const MENU = {
  brand: {
    name: "BRsys",
    tagline: "Tecnologia para Hotelaria",
    logo: "img/logo.svg",
    home: "index.html",
  },

  ctas: {
    primary: { label: "Agendar demo", href: "#contato" },
    secondary: { label: "Baixar materiais", href: "#recursos" },
  },

  items: [
    { type: "link", label: "Plataforma", href: "#plataforma" },

    {
      type: "dropdown",
      label: "PMS",
      columns: [
        {
          title: "Por tipo de hospedagem",
          links: [
            { label: "Pousada", href: "sistema-para-pousada.html" },
            { label: "Hotel pequeno", href: "pms-para-hotel-pequeno.html" },
            { label: "Hotel fazenda", href: "sistema-hotel-fazenda.html" },
            { label: "Day use", href: "pms-day-use.html" },
          ],
        },
        {
          title: "Por objetivo",
          links: [
            { label: "Reservas e ocupação", href: "sistema-de-reservas-para-pousada.html" },
            { label: "Recepção e check-in", href: "programa-controle-recepcao.html" },
            { label: "Gestão completa", href: "software-para-hotelaria.html" },
          ],
        },
        {
          title: "Comece por aqui",
          highlight: true,
          links: [
            { label: "Solução completa (PMS + Site)", href: "sistema-para-pousada-com-site-integrado.html", cta: true },
          ],
          note: "O caminho mais rápido para reservas diretas.",
        },
      ],
    },

    {
      type: "dropdown",
      label: "Reservas Diretas",
      columns: [
        {
          title: "Estratégia",
          links: [
            { label: "Vender direto sem Booking", href: "como-vender-direto-sem-booking.html" },
            { label: "Simulador: Receita Direta", href: "simulador-receita-direta.html" },
            { label: "Simulador: ROI (PMS + Site)", href: "simulador-roi-pms-site.html" },
          ],
        },
        {
          title: "Operação",
          links: [
            { label: "WhatsApp para hotelaria", href: "whatsapp-para-hotel.html" },
            { label: "Motor de reservas", href: "motor-de-reservas.html" },
            { label: "Pré-check-in", href: "simulador-checkin.html" },
          ],
        },
      ],
    },

    {
      type: "dropdown",
      label: "Marketing",
      columns: [
        {
          title: "Google / SEO",
          links: [
            { label: "SEO para pousadas", href: "seo-para-pousadas.html" },
            { label: "SEO local para hotéis", href: "seo-local-hoteis.html" },
            { label: "Site para hotel", href: "site-para-hotel.html" },
            { label: "Hotel no interior", href: "site-hotel-interior.html" },
          ],
        },
        {
          title: "Conteúdos",
          links: [
            { label: "Como modernizar pousadas", href: "como-modernizar-pousadas.html" },
            { label: "Como divulgar no Google", href: "como-divulgar-pousada-no-google.html" },
            { label: "Marketing para hotelaria", href: "marketing-digital-para-hotelaria.html" },
          ],
        },
      ],
    },

    {
      type: "dropdown",
      label: "Gestão",
      columns: [
        {
          title: "Recepção / Rotinas",
          links: [
            { label: "Checklist recepção", href: "checklist-recepcao-hotel.html" },
            { label: "Checklist gestão", href: "checklist-gestao-hotel.html" },
            { label: "Evitar overbooking", href: "como-evitar-overbooking.html" },
          ],
        },
        {
          title: "Regulatório",
          links: [
            { label: "FNRH Digital", href: "fnrh-digital-hotel.html" },
            { label: "Implantação", href: "implantacao-sistema.html" },
          ],
        },
      ],
    },

    {
      type: "dropdown",
      label: "Destinos",
      columns: [
        {
          title: "Litoral SP",
          links: [
            { label: "Peruíbe", href: "peruibe/index.html" },
            { label: "Itanhaém", href: "itanhaem/index.html" },
            { label: "Mongaguá", href: "mongagua/index.html" },
          ],
        },
      ],
    },

    {
      type: "dropdown",
      label: "Recursos",
      columns: [
        {
          title: "Simuladores",
          links: [
            { label: "Comissão Booking", href: "simulador-comissao-booking.html" },
            { label: "Ocupação", href: "simulador-ocupacao-pousada.html" },
            { label: "Planilha vs PMS", href: "simulador-planilha-vs-pms.html" },
          ],
        },
        {
          title: "Modelos / Materiais",
          links: [
            { label: "Planilha de reservas", href: "planilha-controle-reservas-hotel.html" },
            { label: "Modelos (documentos)", href: "modelos/index.html" },
            { label: "Ebook hotelaria (lead)", href: "ebook-hotelaria-moderna.html" },
          ],
        },
      ],
    },

    { type: "link", label: "Contato", href: "#contato" },
  ],
};
