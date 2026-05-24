#!/bin/bash
export USER=ubuntu
export HOME=/home/ubuntu

# Clear any old VNC locks
sudo rm -rf /tmp/.X11-unix /tmp/.X*-lock

# Start VNC server
vncserver :1 -geometry 1280x720 -depth 24 -name "bigbrainsOS"

# Start noVNC with UI hidden
sed -i 's/<\/head>/<style>body { margin: 0; background: transparent !important; } #noVNC_status_bar, #noVNC_control_bar, .noVNC_panel { display: none !important; }<\/style><\/head>/' /usr/share/novnc/vnc_lite.html
# Start noVNC web proxy in the background on port 6081
websockify --web /usr/share/novnc 6081 localhost:5901 &

# Wait a moment for X to start
sleep 3

# Launch Terminal
export DISPLAY=:1
xfce4-terminal --fullscreen &

# Keep container alive
tail -f /dev/null
