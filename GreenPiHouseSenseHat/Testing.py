import json

class Data:
  def __init__(self, temperature, humidity):
    self.temperature = temperature
    self.humidity = humidity

  def __str__(self):
    return f'Temperature: {self.temperature}, Humidity: {self.humidity}'

dataobj = Data(299, 45)

m = {'Temperature': dataobj.temperature, 'Humidity': dataobj.humidity}
data = json.load(dataobj)

print (data)