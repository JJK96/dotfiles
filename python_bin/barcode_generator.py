#!/usr/bin/env python
import barcode
from barcode.writer import ImageWriter

import argparse
parser = argparse.ArgumentParser()
parser.add_argument("-t", "--type", default="ean13", help="Type of barcode")
parser.add_argument("input_data")
parser.add_argument("output_file")
args = parser.parse_args()

ean = barcode.get('ean13', args.input_data, writer=ImageWriter())
ean.save(args.output_file)
