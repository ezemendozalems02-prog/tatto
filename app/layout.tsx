import type { ReactNode } from "react";

/**
 * Layout raíz mínimo, requerido estructuralmente por Next.js porque
 * app/page.tsx vive en este nivel. NO repite <html>/<body>: ésas las
 * pone app/[lang]/layout.tsx, que es el layout real para todo el
 * contenido visible. Acá solo pasamos los children sin envolver nada,
 * para no anidar dos <html> (eso rompe la hidratación en el cliente).
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
