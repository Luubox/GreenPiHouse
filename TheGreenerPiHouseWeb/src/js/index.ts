import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface Idata {
    temperature: number,
    humidity: number,
}

let elementTemp: HTMLDivElement = < HTMLDivElement > (document.getElementById("temperature"))
let elementHumi: HTMLDivElement = < HTMLDivElement > (document.getElementById("humidity"))

let elementTempOut: HTMLDivElement = < HTMLDivElement > (document.getElementById("tmpout"))
let elementHumiOut: HTMLDivElement = < HTMLDivElement > (document.getElementById("humout"))
let updateWeatherBtn: HTMLButtonElement = < HTMLButtonElement > (document.getElementById("updateWeather"))
let updateForecastBtn: HTMLButtonElement = < HTMLButtonElement > (document.getElementById("updateForecast"))

let elementWindow: HTMLBodyElement = < HTMLBodyElement > (document.getElementById("body"))
elementWindow.addEventListener("loadend", GetTempterature)
window.addEventListener("load", (event) => {
    GetTempterature()
    GetHumidity()
})

let temperatureSelector: HTMLOptionElement = < HTMLOptionElement > (document.getElementById("temperatureOption"))


updateWeatherBtn.addEventListener("click", apiGetWeatherData)
updateForecastBtn.addEventListener("click", apiGetForecastData)

//let elementButton: HTMLButtonElement = <HTMLButtonElement> (document.getElementById("startbutton"))
// let LatestButton: HTMLButtonElement = <HTMLButtonElement> (document.getElementById("Latestbutton"))
// elementButton.addEventListener("click", GetAll)
// LatestButton.addEventListener("click", GetLatest)

let clickValueTemp: HTMLButtonElement = < HTMLButtonElement > (document.getElementById("chooseTempButton"))
let clickValueHumi: HTMLButtonElement = < HTMLButtonElement > (document.getElementById("chooseHumiButton"))

function temperatureValues() {
    for (let i = 0; i < 40; i++) {
        console.log(i + "°C")
    }
}

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
    conditions: string
}

function apiGetForecastData() {
    axios.get < any > ("http://api.openweathermap.org/data/2.5/forecast?q=Roskilde&units=Metric&appid=45ca4ad4019ca871293511a2e165a166")
        .then(function (response: AxiosResponse < any > ): void {

            let forecastData: iForecastData[]
            let tmp: iForecastData

            console.debug(forecastData)
            // for (let i = 0; i < 39; i + 8) {
            
            //     // tmp.temp = response.data[i].main.temp
            //     // tmp.humidity = response.data[i].main.humidity
            //     // tmp.conditions = response.data[i].main.conditions

            //     // forecastData.push(tmp)

            // }
        })
}