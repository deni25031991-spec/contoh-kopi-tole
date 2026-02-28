import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Mail, ArrowRight, ShieldCheck, Fingerprint } from 'lucide-react';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate login
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-[var(--color-coffee-dark)] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
          >
            {/* Decorative Header */}
            <div className="h-32 bg-gradient-to-br from-[var(--color-digital-amber)]/20 to-transparent flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-10 gap-1 h-full w-full">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-white/20" />
                  ))}
                </div>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center mb-2">
                  <Fingerprint className="w-8 h-8 text-[var(--color-digital-amber)]" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-digital-amber)]">Security Protocol v2.5</span>
              </div>
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/20 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-10">
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tighter mb-2">Access Portal</h2>
                <p className="text-stone-500 text-sm font-light">Enter your credentials to access the Thole Coffee digital interface.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest opacity-40 ml-1">Terminal ID / Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 group-focus-within:opacity-100 group-focus-within:text-[var(--color-digital-amber)] transition-all" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="operator@thole.digital"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[var(--color-digital-amber)]/50 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest opacity-40 ml-1">Security Key / Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 group-focus-within:opacity-100 group-focus-within:text-[var(--color-digital-amber)] transition-all" />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[var(--color-digital-amber)]/50 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest px-1">
                  <label className="flex items-center gap-2 cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
                    <input type="checkbox" className="rounded border-white/10 bg-white/5 text-[var(--color-digital-amber)]" />
                    Remember Terminal
                  </label>
                  <a href="#" className="text-[var(--color-digital-amber)] opacity-60 hover:opacity-100 transition-opacity">Reset Access</a>
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[var(--color-digital-amber)] text-black font-bold uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full"
                    />
                  ) : (
                    <>
                      Initialize Access
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-center gap-6 opacity-40">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-mono text-[8px] uppercase tracking-widest">Encrypted</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <span className="font-mono text-[8px] uppercase tracking-widest">Madiun Node 01</span>
              </div>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="scanline opacity-[0.03]" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
