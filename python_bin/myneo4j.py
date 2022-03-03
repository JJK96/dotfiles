from neo4j import GraphDatabase


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
