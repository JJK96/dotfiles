from boofuzz import *
import sys

host = sys.argv[1]
port = int(sys.argv[2])

session = Session(
    target=Target(
        connection=TCPSocketConnection(host, port)))

request = Request("request", children=(
	Block("all", children=(
		Size("size_all", "all", endian=BIG_ENDIAN),
		Bytes("bytes"),
	))
))

request1 = Request("request1", children=(
	Block("all", children=(
		Size("size_all", "all", endian=BIG_ENDIAN),
		RandomData("bytes", max_length=100),
	))
))

session.connect(request1)

session.fuzz()

