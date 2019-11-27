BROADCAST_TO_PORT = 10100
from sense_hat import SenseHat
import time
from socket import *
from datetime import datetime

s = SenseHat()
'''
while True:

  temp = s.get_temperature()
  humi = s.get_humidity()
  
  temp = round(temp, 1)
  humi = round(humi, 1)
  
  print("Temperature: " + str(temp) + " C")
  print("Humidity: " + str(humi) + " %")
  
  time.sleep(3600) 
  '''

s = socket(AF_INET, SOCK_DGRAM)
#s.bind(('', 14593))     # (ip, port)
# no explicit bind: will bind to default IP + random port
s.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)

while True:
	data = "Current temperature " + str(temp() + "Current humidity " + str(humi()))
	s.sendto(bytes(data, "UTF-8"), ('<broadcast>', BROADCAST_TO_PORT))
	print(data)
	time.sleep(1)