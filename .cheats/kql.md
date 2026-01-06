# KQL queries

## Sign-ins per user

```kql
SigninLogs
| where UserPrincipalName == "<user>"
| project TimeGenerated, IPAddress
```

## Distinct IP addresses per user

```kql
SigninLogs
| where UserPrincipalName == "<user>"
| distinct IPAddress
```

## User signins per IP

```kql
SigninLogs
| where IPAddress == "<ip>"
| distinct UserPrincipalName
```

## Visited URLs

```kql
DeviceNetworkEvents
| where InitiatingProcessFileName in ("chrome.exe", "edge.exe")
| distinct RemoteUrl
```
