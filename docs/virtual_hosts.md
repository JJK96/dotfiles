# Create a virtual host to point to a specific directory.

add to `/etc/hosts`

`127.0.0.1` hostname

add to `/etc/httpd/conf/extra/httpd-vhosts.conf`

```
<VirtualHost *:80>
    DocumentRoot "/path/to/directory"
    ServerName hostname
    ErrorLog "/var/log/httpd/hostname-error_log"
    CustomLog "/var/log/httpd/hostname-access_log" common
</VirtualHost>
```
