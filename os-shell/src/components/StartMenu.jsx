import React, { useState, useRef, useEffect } from 'react';

const allApps = [
  { name: 'VS Code', iconUrl: '/vscode.svg', desc: 'Code Editor' },
  { name: 'Terminal', iconUrl: '/terminal.svg', desc: 'Command Line' },
  { name: 'Browser', iconUrl: '/firefox.svg', desc: 'Web Browser' },
  { name: 'Finder', iconUrl: '/finder.svg', desc: 'File Manager' },
  { name: 'Settings', iconUrl: '/settings.svg', desc: 'System Preferences' },
];

const StartMenu = ({ isOpen, onClose, onOpenApp }) => {
  const [search, setSearch] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = allApps.filter(app =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      ref={menuRef}
      className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[560px] max-h-[420px] bg-black/60 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] z-[100] overflow-hidden animate-slideUp"
    >
      {/* Search Bar */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 gap-2">
          <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search apps..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
            className="bg-transparent outline-none text-white text-sm w-full placeholder-white/40"
          />
        </div>
      </div>

      {/* App Grid */}
      <div className="p-4 grid grid-cols-4 gap-4 overflow-y-auto max-h-[300px]">
        {filtered.map(app => (
          <div
            key={app.name}
            onClick={() => { onOpenApp(app); onClose(); }}
            className="flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer hover:bg-white/10 transition group"
          >
            <div className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center bg-white/5 border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
              <img src={app.iconUrl} alt={app.name} className="w-10 h-10 object-contain" />
            </div>
            <span className="text-xs text-white/80 text-center font-medium">{app.name}</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-4 text-center text-white/40 text-sm py-8">No apps found</div>
        )}
      </div>
    </div>
  );
};

export default StartMenu;
