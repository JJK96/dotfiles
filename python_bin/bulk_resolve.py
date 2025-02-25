import asyncio
import sys

sem = asyncio.Semaphore(20)

def get_command(hostname):
    cmd = "dig "
    if args.tcp:
        cmd += " +tcp"
    cmd += f' +short @{args.dns_server} {hostname}'
    if args.record:
        cmd += f" {args.record}"
    return cmd


async def resolve_hostname(hostname):
    async with sem:
        process = await asyncio.create_subprocess_shell(
            get_command(hostname),
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )

        stdout, stderr = await process.communicate()

        if process.returncode != 0:
            print(f'Error resolving {hostname}: {stderr.decode().strip()}')
            return None
        output = stdout.decode().splitlines()
        if not output:
            print(f'{hostname},None')
            return
        ip = output[-1].strip()
        print(f'{hostname},{ip}')

async def resolve_hostnames(hostnames):
    tasks = [resolve_hostname(hostname) for hostname in hostnames]
    await asyncio.gather(*tasks)

import argparse
parser = argparse.ArgumentParser()
parser.add_argument("--dns-server", default="8.8.8.8")
parser.add_argument("--tcp", action="store_true")
parser.add_argument("--record", help="Query a specific record, e.g. CNAME, TXT")
args = parser.parse_args()

hostnames = sys.stdin.read().splitlines()
asyncio.run(resolve_hostnames(hostnames))
