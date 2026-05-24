import React from 'react';

const SystemDashboard = () => {
  return (
    <div className="w-full h-full text-white p-6 font-sans select-none overflow-y-auto">
      <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto h-full content-start">
        
        {/* System Performance (Spans 2 columns) */}
        <div className="col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col">
          <h2 className="text-sm font-medium text-white/70 mb-8">System Performance</h2>
          
          {/* Mock Bar Chart */}
          <div className="flex-1 flex items-end justify-between gap-3 mb-6 h-32">
            {[40, 60, 20, 80, 50, 70, 45].map((h, i) => (
              <div key={i} className="w-full bg-white/10 rounded-t-sm relative group overflow-hidden" style={{ height: '100%' }}>
                <div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-teal-400 to-blue-500 rounded-t-sm transition-all duration-1000 ease-out" 
                  style={{ height: `${h}%`, opacity: i % 2 === 0 ? 0.8 : 0.6, boxShadow: '0 0 20px rgba(45, 212, 191, 0.3)' }}
                ></div>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xs font-semibold text-white/60 uppercase tracking-widest mt-auto">
            <span>CPU: 42%</span>
            <span>RAM: 6.2 GB</span>
            <span>GPU: 12%</span>
          </div>
        </div>

        {/* Sync Status */}
        <div className="col-span-1 bg-gradient-to-br from-purple-900/60 to-purple-600/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white/10 transition-colors">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <h3 className="font-medium mb-1">Sync Active</h3>
          <p className="text-xs text-white/50">Cloud v1.0 connected</p>
        </div>

        {/* Network */}
        <div className="col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col justify-center">
          <h2 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Network</h2>
          <div className="text-3xl font-bold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
            942 <span className="text-lg font-medium text-white/50">Mbps</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]" style={{ width: '85%' }}></div>
          </div>
        </div>

        {/* User Profile */}
        <div className="col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
              <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">BigBrains User</h3>
              <p className="text-xs text-white/50">Premium Administrator</p>
            </div>
          </div>
          <button className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/5 text-sm font-medium">
            Profile Settings
          </button>
        </div>

      </div>
    </div>
  );
};

export default SystemDashboard;
