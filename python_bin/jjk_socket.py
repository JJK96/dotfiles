import socket

def recv(client_socket, chunk_size=1024):
    data = b''
    while True:
        data_chunk = client_socket.recv(chunk_size)
        if data_chunk:
             data+=data_chunk
        else:
             break
    return data

def netcat(host, port, data):    
     with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((host, port))
        s.sendall(data)
        return recv(s)
