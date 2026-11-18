import { notFound } from "next/navigation";

/** Cualquier ruta inexistente dentro de un idioma muestra el 404 localizado. */
export default function CatchAll() {
  notFound();
}
