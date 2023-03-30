Get-NetTCPConnection | where State -Eq Listen | select LocalPort,OwningProcess,@{Name = 'ProcessName'; Expression = {Get-Process -Pid $_.OwningProcess}}
