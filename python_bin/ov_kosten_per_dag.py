from csv_processor import for_each_row
from collections import defaultdict
from util import print_dict
import sys

filename = sys.argv[1]

datums = defaultdict(float)
def count_per_day(row):
    if not row['Bedrag'] or 'opgeladen' in row['Transactie']:
        return
    datums[row['Datum']] += float(row['Bedrag'].replace(',','.'))

list(for_each_row(filename, count_per_day, delimiter=";"))

for k,v in datums.items():
    print(f"{k}: {round(v,2)}")
