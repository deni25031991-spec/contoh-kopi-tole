import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Radio } from 'lucide-react';

export const LocationStatus: React.FC = () => {
  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-md w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div className="w-3 h-3 bg-[var(--color-digital-red)] rounded-full animate-ping absolute inset-0" />
          <div className="w-3 h-3 bg-[var(--color-digital-red)] rounded-full relative" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Live Tracking: Active</span>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <MapPin className="w-5 h-5 text-[var(--color-coffee-accent)]" />
          </div>
          <div>
            <p className="text-[10px] uppercase opacity-40 font-mono mb-1">Current Sector</p>
            <p className="font-semibold">Jl. Pahlawan (Pahlawan Street Center)</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <Navigation className="w-5 h-5 text-[var(--color-coffee-accent)]" />
          </div>
          <div>
            <p className="text-[10px] uppercase opacity-40 font-mono mb-1">Heading To</p>
            <p className="font-semibold">Alun-Alun Kota Madiun</p>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] opacity-60">Signal Strength: 98%</span>
          </div>
          <button className="px-4 py-2 bg-[var(--color-digital-amber)] text-black text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors">
            Ping Driver
          </button>
        </div>
      </div>
    </div>
  );
};
