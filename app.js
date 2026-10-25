(() => {
  const siteContent = window.ANTONIA_CONTENT;
  const phone = siteContent.studio.whatsapp;
  const defaultMessage = 'Hola, Antonia Studio. Quisiera consultar sobre sus servicios y disponibilidad para una cita.';
  document.querySelector('#year').textContent = new Date().getFullYear();
  document.querySelectorAll('[data-instagram]').forEach(link => { link.href = siteContent.studio.instagram; });
  document.querySelectorAll('[data-instagram-label]').forEach(link => { link.textContent = siteContent.studio.instagramLabel; });
  document.querySelectorAll('[data-whatsapp-label]').forEach(link => { link.textContent = siteContent.studio.whatsappLabel; });
  document.querySelectorAll('[data-studio-location-short]').forEach(node => { node.textContent = siteContent.studio.locationShort; });
  document.querySelectorAll('[data-site-domain]').forEach(node => { node.textContent = siteContent.studio.domain; });
  document.title = 'Antonia Studio | ' + siteContent.studio.domain;
  document.querySelectorAll('[data-studio-location]').forEach(node => { node.textContent = siteContent.studio.location; });

  const serviceCards = document.querySelector('#service-cards');
  const bookingService = document.querySelector('#booking-service');
  bookingService.replaceChildren(new Option('Elegí un servicio', '', true, true));
  siteContent.services.forEach((service, index) => {
    const card = document.createElement('a');
    card.className = 'service-card';
    card.href = service.id === 'peinados' ? '#galeria' : '#agendar';
    card.dataset.reveal = '';
    const number = document.createElement('span');
    number.className = 'service-number';
    number.textContent = String(index + 1).padStart(2, '0');
    const name = document.createElement('h3');
    name.textContent = service.name;
    const description = document.createElement('p');
    description.textContent = service.description;
    const price = document.createElement('span');
    price.className = 'service-price';
    const priceValue = String(service.price ?? '').trim();
    price.textContent = priceValue ? (typeof service.price === 'number' ? `Gs. ${new Intl.NumberFormat('es-PY').format(service.price)}` : priceValue) : 'Consultar precio';
    const detail = document.createElement('span');
    detail.className = 'service-duration';
    const durationValue = String(service.duration ?? '').trim();
    detail.textContent = durationValue ? `Duración: ${durationValue}` : '';
    const action = document.createElement('span');
    action.className = 'learn-more';
    action.textContent = service.id === 'peinados' ? 'VER TRABAJOS ↗' : 'AGENDAR TURNO ↗';
    card.append(number, name, description, price, detail, action);
    serviceCards.append(card);
    bookingService.add(new Option(service.name, service.name));
  });

  document.querySelectorAll('[data-wa]').forEach(link => {
    const service = link.dataset.service;
    const message = service ? `Hola, Antonia Studio. Quisiera consultar sobre ${service} y disponibilidad para una cita.` : defaultMessage;
    link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    link.target = '_blank'; link.rel = 'noopener noreferrer';
  });
  const bookingForm = document.querySelector('#booking-form');
  const bookingDate = document.querySelector('#booking-date');
  const localToday = new Date();
  localToday.setMinutes(localToday.getMinutes() - localToday.getTimezoneOffset());
  bookingDate.min = localToday.toISOString().slice(0, 10);
  bookingForm.addEventListener('submit', event => {
    event.preventDefault();
    const values = new FormData(bookingForm);
    const [year, month, day] = values.get('date').split('-').map(Number);
    const dateLabel = new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('es-PY', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
    });
    const lines = [
      'Hola, Antonia Studio. Quisiera solicitar un turno.',
      `Nombre: ${values.get('name')}`,
      `Servicio: ${values.get('service')}`,
      `Fecha preferida: ${dateLabel}`,
      `Hora preferida: ${values.get('time')}`
    ];
    if (values.get('notes').trim()) lines.push(`Mensaje: ${values.get('notes').trim()}`);
    const message = encodeURIComponent(lines.join('\n'));
    const status = document.querySelector('#booking-status');
    status.textContent = 'Solicitud preparada. WhatsApp se abrirá para que puedas enviarla y coordinar la confirmación.';
    status.classList.add('is-ready');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank', 'noopener,noreferrer');
  });
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reducedMotion) {
    document.body.classList.add('has-reveal');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    document.querySelectorAll('[data-reveal]').forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
      revealObserver.observe(element);
    });
  }
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#nav');
  const closeMenu = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menú'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); nav.classList.toggle('open', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  const dialog = document.querySelector('.lightbox');
  const content = dialog.querySelector('.lightbox-content');
  const caption = dialog.querySelector('[aria-live]');
  const photos = [
    {src:'assets/coleta-ondas.webp', alt:'Coleta elegante con ondas, realizada en Antonia Studio', label:'Coleta elegante con ondas'},
    {src:'assets/recogido-ondas.webp', alt:'Recogido con ondas y mechones iluminados, realizado en Antonia Studio', label:'Recogido con ondas'},
    {src:'assets/trenza-rizos.webp', alt:'Trenza lateral y rizos definidos, realizado en Antonia Studio', label:'Trenza lateral y rizos definidos'}
  ];
  let current = 0, returnFocus = null;
  const show = index => {
    current = (index + photos.length) % photos.length;
    const photo = photos[current];
    content.replaceChildren(Object.assign(document.createElement('img'), {src:photo.src, alt:photo.alt}));
    caption.textContent = photo.label;
  };
  document.querySelectorAll('[data-gallery]').forEach(item => item.addEventListener('click', () => { returnFocus = item; show(Number(item.dataset.gallery)); dialog.showModal(); dialog.querySelector('.close').focus(); }));
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => returnFocus?.focus());
  dialog.addEventListener('keydown', event => { if (event.key === 'ArrowRight') show(current + 1); if (event.key === 'ArrowLeft') show(current - 1); });
})();








