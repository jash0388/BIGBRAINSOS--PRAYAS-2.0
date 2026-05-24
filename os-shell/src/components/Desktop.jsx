import React, { useState } from 'react';
import MenuBar from './MenuBar';
import Dock from './Dock';
import Window from './Window';
import StartMenu from './StartMenu';

const Desktop = () => {
  const [apps, setApps] = useState([]); // { ...appDef, id, minimized }
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  let idCounter = 0;

  const openApp = (app) => {
    setApps(prev => {
      const existing = prev.find(a => a.name === app.name);
      if (existing) {
        // If minimized, restore it
        return prev.map(a => a.name === app.name ? { ...a, minimized: false } : a);
      }
      return [...prev, { ...app, id: `${app.name}-${Date.now()}`, minimized: false }];
    });
  };

  const closeApp = (id) => {
    setApps(prev => prev.filter(a => a.id !== id));
  };

  const minimizeApp = (id) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, minimized: true } : a));
  };

  const restoreApp = (id) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, minimized: false } : a));
  };

  const openApps = apps.filter(a => !a.minimized);
  const minimizedApps = apps.filter(a => a.minimized);

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      {/* Wallpaper */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.png')" }}
      />

      {/* Menu Bar */}
      <MenuBar activeApp={openApps.length > 0 ? openApps[openApps.length - 1].name : 'BigBrainsOS'} />

      {/* Desktop / Windows layer */}
      <div className="flex-1 relative z-10 pt-7">
        {apps.map(app => (
          <Window
            key={app.id}
            app={app}
            isMinimized={app.minimized}
            onClose={() => closeApp(app.id)}
            onMinimize={() => minimizeApp(app.id)}
          />
        ))}
      </div>

      {/* Start Menu */}
      <StartMenu
        isOpen={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onOpenApp={openApp}
      />

      {/* Dock */}
      <Dock
        onOpenApp={openApp}
        openApps={apps}
        minimizedApps={minimizedApps}
        onRestoreApp={restoreApp}
        onToggleStartMenu={() => setStartMenuOpen(s => !s)}
      />
    </div>
  );
};

export default Desktop;
