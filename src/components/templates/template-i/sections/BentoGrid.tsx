"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Users, TrendingUp, Award, Calendar, Play, Quote, MapPin, Phone, Mail, Sparkles, Trophy, Star, ExternalLink } from "lucide-react";
import { DEPARTMENTS, EVENTS, NEWS, STATS, PLACEMENT_STATS } from "@/lib/constants";
import { CAMPUS_IMAGES, HERO_IMAGES, PEOPLE_IMAGES, EVENT_IMAGES, NEWS_IMAGES } from "@/lib/images";

function Counter({ value, visible }: { value: number; visible: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let s = 0; const inc = value / 100;
    const t = setInterval(() => { s += inc; if (s >= value) { setCount(value); clearInterval(t); } else setCount(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [value, visible]);
  return <>{count.toLocaleString()}</>;
}

export default function BentoGrid() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-5 py-5">
      {/* ═══════ ROW 1: Hero + Stats ═══════ */}
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-3 mb-3">
        {/* Hero — large */}
        <div className="col-span-4 lg:col-span-8 relative rounded-2xl overflow-hidden h-[320px] md:h-[400px] group">
          <Image src={CAMPUS_IMAGES.main} alt="SGC Campus" fill className="object-cover group-hover:scale-105 transition-transform duration-700" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#e11d48] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> ADMISSIONS OPEN
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <p className="text-[#0d9488] text-xs font-bold uppercase tracking-widest mb-2">Autonomous Institution</p>
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3">Saradha Gangadharan College</h1>
            <p className="text-white/50 text-sm mb-5 max-w-md">Affiliated to Pondicherry University. NAAC Accredited. ISO 9001:2015 Certified.</p>
            <div className="flex gap-3">
              <Link href="/admissions/apply" className="bg-[#0d9488] hover:bg-[#0f766e] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2">Apply <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/about" className="bg-white/10 hover:bg-white/20 backdrop-blur text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">Explore</Link>
            </div>
          </div>
        </div>

        {/* Stats tiles */}
        <div ref={statsRef} className="col-span-4 lg:col-span-4 grid grid-cols-2 gap-3">
          {[
            { icon: BookOpen, value: STATS[0].value, suffix: STATS[0].suffix, label: "Courses", color: "text-[#0d9488]", bg: "bg-[#0d9488]/10" },
            { icon: Users, value: STATS[1].value, suffix: STATS[1].suffix, label: "Faculty", color: "text-[#d97706]", bg: "bg-[#d97706]/10" },
            { icon: TrendingUp, value: STATS[2].value, suffix: STATS[2].suffix, label: "Students", color: "text-[#0284c7]", bg: "bg-[#0284c7]/10" },
            { icon: Award, value: STATS[3].value, suffix: STATS[3].suffix, label: "Placed", color: "text-[#e11d48]", bg: "bg-[#e11d48]/10" },
          ].map(({ icon: Icon, value, suffix, label, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl border border-[#ebebeb] p-5 flex flex-col justify-between h-full">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-black text-[#0f0f0f]">
                  <Counter value={value} visible={statsVisible} /><span className={color}>{suffix}</span>
                </p>
                <p className="text-[10px] text-[#888] uppercase tracking-wider mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ ROW 2: About + Chairman + Accreditation ═══════ */}
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-3 mb-3">
        {/* About text */}
        <div className="col-span-4 lg:col-span-4 bg-white rounded-2xl border border-[#ebebeb] p-6 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488] mb-2">About</p>
            <h2 className="text-xl font-black text-[#0f0f0f] mb-3 leading-snug">Excellence Since 2010</h2>
            <p className="text-sm text-[#888] leading-relaxed">
              SGC offers 13+ programmes across Science, Arts, Commerce, and Technology. Our commitment to academic excellence and holistic development makes us one of Puducherry&apos;s leading institutions.
            </p>
          </div>
          <Link href="/about" className="inline-flex items-center gap-1 text-xs font-bold text-[#0d9488] mt-4 hover:underline">Learn More <ArrowUpRight className="w-3 h-3" /></Link>
        </div>

        {/* Chairman quote */}
        <div className="col-span-4 lg:col-span-4 bg-[#0f0f0f] text-white rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <Quote className="w-6 h-6 text-[#0d9488]/40 mb-3" />
            <p className="text-sm italic text-white/70 leading-relaxed mb-4">
              &ldquo;Education is the most powerful weapon to change the world. At SGC, we transform lives and build a better tomorrow.&rdquo;
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden relative border border-white/20">
              <Image src={PEOPLE_IMAGES.chairman} alt="Chairman" fill className="object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold">Shri. Saradha Gangadharan</p>
              <p className="text-[10px] text-white/40">Chairman</p>
            </div>
          </div>
        </div>

        {/* Campus image + accreditations */}
        <div className="col-span-4 lg:col-span-4 relative rounded-2xl overflow-hidden h-[240px] lg:h-auto">
          <Image src={CAMPUS_IMAGES.building} alt="Campus" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
            {["NAAC A+", "ISO 9001", "Autonomous", "NIRF"].map((b) => (
              <span key={b} className="bg-white/20 backdrop-blur text-white text-[9px] font-bold px-2.5 py-1 rounded-full">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════ ROW 3: Programmes strip ═══════ */}
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-3 mb-3">
        <div className="col-span-4 lg:col-span-12 bg-white rounded-2xl border border-[#ebebeb] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black text-[#0f0f0f]">Programmes</h2>
            <Link href="/academics" className="text-[10px] font-bold text-[#0d9488] hover:underline flex items-center gap-1">View All <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {DEPARTMENTS.slice(0, 9).map((d) => (
              <Link key={d.name} href="/academics" className="shrink-0 group flex items-center gap-2.5 bg-[#f7f7f7] hover:bg-[#0d9488]/5 rounded-xl px-4 py-3 border border-transparent hover:border-[#0d9488]/20 transition-all">
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${d.type === "UG" ? "bg-[#0d9488]/10 text-[#0d9488]" : "bg-[#d97706]/10 text-[#d97706]"}`}>{d.type}</span>
                <span className="text-xs font-semibold text-[#0f0f0f] group-hover:text-[#0d9488] transition-colors whitespace-nowrap">{d.name}</span>
                <span className="text-[10px] text-[#888]">{d.fees}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════ ROW 4: Events + News + Spotlight ═══════ */}
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-3 mb-3">
        {/* Events */}
        <div className="col-span-4 lg:col-span-4 bg-white rounded-2xl border border-[#ebebeb] p-5">
          <h3 className="text-sm font-black text-[#0f0f0f] mb-4 flex items-center gap-2"><Calendar className="w-4 h-4 text-[#0284c7]" /> Events</h3>
          <div className="space-y-3">
            {EVENTS.slice(0, 3).map((e, i) => (
              <div key={i} className="flex items-start gap-3 group cursor-pointer">
                <div className="bg-[#0284c7]/10 rounded-lg px-2 py-1 text-center shrink-0">
                  <span className="text-lg font-black text-[#0284c7] leading-none block">{new Date(e.date).getDate()}</span>
                  <span className="text-[8px] text-[#0284c7] uppercase font-bold">{new Date(e.date).toLocaleDateString("en-IN", { month: "short" })}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0f0f0f] group-hover:text-[#0284c7] transition-colors leading-snug">{e.title}</p>
                  <p className="text-[10px] text-[#888] mt-0.5">{e.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured news — large image */}
        <div className="col-span-4 lg:col-span-4 relative rounded-2xl overflow-hidden h-[280px] group cursor-pointer">
          <Image src={NEWS_IMAGES.naac} alt={NEWS[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="bg-[#e11d48] text-white text-[9px] font-bold px-2 py-0.5 rounded">Featured</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-base font-bold text-white leading-snug mb-1">{NEWS[0].title}</h3>
            <p className="text-xs text-white/50 line-clamp-2">{NEWS[0].excerpt}</p>
          </div>
        </div>

        {/* Spotlight: Best Teacher + Student */}
        <div className="col-span-4 lg:col-span-4 space-y-3">
          {[
            { badge: "Best Teacher", name: "Dr. Meena Kumari", role: "Computer Science", photo: PEOPLE_IMAGES.student3, icon: Award, color: "bg-[#d97706]", stat: "15+ Papers" },
            { badge: "Best Student", name: "Arun Prasad", role: "B.Sc CS, Final Year", photo: PEOPLE_IMAGES.student4, icon: Trophy, color: "bg-[#0d9488]", stat: "Rank #1" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.name} className="bg-white rounded-2xl border border-[#ebebeb] p-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden relative shrink-0 border border-[#ebebeb]">
                  <Image src={s.photo} alt={s.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`inline-flex items-center gap-1 ${s.color} text-white text-[8px] font-bold px-1.5 py-0.5 rounded`}><Icon className="w-2.5 h-2.5" /> {s.badge}</span>
                  <p className="text-xs font-bold text-[#0f0f0f] mt-1">{s.name}</p>
                  <p className="text-[10px] text-[#888]">{s.role}</p>
                </div>
                <span className="text-[9px] font-bold text-[#0d9488] bg-[#0d9488]/10 px-2 py-1 rounded shrink-0">{s.stat}</span>
              </div>
            );
          })}

          {/* Social card */}
          <div className="bg-[#0f0f0f] rounded-2xl p-4 text-white">
            <p className="text-[10px] font-bold text-[#0d9488] uppercase tracking-wider mb-2">Social</p>
            <p className="text-xs text-white/60 leading-relaxed mb-3">
              &ldquo;Proud to announce SGC awarded NAAC A+ Grade! A testament to our excellence.&rdquo;
            </p>
            <div className="flex gap-3">
              {[
                { name: "Fb", color: "bg-[#1877f2]" },
                { name: "X", color: "bg-white/20" },
                { name: "Li", color: "bg-[#0077b5]" },
                { name: "Ig", color: "bg-gradient-to-br from-[#f97316] to-[#ec4899]" },
                { name: "Yt", color: "bg-[#dc2626]" },
              ].map((s) => (
                <span key={s.name} className={`w-7 h-7 ${s.color} rounded-full flex items-center justify-center text-[9px] font-bold text-white cursor-pointer hover:scale-110 transition-transform`}>{s.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ ROW 5: Placements + Testimonials + CTA ═══════ */}
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-3 mb-3">
        {/* Placements */}
        <div className="col-span-4 lg:col-span-5 bg-[#0f0f0f] rounded-2xl p-6 text-white">
          <p className="text-[10px] font-bold text-[#0d9488] uppercase tracking-wider mb-1">Placements</p>
          <p className="text-4xl font-black mb-1">92<span className="text-[#0d9488]">%</span></p>
          <p className="text-xs text-white/40 mb-5">Career success rate across 50+ companies</p>
          <div className="space-y-3">
            {PLACEMENT_STATS.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-white/50">{s.label}</span>
                  <span className="font-bold">{s.percentage}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0d9488] rounded-full" style={{ width: `${s.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
          <Link href="/placements" className="inline-flex items-center gap-1 text-xs font-bold text-[#0d9488] mt-4 hover:underline">Full Report <ArrowUpRight className="w-3 h-3" /></Link>
        </div>

        {/* Testimonial tile */}
        <div className="col-span-4 lg:col-span-4 bg-white rounded-2xl border border-[#ebebeb] p-6 flex flex-col justify-between">
          <div>
            <Sparkles className="w-5 h-5 text-[#d97706] mb-3" />
            <p className="text-sm text-[#0f0f0f] italic leading-relaxed mb-4">
              &ldquo;SGC gave me the platform to grow both academically and personally. The faculty mentorship and placement support helped me secure a position at a top IT company.&rdquo;
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden relative"><Image src={PEOPLE_IMAGES.student1} alt="Student" fill className="object-cover" /></div>
            <div>
              <p className="text-xs font-bold text-[#0f0f0f]">Priya Lakshmi</p>
              <p className="text-[10px] text-[#888]">B.Sc CS, 2024</p>
            </div>
          </div>
        </div>

        {/* CTA tile */}
        <div className="col-span-4 lg:col-span-3 bg-gradient-to-br from-[#0d9488] to-[#0f766e] rounded-2xl p-6 text-white flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Get Started</p>
            <h3 className="text-xl font-black leading-snug mb-2">Your future begins here.</h3>
            <p className="text-xs text-white/50 leading-relaxed">Apply for the 2026-27 academic year.</p>
          </div>
          <div className="space-y-2 mt-5">
            <Link href="/admissions/apply" className="block w-full text-center bg-white text-[#0d9488] text-xs font-bold py-2.5 rounded-lg hover:bg-white/90 transition-colors">
              Apply Now
            </Link>
            <Link href="/contact" className="block w-full text-center border border-white/30 text-white text-xs font-medium py-2.5 rounded-lg hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════ ROW 6: Gov Accreditation banner + Quick links ═══════ */}
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-3">
        <div className="col-span-4 lg:col-span-8 bg-white rounded-2xl border border-[#ebebeb] p-4">
          <p className="text-[10px] font-bold text-[#888] uppercase tracking-wider mb-3">Government Recognitions</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "NAAC Accredited (A+ Grade)", color: "bg-[#0d9488]/10 text-[#0d9488]" },
              { label: "UGC 2(f) & 12(B) Recognition", color: "bg-[#0284c7]/10 text-[#0284c7]" },
              { label: "NIRF Ranking 2026", color: "bg-[#d97706]/10 text-[#d97706]" },
              { label: "AICTE Approved", color: "bg-[#e11d48]/10 text-[#e11d48]" },
              { label: "ISO 9001:2015 Certified", color: "bg-[#7c3aed]/10 text-[#7c3aed]" },
              { label: "Autonomous Status — PU", color: "bg-[#0f0f0f]/10 text-[#0f0f0f]" },
            ].map((g) => (
              <span key={g.label} className={`${g.color} text-[10px] font-bold px-3 py-1.5 rounded-lg`}>{g.label}</span>
            ))}
          </div>
        </div>
        <div className="col-span-4 lg:col-span-4 bg-[#f7f7f7] rounded-2xl border border-[#ebebeb] p-4">
          <p className="text-[10px] font-bold text-[#888] uppercase tracking-wider mb-3">Quick Links</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Apply Online", color: "bg-[#0d9488]" },
              { label: "Pay Fees", color: "bg-[#0284c7]" },
              { label: "Exam Results", color: "bg-[#d97706]" },
              { label: "Prospectus", color: "bg-[#e11d48]" },
            ].map((q) => (
              <Link key={q.label} href="#" className={`${q.color} text-white text-[10px] font-bold px-3 py-2.5 rounded-lg text-center hover:opacity-90 transition-opacity`}>{q.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
