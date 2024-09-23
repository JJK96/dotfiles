# Tun2socks
% tun2socks

## Start tun2socks

```
sudo tun2socks -device <device> -proxy <protocol>://<host>:<port> -interface <interface>
```

## Start tun2socks interface

```
sudo ifconfig <device> <ip> <ip> up
```

= interface: en0
= host: localhost
= port: 8080
= device: utun123
= protocol: socks5
= ip: 198.18.0.1
