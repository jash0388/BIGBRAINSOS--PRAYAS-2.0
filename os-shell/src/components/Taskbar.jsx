import React, { useState, useEffect } from 'react';

const Taskbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-black/60 backdrop-blur-md border-t border-white/10 flex items-center justify-between px-2 shadow-2xl">
      {/* Start Button & App Icons Area */}
      <div className="flex items-center gap-2 h-full">
        <button className="h-9 px-3 rounded-md bg-white/10 hover:bg-white/20 transition flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"/>
          </svg>
        </button>
        {/* Placeholder for open apps in taskbar */}
        <div className="h-8 w-px bg-white/20 mx-1"></div>
      </div>

      {/* System Tray & Clock */}
      <div className="flex items-center gap-3 h-full pr-2 text-sm text-gray-200">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-white/10 p-1 rounded transition">
          {/* Mock Wifi Icon */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
          {/* Mock Battery Icon */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
          </svg>
        </div>
        <div className="hover:bg-white/10 px-2 py-1 rounded transition cursor-pointer">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
