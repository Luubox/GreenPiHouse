from sense_hat import SenseHat

sense = SenseHat()
temp = sense.get_temperature()
print("Temperature: %.0f C" % temp)

humidity = sense.get_humidity()
print("Humidity: %.0f %" % humidity)