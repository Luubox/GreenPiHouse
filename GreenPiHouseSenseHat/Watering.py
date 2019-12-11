from datetime import datetime
import time
import sys

# print("Skriv et tidspunkt for vanding: (Format: TT:MM:SS)")
# time_interval = input()
try:
  a = datetime.strptime(input('Skriv tiden for vanding (HH:MM): '), "%H:%M")
except:
  print("Skriv venligst tiden med korrekt format: HH:MM")
  sys.exit(0)

nu = datetime.now().replace(microsecond=0)

while True: 
  if nu.time() != a.time():
    nu = datetime.now().replace(microsecond=0)
    print("Venter")
  else:
    print("Vander")
    time.sleep(1)
    nu = datetime.now().replace(microsecond=0)
