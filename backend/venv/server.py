import socket			                #line 1: Import socket module

s = socket.socket()		                #line 2: create a socket object
host = socket.gethostname()	            #line 3: Get current machine name
port = 9999			                    #line 4: Get port number for connection
s.bind((host,port))		                #line 5: bind with the address
s.listen(5)			                    #line 6: listen for connections

print("Waiting for client...")
conn,addr = s.accept()
print("Connected by ", addr)

while True:
	data = conn.recv(1024)
	if not data: break
	conn.sendall(data)
	
conn.close()		  