# smb

## Mount impacket smbserver.py SMB share

```
mount -t cifs -o vers=1.0 //<ip>/<share> <mountpoint>
```

## Mount SMB share

```
mount_smbfs "//<domain>;<user>@<host>/<share>" ./<mountpoint>
```

= mountpoint: sysvol
= share: SYSVOL
