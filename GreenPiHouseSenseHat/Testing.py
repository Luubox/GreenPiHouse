import requests
from datetime import datetime

# class Regulation():


def RESTPost(value):
  # url = 'https://thegreenerpihouse.azurewebsites.net/api/regulation'
  url = 'http://localhost:61399/api/regulation'
  nowtime =  str(datetime.now().date()) + "T" + str(datetime.now().time())
  myobj = {"Timestamp": nowtime, "Status": value }
  resp = requests.post(url, json=myobj)
  print(resp)

if __name__ == "__main__":
  RESTPost(1)
  data = requests.get('http://localhost:61399/GetAllRegulations')
  print(data.json())