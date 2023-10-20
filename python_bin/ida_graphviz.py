import argparse
parser = argparse.ArgumentParser()
parser.add_argument("graph")
args = parser.parse_args()


class Path:
    def __init__(self, nodes):
        self.nodes = nodes

    def prepend_node(self, node):
        self.nodes = [node] + self.nodes

    def __contains__(self, node):
        return node in self.nodes

    def __repr__(self):
        return ' -> '.join([n.label for n in self.nodes])


class Node:
    def __init__(self, label):
        self.label = label
        self.edges = []
        self.unique_edges = set()

    def add_edge(self, target):
        self.edges.append(target)
        self.unique_edges.add(target)

    @property
    def paths(self):
        for edge in self.edges:
            yield Path([self, edge])
            for path in edge.paths:
                path.prepend_node(self)
                yield path

    def all_reachable_nodes(self):
        nodes = set()
        for edge in self.unique_edges:
            nodes.add(edge)
            nodes.update(edge.all_reachable_nodes())
        return nodes

    def __repr__(self):
        return f"<Node {self.label}, edges: {len(self.edges)}>"


class Graph:
    def __init__(self, filename=None):
        self.graph = {}
        self.labels = {}
        if filename:
            self.parse(filename)

    def get_node_by_label(self, label):
        id = self.labels.get(label)
        return self.graph[id]

    def find_paths(self, source, destination):
        source = self.get_node_by_label(source)
        destination = self.get_node_by_label(destination)
        for path in source.paths:
            if destination in path:
                yield path

    def parse(self, filename):
        with open(filename) as f:
            for line in f.readlines():
                if line.startswith("node"):
                    x = read_element(line)
                    self.graph[x['title']] = Node(x['label'])
                    self.labels[x['label']] = x['title']
                elif line.startswith("edge"):
                   x = read_element(line)
                   source = self.graph[x['sourcename']]
                   target = self.graph[x['targetname']]
                   source.add_edge(target)

    def __repr__(self):
        return str(self.graph)


def read_string(s):
    return s.replace('"', '')


def read_element(line):
    split = line.split()
    fields = ["title", "label", "sourcename", "targetname"]
    res = {}
    for k, v in zip(split, split[1:]):
        for f in fields:
            if k.startswith(f):
                res[f] = read_string(v)
                try:
                    res[f] = int(res[f])
                except:
                    pass
    return res


def print_all_reachable_nodes(label, named=False):
    nodes = graph.get_node_by_label(label).all_reachable_nodes()
    for x in sorted(nodes, key=lambda n:n.label):
        if named and x.label.startswith("sub_"):
            continue
        print(x.label)


def print_all_paths(source, destination):
    for path in graph.find_paths(source, destination):
        print(path)


graph = Graph(args.graph)
