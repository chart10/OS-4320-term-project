import socket			

# Get current machine name
# Client wants to connect to server's port number 9999
s = socket.socket()		
host = socket.gethostname()	    
port = 9999    
s.connect((host,port))

message = 'This is being sent to the server'
byte_message = message.encode('utf-8')
s.sendall(byte_message)

data = s.recv(1024)

print(data)	            

s.close()