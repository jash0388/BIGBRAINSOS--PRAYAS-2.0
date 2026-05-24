import React, { useState, useRef, useEffect, useCallback } from 'react';

let globalZIndex = 100;

const Window = ({ app, onClose, onMinimize, isMinimized }) => {
  const [isMaximized, setIsMaximized] = useState(true);
  const [zIndex] = useState(() => ++globalZIndex);
  const [activeZ, setActiveZ] = useState(zIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [isFocused, setIsFocused] = useState(true);

  const startPos = useRef({ x: 100 + (zIndex % 7) * 38, y: 44 + (zIndex % 7) * 28 });
  const [pos, setPos] = useState(startPos.current);
  const [size, setSize] = useState({ w: 960, h: 620 });

  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const windowEl = useRef(null);
  const iframeRef = useRef(null);

  const bringToFront = () => {
    const z = ++globalZIndex;
    setActiveZ(z);
    setIsFocused(true);
  };

  // VNC URL with auto password
  const appUrls = {
    'VS Code': 'https://protection-rotary-hollow-minor.trycloudflare.com/vnc_lite.html?resize=remote&autoconnect=true&password=bigbrains',
    'Terminal': 'https://enrolled-last-tokyo-resumes.trycloudflare.com/vnc_lite.html?resize=remote&autoconnect=true&password=bigbrains',
    'Browser': 'https://shelf-pour-arising-industrial.trycloudflare.com/vnc_lite.html?resize=remote&autoconnect=true&password=bigbrains',
    'Android Studio': 'https://preferences-bids-postcard-pittsburgh.trycloudflare.com/vnc_lite.html?resize=remote&autoconnect=true&password=bigbrains',
  };
  const iframeUrl = appUrls[app.name] ?? null;

  // Inject CSS into the noVNC iframe to hide all UI chrome
  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
    try {
      const iframe = iframeRef.current;
      if (!iframe) return;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) return;
      const style = iframeDoc.createElement('style');
      style.textContent = `
        #noVNC_control_bar, #noVNC_transition, #noVNC_notifications,
        #noVNC_status_bar, .noVNC_panel, #noVNC_control_bar_anchor,
        #noVNC_modifiers, #noVNC_toggle_extra_keys_button,
        #noVNC_extra_keys { display: none !important; }
        body { margin: 0 !important; background: #1e1e1e !important; }
        #noVNC_container { width: 100% !important; height: 100% !important; }
        #noVNC_screen { width: 100% !important; height: 100% !important; }
      `;
      iframeDoc.head.appendChild(style);
    } catch (e) {
      // Cross-origin — CSS injection blocked, but noVNC UI was already hidden via sed in entrypoint
    }
  }, []);

  // ── Dragging ──────────────────────────────────────────────────────────────
  const onTitleMouseDown = useCallback((e) => {
    if (isMaximized || e.button !== 0) return;
    e.preventDefault();
    bringToFront();
    dragRef.current = { sx: e.clientX - pos.x, sy: e.clientY - pos.y };
  }, [isMaximized, pos]);

  // ── Resizing ──────────────────────────────────────────────────────────────
  const onResizeMouseDown = useCallback((e, dir) => {
    if (e.button !== 0) return;
    e.preventDefault(); e.stopPropagation();
    bringToFront();
    resizeRef.current = { dir, sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y, ow: size.w, oh: size.h };
  }, [pos, size]);

  useEffect(() => {
    const move = (e) => {
      if (dragRef.current) {
        setPos({ x: Math.max(0, e.clientX - dragRef.current.sx), y: Math.max(28, e.clientY - dragRef.current.sy) });
      }
      if (resizeRef.current) {
        const { dir, sx, sy, ox, oy, ow, oh } = resizeRef.current;
        const dx = e.clientX - sx, dy = e.clientY - sy;
        let nx = ox, ny = oy, nw = ow, nh = oh;
        if (dir.includes('e')) nw = Math.max(420, ow + dx);
        if (dir.includes('s')) nh = Math.max(300, oh + dy);
        if (dir.includes('w')) { nw = Math.max(420, ow - dx); nx = ox + ow - nw; }
        if (dir.includes('n')) { nh = Math.max(300, oh - dy); ny = oy + oh - nh; }
        setPos({ x: nx, y: ny }); setSize({ w: nw, h: nh });
      }
    };
    const up = () => { dragRef.current = null; resizeRef.current = null; };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  }, []);

  if (isMinimized) return null;

  const containerStyle = isMaximized
    ? { position: 'fixed', inset: 0, top: 28, zIndex: activeZ, borderRadius: 0 }
    : { position: 'absolute', left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex: activeZ };

  const titleBarBg = isFocused
    ? 'rgba(44,44,46,0.92)'
    : 'rgba(36,36,38,0.80)';

  return (
    <div
      ref={windowEl}
      style={{
        ...containerStyle,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: isMaximized ? 0 : 12,
        overflow: 'hidden',
        boxShadow: isFocused
          ? '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)'
          : '0 12px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.05)',
        transition: 'box-shadow 0.2s',
      }}
      onMouseDown={bringToFront}
    >
      {/* ── Resize Handles ──────────────────────────────────────────────── */}
      {!isMaximized && ['n','s','e','w','ne','nw','se','sw'].map(dir => (
        <div key={dir} onMouseDown={e => onResizeMouseDown(e, dir)} style={{
          position:'absolute', zIndex: 10,
          top:    dir.includes('n') && !dir.includes('s') ? 0 : dir === 's' ? 'auto' : 4,
          bottom: dir.includes('s') && !dir.includes('n') ? 0 : dir === 'n' ? 'auto' : dir.length===1 ? 4 : undefined,
          left:   dir.includes('w') && !dir.includes('e') ? 0 : dir === 'e' ? 'auto' : dir.length===1 ? 4 : undefined,
          right:  dir.includes('e') && !dir.includes('w') ? 0 : dir === 'w' ? 'auto' : dir.length===1 ? 4 : undefined,
          width:  dir === 'n' || dir === 's' ? 'calc(100% - 8px)' : 6,
          height: dir === 'e' || dir === 'w' ? 'calc(100% - 8px)' : 6,
          cursor: `${dir}-resize`,
        }} />
      ))}

      {/* ── Title Bar ───────────────────────────────────────────────────── */}
      <div
        className="window-titlebar shrink-0 flex items-center px-4 select-none"
        style={{
          height: 44,
          background: titleBarBg,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
        onMouseDown={onTitleMouseDown}
        onDoubleClick={() => setIsMaximized(m => !m)}
      >
        {/* Traffic lights */}
        <div className="flex gap-2 items-center" style={{ width: 56 }}>
          {[
            { bg: '#ff5f57', shadow: '#c84c49', hoverIcon: 'M4 4l8 8M12 4l-8 8', action: onClose },
            { bg: '#febc2e', shadow: '#c69124', hoverIcon: 'M3 8h10', action: onMinimize },
            { bg: '#28c840', shadow: '#1e9e32', hoverIcon: isMaximized ? 'M4 8h4M8 4v4' : 'M3 3l5 5M8 3H3v5', action: () => setIsMaximized(m=>!m) },
          ].map(({ bg, shadow, hoverIcon, action }, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); action(); }}
              className="group flex items-center justify-center rounded-full focus:outline-none transition-transform active:scale-90"
              style={{ width: 13, height: 13, background: bg, boxShadow: `0 0 0 0.5px ${shadow}`, flexShrink: 0 }}
            >
              <svg className="opacity-0 group-hover:opacity-100 transition-opacity" width="7" height="7" viewBox="0 0 12 12" fill="none" stroke={i===0?'#5c0a0a':i===1?'#5a3800':'#065c09'} strokeWidth="1.7" strokeLinecap="round">
                <path d={hoverIcon}/>
              </svg>
            </button>
          ))}
        </div>

        {/* Title */}
        <div className="flex-1 flex items-center justify-center gap-2 pointer-events-none">
          {app.iconUrl && (
            <img src={app.iconUrl} alt="" className="w-4 h-4 object-contain opacity-80" />
          )}
          <span style={{ fontSize: 13, fontWeight: 500, color: isFocused ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)', letterSpacing: '-0.01em' }}>
            {app.name}
          </span>
        </div>

        <div style={{ width: 56 }} />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, background: '#1e1e1e', position: 'relative', overflow: 'hidden' }}>
        {app.type === 'native' && app.Component ? (
          <div className="w-full h-full bg-black/80 backdrop-blur-3xl overflow-hidden">
            <app.Component />
          </div>
        ) : iframeUrl ? (
          <>
            {isLoading && (
              <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14, background:'#1e1e1e', zIndex:5 }}>
                <div style={{ width:36, height:36, border:'2.5px solid rgba(255,255,255,0.08)', borderTopColor:'#3b82f6', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
                <span style={{ color:'rgba(255,255,255,0.25)', fontSize:13 }}>Loading {app.name}...</span>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={iframeUrl}
              style={{ width:'100%', height:'100%', border:'none', display:'block' }}
              title={app.name}
              allow="clipboard-read; clipboard-write"
              onLoad={handleIframeLoad}
            />
          </>
        ) : (
          <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12, color:'rgba(255,255,255,0.2)' }}>
            <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span style={{ fontSize:13 }}>{app.name} — coming soon</span>
          </div>
        )}
      </div>

      {/* Spin keyframe inline */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Window;
