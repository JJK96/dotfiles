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

    def search(self, query):
        results = []

        def transaction(tx):
            for r in tx.run(query):
                results.append(r)

        with self.driver.session() as session:
            session.read_transaction(transaction)

        return results


def get_neo4j():
    from config import get_config
    config = get_config("neo4j.yml")
    return Neo4j(config.get('uri'), config.get('user'), config.get('password'))


if __name__ == "__main__":
    neo = get_neo4j()
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--password-spray-ideas", action="store_true")
    args = parser.parse_args()
    if args.password_spray_ideas:
        for x in neo.get_password_spray_ideas():
            print(x)
