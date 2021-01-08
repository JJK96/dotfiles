#!/usr/bin/env python
import subprocess

subvolume_list = subprocess.check_output(['btrfs', 'subvolume', 'list', '/']).decode()
qgroup_output = subprocess.check_output(['btrfs', 'qgroup', 'show', '/', '--sort=excl']).decode()

subvolume_dict = {}
for line in subvolume_list.split("\n"):
    line = line.split(' ')
    if len(line) >= 2:
        subvolume_dict[line[1]] = line[-1]

max_path_len = 0
lines = []
for line in qgroup_output.split("\n")[2:]:
    line = line.split()
    if len(line) > 0:
        _ , id = line[0].split('/')
        line[0] = subvolume_dict.get(id, line[0])
        max_path_len = max(len(line[0]), max_path_len)
        lines.append(line)

for line in lines:
    format_string = "{:" + str(max_path_len) + "}\t{: >10}\t{: >10}"
    print(format_string.format(*line))
