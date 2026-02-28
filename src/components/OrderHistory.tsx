import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Trash2, ChevronRight } from 'lucide-react';

interface OrderRecord {
  id: string;
  name: string;
  price: string;
  image: string;
  orderDate: string;
  orderId: string;
}

export const OrderHistory: React.FC = () => {
  const [history, setHistory] = useState<OrderRecord[]>([]);

  const loadHistory = () => {
    const data = JSON.parse(localStorage.getItem('thole_order_history') || '[]');
    setHistory(data);
  };

  useEffect(() => {
    loadHistory();
    // Listen for storage changes in case orders are added in another component
    window.addEventListener('storage', loadHistory);
    // Also poll slightly or use a custom event if needed, but for now we'll rely on manual refresh or re-mount
    return () => window.removeEventListener('storage', loadHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('thole_order_history');
    setHistory([]);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('id-ID', { 
      day: '2-digit', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (history.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
        <Clock className="w-8 h-8 mx-auto mb-4 opacity-20" />
        <p className="font-mono text-[10px] uppercase tracking-widest opacity-40">No Order History Found</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
        <h4 className="font-mono text-[10px] uppercase tracking-widest opacity-40">Recent Transmissions</h4>
        <button 
          onClick={clearHistory}
          className="p-2 hover:text-[var(--color-digital-red)] transition-colors opacity-40 hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
        <AnimatePresence initial={false}>
          {history.map((order, index) => (
            <motion.div
              key={order.orderId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 border-b border-white/5 last:border-0 flex items-center gap-4 group hover:bg-white/[0.02] transition-colors"
            >
              <img 
                src={order.image} 
                alt={order.name} 
                className="w-12 h-12 object-cover rounded-lg border border-white/10"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h5 className="font-bold text-sm truncate">{order.name}</h5>
                  <span className="font-mono text-[10px] text-[var(--color-digital-amber)]">{order.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[8px] opacity-40 uppercase tracking-tighter">
                    {order.orderId}
                  </span>
                  <span className="font-mono text-[8px] opacity-40">
                    {formatDate(order.orderDate)}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-20 transition-opacity" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
