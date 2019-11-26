BROADCAST_TO_PORT = 7000

from sense_hat import SenseHat
from socket import *
from datetime import datetime

s = SenseHat()
temp = s.get_temperature()
print("Temperature: %.0f C" % temp)

humidity = s.get_humidity()
print("Humidity: %.0f %" % humidity)

s = socket(AF_INET, SOCK_DGRAM)
#s.bind(('', 14593))     # (ip, port)
# no explicit bind: will bind to default IP + random port
s.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)
while True:
	data = "Current time " + str(datetime.now())
	s.sendto(bytes(data, "UTF-8"), ('<broadcast>', BROADCAST_TO_PORT))
	print(data)
	time.sleep(1)