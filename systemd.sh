sudo systemctl enable   \
    bluetooth           \
    lightdm             \
    NetworkManager      \
    teamviewerd         \
    btrfs-scrub@-.timer \
    cupsd               \
    polkit              \
    i3lock              \
    tlp                 \
    btrbk.timer

systemctl --user enable \
    redshift            \
    mbsync.timer        \
    rclone-sync.timer   \
    pulseaudio
