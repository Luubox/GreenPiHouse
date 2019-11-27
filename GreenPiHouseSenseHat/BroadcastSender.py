BROADCAST_TO_PORT = 10100
from sense_hat import SenseHat
import time
from socket import *
from datetime import datetime

s = SenseHat()

while True:

  temp = s.get_temperature()
  humi = s.get_humidity()
  
  temp = round(temp, 1)
  humi = round(humi, 1)
  
  print("Temperature: " + str(temp) + " C")
  print("Humidity: " + str(humi) + " %")
  
  time.sleep(3600) 

s = socket(AF_INET, SOCK_DGRAM)
#s.bind(('', 14593))     # (ip, port)
# no explicit bind: will bind to default IP + random port
s.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)

while True:
	data = "Current temperature " + str(temp() + "Current humidity " + str(humi()))
	s.sendto(bytes(data, "UTF-8"), ('<broadcast>', BROADCAST_TO_PORT))
	print(data)
	time.sleep(1)



#Mulig løsning til hele koden på Raspberry Pi

def lyt():
	UDP_IP = "127.0.0.1"
	UDP_PORT = 5005

	sock = socket.socket(socket.AF_INET, # Internet
						socket.SOCK_DGRAM) # UDP
	sock.bind((UDP_IP, UDP_PORT))

	while True:
		data, addr = sock.recvfrom(1024) # buffer size is 1024 bytes
		print "received message:", data

def broadcast():


i = 0
while True:
	lyt()
	if i == 3600:
		broadcast()
		i = 0
	
	if temp == optimal_temp and hum == optimal_hum:
      print(" ")
      s.clear()
    elif temp > optimal_temp or hum > optimal_hum:
      print("Over")
      s.set_pixels(logo_up)
    elif temp < optimal_temp or hum < optimal_hum:
      print("Under")
      s.set_pixels(logo_down)
    else:
        print("Fejl")
        s.clear(R)
	sleep(1)
	i += 1

