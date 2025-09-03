# smb

## Mount impacket smbserver.py SMB share

```
mount -t cifs -o vers=1.0 //<ip>/<share> <mountpoint>
```

## Mount SMB share

```
sudo mount -t cifs //<ip>/<share> ./<mountpoint> -o uid=$(id -u) -o gid=$(id -g) -o username=<username> -o password=<password>
```

= mountpoint: sysvol
= share: SYSVOL
