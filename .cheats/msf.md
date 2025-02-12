# Metasploit framewrok
% msfvenom

## Generate x86 shellcode that spawns a process in python format

```
msfvenom -p windows/exec CMD=<process> --format python
```

## Generate x64 shellcode that spawns a process in python format

```
msfvenom -p windows/x64/exec CMD=<process> --format python
```

= process: notepad.exe
