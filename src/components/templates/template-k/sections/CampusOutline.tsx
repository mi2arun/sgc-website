"use client";

import { useEffect, useRef, useState } from "react";

// SVG campus outline based on actual SGC aerial photo analysis
// Oblique aerial view showing: Main Academic Block (4-5 floors, white/cream, flat roof),
// Secondary Block (3-4 floors, left), Library wing (far left), approach road,
// coconut palms, boundary wall, parking area, and South Indian tropical setting.

function D({ d, stroke = "#c9a84c", width = "1.5", opacity = "1", delay = 0, visible = false, len = 600 }: {
  d: string; stroke?: string; width?: string; opacity?: string; delay: number; visible: boolean; len?: number;
}) {
  return (
    <path
      d={d} stroke={stroke} strokeWidth={width} fill="none" opacity={opacity}
      strokeLinecap="round" strokeLinejoin="round"
      style={{ strokeDasharray: len, strokeDashoffset: visible ? 0 : len, transition: `stroke-dashoffset 2s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s` }}
    />
  );
}

function R({ x, y, w, h, delay, visible, opacity = "0.6" }: {
  x: number; y: number; w: number; h: number; delay: number; visible: boolean; opacity?: string;
}) {
  const len = (w + h) * 2;
  return (
    <rect x={x} y={y} width={w} height={h} rx={1} stroke="#c9a84c" strokeWidth="1" fill="none" opacity={opacity}
      style={{ strokeDasharray: len, strokeDashoffset: visible ? 0 : len, transition: `stroke-dashoffset 1s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s` }}
    />
  );
}

function Tree({ cx, cy, delay, visible }: { cx: number; cy: number; delay: number; visible: boolean }) {
  return (
    <g>
      {/* Trunk */}
      <line x1={cx} y1={cy} x2={cx} y2={cy - 25} stroke="#c9a84c" strokeWidth="1.5" opacity="0.35"
        style={{ strokeDasharray: 25, strokeDashoffset: visible ? 0 : 25, transition: `stroke-dashoffset 0.8s ease-out ${delay}s` }} />
      {/* Canopy — organic shape */}
      <ellipse cx={cx} cy={cy - 32} rx={12} ry={10} stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.25"
        style={{ strokeDasharray: 70, strokeDashoffset: visible ? 0 : 70, transition: `stroke-dashoffset 1s ease-out ${delay + 0.2}s` }} />
    </g>
  );
}

function CoconutPalm({ cx, cy, delay, visible }: { cx: number; cy: number; delay: number; visible: boolean }) {
  return (
    <g>
      {/* Curved trunk */}
      <path d={`M${cx} ${cy} Q${cx - 3} ${cy - 20} ${cx + 2} ${cy - 40}`} stroke="#c9a84c" strokeWidth="1.5" fill="none" opacity="0.3"
        style={{ strokeDasharray: 50, strokeDashoffset: visible ? 0 : 50, transition: `stroke-dashoffset 0.8s ease-out ${delay}s` }} />
      {/* Fronds — radiating lines */}
      {[-30, -15, 0, 15, 30].map((angle, i) => (
        <line key={i}
          x1={cx + 2} y1={cy - 40}
          x2={cx + 2 + Math.cos((angle - 90) * Math.PI / 180) * 18}
          y2={cy - 40 + Math.sin((angle - 90) * Math.PI / 180) * 18}
          stroke="#c9a84c" strokeWidth="0.8" opacity="0.25"
          style={{ strokeDasharray: 20, strokeDashoffset: visible ? 0 : 20, transition: `stroke-dashoffset 0.6s ease-out ${delay + 0.3 + i * 0.05}s` }}
        />
      ))}
    </g>
  );
}

