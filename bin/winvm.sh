cd /home/jjk
qemu-system-x86_64 -drive file=vms/windows_hdd,format=raw -m 4G -cpu host,kvm=off -smp cores=4,threads=2 --enable-kvm -vga std

