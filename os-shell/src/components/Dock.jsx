import React, { useState } from 'react';

import { desktopApps } from '../appsConfig';

const dockApps = [
  { name: 'Launchpad', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Launchpad_Icon_%28macOS%29.png' },
  ...desktopApps
];

const DockIcon = ({ app, scale, yOffset, isOpen, isMinimized, onClick, onMouseEnter }) => (
  <div
    className="relative flex flex-col items-center group cursor-pointer"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    style={{
      transform: `scale(${scale}) translateY(${yOffset}px)`,
      transformOrigin: 'bottom',
      transition: 'transform 0.18s cubic-bezier(0.25, 1, 0.5, 1)',
    }}
  >
    {/* Tooltip */}
    <div className="absolute -top-10 px-2.5 py-1 bg-black/70 backdrop-blur text-white text-[11px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none shadow-lg">
      {app.name}
    </div>

    {/* Icon */}
    <div className={`w-13 h-13 rounded-[18px] flex items-center justify-center overflow-hidden border border-white/10 shadow-lg transition-all ${isMinimized ? 'opacity-60 grayscale' : ''}`}
      style={{ width: 52, height: 52, background: 'rgba(255,255,255,0.07)' }}
    >
      <img src={app.iconUrl} alt={app.name} className="w-10 h-10 object-contain pointer-events-none" />
    </div>

    {/* Active dot */}
    {isOpen && (
      <div className={`absolute -bottom-1.5 w-1 h-1 rounded-full ${isMinimized ? 'bg-white/30' : 'bg-white/80'}`} />
    )}
  </div>
);

const Dock = ({ onOpenApp, openApps, minimizedApps, onRestoreApp, onToggleStartMenu }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const getScale = (index) => {
    if (hoveredIndex === null) return { scale: 1, yOffset: 0 };
    const d = Math.abs(hoveredIndex - index);
    if (d === 0) return { scale: 1.55, yOffset: -14 };
    if (d === 1) return { scale: 1.28, yOffset: -7 };
    if (d === 2) return { scale: 1.1, yOffset: -2 };
    return { scale: 1, yOffset: 0 };
  };

  const allOpenApps = [...(openApps || []), ...(minimizedApps || [])];

  const handleClick = (app) => {
    if (app.name === 'Launchpad') return onToggleStartMenu();
    
    // Check if already open / minimized
    const existingMinimized = minimizedApps?.find(a => a.name === app.name);
    if (existingMinimized) {
      onRestoreApp(existingMinimized.id);
      return;
    }
    onOpenApp(app);
  };

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50 select-none">
      <div
        className="flex items-end gap-1.5 px-3 pt-2 pb-2.5"
        style={{
          background: 'rgba(30,30,30,0.55)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.13)',
          borderRadius: 22,
          boxShadow: '0 12px 48px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.07) inset',
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {dockApps.map((app, index) => {
          const { scale, yOffset } = getScale(index);
          const isOpen = allOpenApps.some(a => a.name === app.name);
          const isMinimized = minimizedApps?.some(a => a.name === app.name);

          return (
            <DockIcon
              key={app.name}
              app={app}
              scale={scale}
              yOffset={yOffset}
              isOpen={isOpen}
              isMinimized={isMinimized}
              onClick={() => handleClick(app)}
              onMouseEnter={() => setHoveredIndex(index)}
            />
          );
        })}

        {/* Divider + minimized app thumbnails */}
        {minimizedApps && minimizedApps.length > 0 && (
          <>
            <div className="w-px self-stretch mx-1.5 bg-white/20 rounded" />
            {minimizedApps.map((app) => (
              <div
                key={app.id}
                className="relative flex flex-col items-center group cursor-pointer"
                onClick={() => onRestoreApp(app.id)}
              >
                <div className="absolute -top-10 px-2.5 py-1 bg-black/70 backdrop-blur text-white text-[11px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none shadow-lg">
                  {app.name}
                </div>
                <div className="w-[52px] h-[52px] rounded-[18px] flex items-center justify-center overflow-hidden border border-white/10 bg-white/5 opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}
                >
                  <img src={app.iconUrl} alt={app.name} className="w-10 h-10 object-contain" />
                </div>
                <div className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-blue-400/80" />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Dock;
