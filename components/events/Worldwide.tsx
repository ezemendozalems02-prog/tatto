import { getWorldMap, MAP_H, MAP_W } from "@/lib/worldmap";
import WorldwideClient from "./WorldwideClient";

/** Server component: calcula el mapa de puntos una vez (build time). */
export default function Worldwide() {
  const map = getWorldMap();
  return <WorldwideClient dots={map.dots} stops={map.stops} width={MAP_W} height={MAP_H} />;
}
