from sense_hat import SenseHat
import time

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

print("Indtast den optimale temperatur: ")
optimal_temp = int(input())
print("Indtast den optimale luftfugtighed: ")
optimal_hum = int(input())

while True: 
    temp = int(s.get_temperature())
    hum = int(s.get_humidity())
    
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

    time.sleep(.75)