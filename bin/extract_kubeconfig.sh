#!/usr/bin/env bash
kubeconfig="$1"

cat "$kubeconfig" | tee \
    >(grep client-certificate-data | awk '{print $2}' | base64 -d > cert.pem) \
    >(grep client-key-data | awk '{print $2}' | base64 -d > key.pem) >/dev/null
