BROADCAST_TO_PORT = 10100
from sense_hat import SenseHat
import time
from socket import *
from datetime import datetime
import requests

#---Test af optimale værdier------
optimal_temp = input("Indtast den optimale temperatur: ")
optimal_hum = input("Indtast den optimale luftfugtighed: ")
#---------------------------------

#--------------UDP----------------HAHAHAj
UDP_IP = "0.0.0.0"
UDP_PORT = 5005

sock = socket(AF_INET, SOCK_DGRAM)
sock.bind((UDP_IP, UDP_PORT))
sock.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)
#---------------------------------

#------------SenseHat-------------
s = SenseHat()

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
#---------------------------------

def RESTPost(value):
  url = 'https://thegreenerpihouse.azurewebsites.net/api/regulation'
  myobj = {'Status': value}
  resp = requests.post(url, data=myobj)
  print(resp)

def lyt():
  data, addr = sock.recvfrom(1024) # buffer size is 1024 bytes
  print ("received message:", data)

def broadcast(temp, humi):
  data = "{" + "'Temperature': {}, 'Humidity': {}".format(temp, humi) + "}"
  sock.sendto(bytes(data, "UTF-8"), ('<broadcast>', BROADCAST_TO_PORT))
  print(data)
  time.sleep(1)

def compareValues(temp, hum, optimal_temp = 20, optimal_hum = 45):
  if temp == optimal_temp and hum == optimal_hum:
    print(" ")
    s.clear()
    RESTPost(0)
  elif temp > optimal_temp or hum > optimal_hum:
    print("Over")
    s.set_pixels(logo_up)
    RESTPost(1)
  elif temp < optimal_temp or hum < optimal_hum:
    print("Under")
    s.set_pixels(logo_down)
    RESTPost(0)
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

    print("Temperature: " + str(temp) + " C")
    print("Humidity: " + str(humi) + " %")

#    lyt()
    if i == 1:
      broadcast(temp, humi)
      i = 0

    compareValues(temp, humi)

    time.sleep(1)
    i += 1

if __name__ == '__main__':
  main()
