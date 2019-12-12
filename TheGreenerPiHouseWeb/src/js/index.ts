import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface Idata {
    temperature: number,
    humidity: number,
}

<<<<<<< HEAD
//virk nu forhelvede
=======
let elementTemp: HTMLDivElement = < HTMLDivElement > (document.getElementById("temperature"))
let elementHumi: HTMLDivElement = < HTMLDivElement > (document.getElementById("humidity"))
>>>>>>> parent of a5aa8e2... Revert "Merge branch 'Densejebranch' into JonasProject3Ny"

let elementTempOut: HTMLDivElement = < HTMLDivElement > (document.getElementById("tmpout"))
let elementHumiOut: HTMLDivElement = < HTMLDivElement > (document.getElementById("humout"))

let day1DayElement: HTMLDivElement = < HTMLDivElement > (document.getElementById("day1day"))
let day1TempElement: HTMLDivElement = < HTMLDivElement > (document.getElementById("day1temp"))
let day1HumiElement: HTMLDivElement = < HTMLDivElement > (document.getElementById("day1hum"))

let day2DayElement: HTMLDivElement = < HTMLDivElement > (document.getElementById("day2day"))
let day2TempElement: HTMLDivElement = < HTMLDivElement > (document.getElementById("day2temp"))
let day2HumiElement: HTMLDivElement = < HTMLDivElement > (document.getElementById("day2hum"))

let day3DayElement: HTMLDivElement = < HTMLDivElement > (document.getElementById("day3day"))
let day3TempElement: HTMLDivElement = < HTMLDivElement > (document.getElementById("day3temp"))
let day3HumiElement: HTMLDivElement = < HTMLDivElement > (document.getElementById("day3hum"))

let day4DayElement: HTMLDivElement = < HTMLDivElement > (document.getElementById("day4day"))
let day4TempElement: HTMLDivElement = < HTMLDivElement > (document.getElementById("day4temp"))
let day4HumiElement: HTMLDivElement = < HTMLDivElement > (document.getElementById("day4hum"))

let day5DayElement: HTMLDivElement = < HTMLDivElement > (document.getElementById("day5day"))
let day5TempElement: HTMLDivElement = < HTMLDivElement > (document.getElementById("day5temp"))
let day5HumiElement: HTMLDivElement = < HTMLDivElement > (document.getElementById("day5hum"))

let updateWeatherBtn: HTMLButtonElement = < HTMLButtonElement > (document.getElementById("updateWeather"))
let updateForecastBtn: HTMLButtonElement = < HTMLButtonElement > (document.getElementById("updateForecast"))

let elementWindow: HTMLBodyElement = < HTMLBodyElement > (document.getElementById("body"))
let temperatureSelector: HTMLOptionElement = < HTMLOptionElement > (document.getElementById("temperatureOption"))

elementWindow.addEventListener("loadend", GetTempterature)
window.addEventListener("load", (event) => {
    GetTempterature()
    GetHumidity()
})

let temperatureSelector: HTMLOptionElement = <HTMLOptionElement> (document.getElementById("temperatureOption"))

let selectedValueTemp: HTMLSelectElement = <HTMLSelectElement> (document.getElementById("selectTemp"))
let selectedValueHumi: HTMLSelectElement = <HTMLSelectElement> (document.getElementById("selectHumi"))

let selectButtonTemp: HTMLButtonElement = <HTMLButtonElement> (document.getElementById ("chooseTempButton"))
let selectButtonHumi: HTMLButtonElement = <HTMLButtonElement> (document.getElementById ("chooseHumiButton"))
selectButtonTemp.addEventListener("click", changeSelectedItemTemp)
selectButtonHumi.addEventListener("click", changeSelectedItemHumi)
updateWeatherBtn.addEventListener("click", apiGetWeatherData)
updateForecastBtn.addEventListener("click", apiGetForecastData)

let showIcon: HTMLElement = <HTMLElement> (document.getElementById ("vandeIkon"))
let timerId = setInterval(() => ChangeIcon("start"), 1000);

setTimeout(() => { clearInterval(timerId); ChangeIcon("stop"); }, 12000);


function ChangeIcon(value: string){
    
    if (value == "start") {
        showIcon.innerHTML = "4k"
    }
    else{
        showIcon.innerHTML = "local_florist"
    }
}


function changeSelectedItemTemp() {
    console.log(selectedValueTemp[selectedValueTemp.selectedIndex])
}
console.log(selectedValueTemp[selectedValueTemp.selectedIndex])


function changeSelectedItemHumi() {
    console.log(selectedValueHumi[selectedValueHumi.selectedIndex])
}
console.log(selectedValueHumi[selectedValueHumi.selectedIndex])

