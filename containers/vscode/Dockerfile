FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV USER=ubuntu
ENV HOME=/home/ubuntu

RUN apt-get update && apt-get install -y \
    openbox \
    tightvncserver \
    novnc websockify \
    curl wget gnupg git \
    sudo \
    python3 \
    python-is-python3 \
    firefox

# Install VS Code
RUN wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg && \
    install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg && \
    sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list' && \
    rm -f packages.microsoft.gpg && \
    apt-get update && apt-get install -y code

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

EXPOSE 6080 5901
ENTRYPOINT ["/entrypoint.sh"]
