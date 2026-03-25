"use client";

import { useEffect, useRef, useState } from "react";

// Accurate oblique aerial view of SGC campus matching the reference photo angle
// Shot from SW looking NE, ~35-40 degrees, showing rooftops + south-facing facades
// Main 4-5 floor block (right), secondary 3-4 floor block (center-left),
// small block (far left), dense coconut palms in foreground, neighboring houses right

function P({ d, w = "1.5", o = "1", delay = 0, vis = false, len = 500, stroke = "#c9a84c" }: {
  d: string; w?: string; o?: string; delay: number; vis: boolean; len?: number; stroke?: string;
}) {
  return (
    <path d={d} stroke={stroke} strokeWidth={w} fill="none" opacity={o}
      strokeLinecap="round" strokeLinejoin="round"
      style={{ strokeDasharray: len, strokeDashoffset: vis ? 0 : len, transition: `stroke-dashoffset 1.8s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s` }}
    />
  );
}

function Filled({ d, fill, stroke = "#c9a84c", w = "1", o = "1", delay = 0, vis = false, len = 500 }: {
  d: string; fill: string; stroke?: string; w?: string; o?: string; delay: number; vis: boolean; len?: number;
}) {
  return (
    <path d={d} stroke={stroke} strokeWidth={w} fill={fill} opacity={o}
      strokeLinecap="round" strokeLinejoin="round"
      style={{ strokeDasharray: len, strokeDashoffset: vis ? 0 : len, transition: `stroke-dashoffset 1.8s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s` }}
    />
  );
}

