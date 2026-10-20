// Fuente única de los datos de FJ Media. Nada aquí se inventa: lo que falta queda en null
// y la página lo muestra como pendiente.

/** Vista previa: barra superior, noindex y enlace a la bitácora de cambios. */
export const PREVIEW = true;

export const contacto = {
  /** WhatsApp de ventas en formato internacional sin signos (52 + lada + número), confirmado por Frank el 2026-10-20. */
  whatsapp: '523329577642' as string | null,
  /** Correo de ventas, confirmado por Frank el 2026-10-20. */
  email: 'fjmedia.mx@gmail.com' as string | null,
  ciudad: 'Lázaro Cárdenas, Michoacán',
};

/** Redes de FJ Media, confirmadas por Frank el 2026-10-20. */
export const redes = {
  facebook: 'https://www.facebook.com/fjmediamx',
  instagram: 'https://www.instagram.com/fjmedia.mx',
};

/** Persona detrás de FJ Media, confirmado por Frank el 2026-10-20. La foto y su presentación siguen pendientes. */
export const fundador = { nombre: 'Francisco Javier Moreno Martínez' };

export type Cliente = {
  nombre: string;
  nombreLargo?: string;
  /** Logo dentro de public/ con su tamaño original (para igualar su peso visual), o null si falta. */
  logo: { src: string; ancho: number; alto: number } | null;
  /** Lo que FJ Media hace por el cliente, confirmado por Frank el 2026-10-19. */
  servicios: string[];
  url?: string;
};

const serviciosRedes = ['Facebook e Instagram', 'Publicaciones de cada mes', 'Anuncios en Facebook'];

export const clientes: Cliente[] = [
  { nombre: 'Lipocosmedic', logo: { src: 'clientes/lipocosmedic.png', ancho: 226, alto: 360 }, servicios: serviciosRedes },
  { nombre: 'Laboratorio Santa María', logo: { src: 'clientes/laboratorio-santa-maria.png', ancho: 338, alto: 177 }, servicios: serviciosRedes },
  {
    nombre: 'Clínica Santa Clara',
    nombreLargo: 'Centro Médico de Especialidades Santa Clara',
    logo: { src: 'clientes/santa-clara.svg', ancho: 684, alto: 238 },
    servicios: ['Página web'],
    url: 'https://clinicasantaclara.mx',
  },
];

/** Construye una ruta interna respetando el `base` de Astro (GitHub Pages sirve en /fjmedia/). */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
