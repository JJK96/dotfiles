import csv


def process_csv(input_file, output_file, process_function):
    with open(input_file) as input, open(output_file, 'w') as output:
        reader = csv.DictReader(input)
        writer = csv.DictWriter(output, fieldnames=reader.fieldnames)
        writer.writeheader()
        for line in reader:
            if process_function(line):
                writer.writerow(line)
