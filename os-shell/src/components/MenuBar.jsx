import React, { useState, useEffect } from 'react';

const MenuBar = ({ activeApp = 'BigBrainsOS' }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const menus = activeApp === 'BigBrainsOS'
    ? ['File', 'Edit', 'View', 'Window', 'Help']
    : ['File', 'Edit', 'View', 'Window', 'Help'];

  return (
    <div
      className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-3 select-none"
      style={{
        height: 28,
        background: 'rgba(20,20,22,0.72)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Left */}
      <div className="flex items-center h-full" style={{ gap: 2 }}>
        {/* Brain logo */}
        <button className="flex items-center justify-center h-full px-2 rounded hover:bg-white/10 transition-colors">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-5.224 4.668 4 4 0 0 0 2.912 6.13A4 4 0 0 0 9 20a4 4 0 0 0 6 0 4 4 0 0 0 5.309-4.077 4 4 0 0 0 2.912-6.13 4 4 0 0 0-5.224-4.668A3 3 0 1 0 12 5Z"/>
            <path d="M9 13v-2.5a3.5 3.5 0 0 1 7 0V13"/><path d="M12 9V5"/>
          </svg>
        </button>

        {/* App name bold */}
        <button className="px-2 h-full flex items-center rounded hover:bg-white/10 transition-colors"
          style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.01em' }}>
          {activeApp}
        </button>

        {/* Menu items */}
        {menus.map(m => (
          <button key={m} className="px-2 h-full flex items-center rounded hover:bg-white/10 transition-colors"
            style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>
            {m}
          </button>
        ))}
      </div>

      {/* Right — System tray */}
      <div className="flex items-center h-full" style={{ gap: 4 }}>
        {/* Wifi */}
        <button className="px-1.5 h-full flex items-center rounded hover:bg-white/10 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="rgba(255,255,255,0.75)" stroke="none"/>
          </svg>
        </button>

        {/* Battery */}
        <button className="px-1.5 h-full flex items-center rounded hover:bg-white/10 transition-colors">
          <svg width="22" height="13" viewBox="0 0 22 13" fill="none">
            <rect x="0.5" y="0.5" width="18" height="12" rx="2.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
            <rect x="2" y="2" width="13" height="9" rx="1.5" fill="rgba(255,255,255,0.75)"/>
            <path d="M19.5 4.5v4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Clock */}
        <button className="px-2 h-full flex items-center rounded hover:bg-white/10 transition-colors"
          style={{ fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.80)', letterSpacing: '0.01em' }}>
          {time.toLocaleDateString('en-IN', { weekday:'short', month:'short', day:'numeric' })}
          {' '}
          {time.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
