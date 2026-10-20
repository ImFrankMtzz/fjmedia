// Fuente única de los datos de FJ Media. Nada aquí se inventa: lo que falta queda en null
// y la página lo muestra como pendiente.

/** Vista previa: barra superior, noindex y enlace a la bitácora de cambios. */
export const PREVIEW = true;

export const contacto = {
  /** WhatsApp de ventas en formato internacional sin signos, p. ej. "527531234567". Pendiente. */
  whatsapp: null as string | null,
  /** Correo de ventas, confirmado por Frank el 2026-10-20. */
  email: 'fjmedia.mx@gmail.com' as string | null,
  ciudad: 'Lázaro Cárdenas, Michoacán',
};

export type Cliente = {
  nombre: string;
  nombreLargo?: string;
  /** Logo dentro de public/ con su tamaño original (para igualar su peso visual), o null si falta. */
  logo: { src: string; ancho: number; alto: number } | null;
  /** Lo que FJ Media hace por el cliente, confirmado por Frank el 2026-10-19. */
  servicios: string[];
  url?: string;
};

const redes = ['Facebook e Instagram', 'Publicaciones de cada mes', 'Anuncios en Facebook'];

export const clientes: Cliente[] = [
  { nombre: 'Lipocosmedic', logo: { src: 'clientes/lipocosmedic.png', ancho: 226, alto: 360 }, servicios: redes },
  { nombre: 'Laboratorio Santa María', logo: { src: 'clientes/laboratorio-santa-maria.png', ancho: 338, alto: 177 }, servicios: redes },
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
