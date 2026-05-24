FROM debian:bookworm

ENV DEBIAN_FRONTEND=noninteractive
ENV USER=ubuntu
ENV HOME=/home/ubuntu

RUN apt-get update && apt-get install -y \
    openbox xfce4-terminal \
    tightvncserver \
    novnc websockify \
    curl wget sudo chromium

# Setup user
RUN useradd -m -s /bin/bash ubuntu && echo "ubuntu:ubuntu" | chpasswd && adduser ubuntu sudo
RUN echo "ubuntu ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER ubuntu
WORKDIR /home/ubuntu

RUN mkdir -p /home/ubuntu/.vnc
RUN echo "bigbrains" | vncpasswd -f > /home/ubuntu/.vnc/passwd && chmod 600 /home/ubuntu/.vnc/passwd

# Create xstartup for minimal WM (no panels)
RUN echo "#!/bin/bash\nautocutsel -fork\nxrdb \$HOME/.Xresources\nxsetroot -solid transparent\nexport XKL_XMODMAP_DISABLE=1\nmkdir -p \$HOME/.config/openbox\necho '<?xml version=\"1.0\" encoding=\"UTF-8\"?><openbox_config><applications><application class=\"*\"><decor>no</decor><maximized>true</maximized></application></applications></openbox_config>' > \$HOME/.config/openbox/rc.xml\nopenbox-session &" > /home/ubuntu/.vnc/xstartup && chmod +x /home/ubuntu/.vnc/xstartup

COPY entrypoint.sh /entrypoint.sh
RUN sudo chmod +x /entrypoint.sh

EXPOSE 6081 5901
ENTRYPOINT ["/entrypoint.sh"]
