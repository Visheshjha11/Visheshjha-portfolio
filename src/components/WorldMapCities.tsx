import type { CSSProperties } from "react";

/**
 * Bright-city overlay for the dotted world map (src/assets/image.webp, 1920x960).
 * It shares the image's coordinate space (viewBox + "slice" == object-fit: cover), so the
 * dotted map itself stays untouched and only these points light up on top of it.
 */
const MAP_W = 1920;
const MAP_H = 960;

// New Delhi: the bright hub, pre-snapped to the nearest lit dot of the map image.
const HUB = { x: 1298, y: 450 };

// Big cities, pre-snapped to the nearest lit dot of the map image.
const CITIES = [
  { name: "New York", x: 528, y: 380 },
  { name: "Los Angeles", x: 295, y: 427 },
  { name: "Mexico City", x: 388, y: 509 },
  { name: "Sao Paulo", x: 668, y: 731 },
  { name: "London", x: 901, y: 322 },
  { name: "Lagos", x: 924, y: 579 },
  { name: "Cairo", x: 1064, y: 450 },
  { name: "Johannesburg", x: 1053, y: 754 },
  { name: "Moscow", x: 1100, y: 275 },
  { name: "Dubai", x: 1193, y: 474 },
  { name: "Singapore", x: 1426, y: 602 },
  { name: "Shanghai", x: 1519, y: 439 },
  { name: "Tokyo", x: 1624, y: 415 },
  { name: "Sydney", x: 1683, y: 789 },
];


// Nearest first, so the connections ripple outward from the hub.
const ORDER = CITIES.map((c) => ({ ...c, dist: Math.hypot(c.x - HUB.x, c.y - HUB.y) }))
  .sort((a, b) => a.dist - b.dist)
  .map((c, rank) => ({ ...c, rank }));

/**
 * The draw-in plays once. It starts when a parent adds the "is-live" class
 * (see the scroll trigger in CapsulePortal), and resets when it is removed.
 */
export default function WorldMapCities() {
  return (
    <svg
      className="map-cities"
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="map-halo">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Connections: New Delhi -> every big city */}
      {ORDER.map((c) => {
        const cx = (HUB.x + c.x) / 2;
        const cy = (HUB.y + c.y) / 2 - c.dist * 0.22; // arc upward
        return (
          <path
            key={`arc-${c.name}`}
            d={`M${HUB.x} ${HUB.y} Q${cx} ${cy} ${c.x} ${c.y}`}
            className="map-cities__arc"
            pathLength={100}
            style={{ "--d": `${(0.35 + c.rank * 0.09).toFixed(2)}s` } as CSSProperties}
          />
        );
      })}

      {/* Big cities light up as their connection arrives */}
      {ORDER.map((c) => (
        <g
          key={c.name}
          className="map-cities__city"
          style={{ "--d": `${(0.35 + c.rank * 0.09).toFixed(2)}s` } as CSSProperties}
        >
          <circle cx={c.x} cy={c.y} r={20} fill="url(#map-halo)" />
          <circle cx={c.x} cy={c.y} r={4.6} fill="#fff" />
        </g>
      ))}

      {/* New Delhi: the brightest point */}
      <g className="map-cities__hub">
        <circle cx={HUB.x} cy={HUB.y} r={34} fill="url(#map-halo)" />
        <circle cx={HUB.x} cy={HUB.y} r={8} className="map-cities__ring" />
        <circle cx={HUB.x} cy={HUB.y} r={6.5} fill="#fff" />
      </g>
    </svg>
  );
}
