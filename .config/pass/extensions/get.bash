#!/bin/bash
local args=("$@")
local path=${args[-1]}
local passfile="$PREFIX/$path.gpg"
check_sneaky_paths "$path"

if [[ -f $passfile ]]; then
    offset=0
    if [[ "${args[$offset]}" == "-c" ]]; then
        clipboard=true
        offset=$((offset + 1))
    fi
    contents="$($GPG -d "${GPG_OPTS[@]}" "$passfile")"
    if [[ ${#args[@]} -gt $((offset + 1)) ]]; then
        output="$(echo "$contents" | grep -i ${args[$offset]} | awk '{for (i=2; i<=NF; i++) print $i}')"
    else
        output="$(echo "$contents" | head -n1)"
    fi
    if [ $clipboard ]; then
        echo "$output" | xsel -b
    else
        echo "$output"
    fi

    #$GPG -d "${GPG_OPTS[@]}" "$passfile" | tail -n +2 || exit $?

elif [[ -z $path ]]; then
    die ""
else
    die "Error: $path is not in the password store."
fi

