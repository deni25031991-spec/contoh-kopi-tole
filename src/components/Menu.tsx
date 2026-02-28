import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Zap, Wind, Droplets, X, ShoppingCart, Loader2, CheckCircle, Plus, Minus, Trash2 } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  icon: string;
  desc: string;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
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
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('thole_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
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

  useEffect(() => {
    localStorage.setItem('thole_cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = () => {
    if (selectedItem && !isAdding) {
      setIsAdding(true);
      
      setTimeout(() => {
        setCart(prev => {
          const existing = prev.find(item => item.id === selectedItem.id);
          if (existing) {
            return prev.map(item => 
              item.id === selectedItem.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          }
          return [...prev, { ...selectedItem, quantity: 1 }];
        });
        
        setSelectedItem(null);
        setIsAdding(false);
        setIsCartOpen(true);
      }, 600);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''));
      return sum + (price * item.quantity);
    }, 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const orderDate = new Date().toISOString();
    
    const newOrders = cart.map(item => ({
      ...item,
      orderId,
      orderDate
    }));

    // Save to history
    const existingHistory = JSON.parse(localStorage.getItem('thole_order_history') || '[]');
    localStorage.setItem('thole_order_history', JSON.stringify([...newOrders, ...existingHistory]));
    
    // Notify history component
    window.dispatchEvent(new Event('thole_order_updated'));
    
    setOrderConfirmed({
      items: cart,
      total: calculateTotal(),
      orderId
    });
    
    setCart([]);
    setIsCartOpen(false);
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 animate-pulse">
        <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
          <div className="space-y-2">
            <div className="h-10 w-48 bg-white/5 rounded-lg" />
            <div className="h-3 w-64 bg-white/5 rounded" />
          </div>
          <div className="h-3 w-32 bg-white/5 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-white/5 p-6 flex items-start gap-4 bg-white/[0.02]">
              <div className="h-4 w-6 bg-white/5 rounded" />
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="h-6 w-32 bg-white/5 rounded" />
                  <div className="h-4 w-16 bg-white/5 rounded" />
                </div>
                <div className="h-3 w-full bg-white/5 rounded" />
                <div className="flex items-center gap-2">
                  <div className="h-[1px] flex-1 bg-white/10" />
                  <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 relative">
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
        <div>
          <h2 className="font-display italic text-4xl text-[var(--color-coffee-accent)]">The Fuel</h2>
          <p className="font-mono text-[10px] uppercase tracking-widest opacity-50">Current Inventory Status: Optimal</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group"
          >
            <ShoppingCart className="w-5 h-5 group-hover:text-[var(--color-digital-amber)] transition-colors" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--color-digital-amber)] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </button>
          <div className="text-right font-mono text-[10px] opacity-40 hidden md:block">
            [CLICK TO VIEW DETAILS]
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`card-${item.id}`}
            onClick={() => setSelectedItem(item)}
            whileHover={{ 
              scale: 1.03, 
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 179, 0, 0.3)'
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="group relative border border-white/5 p-6 flex items-start gap-4 cursor-pointer overflow-hidden"
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

                    <motion.button 
                      disabled={isAdding}
                      onClick={handleAddToCart}
                      animate={isAdding ? { scale: 0.95, backgroundColor: '#10b981' } : { scale: 1 }}
                      className={`w-full py-4 ${isAdding ? 'bg-emerald-500' : 'bg-[var(--color-digital-amber)]'} text-black font-bold uppercase tracking-[0.2em] text-xs rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 group relative overflow-hidden`}
                    >
                      <AnimatePresence mode="wait">
                        {isAdding ? (
                          <motion.div
                            key="adding"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                          </motion.div>
                        ) : (
                          <motion.div
                            key="idle"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            Add to Cart
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
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

      {/* Shopping Cart Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-[var(--color-coffee-dark)] border-l border-white/10 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5 text-[var(--color-digital-amber)]" />
                  <h2 className="text-xl font-bold tracking-tight">Your Cart</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                    <ShoppingCart className="w-16 h-16 mb-4" />
                    <p className="font-mono text-xs uppercase tracking-widest">Cart is Empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded-xl border border-white/10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-sm">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 opacity-0 group-hover:opacity-40 hover:opacity-100 hover:text-red-500 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-mono text-xs text-[var(--color-digital-amber)] mb-3">{item.price}</p>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-sm w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-white/[0.02] space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">Total Amount</span>
                    <span className="text-2xl font-bold text-[var(--color-digital-amber)]">{calculateTotal()}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full py-4 bg-[var(--color-digital-amber)] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white transition-all shadow-[0_0_30px_rgba(255,179,0,0.2)]"
                  >
                    Confirm Order
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Order Confirmation Modal */}
      <AnimatePresence>
        {orderConfirmed && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
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
              <p className="text-stone-400 text-sm mb-6">
                Our driver has received your request. We're brewing your order right now.
              </p>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 mb-8">
                <div className="max-h-48 overflow-y-auto space-y-4 mb-6 pb-6 border-b border-white/5 custom-scrollbar">
                  {orderConfirmed.items.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-left flex-1">
                        <p className="font-bold text-xs">{item.name}</p>
                        <p className="font-mono text-[10px] opacity-40">{item.quantity}x {item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest opacity-40">
                    <span>Total Price</span>
                    <span className="text-white opacity-100">{orderConfirmed.total}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest opacity-40">
                    <span>Est. Delivery</span>
                    <span className="text-[var(--color-digital-amber)] opacity-100">15-20 Minutes</span>
                  </div>
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
