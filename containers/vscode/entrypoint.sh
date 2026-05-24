#!/bin/bash
export USER=ubuntu
export HOME=/home/ubuntu
export DISPLAY=:1
export BROWSER=/bin/true
export NO_AT_BRIDGE=1

# Suppress all XFCE browser errors
mkdir -p /home/ubuntu/.config/xfce4
cat > /home/ubuntu/.config/xfce4/helpers.rc << 'EOF'
WebBrowser=custom-WebBrowser
MailReader=custom-MailReader
FileManager=custom-FileManager
TerminalEmulator=custom-TerminalEmulator
EOF

# Clear any old VNC locks
sudo rm -rf /tmp/.X11-unix /tmp/.X*-lock

# Start VNC server
vncserver :1 -geometry 1280x800 -depth 24 -name "bigbrainsOS"

sleep 2

# Set XFCE to use a no-op browser to avoid popups
DISPLAY=:1 xfconf-query --channel xfce4-session --property /general/LockCommand --create --type string --set "" 2>/dev/null || true

# Launch VS Code maximized with no sandbox
DISPLAY=:1 code --no-sandbox --user-data-dir=/home/ubuntu/.vscode-data --start-maximized &

sleep 2

# Start noVNC with UI hidden
sed -i 's/<\/head>/<style>body { margin: 0; background: transparent !important; } #noVNC_status_bar, #noVNC_control_bar, .noVNC_panel { display: none !important; }<\/style><\/head>/' /usr/share/novnc/vnc_lite.html
websockify --web /usr/share/novnc 6080 localhost:5901 &

# Keep alive
tail -f /dev/null
