import boto3
from botocore.config import Config
from botocore import UNSIGNED

import argparse
parser = argparse.ArgumentParser()
parser.add_argument("bucket")
parser.add_argument("-x", "--proxy", default="localhost:8080")
args = parser.parse_args()

proxies = {
    'https': args.proxy,
    'http': args.proxy
}
config = Config(
    proxies=proxies,
    signature_version=UNSIGNED,
    user_agent="Mozilla/5.0 (Windows; U; Windows NT 6.0; WOW64) AppleWebKit/600.18 (KHTML, like Gecko) Chrome/55.0.3289.268 Safari/534")

s3 = boto3.resource('s3', config=config, verify=False)
bucket = s3.Bucket(args.bucket)

for obj in bucket.objects.all():
    print(obj.key, obj.last_modified)
