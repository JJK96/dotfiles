#!/bin/sh

space=$(df | head -n 4 | tail -1 | awk '{print $5}')

echo $space
