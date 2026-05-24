FROM debian:bookworm

ENV DEBIAN_FRONTEND=noninteractive
ENV USER=bigbrains
ENV HOME=/home/bigbrains

RUN apt-get update && apt-get install -y \
    openbox xfce4-terminal \
    tightvncserver \
    novnc websockify \
    curl wget sudo chromium

# Setup user
RUN useradd -m -s /bin/bash bigbrains && echo "bigbrains:bigbrains" | chpasswd && adduser bigbrains sudo
RUN echo "bigbrains ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER bigbrains
WORKDIR /home/bigbrains

RUN mkdir -p /home/bigbrains/.vnc
RUN echo "bigbrains" | vncpasswd -f > /home/bigbrains/.vnc/passwd && chmod 600 /home/bigbrains/.vnc/passwd

# Create xstartup for minimal WM (no panels)
RUN echo "#!/bin/bash\nautocutsel -fork\nxrdb \$HOME/.Xresources\nxsetroot -solid transparent\nexport XKL_XMODMAP_DISABLE=1\nmkdir -p \$HOME/.config/openbox\necho '<?xml version=\"1.0\" encoding=\"UTF-8\"?><openbox_config><applications><application class=\"*\"><decor>no</decor><maximized>true</maximized></application></applications></openbox_config>' > \$HOME/.config/openbox/rc.xml\nopenbox-session &" > /home/bigbrains/.vnc/xstartup && chmod +x /home/bigbrains/.vnc/xstartup

COPY entrypoint.sh /entrypoint.sh
RUN sudo chmod +x /entrypoint.sh

EXPOSE 6081 5901
ENTRYPOINT ["/entrypoint.sh"]
