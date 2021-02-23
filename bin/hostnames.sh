#!/usr/bin/env bash
if [ $# -lt 1 ]; then
    echo "Usage: $0 <hostnames_file>"
    exit 1
fi
hostnames="$1"
for u in $(cat "$hostnames"); do
    lookup=$(nslookup $u 2>&1)
    if ! [[ $(echo -n "$lookup" | grep -i "can't find") ]]; then
        answer=$(echo -n "$lookup" | grep -A 999999 "answer" | grep "Address" | cut -d " " -f 2)
        echo $u
        echo "$answer"
        echo "---------------------"
    fi
done
