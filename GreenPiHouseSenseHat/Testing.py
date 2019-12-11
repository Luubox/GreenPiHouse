import requests
from datetime import datetime

# class Regulation():


def RESTPost(value):
  url = 'https://thegreenerpihouse.azurewebsites.net/api/regulation'
  # url = 'http://localhost:61399/api/regulation'
  nowtime =  str(datetime.now().date()) + "T" + str(datetime.now().time().replace(microsecond=0))
  print(nowtime)
  myobj = {'timestamp': nowtime, 'status': value }
  resp = requests.post(url, json=myobj)
  print(resp)

if __name__ == "__main__":
  RESTPost(False)
  data = requests.get('https://thegreenerpihouse.azurewebsites.net/GetAllRegulations')
  print(data.json())