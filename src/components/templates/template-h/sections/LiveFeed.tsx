"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EVENTS, NEWS } from "@/lib/constants";
import { EVENT_IMAGES, NEWS_IMAGES, PEOPLE_IMAGES } from "@/lib/images";
import { Calendar, Newspaper, TrendingUp, MessageCircle, Heart, Share2, ExternalLink, ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type FeedTab = "all" | "news" | "events" | "social";

const socialPosts = [
  {
    platform: "Twitter",
    handle: "@sgcpdy",
    color: "bg-[#18181b]",
    content: "Proud to announce SGC has been awarded NAAC A+ Grade! A testament to our commitment to excellence. #SGC #NAAC #Puducherry",
    time: "2h ago",
    likes: 142,
    replies: 23,
  },
  {
    platform: "LinkedIn",
    handle: "SGC Puducherry",
    color: "bg-[#0077b5]",
    content: "Our placement cell successfully placed 92% of the 2025 graduating batch across 50+ companies. Congratulations to all students! #Placements #Career",
    time: "5h ago",
    likes: 287,
    replies: 41,
  },
  {
    platform: "Facebook",
    handle: "SGC Official",
    color: "bg-[#1877f2]",
    content: "Registration for iTechnova 2026 — our annual tech fest — is now open! Hackathons, workshops, competitions and more. Register now at our campus!",
    time: "1d ago",
    likes: 356,
    replies: 67,
  },
];

const blogPosts = [
  {
    title: "How SGC is Preparing Students for Industry 4.0",
    author: "Dr. S. Babu",
    role: "Principal",
    photo: PEOPLE_IMAGES.principal,
    category: "Blog",
    readTime: "5 min read",
    excerpt: "Our new curriculum integrates AI, data science, and IoT across all departments to ensure students are future-ready.",
  },
  {
    title: "My Journey from SGC to Silicon Valley",
    author: "Priya Lakshmi",
    role: "Alumni, B.Sc CS 2024",
    photo: PEOPLE_IMAGES.student1,
    category: "Alumni Story",
    readTime: "4 min read",
    excerpt: "When I joined SGC's Computer Science department, I never imagined I'd end up working at a FAANG company within two years.",
  },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function LiveFeed() {
  const [tab, setTab] = useState<FeedTab>("all");

  const tabs: { id: FeedTab; label: string; icon: React.ElementType; count: number }[] = [
    { id: "all", label: "All Updates", icon: TrendingUp, count: 12 },
    { id: "news", label: "News", icon: Newspaper, count: 4 },
    { id: "events", label: "Events", icon: Calendar, count: 4 },
    { id: "social", label: "Social", icon: MessageCircle, count: 3 },
  ];

  return (
    <section className="py-8 bg-[#f4f4f5]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#dc2626] rounded-full th-live-dot" />
            <h2 className="text-xl font-bold text-[#18181b]">Campus Feed</h2>
          </div>
          <div className="flex gap-1.5 bg-white rounded-lg p-1 border border-[#e4e4e7]">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                  tab === t.id ? "bg-[#2563eb] text-white" : "text-[#71717a] hover:text-[#18181b]"
                )}
              >
                <t.icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Main feed column */}
          <div className="lg:col-span-2 space-y-4">
            {/* News cards */}
            {(tab === "all" || tab === "news") && NEWS.slice(0, 2).map((item, i) => (
              <div key={`news-${i}`} className="bg-white rounded-xl border border-[#e4e4e7] overflow-hidden hover:shadow-md transition-shadow th-animate-in" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex">
                  <div className="relative w-40 md:w-52 shrink-0">
                    <Image src={[NEWS_IMAGES.naac, NEWS_IMAGES.mou][i]} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-[#2563eb]/10 text-[#2563eb] px-2 py-0.5 rounded">News</span>
                        <span className="text-[10px] text-[#71717a]">{formatDate(item.date)}</span>
                      </div>
                      <h3 className="font-semibold text-sm text-[#18181b] mb-1 line-clamp-2">{item.title}</h3>
                      <p className="text-xs text-[#71717a] line-clamp-2">{item.excerpt}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-[#71717a]">
                      <button className="flex items-center gap-1 text-xs hover:text-[#dc2626] transition-colors"><Heart className="w-3.5 h-3.5" /> 24</button>
                      <button className="flex items-center gap-1 text-xs hover:text-[#2563eb] transition-colors"><Share2 className="w-3.5 h-3.5" /> Share</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Event cards */}
            {(tab === "all" || tab === "events") && (
              <div className="grid sm:grid-cols-2 gap-4">
                {EVENTS.slice(0, 2).map((event, i) => (
                  <div key={`event-${i}`} className="bg-white rounded-xl border border-[#e4e4e7] overflow-hidden hover:shadow-md transition-shadow th-animate-in" style={{ animationDelay: `${(i + 2) * 80}ms` }}>
                    <div className="relative h-36">
                      <Image src={[EVENT_IMAGES.orientation, EVENT_IMAGES.techFest][i]} alt={event.title} fill className="object-cover" />
                      <div className="absolute top-3 left-3 bg-white rounded-lg px-2.5 py-1 text-center shadow-sm">
                        <span className="text-lg font-bold text-[#18181b] leading-none block">{new Date(event.date).getDate()}</span>
                        <span className="text-[9px] text-[#71717a] uppercase">{new Date(event.date).toLocaleDateString("en-IN", { month: "short" })}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-[#16a34a]/10 text-[#16a34a] px-2 py-0.5 rounded">Event</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-[#ea580c]/10 text-[#ea580c] px-2 py-0.5 rounded">{event.category}</span>
                      </div>
                      <h3 className="font-semibold text-sm text-[#18181b] mb-1">{event.title}</h3>
                      <p className="text-xs text-[#71717a] line-clamp-2">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Social feed */}
            {(tab === "all" || tab === "social") && socialPosts.slice(0, tab === "social" ? 3 : 1).map((post, i) => (
              <div key={`social-${i}`} className="bg-white rounded-xl border border-[#e4e4e7] p-4 hover:shadow-md transition-shadow th-animate-in" style={{ animationDelay: `${(i + 4) * 80}ms` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 ${post.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white text-[10px] font-bold">{post.platform[0]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-[#18181b]">{post.handle}</p>
                    <p className="text-[10px] text-[#71717a]">{post.platform} &middot; {post.time}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#71717a]" />
                </div>
                <p className="text-sm text-[#18181b] leading-relaxed mb-3">{post.content}</p>
                <div className="flex items-center gap-5 text-[#71717a]">
                  <button className="flex items-center gap-1 text-xs hover:text-[#dc2626] transition-colors"><Heart className="w-3.5 h-3.5" /> {post.likes}</button>
                  <button className="flex items-center gap-1 text-xs hover:text-[#2563eb] transition-colors"><MessageCircle className="w-3.5 h-3.5" /> {post.replies}</button>
                  <button className="flex items-center gap-1 text-xs hover:text-[#16a34a] transition-colors"><Share2 className="w-3.5 h-3.5" /> Share</button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Blog posts */}
            <div className="bg-white rounded-xl border border-[#e4e4e7] p-5">
              <h3 className="font-bold text-sm text-[#18181b] mb-4 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-[#2563eb]" /> Blog & Stories
              </h3>
              <div className="space-y-4">
                {blogPosts.map((post, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden relative">
                        <Image src={post.photo} alt={post.author} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-[#18181b]">{post.author}</p>
                        <p className="text-[9px] text-[#71717a]">{post.role}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-[#7c3aed]/10 text-[#7c3aed] px-2 py-0.5 rounded">{post.category}</span>
                    <h4 className="text-sm font-semibold text-[#18181b] mt-1.5 mb-1 group-hover:text-[#2563eb] transition-colors leading-snug">{post.title}</h4>
                    <p className="text-xs text-[#71717a] line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-[#71717a]">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </div>
                    {i < blogPosts.length - 1 && <div className="h-px bg-[#e4e4e7] mt-4" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="bg-white rounded-xl border border-[#e4e4e7] p-5">
              <h3 className="font-bold text-sm text-[#18181b] mb-3">Follow SGC</h3>
              <div className="space-y-2">
                {[
                  { name: "Facebook", handle: "SGC Official", followers: "2.4K", color: "bg-[#1877f2]" },
                  { name: "Twitter / X", handle: "@sgcpdy", followers: "1.8K", color: "bg-[#18181b]" },
                  { name: "LinkedIn", handle: "SGC Puducherry", followers: "3.1K", color: "bg-[#0077b5]" },
                  { name: "Instagram", handle: "@sgcpdy", followers: "4.2K", color: "bg-gradient-to-r from-[#f97316] via-[#ec4899] to-[#8b5cf6]" },
                  { name: "YouTube", handle: "SGC Channel", followers: "890", color: "bg-[#dc2626]" },
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 ${s.color} rounded-full flex items-center justify-center`}>
                        <span className="text-white text-[9px] font-bold">{s.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#18181b]">{s.name}</p>
                        <p className="text-[10px] text-[#71717a]">{s.handle}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-[#71717a]">{s.followers}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors">
            View All Updates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
