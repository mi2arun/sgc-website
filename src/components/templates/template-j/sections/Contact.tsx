"use client";

import { useState } from "react";
import { MapPin, Clock, Shield, Send } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

export default function ContactJ() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-[#1e40af] to-[#3730a3] relative overflow-hidden">
      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Get in Touch</h2>
            <div className="w-24 h-1 bg-white/30 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Info cards — glassmorphism */}
          <ScrollReveal delay={100}>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Address", value: SITE_CONFIG.address },
                  { icon: Clock, label: "Working Hours", value: "Mon - Sat: 9:00 AM - 5:00 PM" },
                  { icon: Shield, label: "Phone & Email", value: `${SITE_CONFIG.phone}\n${SITE_CONFIG.email}` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">{label}</p>
                      <p className="text-sm text-white whitespace-pre-line">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Form — glassmorphism */}
          <ScrollReveal delay={200}>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-green-400" />
                  </div>
                  <p className="text-white font-semibold">Thank you!</p>
                  <p className="text-white/60 text-sm mt-1">We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Your Name" required className="bg-white/20 backdrop-blur text-white placeholder:text-white/40 rounded-lg px-4 py-3 text-sm border border-white/10 focus:border-white/30 outline-none transition-colors w-full" />
                    <input type="email" placeholder="Email Address" required className="bg-white/20 backdrop-blur text-white placeholder:text-white/40 rounded-lg px-4 py-3 text-sm border border-white/10 focus:border-white/30 outline-none transition-colors w-full" />
                  </div>
                  <input type="text" placeholder="Subject" className="bg-white/20 backdrop-blur text-white placeholder:text-white/40 rounded-lg px-4 py-3 text-sm border border-white/10 focus:border-white/30 outline-none transition-colors w-full" />
                  <textarea placeholder="Your Message" rows={4} required className="bg-white/20 backdrop-blur text-white placeholder:text-white/40 rounded-lg px-4 py-3 text-sm border border-white/10 focus:border-white/30 outline-none transition-colors w-full resize-none" />
                  <button type="submit" className="w-full bg-white text-[#1e40af] font-semibold py-3 rounded-lg hover:bg-white/90 transition-colors text-sm">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
