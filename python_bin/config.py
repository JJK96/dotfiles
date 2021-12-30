from os.path import realpath, dirname, join
import yaml


def get_config(filename='config.yml'):
    if not filename.startswith('/'):
        dir = realpath(dirname(__file__))
        filename = join(dir, filename)
    with open(filename) as f:
        return yaml.safe_load(f)
