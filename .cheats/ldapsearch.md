# LDAPSearch

## Get enabled users

```
ldapsearch -x -H ldaps://<host> -D <domain>\\<user> -w "<pass>" -b 'DC=<domain>,DC=<tld>' -E pr=<page_size>/noprompt -E '!1.2.840.113556.1.4.801=::MAMCAQc=' -LLL '(!(userAccountControl:1.2.840.113556.1.4.803:=2))' | tee <output>
```

## Paging

```
ldapsearch -x -H ldaps://<host> -D <domain>\\<user> -w "<pass>" -b 'DC=<domain>,DC=<tld>' -E pr=<page_size>/noprompt -E '!1.2.840.113556.1.4.801=::MAMCAQc=' -LLL <filter> | tee <output>
```

= pass: $pass
= page_size: 1000
= output: output.ldif
= filter: (objectClass=domain)
