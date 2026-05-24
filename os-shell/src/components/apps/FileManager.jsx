import React from 'react';

const mockFiles = [
  { name: 'Projects', type: 'folder', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { name: 'Images', type: 'folder', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { name: 'App.tsx', type: 'code', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { name: 'Wallpaper_01.jpg', type: 'image', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', image: '/bg.png' },
  { name: 'schema.json', type: 'code', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4', color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { name: 'Readme.md', type: 'doc', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'text-gray-300', bg: 'bg-gray-500/10' },
];

const SidebarItem = ({ icon, label, active, badge }) => (
  <div className={`flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-colors ${active ? 'bg-white/10 text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]' : 'text-white/60 hover:bg-white/5 hover:text-white/90'}`}>
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    {badge && <span className="bg-white/10 text-xs px-2 py-0.5 rounded-full">{badge}</span>}
  </div>
);

const FileManager = () => {
  return (
    <div className="flex w-full h-full text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-56 bg-black/30 border-r border-white/5 flex flex-col backdrop-blur-3xl pt-2">
        <div className="flex-1 overflow-y-auto px-2 space-y-6">
          
          {/* Favorites */}
          <div>
            <div className="px-4 py-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">Favorites</div>
            <div className="space-y-1">
              <SidebarItem active label="Recents" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
              <SidebarItem label="Desktop" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} />
              <SidebarItem label="Documents" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />
              <SidebarItem label="Downloads" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>} />
            </div>
          </div>

          {/* iCloud */}
          <div>
            <div className="px-4 py-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">iCloud</div>
            <div className="space-y-1">
              <SidebarItem label="iCloud Drive" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>} />
              <SidebarItem label="Shared" badge="2" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} />
            </div>
          </div>

          {/* Tags */}
          <div>
            <div className="px-4 py-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">Tags</div>
            <div className="px-4 flex gap-3 mt-1">
              <div className="w-3 h-3 rounded-full bg-red-400 cursor-pointer hover:scale-125 transition-transform"></div>
              <div className="w-3 h-3 rounded-full bg-orange-400 cursor-pointer hover:scale-125 transition-transform"></div>
              <div className="w-3 h-3 rounded-full bg-blue-400 cursor-pointer hover:scale-125 transition-transform"></div>
              <div className="w-3 h-3 rounded-full bg-purple-400 cursor-pointer hover:scale-125 transition-transform"></div>
            </div>
          </div>

        </div>
        
        {/* Status Bar */}
        <div className="p-4 text-xs text-white/40 border-t border-white/5">
          7 items, 412 GB available
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-black/10">
        
        {/* Toolbar */}
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-white/[0.02]">
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-white/40">
              <button className="hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg></button>
              <button className="hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg></button>
            </div>
            <h1 className="text-sm font-semibold tracking-wide">Recents</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" placeholder="Search" className="bg-black/40 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-white/30 outline-none focus:border-white/30 transition-colors w-48" />
            </div>
            <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded-lg p-1">
              <button className="p-1 rounded-md bg-white/10 text-white shadow-sm"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></button>
              <button className="p-1 rounded-md text-white/40 hover:text-white transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg></button>
            </div>
          </div>

        </div>

        {/* File Grid */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
            {mockFiles.map((file, i) => (
              <div key={i} className="flex flex-col items-center gap-3 cursor-pointer group">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg group-hover:bg-white/10 transition-colors ${file.image ? 'p-0 overflow-hidden bg-black' : file.bg}`}>
                  {file.image ? (
                    <img src={file.image} alt={file.name} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <svg className={`w-10 h-10 ${file.color} group-hover:scale-110 transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={file.icon} />
                    </svg>
                  )}
                </div>
                <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors truncate max-w-[90px] text-center drop-shadow-md">
                  {file.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FileManager;
