from sense_hat import SenseHat
import time

s = SenseHat()

O = (0,0,0)
X = (200,200,200)

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

optimal_temp = int(input())

while True: 
    temp = int(s.get_temperature())
    
    if temp == optimal_temp:
      print(" ")
      s.clear()
    elif temp > optimal_temp:
      print("Over")
      s.set_pixels(logo_up)
    else:
      print("Under")
      s.set_pixels(logo_down)

    time.sleep(.75)