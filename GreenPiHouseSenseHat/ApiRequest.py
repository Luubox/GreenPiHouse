'''
import requests 
  
URL = "https://vejr.eu/api.php"
  
location = "Roskilde"
unit = "C"
  
PARAMS = {'location':location, 'degree':unit} 
  
# r = requests.get("https://thegreenerpihouse.azurewebsites.net/api/data")
#r = requests.get(url = URL, params = PARAMS)
  
r = requests.get(url = URL, headers={'Accept': 'application/json'})
print(r) 
'''

import requests
url = "https://dark-sky.p.rapidapi.com/%7Blatitude%7D,%7Blongitude%7D"
querystring = {"lang":"en","units":"auto"}
headers = {
    'x-rapidapi-host': "dark-sky.p.rapidapi.com",
    'x-rapidapi-key': "77c599c1f1msh59a8527889f6c7bp109495jsn3387a0189e49"
    }
response = requests.request("GET", url, headers=headers, params=querystring)
print(response.text)