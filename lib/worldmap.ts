import "server-only";
import { geoContains, geoEqualEarth } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection } from "geojson";
import type { Topology, GeometryCollection } from "topojson-specification";
import land110 from "world-atlas/land-110m.json";
import { tour } from "@/data/tour";

/**
 * Genera el mapa de puntos en el SERVIDOR (build time):
 * el cliente recibe sólo un string de path SVG y coordenadas, sin librerías de mapas.
 */

export const MAP_W = 1000;
export const MAP_H = 500;

let cache: ReturnType<typeof compute> | null = null;

function compute() {
  const topo = land110 as unknown as Topology<{ land: GeometryCollection }>;
  const land = feature(topo, topo.objects.land) as unknown as FeatureCollection;

  const projection = geoEqualEarth()
    .scale(190)
    .translate([MAP_W / 2, MAP_H / 2 + 20]);

  const step = 2.2;
  let d = "";
  for (let lat = 80; lat >= -58; lat -= step) {
    for (let lon = -180; lon < 180; lon += step) {
      if (land.features.some((f) => geoContains(f, [lon, lat]))) {
        const p = projection([lon, lat]);
        if (p) d += `M${p[0].toFixed(1)} ${p[1].toFixed(1)}h0`;
      }
    }
  }

  const stops = tour.map((t) => {
    const p = projection(t.coords) ?? [0, 0];
    return { id: t.id, x: +p[0].toFixed(1), y: +p[1].toFixed(1) };
  });

  return { dots: d, stops };
}

export function getWorldMap() {
  if (!cache) cache = compute();
  return cache;
}
