// Movimiento del sitio. Tres momentos: el calendario del hero, los títulos que se ensanchan y el
// celular de "Cómo creamos". Con movimiento reducido todo queda en su estado final.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

declare global {
  interface Window {
    __fjMotion?: boolean;
  }
}

window.__fjMotion = true;
gsap.registerPlugin(ScrollTrigger);

const animar = document.documentElement.classList.contains('motion');

ajustarCalendario();
pasosDelTelefono();

if (animar) {
  hero();
  titulosCineticos();
  lineaDelProceso();
}

/** Pone el mes actual y el día en que empieza, por si la página se compiló en otro mes. */
function ajustarCalendario() {
  const lista = document.querySelector<HTMLElement>('[data-cal-dias]');
  const nombre = document.querySelector<HTMLElement>('[data-cal-mes]');
  if (!lista || !nombre) return;
  const hoy = new Date();
  const diasMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
  const desfase = (new Date(hoy.getFullYear(), hoy.getMonth(), 1).getDay() + 6) % 7;
  nombre.textContent = hoy.toLocaleDateString('es-MX', { month: 'long' });
  lista.style.setProperty('--desfase', String(desfase + 1));
  lista.querySelectorAll<HTMLElement>('[data-dia]').forEach((dia) => {
    dia.hidden = Number(dia.dataset.dia) > diasMes;
  });
}

function hero() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.to('.hero-titulo .linea > span', { y: 0, duration: 0.9, stagger: 0.12 });
  // Los días se llenan en orden, como un mes que se va publicando.
  tl.to(
    '.dia:not([hidden]) .dia-pieza',
    { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.8)', stagger: 0.045 },
    0.35,
  );
  tl.to('[data-anuncio-barra]', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, '-=0.6');
}

/** Cada título de sección pasa de angosto y ligero a ancho y pesado mientras entra en pantalla. */
function titulosCineticos() {
  gsap.utils.toArray<HTMLElement>('.cinetico').forEach((titulo) => {
    gsap.to(titulo, {
      '--ancho-letra': 100,
      '--peso': 760,
      ease: 'none',
      scrollTrigger: { trigger: titulo, start: 'top 92%', end: 'top 55%', scrub: 0.4 },
    });
  });
}

function lineaDelProceso() {
  const linea = document.querySelector('[data-linea]');
  if (!linea) return;
  gsap.to(linea, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { trigger: linea, start: 'top 85%', end: 'top 45%', scrub: 0.4 },
  });
}

/** El paso visible decide la pantalla del celular; cada pantalla tiene su pequeña animación de entrada. */
function pasosDelTelefono() {
  const telefono = document.querySelector<HTMLElement>('[data-telefono]');
  const pasos = document.querySelectorAll<HTMLElement>('.paso[data-paso]');
  if (!telefono || !pasos.length) return;

  let actual = '';
  let animacion: gsap.core.Timeline | null = null;

  const activar = (n: string) => {
    if (n === actual) return;
    actual = n;
    telefono.dataset.paso = n;
    pasos.forEach((p) => p.classList.toggle('activo', p.dataset.paso === n));
    if (!animar) return;
    animacion?.kill();
    animacion = entradaDePantalla(telefono.querySelector<HTMLElement>(`[data-pantalla="${n}"]`)!, n);
  };

  pasos.forEach((paso) => {
    ScrollTrigger.create({
      trigger: paso,
      start: 'top 60%',
      end: 'bottom 60%',
      onToggle: (self) => self.isActive && activar(paso.dataset.paso!),
    });
  });
  activar('1');
}

function entradaDePantalla(pantalla: HTMLElement, n: string) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  const q = gsap.utils.selector(pantalla);
  if (n === '1') {
    tl.from(q('.plan-fila'), { x: -24, opacity: 0, duration: 0.4, stagger: 0.07 });
  } else if (n === '2') {
    // Las capas del diseño llegan desde lejos y se acomodan en su lugar.
    tl.from(q('.capa'), {
      x: () => gsap.utils.random(-120, 120),
      y: () => gsap.utils.random(-140, 140),
      rotation: () => gsap.utils.random(-40, 40),
      opacity: 0,
      duration: 0.8,
      stagger: 0.09,
    });
  } else if (n === '3') {
    tl.from(q('.post'), { y: 60, opacity: 0, duration: 0.6 }).fromTo(
      q('.corazon'),
      { scale: 1 },
      { scale: 1.45, duration: 0.18, yoyo: true, repeat: 3, ease: 'power1.inOut', transformOrigin: '50% 50%' },
    );
  } else if (n === '4') {
    tl.from(q('.pastilla'), { y: 16, opacity: 0, duration: 0.4, stagger: 0.1 });
    q('.onda').forEach((onda: Element, i: number) => {
      tl.fromTo(
        onda,
        { scale: 0.4, opacity: 0.8 },
        { scale: 1.15, opacity: 0, duration: 1.8, repeat: -1, ease: 'sine.out', delay: i * 0.6 },
        0,
      );
    });
  }
  return tl;
}
