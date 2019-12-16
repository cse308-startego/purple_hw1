import socket

def run_server():
    server_port = 3070
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(("", server_port))
    server_socket.listen(5)
    print("The server is ready to receive")
    while True:
        connection_socket, connection_addr = server_socket.accept()
        sentence = connection_socket.recv(1024).decode()
        capitalized_sentence = sentence.upper()
        connection_socket.send(capitalized_sentence.encode())
        connection_socket.close()
        
if __name__ == "__main__":
  run_server()