#!/usr/bin/env /bash
local args=("$@")
local path=${args[-1]}
local passfile="$PREFIX/$path.gpg"
check_sneaky_paths "$path"

if [[ -f $passfile ]]; then
    if [[ "$1" == "-c" ]]; then
        clipboard=true
        shift
    fi
    contents="$($GPG -d "${GPG_OPTS[@]}" "$passfile")"
    if [[ $# -gt 1 ]]; then
        output="$(echo "$contents" | grep -i $1 | awk '{for (i=2; i<=NF; i++) print $i}')"
    else
        output="$(echo "$contents" | head -n1)"
    fi
    if [ $clipboard ]; then
        echo "$output" | pbcopy
    else
        echo "$output"
    fi

elif [[ -z $path ]]; then
    die ""
else
    die "Error: $path is not in the password store."
fi

