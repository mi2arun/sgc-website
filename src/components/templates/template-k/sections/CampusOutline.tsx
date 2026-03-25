"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function CampusOutline() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto">
      <svg
        viewBox="0 0 1200 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* ═══════ MAIN BUILDING — CENTER ═══════ */}
        {/* Main building body */}
        <path
          d="M300 380 L300 180 L600 180 L600 380"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("transition-all", visible ? "tk-draw" : "")}
          style={{ strokeDasharray: 800, strokeDashoffset: visible ? 0 : 800, transition: "stroke-dashoffset 2s ease-out 0.2s" }}
        />
        {/* Main building roof — triangular pediment */}
        <path
          d="M280 180 L450 80 L620 180"
          stroke="#c9a84c"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 500, strokeDashoffset: visible ? 0 : 500, transition: "stroke-dashoffset 1.8s ease-out 0.5s" }}
        />
        {/* Pediment inner triangle */}
        <path
          d="M320 180 L450 105 L580 180"
          stroke="#c9a84c"
          strokeWidth="1"
          opacity="0.4"
          strokeLinecap="round"
          style={{ strokeDasharray: 400, strokeDashoffset: visible ? 0 : 400, transition: "stroke-dashoffset 1.5s ease-out 0.8s" }}
        />

        {/* Main entrance door */}
        <path
          d="M420 380 L420 280 L480 280 L480 380"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 300, strokeDashoffset: visible ? 0 : 300, transition: "stroke-dashoffset 1.5s ease-out 1s" }}
        />
        {/* Door arch */}
        <path
          d="M420 280 Q450 255 480 280"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ strokeDasharray: 100, strokeDashoffset: visible ? 0 : 100, transition: "stroke-dashoffset 1s ease-out 1.2s" }}
        />

        {/* Main building windows — row 1 */}
        {[330, 370, 510, 550].map((x, i) => (
          <rect
            key={`mw1-${i}`}
            x={x} y={210} width="25" height="35" rx="2"
            stroke="#c9a84c"
            strokeWidth="1.5"
            opacity="0.7"
            style={{ strokeDasharray: 120, strokeDashoffset: visible ? 0 : 120, transition: `stroke-dashoffset 1s ease-out ${1.3 + i * 0.1}s` }}
          />
        ))}
        {/* Main building windows — row 2 */}
        {[330, 370, 510, 550].map((x, i) => (
          <rect
            key={`mw2-${i}`}
            x={x} y={300} width="25" height="35" rx="2"
            stroke="#c9a84c"
            strokeWidth="1.5"
            opacity="0.7"
            style={{ strokeDasharray: 120, strokeDashoffset: visible ? 0 : 120, transition: `stroke-dashoffset 1s ease-out ${1.5 + i * 0.1}s` }}
          />
        ))}

        {/* Columns at entrance */}
        {[405, 495].map((x, i) => (
          <line
            key={`col-${i}`}
            x1={x} y1={180} x2={x} y2={380}
            stroke="#c9a84c"
            strokeWidth="3"
            opacity="0.5"
            style={{ strokeDasharray: 200, strokeDashoffset: visible ? 0 : 200, transition: `stroke-dashoffset 1.2s ease-out ${0.8 + i * 0.15}s` }}
          />
        ))}


        {/* ═══════ LEFT WING ═══════ */}
        <path
          d="M100 380 L100 220 L300 220 L300 380"
          stroke="#c9a84c"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 700, strokeDashoffset: visible ? 0 : 700, transition: "stroke-dashoffset 2s ease-out 0.4s" }}
        />
        {/* Left wing flat roof line */}
        <line x1="90" y1="220" x2="310" y2="220" stroke="#c9a84c" strokeWidth="2"
          style={{ strokeDasharray: 220, strokeDashoffset: visible ? 0 : 220, transition: "stroke-dashoffset 1.5s ease-out 0.6s" }} />

        {/* Left wing windows */}
        {[130, 180, 230].map((x, i) => (
          <rect
            key={`lw-${i}`}
            x={x} y={260} width="25" height="35" rx="2"
            stroke="#c9a84c"
            strokeWidth="1.5"
            opacity="0.6"
            style={{ strokeDasharray: 120, strokeDashoffset: visible ? 0 : 120, transition: `stroke-dashoffset 1s ease-out ${1.6 + i * 0.1}s` }}
          />
        ))}
        {[130, 180, 230].map((x, i) => (
          <rect
            key={`lw2-${i}`}
            x={x} y={330} width="25" height="30" rx="2"
            stroke="#c9a84c"
            strokeWidth="1"
            opacity="0.4"
            style={{ strokeDasharray: 120, strokeDashoffset: visible ? 0 : 120, transition: `stroke-dashoffset 1s ease-out ${1.8 + i * 0.1}s` }}
          />
        ))}


        {/* ═══════ RIGHT WING ═══════ */}
        <path
          d="M600 380 L600 220 L900 220 L900 380"
          stroke="#c9a84c"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 700, strokeDashoffset: visible ? 0 : 700, transition: "stroke-dashoffset 2s ease-out 0.4s" }}
        />
        {/* Right wing flat roof */}
        <line x1="590" y1="220" x2="910" y2="220" stroke="#c9a84c" strokeWidth="2"
          style={{ strokeDasharray: 320, strokeDashoffset: visible ? 0 : 320, transition: "stroke-dashoffset 1.5s ease-out 0.6s" }} />

        {/* Right wing windows */}
        {[640, 690, 740, 800, 850].map((x, i) => (
          <rect
            key={`rw-${i}`}
            x={x} y={260} width="25" height="35" rx="2"
            stroke="#c9a84c"
            strokeWidth="1.5"
            opacity="0.6"
            style={{ strokeDasharray: 120, strokeDashoffset: visible ? 0 : 120, transition: `stroke-dashoffset 1s ease-out ${1.6 + i * 0.08}s` }}
          />
        ))}
        {[640, 690, 740, 800, 850].map((x, i) => (
          <rect
            key={`rw2-${i}`}
            x={x} y={330} width="25" height="30" rx="2"
            stroke="#c9a84c"
            strokeWidth="1"
            opacity="0.4"
            style={{ strokeDasharray: 120, strokeDashoffset: visible ? 0 : 120, transition: `stroke-dashoffset 1s ease-out ${1.9 + i * 0.08}s` }}
          />
        ))}


        {/* ═══════ CLOCK TOWER — TOP CENTER ═══════ */}
        <path
          d="M430 80 L430 30 L470 30 L470 80"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 200, strokeDashoffset: visible ? 0 : 200, transition: "stroke-dashoffset 1.5s ease-out 1.5s" }}
        />
        {/* Tower dome */}
        <path
          d="M425 30 Q450 5 475 30"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ strokeDasharray: 80, strokeDashoffset: visible ? 0 : 80, transition: "stroke-dashoffset 1s ease-out 1.8s" }}
        />
        {/* Clock circle */}
        <circle
          cx="450" cy="55" r="12"
          stroke="#c9a84c"
          strokeWidth="1.5"
          style={{ strokeDasharray: 80, strokeDashoffset: visible ? 0 : 80, transition: "stroke-dashoffset 1s ease-out 2s" }}
        />
        {/* Clock hands */}
        <line x1="450" y1="55" x2="450" y2="46" stroke="#c9a84c" strokeWidth="1.5"
          style={{ strokeDasharray: 10, strokeDashoffset: visible ? 0 : 10, transition: "stroke-dashoffset 0.5s ease-out 2.3s" }} />
        <line x1="450" y1="55" x2="458" y2="52" stroke="#c9a84c" strokeWidth="1"
          style={{ strokeDasharray: 10, strokeDashoffset: visible ? 0 : 10, transition: "stroke-dashoffset 0.5s ease-out 2.4s" }} />
        {/* Flag pole */}
        <line x1="450" y1="5" x2="450" y2="-15" stroke="#c9a84c" strokeWidth="1.5"
          style={{ strokeDasharray: 20, strokeDashoffset: visible ? 0 : 20, transition: "stroke-dashoffset 0.8s ease-out 2.5s" }} />
        {/* Flag */}
        <path
          d="M450 -15 L475 -8 L450 0"
          stroke="#c9a84c"
          strokeWidth="1.5"
          fill="rgba(201,168,76,0.15)"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 60, strokeDashoffset: visible ? 0 : 60, transition: "stroke-dashoffset 0.8s ease-out 2.6s" }}
        />


        {/* ═══════ FAR LEFT — LIBRARY BUILDING ═══════ */}
        <path
          d="M20 380 L20 270 L90 270 L90 380"
          stroke="#c9a84c"
          strokeWidth="1"
          opacity="0.4"
          strokeLinecap="round"
          style={{ strokeDasharray: 400, strokeDashoffset: visible ? 0 : 400, transition: "stroke-dashoffset 1.5s ease-out 2s" }}
        />
        <line x1="15" y1="270" x2="95" y2="270" stroke="#c9a84c" strokeWidth="1.5" opacity="0.4"
          style={{ strokeDasharray: 80, strokeDashoffset: visible ? 0 : 80, transition: "stroke-dashoffset 1s ease-out 2.2s" }} />
        {[35, 60].map((x, i) => (
          <rect key={`flw-${i}`} x={x} y={295} width="18" height="25" rx="1" stroke="#c9a84c" strokeWidth="1" opacity="0.3"
            style={{ strokeDasharray: 90, strokeDashoffset: visible ? 0 : 90, transition: `stroke-dashoffset 0.8s ease-out ${2.3 + i * 0.1}s` }} />
        ))}


        {/* ═══════ FAR RIGHT — SPORTS BLOCK ═══════ */}
        <path
          d="M920 380 L920 260 L1050 260 L1050 380"
          stroke="#c9a84c"
          strokeWidth="1"
          opacity="0.4"
          strokeLinecap="round"
          style={{ strokeDasharray: 500, strokeDashoffset: visible ? 0 : 500, transition: "stroke-dashoffset 1.5s ease-out 2s" }}
        />
        {/* Sloped roof */}
        <path d="M915 260 L985 230 L1055 260" stroke="#c9a84c" strokeWidth="1" opacity="0.4"
          style={{ strokeDasharray: 150, strokeDashoffset: visible ? 0 : 150, transition: "stroke-dashoffset 1s ease-out 2.2s" }} />
        {[945, 985, 1020].map((x, i) => (
          <rect key={`frw-${i}`} x={x} y={290} width="20" height="28" rx="1" stroke="#c9a84c" strokeWidth="1" opacity="0.3"
            style={{ strokeDasharray: 100, strokeDashoffset: visible ? 0 : 100, transition: `stroke-dashoffset 0.8s ease-out ${2.3 + i * 0.1}s` }} />
        ))}


        {/* ═══════ GROUND LINE ═══════ */}
        <line x1="0" y1="380" x2="1200" y2="380" stroke="#c9a84c" strokeWidth="1" opacity="0.3"
          style={{ strokeDasharray: 1200, strokeDashoffset: visible ? 0 : 1200, transition: "stroke-dashoffset 2.5s ease-out 0s" }} />

        {/* Ground details — steps at entrance */}
        <path d="M400 380 L400 390 L500 390 L500 380" stroke="#c9a84c" strokeWidth="1" opacity="0.3"
          style={{ strokeDasharray: 120, strokeDashoffset: visible ? 0 : 120, transition: "stroke-dashoffset 1s ease-out 2s" }} />
        <path d="M390 390 L390 397 L510 397 L510 390" stroke="#c9a84c" strokeWidth="1" opacity="0.25"
          style={{ strokeDasharray: 140, strokeDashoffset: visible ? 0 : 140, transition: "stroke-dashoffset 1s ease-out 2.2s" }} />

        {/* Trees — left side */}
        {[55, 115].map((x, i) => (
          <g key={`tree-l-${i}`} opacity="0.3">
            <line x1={x} y1={380} x2={x} y2={350} stroke="#c9a84c" strokeWidth="1.5"
              style={{ strokeDasharray: 30, strokeDashoffset: visible ? 0 : 30, transition: `stroke-dashoffset 0.8s ease-out ${2.5 + i * 0.2}s` }} />
            <circle cx={x} cy={340} r="15" stroke="#c9a84c" strokeWidth="1"
              style={{ strokeDasharray: 100, strokeDashoffset: visible ? 0 : 100, transition: `stroke-dashoffset 1s ease-out ${2.6 + i * 0.2}s` }} />
          </g>
        ))}

        {/* Trees — right side */}
        {[950, 1030, 1100].map((x, i) => (
          <g key={`tree-r-${i}`} opacity="0.3">
            <line x1={x} y1={380} x2={x} y2={355} stroke="#c9a84c" strokeWidth="1.5"
              style={{ strokeDasharray: 25, strokeDashoffset: visible ? 0 : 25, transition: `stroke-dashoffset 0.8s ease-out ${2.5 + i * 0.15}s` }} />
            <circle cx={x} cy={345} r="13" stroke="#c9a84c" strokeWidth="1"
              style={{ strokeDasharray: 85, strokeDashoffset: visible ? 0 : 85, transition: `stroke-dashoffset 1s ease-out ${2.6 + i * 0.15}s` }} />
          </g>
        ))}

        {/* Pathway from entrance */}
        <path d="M440 397 L430 450 M460 397 L470 450" stroke="#c9a84c" strokeWidth="1" opacity="0.2"
          style={{ strokeDasharray: 60, strokeDashoffset: visible ? 0 : 60, transition: "stroke-dashoffset 1s ease-out 2.8s" }} />

        {/* SGC text below building */}
        <text x="450" y="440" textAnchor="middle" fill="#c9a84c" fontSize="14" fontWeight="bold" letterSpacing="8" opacity={visible ? "0.4" : "0"} style={{ transition: "opacity 1s ease-out 3s" }}>
          SGC CAMPUS
        </text>
      </svg>
    </div>
  );
}
