import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DigitalClock } from './components/DigitalClock';
import { Menu } from './components/Menu';
import { LocationStatus } from './components/LocationStatus';
import { Coffee, Instagram, Twitter, MessageCircle, ArrowRight } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen relative overflow-x-hidden grid-bg">
      {/* Scanline effect */}
      <div className="scanline pointer-events-none" />

      {/* Navigation Rail */}
      <nav className="fixed left-0 top-0 h-full w-16 border-r border-white/10 flex flex-col items-center py-8 gap-8 z-50 bg-[var(--color-coffee-dark)]">
        <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-white/5 p-1">
          <img 
            src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=200&auto=format&fit=crop" 
            alt="Thole Coffee Logo"
            className="w-full h-full object-cover rounded-lg"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center gap-12">
          <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 cursor-pointer transition-opacity">
            Menu
          </div>
          <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 cursor-pointer transition-opacity">
            Locate
          </div>
          <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 cursor-pointer transition-opacity">
            About
          </div>
        </div>
        <div className="flex flex-col gap-4 opacity-40">
          <Instagram className="w-4 h-4 cursor-pointer hover:text-[var(--color-digital-amber)]" />
          <Twitter className="w-4 h-4 cursor-pointer hover:text-[var(--color-digital-amber)]" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="pl-16">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center p-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-8 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=500&auto=format&fit=crop" 
                alt="Thole Coffee Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="inline-block px-3 py-1 border border-[var(--color-digital-amber)]/30 rounded-full mb-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-digital-amber)]">
                System Status: Brewing
              </span>
            </div>
            <h1 className="font-display italic text-7xl md:text-9xl text-white mb-4 leading-none">
              Thole <span className="text-[var(--color-coffee-accent)]">Coffee</span>
            </h1>
            <p className="max-w-md mx-auto text-stone-400 text-sm md:text-base leading-relaxed font-light">
              Kopi keliling masa depan. Menggabungkan tradisi jalanan dengan presisi digital. 
              Temukan kami di aspal Kota Madiun.
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <DigitalClock />
          </motion.div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
            <ArrowRight className="w-6 h-6 rotate-90" />
          </div>
        </section>

        {/* Interactive Sections */}
        <section className="py-24 px-8 border-t border-white/5 bg-black/20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left: Menu */}
            <div className="lg:col-span-7">
              <Menu />
            </div>

            {/* Right: Location & Stats */}
            <div className="lg:col-span-5 sticky top-24 space-y-8">
              <LocationStatus />
              
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <h4 className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-4">Daily Telemetry</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span>BEANS REMAINING</span>
                      <span>84%</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '84%' }}
                        className="h-full bg-[var(--color-digital-amber)]" 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span>WATER RESERVOIR</span>
                      <span>62%</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '62%' }}
                        className="h-full bg-blue-500" 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span>BATTERY LEVEL</span>
                      <span>91%</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '91%' }}
                        className="h-full bg-emerald-500" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 border-t border-white/5 text-center">
          <div className="flex justify-center gap-8 mb-8">
             <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--color-digital-amber)] transition-colors cursor-pointer group">
                  <MessageCircle className="w-5 h-5 group-hover:text-[var(--color-digital-amber)]" />
                </div>
                <span className="text-[8px] font-mono uppercase tracking-widest opacity-40">WhatsApp</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--color-digital-amber)] transition-colors cursor-pointer group">
                  <Instagram className="w-5 h-5 group-hover:text-[var(--color-digital-amber)]" />
                </div>
                <span className="text-[8px] font-mono uppercase tracking-widest opacity-40">Instagram</span>
             </div>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] opacity-20">
            © 2026 THOLE COFFEE DIGITAL INTERFACE. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </main>
    </div>
  );
}
