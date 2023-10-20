from neo4j import GraphDatabase
from collections import Counter
from datetime import datetime, date
import locale


class Neo4j:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def get_computers(self):
        return self.search("match (c:Computer) return c")

    def hostnames(self, with_domain=False):
        for c in self.get_computers():
            hostname = c['c']['name']
            if not hostname:
                continue
            if not with_domain and hostname:
                hostname = hostname.split('.')[0]
            yield hostname

    def get_users(self, enabled=True):
        enabled_query = "{enabled: True}"
        if not enabled:
            enabled_query = ""
        query = "match (n:User {}) return n".format(enabled_query)
        return self.search(query)

    def get_most_common_password_updated(self, number=5, **kwargs):
        users = self.get_users(**kwargs)

        def get_dates():
            for user in users:
                pwdlastset = user['n']['pwdlastset']
                yield datetime.fromtimestamp(pwdlastset).strftime("%Y-%m")

        counter = Counter(get_dates())
        for k, v in counter.most_common(number):
            yield k

    def get_password_spray_ideas(self, with_locale="nl_NL"):
        locale.setlocale(locale.LC_ALL, with_locale)
        most_common_dates = self.get_most_common_password_updated()
        for d in most_common_dates:
            year, month = d.split('-')
            d = date(year=int(year), month=int(month), day=1)
            yield d.strftime("%B%Y")
            yield d.strftime("%B%Y").capitalize()
            yield d.strftime("%B%Y!")
            yield d.strftime("%B%Y!").capitalize()

    def get_paths_to_da(self):
        return self.search('MATCH p=shortestPath((n)-[:MemberOf|HasSession|AdminTo|AllExtendedRights|AddMember|ForceChangePassword|GenericAll|GenericWrite|Owns|WriteDacl|WriteOwner|CanRDP|ExecuteDCOM|AllowedToDelegate|ReadLAPSPassword|Contains|GpLink|AddAllowedToAct|AllowedToAct|SQLAdmin|ReadGMSAPassword|HasSIDHistory|CanPSRemote|AZAddMembers|AZContains|AZContributor|AZGetCertificates|AZGetKeys|AZGetSecrets|AZGlobalAdmin|AZOwns|AZPrivilegedRoleAdmin|AZResetPassword|AZUserAccessAdministrator|AZAppAdmin|AZCloudAppAdmin|AZRunsAs|AZKeyVaultContributor|AddSelf|WriteSPN|AddKeyCredentialLink|AZAddOwner|AZAddSecret|AZAvereContributor|AZExecuteCommand|AZHasRole|AZManagedIdentity|AZMemberOf|AZPrivilegedAuthAdmin|AZVMAdminLogin|AZVMContributor|AZLogicAppContributor|GPLink|DumpSMSAPassword|DCSync|SyncLAPSPassword*1..]->(m:Group {name:"DOMAIN ADMINS@AMS.INTRA.SCHIPHOL.NL"})) WHERE NOT n=m RETURN p')

    def get_elements_of_type_from_paths(self, element_type, paths):
        for p in paths:
            p = p['p']
            for node in p.nodes:
                if element_type in node.labels:
                    yield node

    def get_groups_on_path_to_da(self):
        paths = self.get_paths_to_da()
        return self.get_elements_of_type_from_paths('Group', paths)

    def get_users_on_path_to_da(self):
        groups = self.get_groups_on_path_to_da()
        names = list(set(g.get('name') for g in groups))
        query = f'MATCH (u:User)-[:MemberOf*1..]->(g:Group) WHERE g.name IN {names} RETURN DISTINCT u'
        print(query)
        return self.search(query)

    def search(self, query):
        results = []

        def transaction(tx):
            for r in tx.run(query):
                results.append(r)

        with self.driver.session() as session:
            session.execute_read(transaction)

        return results

    def execute(self, query):
        results = []

        def transaction(tx):
            for r in tx.run(query):
                results.append(r)

        with self.driver.session() as session:
            session.execute_write(transaction)

        return results

    def set_owned_principals(self, owned_users):
        """:param users: Set of owned users"""
        query = ["match (n:User) where"]
        clause = []
        users = self.get_users(enabled=False)
        for user in users:
            username = user['n']['samaccountname']
            if not username:
                continue
            username = username.partition('@')[0]
            if username.lower() in owned_users:
                clause.append(f"id(n) = {user['n'].element_id}")
        query.append(' or '.join(clause))
        query.append("set n.owned = True return n")
        query = ' '.join(query)
        self.execute(query)

    def is_enabled(self, username):
        query = f"match (n:User) where n.samaccountname = '{username}' return n.enabled"
        res = self.execute(query)
        return res[0]


def get_neo4j():
    from config import get_config
    import os
    config = get_config("neo4j.yml")
    return Neo4j(config.get('uri'), config.get('user'), os.environ.get("NEO4J_PASS"))


if __name__ == "__main__":
    neo = get_neo4j()
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--password-spray-ideas", action="store_true")
    parser.add_argument("--is-enabled")
    parser.add_argument("--set-owned")
    args = parser.parse_args()
    if args.password_spray_ideas:
        for x in neo.get_password_spray_ideas():
            print(x)
    elif args.is_enabled:
        print(neo.is_enabled(args.is_enabled))
    elif args.set_owned:
        with open(args.set_owned) as f:
            owned = set()
            for line in f.readlines():
                owned.add(line[:-1])
            neo.set_owned_principals(owned)
