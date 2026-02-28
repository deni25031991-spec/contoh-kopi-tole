import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Zap, Wind, Droplets, X, ShoppingCart, Loader2, CheckCircle } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  icon: string;
  desc: string;
  image: string;
}

const IconMap: Record<string, React.ReactNode> = {
  Coffee: <Coffee className="w-5 h-5" />,
  Droplets: <Droplets className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Wind: <Wind className="w-5 h-5" />,
};

export const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('/api/menu');
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const handleAddToOrder = () => {
    if (selectedItem) {
      setOrderConfirmed(selectedItem);
      setSelectedItem(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-digital-amber)]" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
        <div>
          <h2 className="font-display italic text-4xl text-[var(--color-coffee-accent)]">The Fuel</h2>
          <p className="font-mono text-[10px] uppercase tracking-widest opacity-50">Current Inventory Status: Optimal</p>
        </div>
        <div className="text-right font-mono text-[10px] opacity-40">
          [CLICK TO VIEW DETAILS]
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`card-${item.id}`}
            onClick={() => setSelectedItem(item)}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
            className="group relative border border-white/5 p-6 flex items-start gap-4 cursor-pointer transition-colors"
          >
            <div className="text-[var(--color-digital-amber)] opacity-40 font-mono text-xs">
              {item.id}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold tracking-tight text-lg group-hover:text-[var(--color-digital-amber)] transition-colors">
                  {item.name}
                </h3>
                <span className="font-mono text-sm opacity-60">{item.price}</span>
              </div>
              <p className="text-xs opacity-40 leading-relaxed mb-4 line-clamp-1">
                {item.desc}
              </p>
              <div className="flex items-center gap-2">
                <div className="h-[1px] flex-1 bg-white/10" />
                <div className="p-2 rounded-full border border-white/10 group-hover:border-[var(--color-digital-amber)] transition-colors">
                  {IconMap[item.icon]}
                </div>
              </div>
            </div>
            
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
          </motion.div>
        ))}
      </div>

      {/* Modal Pop-up */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              layoutId={`card-${selectedItem.id}`}
              className="relative w-full max-w-2xl bg-[var(--color-coffee-dark)] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/40 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-full">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-coffee-dark)] via-transparent to-transparent md:hidden" />
                </div>

                <div className="p-8 flex flex-col">
                  <div className="mb-6">
                    <span className="font-mono text-[10px] text-[var(--color-digital-amber)] uppercase tracking-widest mb-2 block">
                      Product ID: {selectedItem.id}
                    </span>
                    <h2 className="text-3xl font-bold tracking-tighter mb-2">{selectedItem.name}</h2>
                    <div className="flex items-center gap-2 text-[var(--color-coffee-accent)] font-mono">
                      <span className="text-xl font-bold">{selectedItem.price}</span>
                      <div className="h-px w-8 bg-[var(--color-coffee-accent)]/30" />
                    </div>
                  </div>

                  <p className="text-stone-400 text-sm leading-relaxed mb-8">
                    {selectedItem.desc}
                  </p>

                  <div className="mt-auto space-y-4">
                    <div className="flex items-center gap-4 text-[10px] font-mono opacity-40 uppercase tracking-widest">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        Freshly Brewed
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        Ready for Pickup
                      </div>
                    </div>

                    <button 
                      onClick={handleAddToOrder}
                      className="w-full py-4 bg-[var(--color-digital-amber)] text-black font-bold uppercase tracking-[0.2em] text-xs rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 group"
                    >
                      <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Add to Order
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-digital-amber)]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-digital-amber)]/30 to-transparent" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Order Confirmation Modal */}
      <AnimatePresence>
        {orderConfirmed && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOrderConfirmed(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[var(--color-coffee-dark)] border border-[var(--color-digital-amber)]/30 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(255,179,0,0.1)]"
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
              </div>

              <h2 className="text-2xl font-bold tracking-tight mb-2">Order Confirmed!</h2>
              <p className="text-stone-400 text-sm mb-8">
                Our driver has received your request. We're brewing your <span className="text-white font-semibold">{orderConfirmed.name}</span> right now.
              </p>

              <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-4 mb-8 border border-white/5">
                <img 
                  src={orderConfirmed.image} 
                  alt={orderConfirmed.name}
                  className="w-16 h-16 object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <p className="font-bold text-sm">{orderConfirmed.name}</p>
                  <p className="font-mono text-xs text-[var(--color-digital-amber)]">{orderConfirmed.price}</p>
                </div>
              </div>

              <button 
                onClick={() => setOrderConfirmed(null)}
                className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-[var(--color-digital-amber)] transition-colors"
              >
                Got it, Thanks!
              </button>

              {/* Decorative scanline for confirmation */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                <div className="scanline opacity-20" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
