import React, { useState, useRef, useEffect, useCallback } from 'react';

let globalZIndex = 100;

/* ═══════════════════════════════════════════════════════════════════════════
   Mock App Content — realistic built-in UIs for each app
   ═══════════════════════════════════════════════════════════════════════════ */

const VSCodeContent = () => {
  const [activeFile, setActiveFile] = useState('main.py');
  const files = [
    { name: 'main.py', icon: '🐍' },
    { name: 'index.html', icon: '🌐' },
    { name: 'style.css', icon: '🎨' },
    { name: 'README.md', icon: '📄' },
    { name: 'package.json', icon: '📦' },
  ];
  const fileContents = {
    'main.py': `#!/usr/bin/env python3
"""BigBrainsOS — Cloud Desktop Environment"""

import os
import sys
from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/api/status")
def status():
    return jsonify({
        "status": "running",
        "platform": "BigBrainsOS",
        "version": "2.0.0",
        "uptime": os.popen("uptime").read().strip()
    })

@app.route("/api/workspace")
def workspace():
    """List files in the current workspace"""
    files = os.listdir(".")
    return jsonify({"files": files, "count": len(files)})

if __name__ == "__main__":
    print("🚀 BigBrainsOS API starting...")
    app.run(host="0.0.0.0", port=8080, debug=True)`,
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>BigBrainsOS</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div id="app">
    <h1>Welcome to BigBrainsOS</h1>
    <p>Cloud Desktop Environment</p>
  </div>
  <script src="main.js"></script>
</body>
</html>`,
    'style.css': `/* BigBrainsOS Theme */
:root {
  --bg-primary: #0d1117;
  --bg-secondary: #161b22;
  --accent: #58a6ff;
  --text: #c9d1d9;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: var(--bg-primary);
  color: var(--text);
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}`,
    'README.md': `# BigBrainsOS 🧠

A cloud-based desktop environment built for
the modern developer.

## Features
- 🖥️ VS Code in the browser
- 💻 Full Linux terminal
- 🌐 Built-in web browser
- 🔒 Secure containerized sessions

## Tech Stack
- React + Vite (Frontend)
- Express + Supabase (Backend)
- Docker + noVNC (Containers)

## Getting Started
\`\`\`bash
docker-compose up -d
npm run dev
\`\`\``,
    'package.json': `{
  "name": "bigbrains-os",
  "version": "2.0.0",
  "description": "Cloud Desktop Environment",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@supabase/supabase-js": "^2.49.0"
  }
}`,
  };
  const content = fileContents[activeFile] || '';
  const lines = content.split('\n');

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#1e1e1e', fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace" }}>
      {/* Sidebar */}
      <div style={{ width: 48, background: '#252526', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingTop: 8, borderRight: '1px solid #333' }}>
        {['📁', '🔍', '🔀', '🐛', '🧩'].map((icon, i) => (
          <div key={i} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, cursor: 'pointer', fontSize: 16, opacity: i === 0 ? 1 : 0.4, background: i === 0 ? 'rgba(255,255,255,0.06)' : 'transparent', borderLeft: i === 0 ? '2px solid #007acc' : '2px solid transparent' }}>{icon}</div>
        ))}
      </div>
      {/* File Explorer */}
      <div style={{ width: 200, background: '#252526', borderRight: '1px solid #333', overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px 6px', fontSize: 11, fontWeight: 600, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Explorer</div>
        <div style={{ padding: '4px 0' }}>
          <div style={{ padding: '4px 14px', fontSize: 11, fontWeight: 600, color: '#ccc', cursor: 'pointer' }}>▾ BIGBRAINS-OS</div>
          {files.map(f => (
            <div
              key={f.name}
              onClick={() => setActiveFile(f.name)}
              style={{
                padding: '3px 14px 3px 28px', fontSize: 12.5, cursor: 'pointer',
                background: activeFile === f.name ? '#37373d' : 'transparent',
                color: activeFile === f.name ? '#fff' : '#aaa',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              <span style={{ fontSize: 13 }}>{f.icon}</span> {f.name}
            </div>
          ))}
        </div>
      </div>
      {/* Editor */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Tabs */}
        <div style={{ height: 36, background: '#252526', display: 'flex', alignItems: 'stretch', borderBottom: '1px solid #333' }}>
          {files.filter(f => f.name === activeFile).map(f => (
            <div key={f.name} style={{ padding: '0 16px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, background: '#1e1e1e', color: '#fff', borderTop: '1px solid #007acc', borderRight: '1px solid #333' }}>
              <span style={{ fontSize: 12 }}>{f.icon}</span> {f.name}
            </div>
          ))}
        </div>
        {/* Code Area */}
        <div style={{ flex: 1, overflow: 'auto', padding: '8px 0', fontSize: 13, lineHeight: '20px' }}>
          {lines.map((line, i) => (
            <div key={i} style={{ display: 'flex', minHeight: 20 }}>
              <span style={{ width: 52, textAlign: 'right', paddingRight: 16, color: '#555', userSelect: 'none', flexShrink: 0, fontSize: 12.5 }}>{i + 1}</span>
              <pre style={{ margin: 0, color: '#d4d4d4', whiteSpace: 'pre-wrap', wordBreak: 'break-all', flex: 1 }}>{line || ' '}</pre>
            </div>
          ))}
        </div>
        {/* Status Bar */}
        <div style={{ height: 24, background: '#007acc', display: 'flex', alignItems: 'center', padding: '0 10px', gap: 16, fontSize: 11.5, color: '#fff' }}>
          <span>⚡ BigBrainsOS</span>
          <span style={{ opacity: 0.8 }}>Ln {lines.length}, Col 1</span>
          <span style={{ opacity: 0.8 }}>Spaces: 2</span>
          <span style={{ opacity: 0.8 }}>UTF-8</span>
          <span style={{ marginLeft: 'auto', opacity: 0.8 }}>Python • Prettier</span>
        </div>
      </div>
    </div>
  );
};

const TerminalContent = () => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'BigBrainsOS Terminal v2.0.0' },
    { type: 'output', text: 'Type "help" for available commands.\n' },
    { type: 'input', text: 'neofetch' },
    { type: 'output', text: `   ____  _       ____            _           ___  ____
  | __ )(_) __ _| __ ) _ __ __ _(_)_ __  ___|  _ \\/ ___|
  |  _ \\| |/ _\` |  _ \\| '__/ _\` | | '_ \\/ __| | | \\___ \\
  | |_) | | (_| | |_) | | | (_| | | | | \\__ \\ |_| |___) |
  |____/|_|\\__, |____/|_|  \\__,_|_|_| |_|___/\\____/|____/
           |___/

  OS: BigBrainsOS 2.0 (Cloud)
  Kernel: Linux 5.15.0-cloud
  Shell: bash 5.1.8
  CPU: 4 vCPU @ 2.8GHz
  Memory: 2048MB / 4096MB
  Disk: 12GB / 50GB
  Uptime: 3 hours, 42 mins` },
    { type: 'input', text: 'ls -la' },
    { type: 'output', text: `total 48
drwxr-xr-x  6 user user 4096 May 24 12:00 .
drwxr-xr-x  3 root root 4096 May 24 10:00 ..
-rw-r--r--  1 user user  220 May 24 10:00 .bash_profile
drwxr-xr-x  2 user user 4096 May 24 11:30 Desktop
drwxr-xr-x  3 user user 4096 May 24 11:45 projects
-rw-r--r--  1 user user 1256 May 24 12:00 main.py
-rw-r--r--  1 user user  892 May 24 11:50 README.md` },
    { type: 'input', text: 'python3 main.py' },
    { type: 'output', text: '🚀 BigBrainsOS API starting...\n * Serving Flask app "main"\n * Running on http://0.0.0.0:8080\n * Debug mode: on' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const handleCommand = (cmd) => {
    const newHistory = [...history, { type: 'input', text: cmd }];
    const c = cmd.trim().toLowerCase();
    if (c === 'help') {
      newHistory.push({ type: 'output', text: 'Available commands: help, ls, pwd, whoami, date, clear, echo, cat, uname, uptime' });
    } else if (c === 'clear') {
      setHistory([]); setInput(''); return;
    } else if (c === 'pwd') {
      newHistory.push({ type: 'output', text: '/home/user/workspace' });
    } else if (c === 'whoami') {
      newHistory.push({ type: 'output', text: 'user@bigbrains-os' });
    } else if (c === 'date') {
      newHistory.push({ type: 'output', text: new Date().toString() });
    } else if (c === 'uname -a' || c === 'uname') {
      newHistory.push({ type: 'output', text: 'Linux bigbrains-os 5.15.0-cloud #1 SMP x86_64 GNU/Linux' });
    } else if (c === 'uptime') {
      newHistory.push({ type: 'output', text: ' 12:30:00 up 3:42, 1 user, load average: 0.15, 0.10, 0.05' });
    } else if (c.startsWith('echo ')) {
      newHistory.push({ type: 'output', text: cmd.slice(5) });
    } else if (c === 'ls') {
      newHistory.push({ type: 'output', text: 'Desktop  projects  main.py  README.md' });
    } else if (cmd.trim()) {
      newHistory.push({ type: 'output', text: `bash: ${cmd.trim()}: command not found` });
    }
    setHistory(newHistory);
    setInput('');
  };

  return (
    <div style={{ width: '100%', height: '100%', background: '#0c0c0c', fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace", fontSize: 13, color: '#e0e0e0', display: 'flex', flexDirection: 'column' }}>
      {/* Tab bar */}
      <div style={{ height: 32, background: '#1a1a1a', display: 'flex', alignItems: 'center', paddingLeft: 12, gap: 8, borderBottom: '1px solid #333', fontSize: 12 }}>
        <span style={{ background: '#0c0c0c', padding: '4px 14px', borderRadius: '6px 6px 0 0', color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: '#4ec9b0' }}>⬤</span> bash
        </span>
        <span style={{ color: '#666', cursor: 'pointer', fontSize: 16 }}>+</span>
      </div>
      {/* Terminal output */}
      <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', padding: '8px 14px' }}>
        {history.map((entry, i) => (
          <div key={i} style={{ marginBottom: 2, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {entry.type === 'input' ? (
              <span><span style={{ color: '#4ec9b0', fontWeight: 600 }}>user@bigbrains</span><span style={{ color: '#666' }}>:</span><span style={{ color: '#569cd6' }}>~/workspace</span><span style={{ color: '#666' }}>$</span> <span style={{ color: '#e0e0e0' }}>{entry.text}</span></span>
            ) : (
              <span style={{ color: '#bbb' }}>{entry.text}</span>
            )}
          </div>
        ))}
        {/* Active prompt */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#4ec9b0', fontWeight: 600 }}>user@bigbrains</span>
          <span style={{ color: '#666' }}>:</span>
          <span style={{ color: '#569cd6' }}>~/workspace</span>
          <span style={{ color: '#666' }}>$</span>&nbsp;
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleCommand(input); }}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#e0e0e0', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

const BrowserContent = () => {
  const [url, setUrl] = useState('https://bigbrains-os.dev');
  const [inputUrl, setInputUrl] = useState('https://bigbrains-os.dev');

  return (
    <div style={{ width: '100%', height: '100%', background: '#1a1a2e', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', sans-serif" }}>
      {/* Browser toolbar */}
      <div style={{ height: 40, background: '#1e1e2e', display: 'flex', alignItems: 'center', padding: '0 10px', gap: 8, borderBottom: '1px solid #333' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['←', '→', '↻'].map((b, i) => (
            <button key={i} style={{ width: 28, height: 28, borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.06)', color: '#888', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{b}</button>
          ))}
        </div>
        <div style={{ flex: 1, height: 30, background: 'rgba(255,255,255,0.06)', borderRadius: 8, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6 }}>
          <span style={{ color: '#4ade80', fontSize: 12 }}>🔒</span>
          <input
            value={inputUrl}
            onChange={e => setInputUrl(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') setUrl(inputUrl); }}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#ccc', fontSize: 13, fontFamily: 'inherit' }}
          />
        </div>
        <button style={{ width: 28, height: 28, borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.06)', color: '#888', cursor: 'pointer', fontSize: 14 }}>⋮</button>
      </div>
      {/* Page content */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Hero section */}
        <div style={{ width: '100%', padding: '80px 40px 60px', textAlign: 'center', background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🧠</div>
          <h1 style={{ fontSize: 42, fontWeight: 800, margin: '0 0 14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>BigBrainsOS</h1>
          <p style={{ color: '#8888aa', fontSize: 18, maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.6 }}>The cloud-native desktop environment for developers. Code, build, and deploy — all from your browser.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
            <button style={{ padding: '12px 32px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Get Started</button>
            <button style={{ padding: '12px 32px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#ccc', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Documentation</button>
          </div>
        </div>
        {/* Features grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, padding: '40px 40px 60px', maxWidth: 900, width: '100%' }}>
          {[
            { icon: '🖥️', title: 'VS Code', desc: 'Full IDE in your browser with extensions support' },
            { icon: '💻', title: 'Terminal', desc: 'Full Linux terminal with sudo access' },
            { icon: '🌐', title: 'Browser', desc: 'Built-in browser for web development' },
            { icon: '🐳', title: 'Docker', desc: 'Run containers inside your workspace' },
            { icon: '🔒', title: 'Secure', desc: 'Isolated sessions with encrypted connections' },
            { icon: '⚡', title: 'Fast', desc: 'Low-latency streaming with WebSocket' },
          ].map((f, i) => (
            <div key={i} style={{ padding: 24, borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, color: '#e0e0e0', marginBottom: 6, fontSize: 15 }}>{f.title}</div>
              <div style={{ color: '#777', fontSize: 13, lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SettingsContent = () => (
  <div style={{ width: '100%', height: '100%', background: '#1c1c1e', display: 'flex', fontFamily: "'Inter', sans-serif" }}>
    {/* Sidebar */}
    <div style={{ width: 220, background: '#2c2c2e', padding: '20px 0', borderRight: '1px solid #3a3a3c' }}>
      <div style={{ padding: '0 20px 16px', fontSize: 20, fontWeight: 700, color: '#fff' }}>Settings</div>
      {[
        { icon: '🌐', label: 'General', active: true },
        { icon: '🎨', label: 'Appearance' },
        { icon: '🔔', label: 'Notifications' },
        { icon: '🔒', label: 'Privacy & Security' },
        { icon: '💻', label: 'Display' },
        { icon: '🔋', label: 'Battery' },
        { icon: '📶', label: 'Network' },
        { icon: '🔊', label: 'Sound' },
        { icon: '👤', label: 'Users & Accounts' },
        { icon: 'ℹ️', label: 'About' },
      ].map((item, i) => (
        <div key={i} style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', background: item.active ? 'rgba(59,130,246,0.3)' : 'transparent', color: item.active ? '#fff' : '#aaa', borderRadius: 8, margin: '1px 8px', fontSize: 13.5, fontWeight: item.active ? 600 : 400 }}>
          <span style={{ fontSize: 15 }}>{item.icon}</span> {item.label}
        </div>
      ))}
    </div>
    {/* Content */}
    <div style={{ flex: 1, padding: 32, overflow: 'auto' }}>
      <h2 style={{ color: '#fff', fontSize: 24, fontWeight: 700, margin: '0 0 24px' }}>General</h2>
      {[
        { label: 'Device Name', value: 'BigBrains-Cloud-1' },
        { label: 'OS Version', value: 'BigBrainsOS 2.0.0' },
        { label: 'Kernel', value: 'Linux 5.15.0-cloud' },
        { label: 'Memory', value: '4 GB' },
        { label: 'Storage', value: '50 GB SSD' },
      ].map((item, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #3a3a3c' }}>
          <span style={{ color: '#ccc', fontSize: 14 }}>{item.label}</span>
          <span style={{ color: '#888', fontSize: 14 }}>{item.value}</span>
        </div>
      ))}
      <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, margin: '28px 0 16px' }}>Preferences</h3>
      {[
        { label: 'Dark Mode', checked: true },
        { label: 'Auto-save workspace', checked: true },
        { label: 'Show desktop icons', checked: false },
        { label: 'Enable animations', checked: true },
      ].map((item, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #3a3a3c' }}>
          <span style={{ color: '#ccc', fontSize: 14 }}>{item.label}</span>
          <div style={{ width: 44, height: 24, borderRadius: 12, background: item.checked ? '#34c759' : '#555', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
            <div style={{ width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 2, left: item.checked ? 22 : 2, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FinderContent = () => (
  <div style={{ width: '100%', height: '100%', background: '#1e1e1e', display: 'flex', fontFamily: "'Inter', sans-serif" }}>
    {/* Finder sidebar */}
    <div style={{ width: 180, background: '#252526', padding: '12px 0', borderRight: '1px solid #333' }}>
      <div style={{ padding: '4px 14px 8px', fontSize: 11, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Favorites</div>
      {[
        { icon: '🏠', label: 'Home', active: true },
        { icon: '📁', label: 'Desktop' },
        { icon: '📥', label: 'Downloads' },
        { icon: '📂', label: 'Documents' },
        { icon: '🖼️', label: 'Pictures' },
      ].map((item, i) => (
        <div key={i} style={{ padding: '5px 14px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: item.active ? 'rgba(59,130,246,0.2)' : 'transparent', color: item.active ? '#fff' : '#aaa', borderRadius: 6, margin: '1px 6px', fontSize: 12.5 }}>
          <span style={{ fontSize: 13 }}>{item.icon}</span> {item.label}
        </div>
      ))}
      <div style={{ padding: '12px 14px 8px', fontSize: 11, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Locations</div>
      {[
        { icon: '💻', label: 'BigBrains-OS' },
        { icon: '☁️', label: 'Cloud Drive' },
      ].map((item, i) => (
        <div key={i} style={{ padding: '5px 14px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#aaa', borderRadius: 6, margin: '1px 6px', fontSize: 12.5 }}>
          <span style={{ fontSize: 13 }}>{item.icon}</span> {item.label}
        </div>
      ))}
    </div>
    {/* File grid */}
    <div style={{ flex: 1, padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, padding: '0 4px' }}>
        <span style={{ color: '#888', fontSize: 13 }}>📂</span>
        <span style={{ color: '#ccc', fontSize: 13 }}>/home/user</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 8 }}>
        {[
          { icon: '📁', name: 'Desktop' },
          { icon: '📁', name: 'Documents' },
          { icon: '📁', name: 'Downloads' },
          { icon: '📁', name: 'projects' },
          { icon: '🐍', name: 'main.py' },
          { icon: '📄', name: 'README.md' },
          { icon: '📦', name: 'package.json' },
          { icon: '🐳', name: 'Dockerfile' },
          { icon: '⚙️', name: '.bashrc' },
          { icon: '📋', name: 'notes.txt' },
        ].map((f, i) => (
          <div key={i} style={{ padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, borderRadius: 8, cursor: 'pointer', textAlign: 'center' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span style={{ fontSize: 36 }}>{f.icon}</span>
            <span style={{ fontSize: 11.5, color: '#ccc', wordBreak: 'break-all', lineHeight: 1.3 }}>{f.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════ */

const appContentMap = {
  'VS Code': VSCodeContent,
  'Terminal': TerminalContent,
  'Browser': BrowserContent,
  'Settings': SettingsContent,
  'Finder': FinderContent,
};

const Window = ({ app, onClose, onMinimize, isMinimized }) => {
  const [isMaximized, setIsMaximized] = useState(true);
  const [zIndex] = useState(() => ++globalZIndex);
  const [activeZ, setActiveZ] = useState(zIndex);
  const [isFocused, setIsFocused] = useState(true);

  const startPos = useRef({ x: 100 + (zIndex % 7) * 38, y: 44 + (zIndex % 7) * 28 });
  const [pos, setPos] = useState(startPos.current);
  const [size, setSize] = useState({ w: 960, h: 620 });

  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const windowEl = useRef(null);

  const bringToFront = () => {
    const z = ++globalZIndex;
    setActiveZ(z);
    setIsFocused(true);
  };

  const ContentComponent = appContentMap[app.name] || null;

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
        {ContentComponent ? (
          <ContentComponent />
        ) : (
          <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12, color:'rgba(255,255,255,0.2)' }}>
            <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span style={{ fontSize:13 }}>{app.name} — coming soon</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Window;
