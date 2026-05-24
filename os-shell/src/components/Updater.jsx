import React, { useState, useEffect } from 'react';

const Updater = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // Only run in production/deployed environment where __APP_VERSION__ is set
    if (typeof __APP_VERSION__ === 'undefined') return;

    const checkVersion = async () => {
      try {
        const res = await fetch(`/version.json?t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          if (data.version && data.version !== __APP_VERSION__) {
            setUpdateAvailable(true);
          }
        }
      } catch (err) {
        // Ignore fetch errors (e.g. offline)
      }
    };

    // Check immediately, then every 30 seconds
    checkVersion();
    const interval = setInterval(checkVersion, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!updateAvailable) return null;

  return (
    <div className="fixed bottom-20 right-8 z-[9999] bg-[#1e1e1e] border border-white/10 rounded-xl p-5 shadow-2xl flex flex-col items-start gap-3 w-80 backdrop-blur-md bg-opacity-90 animate-in slide-in-from-bottom-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M2.13 15.57a10 10 0 1 0 3.43-11.44l-4.5 4.5"/>
          </svg>
        </div>
        <div>
          <h3 className="text-white font-medium m-0 p-0 text-sm">Update Available</h3>
          <p className="text-white/60 text-xs m-0 p-0 mt-0.5">A new version of BigBrainsOS was just deployed.</p>
        </div>
      </div>
      <button 
        onClick={() => window.location.reload(true)}
        className="w-full py-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-medium rounded-lg"
      >
        Restart OS Now
      </button>
    </div>
  );
};

export default Updater;
