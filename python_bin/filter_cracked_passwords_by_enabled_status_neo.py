import myneo4j

neo = myneo4j.get_neo4j()
users = neo.get_users(enabled=False)
enabled = {}
for user in users:
    samaccountname = user['n']['samaccountname']
    if samaccountname is None:
        continue
    enabled[samaccountname.lower()] = user['n']['enabled']

output_enabled = "cracked_enabled.txt"
output_disabled = "cracked_disabled.txt"

with open('cracked.txt') as f:
    for line in f.readlines():
        username, hash, password = line.split(':')
        try:
            domain, username = username.split('\\')
        except:
            domain = ""
            pass
        user_enabled = enabled.get(username.lower())
        if user_enabled:
            output = output_enabled
        else:
            output = output_disabled
        with open(output, 'a+') as o:
            if domain:
                o.write(f"{domain}\\{username}:{hash}:{password}")
            else:
                o.write(f"{username}:{hash}:{password}")

