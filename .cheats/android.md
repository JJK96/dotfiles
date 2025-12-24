# Android
%adb

## Get proxy settings

```
adb shell settings get global http_proxy
```

## Set proxy server

```
adb shell settings put global http_proxy <ip>:<port>
```

## Trigger deep link

```
adb shell am start -W -a android.intent.action.VIEW -d 'https://example.com'
```

## Trigger deep link (specific app)

```
adb shell am start -W -a android.intent.action.VIEW -d 'https://example.com' <app_id>
```

## Show top window/active activity

```
adb shell dumpsys window windows | rg -o 'mObscuringWindow.+?([^\} ]+)\}' -r '$1'
```