export default function CampusAerial() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full max-w-6xl mx-auto">
      <svg viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">

        {/* ═══════════════════════════════════════════
            MAIN ACADEMIC BLOCK — 4-5 floors, right side
            Isometric-ish oblique view showing south facade + roof
        ═══════════════════════════════════════════ */}

        {/* Roof — flat, seen from angle (parallelogram) */}
        <Filled d="M580 110 L950 110 L1000 80 L630 80 Z" fill="rgba(201,168,76,0.04)" w="1.5" o="0.7" delay={0.4} vis={vis} len={900} />

        {/* Roof equipment — solar panels / water tanks */}
        <P d="M660 88 L660 95 L710 95 L710 88 L660 88" w="0.8" o="0.25" delay={2.8} vis={vis} len={110} />
        <P d="M750 90 L750 96 L790 96 L790 90 L750 90" w="0.8" o="0.2" delay={2.9} vis={vis} len={90} />
        <P d="M870 87 L870 94 L910 94 L910 87 L870 87" w="0.8" o="0.2" delay={3.0} vis={vis} len={90} />
        {/* Stairwell tower projection — right end */}
        <Filled d="M930 110 L950 110 L1000 80 L980 80 L980 65 L960 65 L960 80 L930 80 Z" fill="rgba(201,168,76,0.03)" w="1" o="0.4" delay={2.5} vis={vis} len={200} />

        {/* South facade — front face of main building */}
        <P d="M580 110 L580 360 L950 360 L950 110" w="2" o="0.8" delay={0.3} vis={vis} len={900} />

        {/* East side face (visible sliver, going back to right) */}
        <P d="M950 110 L1000 80 L1000 330 L950 360" w="1.5" o="0.35" delay={0.5} vis={vis} len={600} />

        {/* Floor lines on south facade */}
        {[160, 210, 260, 310].map((y, i) => (
          <line key={`mf-${i}`} x1={580} y1={y} x2={950} y2={y} stroke="#c9a84c" strokeWidth="0.5" opacity="0.15"
            style={{ strokeDasharray: 370, strokeDashoffset: vis ? 0 : 370, transition: `stroke-dashoffset 1.2s ease-out ${0.8 + i * 0.1}s` }} />
        ))}

        {/* Windows on south facade — 5 rows of many windows */}
        {[0, 1, 2, 3, 4].map((row) =>
          Array.from({ length: 16 }, (_, col) => {
            const x = 590 + col * 22;
            const y = 118 + row * 50;
            if (row === 4 && col >= 6 && col <= 9) return null; // entrance gap
            return (
              <rect key={`mw-${row}-${col}`} x={x} y={y} width={14} height={32} rx={1}
                stroke="#c9a84c" strokeWidth="0.8" fill="none"
                opacity={vis ? String(0.45 - row * 0.05) : "0"}
                style={{ transition: `opacity 0.8s ease-out ${1.2 + row * 0.15 + col * 0.02}s` }}
              />
            );
          })
        )}

        {/* East side windows (faint, perspective) */}
        {[0, 1, 2, 3, 4].map((row) => (
          <line key={`ew-${row}`}
            x1={960} y1={125 + row * 50} x2={995} y2={100 + row * 50}
            stroke="#c9a84c" strokeWidth="0.5" opacity="0.12"
            style={{ strokeDasharray: 50, strokeDashoffset: vis ? 0 : 50, transition: `stroke-dashoffset 0.8s ease-out ${1.5 + row * 0.1}s` }}
          />
        ))}

        {/* Main entrance — large arched opening */}
        <P d="M720 360 L720 300 Q745 278 770 300 L770 360" w="2" o="0.6" delay={1.8} vis={vis} len={180} />
        {/* Entrance pillars */}
        <P d="M710 295 L710 360" w="2.5" o="0.35" delay={1.9} vis={vis} len={65} />
        <P d="M780 295 L780 360" w="2.5" o="0.35" delay={2.0} vis={vis} len={65} />
        {/* Entrance canopy */}
        <P d="M700 295 L790 295" w="1.5" o="0.3" delay={2.1} vis={vis} len={90} />


        {/* ═══════════════════════════════════════════
            SECONDARY BLOCK — 3-4 floors, center-left
        ═══════════════════════════════════════════ */}

        {/* Roof */}
        <Filled d="M210 155 L530 155 L570 130 L250 130 Z" fill="rgba(201,168,76,0.03)" w="1.2" o="0.5" delay={0.6} vis={vis} len={750} />

        {/* South facade */}
        <P d="M210 155 L210 370 L530 370 L530 155" w="1.5" o="0.6" delay={0.5} vis={vis} len={750} />

        {/* East side */}
        <P d="M530 155 L570 130 L570 340 L530 370" w="1" o="0.25" delay={0.7} vis={vis} len={500} />

        {/* Floor lines */}
        {[210, 265, 320].map((y, i) => (
          <line key={`sf-${i}`} x1={210} y1={y} x2={530} y2={y} stroke="#c9a84c" strokeWidth="0.5" opacity="0.12"
            style={{ strokeDasharray: 320, strokeDashoffset: vis ? 0 : 320, transition: `stroke-dashoffset 1s ease-out ${1.0 + i * 0.1}s` }} />
        ))}

        {/* Windows — 4 rows */}
        {[0, 1, 2, 3].map((row) =>
          Array.from({ length: 13 }, (_, col) => (
            <rect key={`sw-${row}-${col}`} x={220 + col * 24} y={163 + row * 55} width={14} height={35} rx={1}
              stroke="#c9a84c" strokeWidth="0.7" fill="none"
              opacity={vis ? String(0.35 - row * 0.04) : "0"}
              style={{ transition: `opacity 0.7s ease-out ${1.4 + row * 0.12 + col * 0.02}s` }}
            />
          ))
        )}

        {/* Roof structures */}
        <P d="M280 137 L280 145 L320 145 L320 137 L280 137" w="0.6" o="0.18" delay={2.8} vis={vis} len={90} />
        <P d="M430 138 L430 144 L460 144 L460 138 L430 138" w="0.6" o="0.15" delay={2.9} vis={vis} len={70} />


        {/* ═══════════════════════════════════════════
            SMALL BLOCK — far left, 2 floors
        ═══════════════════════════════════════════ */}

        {/* Roof */}
        <Filled d="M30 215 L170 215 L195 200 L55 200 Z" fill="rgba(201,168,76,0.02)" w="0.8" o="0.3" delay={1.5} vis={vis} len={400} />

        {/* South facade */}
        <P d="M30 215 L30 375 L170 375 L170 215" w="1" o="0.3" delay={1.5} vis={vis} len={480} />

        {/* East side */}
        <P d="M170 215 L195 200 L195 360 L170 375" w="0.8" o="0.15" delay={1.7} vis={vis} len={300} />

        {/* Windows */}
        {[0, 1].map((row) =>
          Array.from({ length: 4 }, (_, col) => (
            <rect key={`lw-${row}-${col}`} x={42 + col * 32} y={230 + row * 70} width={16} height={40} rx={1}
              stroke="#c9a84c" strokeWidth="0.6" fill="none"
              opacity={vis ? "0.2" : "0"}
              style={{ transition: `opacity 0.6s ease-out ${2.2 + row * 0.1 + col * 0.05}s` }}
            />
          ))
        )}


        {/* ═══════════════════════════════════════════
            COURTYARD / GAP between buildings
        ═══════════════════════════════════════════ */}
        <P d="M530 300 L580 300 M530 330 L580 330 M530 350 L580 350" w="0.8" o="0.2" delay={2.2} vis={vis} len={150} />


        {/* ═══════════════════════════════════════════
            GROUND PLANE
        ═══════════════════════════════════════════ */}

        {/* Ground level line */}
        <line x1="20" y1="375" x2="1180" y2="375" stroke="#c9a84c" strokeWidth="0.5" opacity="0.1"
          style={{ strokeDasharray: 1160, strokeDashoffset: vis ? 0 : 1160, transition: "stroke-dashoffset 2s ease-out 0s" }} />

        {/* Parking / open area in front */}
        <P d="M400 380 L900 380 L920 395 L380 395 Z" w="0.5" o="0.08" delay={2.5} vis={vis} len={1100} />

        {/* Vehicles */}
        {[450, 490, 530, 700, 740, 800, 850].map((x, i) => (
          <rect key={`v-${i}`} x={x} y={383} width={16} height={7} rx={2}
            stroke="#c9a84c" strokeWidth="0.5" fill="none"
            opacity={vis ? "0.12" : "0"}
            style={{ transition: `opacity 0.4s ease-out ${3.2 + i * 0.08}s` }}
          />
        ))}

        {/* Approach road */}
        <P d="M600 500 Q620 460 640 430 Q660 410 680 395" w="1" o="0.12" delay={3.0} vis={vis} len={150} />
        <P d="M640 500 Q660 460 680 430 Q700 410 720 395" w="1" o="0.12" delay={3.1} vis={vis} len={150} />


        {/* ═══════════════════════════════════════════
            COCONUT PALMS — dense foreground, the signature feature
        ═══════════════════════════════════════════ */}
        {[
          { x: 120, y: 390, h: 70, lean: -5 },
          { x: 200, y: 395, h: 80, lean: 3 },
          { x: 280, y: 388, h: 75, lean: -3 },
          { x: 350, y: 392, h: 85, lean: 4 },
          { x: 420, y: 395, h: 72, lean: -2 },
          { x: 510, y: 390, h: 78, lean: 3 },
          { x: 620, y: 393, h: 82, lean: -4 },
          { x: 730, y: 388, h: 76, lean: 2 },
          { x: 830, y: 392, h: 80, lean: -3 },
          { x: 920, y: 395, h: 70, lean: 4 },
          { x: 1000, y: 390, h: 68, lean: -2 },
        ].map(({ x, y, h, lean }, i) => {
          const topX = x + lean;
          const topY = y - h;
          const delay = 2.6 + i * 0.08;
          return (
            <g key={`palm-${i}`}>
              {/* Curved trunk */}
              <path
                d={`M${x} ${y} Q${x + lean * 0.3} ${y - h * 0.5} ${topX} ${topY}`}
                stroke="#c9a84c" strokeWidth="1.5" fill="none" opacity="0.3"
                style={{ strokeDasharray: 100, strokeDashoffset: vis ? 0 : 100, transition: `stroke-dashoffset 0.8s ease-out ${delay}s` }}
              />
              {/* Fronds — radiating arcs */}
              {[-50, -30, -10, 10, 30, 50].map((angle, j) => {
                const rad = (angle - 90) * Math.PI / 180;
                const fLen = 22 + Math.random() * 8;
                return (
                  <path key={j}
                    d={`M${topX} ${topY} Q${topX + Math.cos(rad) * fLen * 0.6} ${topY + Math.sin(rad) * fLen * 0.6} ${topX + Math.cos(rad) * fLen} ${topY + Math.sin(rad) * fLen}`}
                    stroke="#c9a84c" strokeWidth="0.7" fill="none" opacity="0.2"
                    style={{ strokeDasharray: 40, strokeDashoffset: vis ? 0 : 40, transition: `stroke-dashoffset 0.6s ease-out ${delay + 0.2 + j * 0.04}s` }}
                  />
                );
              })}
            </g>
          );
        })}


        {/* ═══════════════════════════════════════════
            NEIGHBORING HOUSES — right side, terracotta roofs
        ═══════════════════════════════════════════ */}

        {/* House 1 */}
        <Filled d="M1020 250 L1020 370 L1100 370 L1100 250 Z" fill="rgba(201,168,76,0.02)" w="0.8" o="0.2" delay={2.5} vis={vis} len={320} />
        <P d="M1015 250 L1060 220 L1105 250" w="0.8" o="0.2" delay={2.7} vis={vis} len={100} />
        {/* Sloped roof fill for terracotta feel */}
        <Filled d="M1015 250 L1060 220 L1105 250 Z" fill="rgba(201,168,76,0.03)" w="0" o="0.15" delay={2.7} vis={vis} len={100} />

        {/* House 2 */}
        <Filled d="M1050 280 L1050 375 L1150 375 L1150 280 Z" fill="rgba(201,168,76,0.015)" w="0.6" o="0.15" delay={2.6} vis={vis} len={300} />
        <P d="M1045 280 L1100 255 L1155 280" w="0.6" o="0.15" delay={2.8} vis={vis} len={120} />

        {/* House 3 — partially behind */}
        <P d="M1080 200 L1080 270 L1160 270 L1160 200" w="0.5" o="0.1" delay={2.7} vis={vis} len={220} />
        <P d="M1075 200 L1120 175 L1165 200" w="0.5" o="0.1" delay={2.9} vis={vis} len={100} />


        {/* ═══════════════════════════════════════════
            BOUNDARY WALL
        ═══════════════════════════════════════════ */}
        <P d="M20 395 L1010 395" w="0.8" o="0.12" delay={0.2} vis={vis} len={990} />


        {/* ═══════════════════════════════════════════
            BACKGROUND — horizon line with faint distant buildings
        ═══════════════════════════════════════════ */}
        <line x1="0" y1="65" x2="1200" y2="65" stroke="#c9a84c" strokeWidth="0.3" opacity="0.06"
          style={{ strokeDasharray: 1200, strokeDashoffset: vis ? 0 : 1200, transition: "stroke-dashoffset 2s ease-out 0.1s" }} />
        {/* Distant skyline bumps */}
        {[100, 250, 400, 550, 700, 850, 1000, 1100].map((x, i) => (
          <rect key={`bg-${i}`} x={x} y={55 + Math.random() * 5} width={20 + i * 2} height={8 + i} rx={1}
            stroke="#c9a84c" strokeWidth="0.3" fill="none" opacity="0.04"
            style={{ strokeDasharray: 80, strokeDashoffset: vis ? 0 : 80, transition: `stroke-dashoffset 1s ease-out ${0.3 + i * 0.05}s` }}
          />
        ))}


        {/* ═══════════════════════════════════════════
            COLLEGE NAME
        ═══════════════════════════════════════════ */}
        <text x="600" y="540" textAnchor="middle" fill="#c9a84c" fontSize="14" fontWeight="bold" letterSpacing="8"
          opacity={vis ? "0.45" : "0"} style={{ transition: "opacity 1.2s ease-out 3.5s", fontFamily: "var(--font-geist-sans), sans-serif" }}>
          SARADHA GANGADHARAN COLLEGE
        </text>
        <text x="600" y="560" textAnchor="middle" fill="#c9a84c" fontSize="9" letterSpacing="5"
          opacity={vis ? "0.25" : "0"} style={{ transition: "opacity 1.2s ease-out 3.8s", fontFamily: "var(--font-geist-sans), sans-serif" }}>
          PUDUCHERRY &middot; AERIAL VIEW
        </text>

      </svg>
    </div>
  );
}
