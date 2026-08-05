"use client";

import { Search } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[700px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbOxXHKN0JMbzYoWSqmakBTbde2Ka1KCD0V9hG2Fvb2JBqAOwKe5QJD6jzSwxM1RW0KpQaW2rLiPzFlxD3g-QjBDtW4vR6yrQY4pYeRUMaH2cQo9ArxabzEsVqmbtFmQB5agouIXVv0GsT_aFnNiVbR56j2mcuvVJxUmYgk-P-8hfSheG7l11cbEGAD9TUfB5qL7JQBm__CIbDEJtKDg_sTMrkFw0drLGPtOVBO984DXXV2Kc00tc0")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-20">
        <div className="max-w-2xl">
          <h1 className="font-display font-bold text-5xl text-white mb-stack-md leading-tight">
            Find Your <span className="text-secondary-fixed">Eternal</span>{" "}
            Partner
          </h1>
          <p className="text-white/90 text-lg mb-stack-lg max-w-lg">
            Experience the most exclusive matrimony platform designed for those
            who value tradition, integrity, and profound connection.
          </p>

          {/* Quick Search Widget */}
          <div className="bg-white/95 backdrop-blur-md p-gutter rounded-xl shadow-xl grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-medium text-on-surface-variant">
                Looking For
              </label>
              <select className="w-full border border-outline-variant/30 rounded-lg p-2 focus:ring-2 focus:ring-secondary focus:outline-none">
                <option>Woman</option>
                <option>Man</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-medium text-on-surface-variant">
                Age Range
              </label>
              <select className="w-full border border-outline-variant/30 rounded-lg p-2 focus:ring-2 focus:ring-secondary focus:outline-none">
                <option>24 - 30</option>
                <option>31 - 38</option>
                <option>39 - 45</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-medium text-on-surface-variant">
                Religion
              </label>
              <select className="w-full border border-outline-variant/30 rounded-lg p-2 focus:ring-2 focus:ring-secondary focus:outline-none">
                <option>Any Community</option>
                <option>Hindu</option>
                <option>Muslim</option>
                <option>Christian</option>
                <option>Sikh</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-medium text-on-surface-variant">
                Location
              </label>
              <input
                className="w-full border border-outline-variant/30 rounded-lg p-2 focus:ring-2 focus:ring-secondary focus:outline-none"
                placeholder="City or State"
                type="text"
              />
            </div>
            <button className="bg-gradient-to-r from-[#C5A059] to-[#B08C45] text-white h-[42px] rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
