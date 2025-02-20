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
