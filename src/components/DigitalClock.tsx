import React, { useState, useEffect } from 'react';

export const DigitalClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <div className="flex flex-col items-center justify-center font-mono">
      <div className="flex gap-2 text-4xl md:text-7xl font-bold tracking-tighter text-[var(--color-digital-amber)] digital-glow">
        <div className="flex flex-col items-center">
          <span>{hours}</span>
          <span className="text-[10px] uppercase opacity-50 tracking-widest">HRS</span>
        </div>
        <span className="animate-pulse">:</span>
        <div className="flex flex-col items-center">
          <span>{minutes}</span>
          <span className="text-[10px] uppercase opacity-50 tracking-widest">MIN</span>
        </div>
        <span className="animate-pulse opacity-50">:</span>
        <div className="flex flex-col items-center opacity-50">
          <span>{seconds}</span>
          <span className="text-[10px] uppercase opacity-50 tracking-widest">SEC</span>
        </div>
      </div>
      <div className="mt-4 text-[10px] uppercase tracking-[0.5em] opacity-40">
        Thole Coffee Realtime Interface v1.0.4
      </div>
    </div>
  );
};
