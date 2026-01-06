# LDAP

## Query users and service accounts

    (|(&(objectClass=user)(objectCategory=person))(objectcategory=msDS-GroupManagedServiceAccount)(objectcategory=msDS-ManagedServiceAccount))
