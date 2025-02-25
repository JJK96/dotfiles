from csv_processor import csv_lines
from collections import defaultdict
import sys

filename = sys.argv[1]

datums = defaultdict(float)
for row in csv_lines(filename, delimiter=';'):
    if not row['Bedrag'] or 'opgeladen' in row['Transactie']:
        continue
    datums[row['Datum']] += float(row['Bedrag'].replace(',','.'))

for k,v in datums.items():
    print(f"{k}: {round(v,2)}")

total = sum(datums.values())
print(f"Total: {round(total,2)}")
