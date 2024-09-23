from datetime import datetime
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("input", type=int)
args = parser.parse_args()

output = datetime.fromtimestamp(datetime(1601,1,1).timestamp() + (args.input / 1000 / 1000))
print(output.isoformat())
