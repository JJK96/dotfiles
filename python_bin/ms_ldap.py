from ldap3 import Server, Connection, NTLM, ALL_ATTRIBUTES
import inspect


def get_search_base(domain):
    return ','.join(["DC={}".format(x) for x in domain.split('.')])


def get_functions(o):
    return [func[0] for func in
            inspect.getmembers(o, predicate=inspect.isroutine)
            if callable(getattr(o, func[0]))
            and not func[0].startswith("__")]


class LDAP:
    """
    A wrapper around ldap3 to make it easier to interact with ldap quickly

    :param domain: FQDN of the domain
    :param host: hostname of the ldap server
    :param port: port of the ldap server
    :param authentication: Authentication method

    Extra arguments are forwarded to ldap3.Connection
    """
    def __init__(self, domain, host, port=389, authentication=NTLM, **kwargs):
        self.search_base = get_search_base(domain)
        self.server = Server(host, port=port)
        self.conn = Connection(self.server, authentication=authentication, **kwargs)
        self.conn.bind()

    def search(self, search_filter, attributes=ALL_ATTRIBUTES, **kwargs):
        self.conn.search(self.search_base, search_filter, attributes=attributes, **kwargs)
        return self.conn.entries

    def get(self, search_filter, **kwargs):
        results = self.search(search_filter, **kwargs)
        if results:
            return results[0]
        else:
            return None

    def delete_computer(self, name):
        dn = 'CN={},OU=Domain Computers,{}'.format(name, self.search_base)
        self.conn.delete(dn)
        # True if Success
        return self.conn.result['result'] == 0

    def get_computer(self, name):
        return self.get(f"(sAMAccountName={name})")


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="""\
LDAP interface

Currently only supports NTLM authentication, but other authentication is trivial to add.

Usage: python -i ms_ldap.py --help
""")
    parser.add_argument("-d", "--domain", help="FQDN of the domain to search in (used in search base)", required=True),
    parser.add_argument("-H", "--host", help="LDAP host", required=True)
    parser.add_argument("-U", "--user", required=True)
    parser.add_argument("-P", "--password", help="Password or NTLM hash", required=True)
    parser.add_argument("-p", "--port", type=int, default=389, help="LDAP port")
    parser.add_argument("-f", "--function", choices=get_functions(LDAP), help="Function to execute")
    args, extra_args = parser.parse_known_args()

    ldap = LDAP(args.domain, args.host, port=args.port, password=args.password, user=args.user)
    if args.function:
        print(getattr(ldap, args.function)(*extra_args))
