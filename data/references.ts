import credits from "./references.json";

/**
 * IMÁGENES DE REFERENCIA (temporales)
 *
 * Fotos con licencia libre de Wikimedia Commons, usadas SOLO para
 * visualizar el diseño mientras no estén las fotos reales de Rou.
 * NO son trabajos de Rou Viraca: cada una lleva una etiqueta "REF"
 * y sus créditos se listan en el footer.
 *
 * Para quitarlas todas de una vez: `useReferenceImages: false`.
 * Una foto real (`src`) siempre tiene prioridad sobre la referencia.
 */
export const referenceConfig = {
  useReferenceImages: true,
  /** Muestra la etiqueta "REF" sobre cada imagen de referencia. */
  showBadge: true,
};

export type RefImage = {
  src: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
};

export type RefKey = keyof typeof credits;

export const references = credits as Record<RefKey, RefImage>;

export const ref = (key: RefKey): RefImage => references[key];
