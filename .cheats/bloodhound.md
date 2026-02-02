# Bloodhound

## Certificates where users can enroll

```
match p=(u:User {owned:true})-[:MemberOf|Enroll|AutoEnroll*]->(c) where c.type = 'Certificate Template' and c.Enabled return p
```

## High value certifciates where computers can enroll

```
match p=(u:Computer)-[:MemberOf|Enroll|AutoEnroll*]->(c {highvalue: true}) where c.type = 'Certificate Template' and c.Enabled return p
```

## Owned users in high-value groups

```
match p=(n:User {owned: true})-[:MemberOf*1..]->(g:Group {highvalue: true}) return p
```

## User descriptions:

```
match (u:User) where u.description <> "" return distinct u.description
```

## Computer descriptions:

```
match (u:Computer) where u.description <> "" return distinct u.description
```

## User passwords last set:

```
match (u:User) where u.enabled and not (u.pwdlastset = -1 or u.pwdlastset is null) return u.name, date(datetime({epochseconds:toInteger(u.pwdlastset)})) as pwdlastset order by pwdlastset asc
```

## Backup systems

```
MATCH (n) WHERE n.description =~ "(?i).*(acronis|avamar|backup|bck|bkp|bak|barracuda|cohesity|commvault|dpm|rubrik|spectrum|unitrends|veeam|veritas).*" OR n.name =~ "(?i).*(acronis|avamar|backup|bck|bkp|bak|barracuda|cohesity|commvault|dpm|rubrik|spectrum|unitrends|veeam|veritas).*" RETURN n LIMIT 50
```

## Computer descriptions json

```
cat computers_*.json| jq '.data[].Properties | select(.description) | {name,description}'
```

## File servers

```
cat computers_*.json| jq '.data[].Properties | select(.serviceprincipalname and (.serviceprincipalname | ascii_downcase | (contains("cifs") or contains("dfsr")))) | {name,serviceprincipalname}'
```

## SQL servers

```
cat computers_*.json| jq '.data[].Properties | select((.serviceprincipalname and (.serviceprincipalname | ascii_downcase | contains("sql"))) or (.name | ascii_downcase | contains("sql"))) | .name' -r
```

## Bofhound

```
bofhound -p All -o JSON -i .
```
