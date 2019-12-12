
BROADCAST_TO_PORT = 10100
from sense_hat import SenseHat
import time
from socket import *
from datetime import datetime
import requests

#---Test af optimale værdier------
#optimal_temp = float(input("Indtast den optimale temperatur: "))
#optimal_hum = float(input("Indtast den optimale luftfugtighed: "))

optimal_temp = 20.0
optimal_hum = 45.0

time_interval = ["09:50", "10:00", "10:10", "10:20", "10:30", "10:40", "10:50"]
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
s.low_light = True

O = (0,0,0)
X = (200,200,200)
R = (255,0,0)
B = (0,0,255)

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

logo_up_wet = [
    B, O, O, X, X, O, O, B,
    O, O, X, X, X, X, O, O,
    O, X, X, X, X, X, X, O,
    X, X, O, X, X, O, X, X,
    X, O, O, X, X, O, O, X,
    O, O, O, X, X, O, O, O,
    O, O, O, X, X, O, O, O,
    B, O, O, X, X, O, O, B,
]

logo_down_wet = [
    B, O, O, X, X, O, O, B,
    O, O, O, X, X, O, O, O,
    O, O, O, X, X, O, O, O,
    X, O, O, X, X, O, O, X,
    X, X, O, X, X, O, X, X,
    O, X, X, X, X, X, X, O,
    O, O, X, X, X, X, O, O,
    B, O, O, X, X, O, O, B,
]
#---------------------------------

def RESTPost(value):
  url = 'https://thegreenerpihouse.azurewebsites.net/api/regulation'
  nowtime =  str(datetime.now().date()) + "T" + str(datetime.now().time().replace(microsecond=0))
  print (nowtime)
  myobj = {'timestamp': nowtime, 'status': value }
  print(myobj)
  resp = requests.post(url, json=myobj)
  print(resp)

def RESTPostwet(value):
  url = 'https://thegreenerpihouse.azurewebsites.net/api/waterloo'
  myobj = {'status': value }
  resp = requests.post(url, json=myobj)
  print(resp)

def lyt():
  data, addr = sock.recvfrom(1024) # buffer size is 1024 bytes
  print ("received message:", data)

def broadcast(temp, humi):
  data = "{" + "'Temperature': {}, 'Humidity': {}".format(temp, humi) + "}"
  sock.sendto(bytes(data, "UTF-8"), ('<broadcast>', BROADCAST_TO_PORT))
  print(data)
  time.sleep(1)

def Watering():
  s.set_pixel(0,0,0,0,255)

def compareValues(temp, hum):
  nowtime = datetime.now().time().replace(microsecond=0)
  if temp == optimal_temp and hum == optimal_hum:
    print(" ")
    s.clear()
    if len(s.stick.get_events()) > 0:
      s.set_pixel(0,0,0,255,0)
    RESTPost(False)
  elif temp > optimal_temp or hum > optimal_hum:
    print("Over")
    s.set_pixels(logo_up)
    if len(s.stick.get_events()) > 0:
      s.set_pixel(0,0,0,255,0)
    RESTPost(True)
  elif temp < optimal_temp or hum < optimal_hum:
    print("Under")
    s.set_pixels(logo_down)
    if len(s.stick.get_events()) > 0:
      s.set_pixel(0,0,0,255,0)
    RESTPost(False)
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

#    print("Temperature: " + str(temp) + " C")
#    print("Humidity: " + str(humi) + " %")

    if i == 1:
#      broadcast(temp, humi)
      i = 0

    compareValues(temp, humi)

#    print(s.stick.get_events())
    arr = s.stick.get_events()
    if len(arr) != 0:
      if arr[0].direction == "down":
        RESTPostwet(True)
        s.set_pixel(0,0,0,0,255)
      else:
        RESTPostwet(False)
        s.set_pixel(0,0,255,0,0)

    time.sleep(1)
    i += 1

if __name__ == '__main__':
  main()
  Watering()
