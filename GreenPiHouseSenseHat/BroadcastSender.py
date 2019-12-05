BROADCAST_TO_PORT = 10100
from sense_hat import SenseHat
import time
from socket import *
from datetime import datetime
import json_tricks as json

optimal_temp = input("Indtast den optimale temperatur: ")
optimal_hum = input("Indtast den optimale luftfugtighed: ")

s = SenseHat()

UDP_IP = "192.168.1.255"
UDP_PORT = 5005

sock = socket(AF_INET, SOCK_DGRAM) 
sock.bind((UDP_IP, UDP_PORT))
sock.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)

O = (0,0,0)
X = (200,200,200)
R = (255,0,0)

logo_up = [
    O, O, O, X, X, O, O, O,
    O, O, X, X, X, X, O, O,
    O, X, X, X, X, X, X, O,
    X, X, O, X, X, O, X, X,
    X, O, O, X, X, O, O, X,
    O, O, O, X, X, O, O, O,
    O, O, O, X, X, O, O, O,
    O, O, O, X, X, O, O, O,
]

logo_down = [
    O, O, O, X, X, O, O, O,
    O, O, O, X, X, O, O, O,
    O, O, O, X, X, O, O, O,    
    X, O, O, X, X, O, O, X,
    X, X, O, X, X, O, X, X,
    O, X, X, X, X, X, X, O,
    O, O, X, X, X, X, O, O,
    O, O, O, X, X, O, O, O,
]

class Data(self, temperature, humidity):
  def __init__(self, temperature, humidity):
    self.temperature = temperature
    self.humidity = humidity

  def __str__(self):
    return f'Temperature: {self.temperature}, Humidity: {self.humidity}'


def lyt():
  data, addr = sock.recvfrom(1024) # buffer size is 1024 bytes
  print ("received message:", data)

def broadcast():
	# data = "Current temperature " + str(temp() + "Current humidity " + str(humi()))
  data = json.dump()
	sock.sendto(bytes(data, "UTF-8"), ('<broadcast>', BROADCAST_TO_PORT))
	print(data)
	time.sleep(1)

def compareValues(temp, hum, optimal_temp = 20, optimal_hum = 45):
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

def main():
  i = 0
  while True:
    #Måler temperatur
    temp = s.get_temperature()
    #Måler luftfugtighed
    humi = s.get_humidity()
    
    temp = round(temp, 1)
    humi = round(humi, 1)
    
    dataobj = Data(temp, humi)

    print("Temperature: " + str(temp) + " C")
    print("Humidity: " + str(humi) + " %")
    
    lyt()
    if i == 3600:
      broadcast(dataobj)
      i = 0
  
    compareValues(temp, humi)
    
    sleep(1)
    i += 1

if __name__ == '__main__':
  main()