export default function CampusOutline() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full max-w-6xl mx-auto">
      <svg viewBox="0 0 1100 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">

        {/* ═══════════════════════════════════════════
            GROUND / BASE LINE
        ═══════════════════════════════════════════ */}
        <line x1="30" y1="400" x2="1070" y2="400" stroke="#c9a84c" strokeWidth="0.8" opacity="0.2"
          style={{ strokeDasharray: 1040, strokeDashoffset: visible ? 0 : 1040, transition: "stroke-dashoffset 2.5s ease-out 0s" }} />


        {/* ═══════════════════════════════════════════
            MAIN ACADEMIC BLOCK — 4-5 floors, center-right
            White/cream building, flat roof, window grid
        ═══════════════════════════════════════════ */}

        {/* Main building outline — large rectangle with perspective */}
        <D d="M420 400 L420 140 L820 140 L820 400" delay={0.3} visible={visible} len={920} width="2" />

        {/* Flat roof top line with slight overhang */}
        <D d="M415 140 L825 140" delay={0.5} visible={visible} len={410} width="2.5" />

        {/* Roof equipment / water tanks */}
        <R x={700} y={125} w={40} h={12} delay={2.5} visible={visible} opacity="0.25" />
        <R x={755} y={127} w={30} h={10} delay={2.6} visible={visible} opacity="0.2" />
        <R x={450} y={126} w={35} h={11} delay={2.7} visible={visible} opacity="0.2" />

        {/* Floor lines (4 floors) */}
        {[205, 270, 335].map((y, i) => (
          <line key={`fl-${i}`} x1={420} y1={y} x2={820} y2={y} stroke="#c9a84c" strokeWidth="0.5" opacity="0.15"
            style={{ strokeDasharray: 400, strokeDashoffset: visible ? 0 : 400, transition: `stroke-dashoffset 1.5s ease-out ${0.8 + i * 0.1}s` }} />
        ))}

        {/* Windows — Floor 1 (top) */}
        {Array.from({ length: 14 }, (_, i) => (
          <R key={`w1-${i}`} x={435 + i * 27} y={155} w={18} h={35} delay={1.2 + i * 0.04} visible={visible} opacity="0.5" />
        ))}
        {/* Windows — Floor 2 */}
        {Array.from({ length: 14 }, (_, i) => (
          <R key={`w2-${i}`} x={435 + i * 27} y={218} w={18} h={38} delay={1.5 + i * 0.04} visible={visible} opacity="0.45" />
        ))}
        {/* Windows — Floor 3 */}
        {Array.from({ length: 14 }, (_, i) => (
          <R key={`w3-${i}`} x={435 + i * 27} y={283} w={18} h={38} delay={1.7 + i * 0.04} visible={visible} opacity="0.4" />
        ))}
        {/* Windows — Floor 4 (ground) — with entrance gap */}
        {Array.from({ length: 14 }, (_, i) => {
          if (i >= 5 && i <= 8) return null; // entrance gap
          return <R key={`w4-${i}`} x={435 + i * 27} y={348} w={18} h={38} delay={1.9 + i * 0.04} visible={visible} opacity="0.35" />;
        })}

        {/* Main entrance — arched doorway */}
        <D d="M575 400 L575 340 Q600 320 625 340 L625 400" delay={1.8} visible={visible} len={200} width="2" />
        {/* Entrance columns */}
        <line x1={565} y1={335} x2={565} y2={400} stroke="#c9a84c" strokeWidth="2" opacity="0.4"
          style={{ strokeDasharray: 65, strokeDashoffset: visible ? 0 : 65, transition: "stroke-dashoffset 1s ease-out 1.9s" }} />
        <line x1={635} y1={335} x2={635} y2={400} stroke="#c9a84c" strokeWidth="2" opacity="0.4"
          style={{ strokeDasharray: 65, strokeDashoffset: visible ? 0 : 65, transition: "stroke-dashoffset 1s ease-out 2.0s" }} />

        {/* Stairwell tower — right end, slightly taller */}
        <D d="M790 140 L790 125 L820 125 L820 140" delay={2.2} visible={visible} len={60} width="1.5" opacity="0.5" />


        {/* ═══════════════════════════════════════════
            SECONDARY BLOCK — 3-4 floors, left of main
        ═══════════════════════════════════════════ */}

        {/* Building outline */}
        <D d="M170 400 L170 180 L400 180 L400 400" delay={0.5} visible={visible} len={680} width="1.5" />

        {/* Flat roof */}
        <D d="M165 180 L405 180" delay={0.7} visible={visible} len={240} width="2" />

        {/* Floor lines (3 floors) */}
        {[253, 326].map((y, i) => (
          <line key={`fl2-${i}`} x1={170} y1={y} x2={400} y2={y} stroke="#c9a84c" strokeWidth="0.5" opacity="0.12"
            style={{ strokeDasharray: 230, strokeDashoffset: visible ? 0 : 230, transition: `stroke-dashoffset 1.2s ease-out ${1.0 + i * 0.1}s` }} />
        ))}

        {/* Windows — 3 rows */}
        {Array.from({ length: 8 }, (_, i) => (
          <R key={`sw1-${i}`} x={183 + i * 27} y={195} w={16} h={40} delay={1.4 + i * 0.05} visible={visible} opacity="0.4" />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <R key={`sw2-${i}`} x={183 + i * 27} y={265} w={16} h={42} delay={1.6 + i * 0.05} visible={visible} opacity="0.35" />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <R key={`sw3-${i}`} x={183 + i * 27} y={338} w={16} h={42} delay={1.8 + i * 0.05} visible={visible} opacity="0.3" />
        ))}

        {/* Roof structures */}
        <R x={200} y={167} w={25} h={10} delay={2.4} visible={visible} opacity="0.2" />
        <R x={340} y={168} w={20} h={9} delay={2.5} visible={visible} opacity="0.18" />


        {/* ═══════════════════════════════════════════
            CORRIDOR / CONNECTING WALKWAY between buildings
        ═══════════════════════════════════════════ */}
        <D d="M400 340 L420 340 M400 370 L420 370" delay={2.0} visible={visible} len={40} width="1" opacity="0.3" />
        <D d="M400 310 L420 310" delay={2.1} visible={visible} len={20} width="0.8" opacity="0.2" />


        {/* ═══════════════════════════════════════════
            LIBRARY / SMALL BLOCK — far left, 2-3 floors
        ═══════════════════════════════════════════ */}
        <D d="M40 400 L40 250 L145 250 L145 400" delay={1.5} visible={visible} len={400} width="1" opacity="0.35" />
        <D d="M35 250 L150 250" delay={1.7} visible={visible} len={115} width="1.5" opacity="0.35" />
        {/* Darker roof feel */}
        <D d="M40 250 L145 250 L145 240 L40 240 Z" delay={2.0} visible={visible} len={220} width="0.5" opacity="0.15" />

        {/* Windows */}
        {[0, 1, 2].map((i) => (
          <R key={`lw-${i}`} x={55 + i * 32} y={270} w={18} h={30} delay={2.2 + i * 0.1} visible={visible} opacity="0.25" />
        ))}
        {[0, 1, 2].map((i) => (
          <R key={`lw2-${i}`} x={55 + i * 32} y={340} w={18} h={30} delay={2.4 + i * 0.1} visible={visible} opacity="0.2" />
        ))}


        {/* ═══════════════════════════════════════════
            CAMPUS BOUNDARY WALL
        ═══════════════════════════════════════════ */}
        <D d="M20 400 L20 420 L1080 420 L1080 400" delay={0.1} visible={visible} len={1120} width="0.8" opacity="0.15" />
        {/* Gate entrance */}
        <D d="M520 420 L520 430 M680 420 L680 430" delay={2.5} visible={visible} len={20} width="1.5" opacity="0.25" />
        {/* Gate pillars */}
        <R x={515} y={415} w={10} h={18} delay={2.6} visible={visible} opacity="0.2" />
        <R x={675} y={415} w={10} h={18} delay={2.6} visible={visible} opacity="0.2" />


        {/* ═══════════════════════════════════════════
            PARKING / OPEN AREA — in front of main building
        ═══════════════════════════════════════════ */}
        {/* Parked vehicles — tiny rectangles */}
        {[480, 510, 540, 650, 680].map((x, i) => (
          <rect key={`car-${i}`} x={x} y={407} width={12} height={6} rx={1} stroke="#c9a84c" strokeWidth="0.5" fill="none" opacity={visible ? "0.15" : "0"}
            style={{ transition: `opacity 0.5s ease-out ${3 + i * 0.1}s` }} />
        ))}

        {/* Approach road / driveway */}
        <D d="M600 430 Q600 415 600 405" delay={2.8} visible={visible} len={30} width="1" opacity="0.2" />
        <D d="M560 460 Q580 440 600 430 M640 460 Q620 440 600 430" delay={2.9} visible={visible} len={100} width="0.8" opacity="0.15" />


        {/* ═══════════════════════════════════════════
            COCONUT PALMS — typical South Indian campus
        ═══════════════════════════════════════════ */}
        <CoconutPalm cx={160} cy={410} delay={2.8} visible={visible} />
        <CoconutPalm cx={220} cy={412} delay={2.9} visible={visible} />
        <CoconutPalm cx={310} cy={408} delay={3.0} visible={visible} />
        <CoconutPalm cx={460} cy={410} delay={3.1} visible={visible} />
        <CoconutPalm cx={740} cy={412} delay={3.2} visible={visible} />
        <CoconutPalm cx={850} cy={409} delay={3.0} visible={visible} />

        {/* Regular trees */}
        <Tree cx={70} cy={405} delay={3.0} visible={visible} />
        <Tree cx={120} cy={408} delay={3.1} visible={visible} />
        <Tree cx={900} cy={407} delay={3.2} visible={visible} />
        <Tree cx={960} cy={405} delay={3.3} visible={visible} />
        <Tree cx={1020} cy={408} delay={3.1} visible={visible} />

        {/* Trees behind buildings (visible above roofline) */}
        <Tree cx={50} cy={245} delay={3.2} visible={visible} />
        <Tree cx={830} cy={135} delay={3.3} visible={visible} />
        <Tree cx={870} cy={138} delay={3.4} visible={visible} />


        {/* ═══════════════════════════════════════════
            NEIGHBORING BUILDINGS — right edge, residential
        ═══════════════════════════════════════════ */}
        {/* Small houses with sloped roofs */}
        <D d="M870 400 L870 300 L950 300 L950 400" delay={2.5} visible={visible} len={300} width="0.8" opacity="0.15" />
        <D d="M865 300 L910 275 L955 300" delay={2.7} visible={visible} len={100} width="0.8" opacity="0.15" />

        <D d="M970 400 L970 310 L1050 310 L1050 400" delay={2.6} visible={visible} len={260} width="0.8" opacity="0.12" />
        <D d="M965 310 L1010 285 L1055 310" delay={2.8} visible={visible} len={100} width="0.8" opacity="0.12" />


        {/* ═══════════════════════════════════════════
            COLLEGE NAME SIGNBOARD at entrance
        ═══════════════════════════════════════════ */}
        <R x={555} y={403} w={90} h={10} delay={3.0} visible={visible} opacity="0.3" />


        {/* ═══════════════════════════════════════════
            SGC TEXT — fades in last
        ═══════════════════════════════════════════ */}
        <text x="600" y="490" textAnchor="middle" fill="#c9a84c" fontSize="13" fontWeight="bold" letterSpacing="10"
          opacity={visible ? "0.5" : "0"} style={{ transition: "opacity 1.2s ease-out 3.5s", fontFamily: "var(--font-geist-sans), sans-serif" }}>
          SARADHA GANGADHARAN COLLEGE
        </text>
        <text x="600" y="508" textAnchor="middle" fill="#c9a84c" fontSize="8" letterSpacing="4"
          opacity={visible ? "0.3" : "0"} style={{ transition: "opacity 1.2s ease-out 3.7s", fontFamily: "var(--font-geist-sans), sans-serif" }}>
          PUDUCHERRY — AERIAL VIEW
        </text>

      </svg>
    </div>
  );
}
