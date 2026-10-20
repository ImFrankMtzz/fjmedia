// Formulario de contacto sin servidor: valida, arma el mensaje y abre wa.me con él.

const form = document.querySelector<HTMLFormElement>('[data-contacto]');

if (form) {
  const estado = form.querySelector<HTMLElement>('[data-estado]')!;
  const numero = form.dataset.whatsapp ?? '';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const datos = new FormData(form);
    const nombre = String(datos.get('nombre') ?? '').trim();
    const giro = String(datos.get('giro') ?? '').trim();
    const quiero = String(datos.get('quiero') ?? '').trim();

    const faltan: HTMLInputElement[] = [];
    for (const [campo, valor] of [['nombre', nombre], ['giro', giro]] as const) {
      const input = form.elements.namedItem(campo) as HTMLInputElement;
      input.setAttribute('aria-invalid', valor ? 'false' : 'true');
      if (!valor) faltan.push(input);
    }
    if (faltan.length) {
      estado.textContent = 'Escribe tu nombre y a qué se dedica tu negocio.';
      faltan[0].focus();
      return;
    }

    if (!numero) {
      estado.textContent = 'Todavía no está configurado el WhatsApp de FJ Media. Pronto podrás enviar desde aquí.';
      return;
    }

    const lineas = [`Hola, soy ${nombre}. Mi negocio: ${giro}.`];
    if (quiero) lineas.push(`Quiero lograr: ${quiero}`);
    const enlace = `https://wa.me/${numero}?text=${encodeURIComponent(lineas.join('\n'))}`;
    estado.textContent = 'Abriendo WhatsApp con tu mensaje.';
    window.open(enlace, '_blank', 'noopener');
  });
}
