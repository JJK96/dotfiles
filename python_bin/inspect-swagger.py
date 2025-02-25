import json
from collections import defaultdict

def read_ref(data, ref):
    x = data
    for segment in ref.split('/')[1:]:
        x = x[segment]
    return x


def inspect_swagger(filename):
    with open(filename) as f:
        data = json.load(f)
    print(f"{data['info']['title']} - {data['info']['description']}")
    print("Paths:")
    stats = defaultdict(int)
    num_params = 0
    for path, v in data['paths'].items():
        print(f"\t{path}:")
        for method, v1 in v.items():
            print(f"\t\t{method}")
            stats[method] += 1
            if method == "get" and 'parameters' in v1:
                num_params += len(v1['parameters'])
                print(f"\t\t{len(v1['parameters'])} parameters")
            else:
                try:
                    schemas = set(json.dumps(v['schema']) for k,v in v1['requestBody']['content'].items())
                    for schema in schemas:
                        schema = json.loads(schema)
                        if '$ref' in schema:
                            schema = read_ref(data, schema['$ref'])
                        else:
                            schema = schema['properties']
                        num_params += len(schema)
                        print(f"\t\tSchema with {len(schema)} parameters")
                except KeyError:
                    continue




    print("Path stats:")
    for k,v in stats.items():
        print(f"\t{k}: {v}")
    print(f"Total number of parameters: {num_params}")


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("swagger_file")
    args = parser.parse_args()
    inspect_swagger(args.swagger_file)

