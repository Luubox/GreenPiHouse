import requests 
  
URL = "https://vejr.eu/api.php"
  
location = "Roskilde"
unit = "C"
  
PARAMS = {'location':location, 'degree':unit} 
  
# r = requests.get("https://thegreenerpihouse.azurewebsites.net/api/data")

r = requests.get(url = URL, params = PARAMS)
  
print(r) 