function GetTempterature() {
    axios.get < Idata > ("https://thegreenerpihouse.azurewebsites.net/GetLatestData")
        .then(function (response: AxiosResponse < Idata > ): void {
            console.log(response.data)
            let result = response.data.temperature + "°C"
            elementTemp.innerHTML = result
        })
        .catch(function (error: AxiosError): void {
            elementTemp.innerHTML = error.message
        })
}

function GetHumidity() {
    axios.get < Idata > ("https://thegreenerpihouse.azurewebsites.net/GetLatestData")
        .then(function (response: AxiosResponse < Idata > ): void {
            console.log(response.data)
            let result = response.data.humidity + "%"
            elementHumi.innerHTML = result
        })
        .catch(function (error: AxiosError): void {
            elementHumi.innerHTML = error.message
        })
}

// function GetAll (){
//     axios.get <Idata []> ("https://thegreenerpihouse.azurewebsites.net/GetAllData")
//     .then(function (response: AxiosResponse < Idata[] > ): void {
//         let result: string = "<ul>";
//         console.log(response.data)
//         response.data.forEach((c: Idata) => {
//             result += "<li>Temperature: " + c.temperature + " Humidity: " + c.humidity + "</li>"
//         })
//         result + "</ul>"
//         elementTemp.innerHTML = result
//     })
//     .catch(function (error: AxiosError): void {
//         elementTemp.innerHTML = error.message
//     })
// }

function GetLatest() {
    axios.get < Idata > ("https://thegreenerpihouse.azurewebsites.net/GetLatestData")
        .then(function (response: AxiosResponse < Idata > ): void {
            console.log(response.data)
            let result = "Temperatur: " + response.data.temperature + " Luftfugtighed: " + response.data.humidity
            elementTemp.innerHTML = result
        })
        .catch(function (error: AxiosError): void {
            elementTemp.innerHTML = error.message
        })
}

//skal bruges til pi??
let sunrise: Date
let sunset: Date
let conditions: string

function apiGetWeatherData() {
    axios.get < any > ("http://api.openweathermap.org/data/2.5/weather?q=Roskilde&units=Metric&appid=45ca4ad4019ca871293511a2e165a166")
        .then(function (response: AxiosResponse < any > ): void {
            // console.log(response.data)
            let tempRes = response.data.main.temp + "°C"
            let humiRes = response.data.main.humidity + "%"

            sunrise = new Date(response.data.sys.sunrise)
            sunset = new Date(response.data.sys.sunset)
            conditions = response.data.weather[0].main

            elementTempOut.innerHTML = tempRes;
            elementHumiOut.innerHTML = humiRes;

            // console.log(sunrise + " " + sunset + " " +  conditions)

        })
}

interface iForecastData {
    temp: number,
    humidity: number,
    conditions: string,
    day: string
}

var days = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];


function apiGetForecastData() {
    axios.get < any > ("http://api.openweathermap.org/data/2.5/forecast?q=Roskilde&units=Metric&appid=45ca4ad4019ca871293511a2e165a166")
        .then(function (response: AxiosResponse < any > ): void {

            let forecastData: iForecastData[] = []
            
            let i: number = 0
            while (i < 39) {
                let tmp: iForecastData = {} as iForecastData
                
                tmp.temp = response.data.list[i].main.temp
                tmp.humidity = response.data.list[i].main.humidity
                tmp.conditions = response.data.list[i].weather[0].main

                var d = new Date(response.data.list[i].dt_txt);
                tmp.day =  days[d.getDay()];

                forecastData.push(tmp)

                console.log(forecastData)
                
                
                i = i + 8
            }
            
            // console.log(forecastData)

            day1DayElement.innerHTML = forecastData[0].day
            day1TempElement.innerHTML = forecastData[0].temp + "°C"
            day1HumiElement.innerHTML = forecastData[0].humidity + "%"

            
            day2DayElement.innerHTML = forecastData[1].day
            day2TempElement.innerHTML = forecastData[1].temp + "°C"
            day2HumiElement.innerHTML = forecastData[1].humidity + "%"

            
            day3DayElement.innerHTML = forecastData[2].day
            day3TempElement.innerHTML = forecastData[2].temp + "°C"
            day3HumiElement.innerHTML = forecastData[2].humidity + "%"

            
            day4DayElement.innerHTML = forecastData[3].day
            day4TempElement.innerHTML = forecastData[3].temp + "°C"
            day4HumiElement.innerHTML = forecastData[3].humidity + "%"

            
            day5DayElement.innerHTML = forecastData[4].day
            day5TempElement.innerHTML = forecastData[4].temp + "°C"
            day5HumiElement.innerHTML = forecastData[4].humidity + "%"

        })
}