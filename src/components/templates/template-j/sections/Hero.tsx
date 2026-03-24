"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, BookOpen, GraduationCap, FlaskConical, Globe, Award, Users } from "lucide-react";

const typewriterLines = [
  { text: 'const sgc = {', color: 'text-[#ff79c6]' },
  { text: '  name: "Saradha Gangadharan College",', color: 'text-[#50fa7b]' },
  { text: '  type: "Autonomous Institution",', color: 'text-[#50fa7b]' },
  { text: '  accreditation: "NAAC A+ | ISO 9001",', color: 'text-[#50fa7b]' },
  { text: '  students: 1245, faculty: 79,', color: 'text-[#bd93f9]' },
  { text: '  placement_rate: "92%"', color: 'text-[#f8f8f2]' },
  { text: '};', color: 'text-[#ff79c6]' },
];

export default function HeroJ() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentLine >= typewriterLines.length) return;

    const line = typewriterLines[currentLine].text;
    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = line.substring(0, currentChar + 1);
          return updated;
        });
        setCurrentChar(currentChar + 1);
      }, Math.random() * 40 + 20);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1);
        setCurrentChar(0);
        setDisplayedLines((prev) => [...prev, '']);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden pt-16">
      {/* Floating decorative icons */}
      <div className="absolute inset-0 pointer-events-none">
        <BookOpen className="absolute top-[15%] left-[8%] w-10 h-10 text-[#1e40af]/[0.07] tj-float" />
        <GraduationCap className="absolute top-[25%] right-[12%] w-12 h-12 text-[#4f46e5]/[0.07] tj-float-delay" />
        <FlaskConical className="absolute bottom-[30%] left-[15%] w-8 h-8 text-[#3730a3]/[0.07] tj-float-slow" />
        <Globe className="absolute bottom-[20%] right-[8%] w-10 h-10 text-[#1e40af]/[0.07] tj-float" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Content */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6 tj-fade tj-delay-1">
              {["NAAC A+", "Autonomous", "ISO 9001:2015"].map((b) => (
                <span key={b} className="bg-white/60 backdrop-blur text-[#1e40af] text-[10px] font-bold px-3 py-1.5 rounded-full border border-[#1e40af]/10">
                  {b}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] leading-[1.1] mb-5 tj-fade tj-delay-2">
              Shaping the <br />
              <span className="tj-gradient-text">Future Leaders</span><br />
              of Tomorrow
            </h1>

            <p className="text-lg text-[#6b7280] leading-relaxed max-w-lg mb-8 tj-fade tj-delay-3">
              Saradha Gangadharan College — an autonomous institution affiliated to Pondicherry University.
              13+ programmes in Science, Arts, Commerce & Technology.
            </p>

            <div className="flex flex-wrap gap-4 mb-10 tj-fade tj-delay-4">
              <Link
                href="/admissions/apply"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#1e40af] to-[#4f46e5] text-white font-semibold px-7 py-3.5 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm"
              >
                Apply for 2026-27 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border-2 border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white font-semibold px-7 py-3.5 rounded-lg transition-all text-sm"
              >
                Explore SGC
              </Link>
            </div>

            {/* Quick stats */}
            <div className="flex gap-8 tj-fade tj-delay-5">
              {[
                { value: "13+", label: "Courses" },
                { value: "79+", label: "Faculty" },
                { value: "92%", label: "Placed" },
                { value: "1,245+", label: "Students" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-[#111827]">{s.value}</p>
                  <p className="text-xs text-[#6b7280]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Code editor */}
          <div className="tj-fade tj-delay-3">
            <div className="rounded-xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(145deg, #1a1a2e, #0f0f1e)' }}>
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="ml-3 text-[10px] text-gray-500 font-mono">sgc-profile.js</span>
              </div>

              {/* Code area */}
              <div className="p-5 font-mono text-sm leading-relaxed min-h-[260px]">
                {typewriterLines.map((line, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-gray-600 w-5 text-right text-xs leading-6 select-none">{i + 1}</span>
                    <span className={line.color}>
                      {displayedLines[i] || ''}
                      {i === currentLine && currentLine < typewriterLines.length && (
                        <span className="tj-cursor text-white">|</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bouncing scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <span className="text-[10px] text-[#6b7280] uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 text-[#1e40af] animate-bounce" />
      </div>
    </section>
  );
}
