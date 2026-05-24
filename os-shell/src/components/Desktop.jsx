import React, { useState } from 'react';
import MenuBar from './MenuBar';
import Dock from './Dock';
import Window from './Window';
import StartMenu from './StartMenu';
import Updater from './Updater';
import SystemDashboard from './apps/SystemDashboard';
import SettingsApp from './apps/SettingsApp';
import FileManager from './apps/FileManager';

export const desktopApps = [
  { name: 'Dashboard', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Activity_Monitor_Icon.png', type: 'native', Component: SystemDashboard },
  { name: 'Files', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Mac_OS_X_Finder_icon.png', type: 'native', Component: FileManager },
  { name: 'VS Code', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg' },
  { name: 'Browser', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg' },
  { name: 'Android Studio', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Android_Studio_Icon_3.6.svg' },
  { name: 'Terminal', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Terminalicon2.png' },
  { name: 'Settings', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Apple_Settings_icon_iOS_11.svg', type: 'native', Component: SettingsApp },
];

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

      <Updater />
    </div>
  );
};

export default Desktop;
