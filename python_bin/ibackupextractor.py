#!/usr/bin/env python
import sqlite3
import argparse
import os
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument("backup_dir", help="e.g. /Users/foo/Library/Application Support/MobileSync/Backup/<UUID>")
parser.add_argument("-d", "--domain", help="Only extract domains including this string.")
parser.add_argument("-o", "--output_dir", default="output")
args = parser.parse_args()

manifest_db = Path(args.backup_dir) / "Manifest.db"
output_dir = Path(args.output_dir)

with sqlite3.connect(manifest_db) as con:
    files = con.execute("select * from Files where flags = 1")
    for file in files:
        hash = file[0]
        domain = file[1]
        path = file[2]
        if not path:
            continue
        if args.domain and args.domain not in domain:
            continue
        out_path = output_dir / domain / path
        os.makedirs(out_path.parent, exist_ok=True)
        first_chars = hash[:2]
        src_path = Path(args.backup_dir) / first_chars / hash
        try:
            os.symlink(src_path.resolve(), out_path)
        except FileExistsError:
            print("Duplicate file: ")
            print(hash, path, out_path)



