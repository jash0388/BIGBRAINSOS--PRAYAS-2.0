import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const SettingsApp = () => {
  const [activeTab, setActiveTab] = useState('Appearance');
  const { signOut, user } = useAuth();

  const tabs = [
    { id: 'Appearance', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
    { id: 'Network', icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0' },
    { id: 'Display', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { id: 'Cloud Sync', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
    { id: 'Advanced', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  return (
    <div className="flex w-full h-full text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-black/40 border-r border-white/5 p-4 flex flex-col justify-between backdrop-blur-2xl">
        <div>
          <ul className="space-y-1">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500/20 to-teal-400/10 text-cyan-400 border border-teal-400/20 shadow-[inset_0_0_15px_rgba(45,212,191,0.1)]'
                      : 'text-white/60 hover:bg-white/5 hover:text-white/90'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tab.icon} />
                  </svg>
                  {tab.id}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Account / Session / Mail Section */}
        <div className="pt-4 border-t border-white/10 mt-4 space-y-1">
          <div className="px-4 py-2 flex items-center gap-3 text-sm text-white/80 cursor-pointer hover:bg-white/5 rounded-xl transition-colors">
            <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Mail Inbox</span>
            <span className="ml-auto bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">3</span>
          </div>
          
          <div className="px-4 py-3 mt-2 flex items-center gap-3 bg-white/5 rounded-xl border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_10px_rgba(45,212,191,0.5)]">
              <span className="text-white text-xs font-bold">{user?.email?.charAt(0).toUpperCase() || 'U'}</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.email || 'Alex Chen'}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Active Session</p>
            </div>
            <button 
              onClick={signOut}
              className="p-1.5 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors group"
              title="Logout"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10 overflow-y-auto bg-black/20">
        {activeTab === 'Appearance' && (
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold mb-2">Appearance</h1>
            <p className="text-white/50 text-sm mb-10">Customize how your BigBrainsOS environment looks and feels.</p>

            <div className="mb-10">
              <h2 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Color Mode</h2>
              <div className="grid grid-cols-3 gap-6">
                {/* Light */}
                <div className="flex flex-col items-center gap-3 group cursor-pointer">
                  <div className="w-full aspect-[4/3] rounded-xl border-2 border-white/10 bg-white p-2 shadow-lg group-hover:border-white/30 transition-colors">
                    <div className="w-full h-full bg-gray-100 rounded-lg border border-gray-200"></div>
                  </div>
                  <span className="text-sm text-white/60">Light</span>
                </div>
                {/* Dark (Active) */}
                <div className="flex flex-col items-center gap-3 cursor-pointer">
                  <div className="w-full aspect-[4/3] rounded-xl border-2 border-cyan-400 bg-black p-2 shadow-[0_0_20px_rgba(45,212,191,0.2)] relative">
                    <div className="absolute -top-2 -right-2 bg-cyan-400 rounded-full p-0.5 shadow-lg">
                      <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <div className="w-full h-full bg-[#111] rounded-lg border border-white/5 flex flex-col gap-2 p-2">
                       <div className="h-2 w-1/3 bg-white/10 rounded"></div>
                       <div className="h-2 w-2/3 bg-white/5 rounded"></div>
                    </div>
                  </div>
                  <span className="text-sm text-cyan-400 font-medium">Dark</span>
                </div>
                {/* Auto */}
                <div className="flex flex-col items-center gap-3 group cursor-pointer">
                  <div className="w-full aspect-[4/3] rounded-xl border-2 border-white/10 bg-black overflow-hidden flex shadow-lg group-hover:border-white/30 transition-colors">
                    <div className="w-1/2 h-full bg-white border-r border-gray-300"></div>
                    <div className="w-1/2 h-full bg-[#111]"></div>
                  </div>
                  <span className="text-sm text-white/60">Auto</span>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Accent Color</h2>
              <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-cyan-400 ring-2 ring-white ring-offset-2 ring-offset-black cursor-pointer shadow-[0_0_15px_rgba(45,212,191,0.5)]"></div>
                <div className="w-8 h-8 rounded-full bg-pink-500 cursor-pointer hover:scale-110 transition-transform"></div>
                <div className="w-8 h-8 rounded-full bg-purple-500 cursor-pointer hover:scale-110 transition-transform"></div>
                <div className="w-8 h-8 rounded-full bg-orange-500 cursor-pointer hover:scale-110 transition-transform"></div>
                <div className="w-8 h-8 rounded-full bg-emerald-500 cursor-pointer hover:scale-110 transition-transform"></div>
                <div className="w-8 h-8 rounded-full bg-red-500 cursor-pointer hover:scale-110 transition-transform"></div>
                <div className="w-[1px] h-8 bg-white/10 mx-2"></div>
                <div className="w-8 h-8 rounded-full border border-white/20 border-dashed flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors text-white/40 hover:text-white/80">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-semibold text-white/40 uppercase tracking-widest">Wallpaper</h2>
                <button className="text-xs text-cyan-400 hover:text-cyan-300 font-medium">View All</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="aspect-[21/9] rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border-2 border-cyan-400 relative overflow-hidden shadow-lg">
                    <img src="/bg.png" className="w-full h-full object-cover opacity-80" alt="Active Wallpaper" />
                    <div className="absolute top-2 right-2 bg-white/90 text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Active</div>
                 </div>
                 <div className="aspect-[21/9] rounded-xl bg-gray-800 border-2 border-transparent hover:border-white/20 transition-colors cursor-pointer overflow-hidden shadow-lg opacity-60 hover:opacity-100">
                    <div className="w-full h-full bg-gradient-to-tr from-blue-900 to-emerald-900"></div>
                 </div>
              </div>
            </div>

          </div>
        )}
        
        {activeTab !== 'Appearance' && (
          <div className="flex flex-col items-center justify-center h-full text-white/30">
             <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
             </svg>
             <p className="text-lg">{activeTab} Settings coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsApp;
