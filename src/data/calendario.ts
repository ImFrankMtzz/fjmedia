// El mes de ejemplo del calendario del inicio. Es una vitrina: muestra variedad de contenido, no el plan
// de ningún cliente (cada plan se arma en persona). Se usa al compilar (Hero.astro) y en el navegador
// (scripts/motion.ts) para corregir el mes.

export type TipoDia = 'post' | 'carrusel' | 'video' | 'historia' | 'pagada' | 'libre';

export type Mes = { nombre: string; dias: number; desfase: number };

export function mesDe(fecha: Date): Mes {
  const anio = fecha.getFullYear();
  const mes = fecha.getMonth();
  return {
    nombre: fecha.toLocaleDateString('es-MX', { month: 'long' }),
    dias: new Date(anio, mes + 1, 0).getDate(),
    desfase: (new Date(anio, mes, 1).getDay() + 6) % 7, // lunes = 0
  };
}

// Recorrido revuelto para que los tipos no formen columnas: casi todos los días tienen algo.
const ritmo: TipoDia[] = ['post', 'video', 'carrusel', 'post', 'historia', 'post', 'video', 'carrusel', 'pagada', 'libre'];

export function tipoDelDia(dia: number): TipoDia {
  return ritmo[(dia * 7) % ritmo.length];
}

/** Algunos días llevan además una historia, marcada con un aro pequeño en la esquina. */
export function llevaHistoria(dia: number): boolean {
  const tipo = tipoDelDia(dia);
  return dia % 4 === 0 && tipo !== 'historia' && tipo !== 'pagada';
}

/** Campaña de ejemplo en Facebook, dibujada como barra bajo el calendario. */
export const campania = { desde: 8, hasta: 21 };
