from sense_hat import SenseHat
import time

s = SenseHat()

while True: 
    #----------------------------
    #Her måler vi luftfugtigheden
    temp = int(s.get_humidity())
    print(temp)
    #----------------------------
    time.sleep(1)