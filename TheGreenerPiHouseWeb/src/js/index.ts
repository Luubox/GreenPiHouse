import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface Idata {
    temperature: number, 
    humidity: number,
}

let elementTemp: HTMLDivElement = <HTMLDivElement> (document.getElementById("temperature"))
let elementHumi: HTMLDivElement = <HTMLDivElement> (document.getElementById("humidity"))
let elementWindow: HTMLBodyElement = <HTMLBodyElement> (document.getElementById("body"))
elementWindow.addEventListener("loadend", GetTempterature)
window.addEventListener("load", (event)=> {
    GetTempterature()
    GetHumidity()
})

//let elementButton: HTMLButtonElement = <HTMLButtonElement> (document.getElementById("startbutton"))
// let LatestButton: HTMLButtonElement = <HTMLButtonElement> (document.getElementById("Latestbutton"))
// elementButton.addEventListener("click", GetAll)
// LatestButton.addEventListener("click", GetLatest)



function GetTempterature(){
    axios.get <Idata> ("https://thegreenerpihouse.azurewebsites.net/GetLatestData")
    .then(function (response: AxiosResponse <Idata>): void {
        console.log(response.data)
        let result = "Temperature: " + response.data.temperature + "°C"
        elementTemp.innerHTML = result
    })
    .catch(function(error: AxiosError): void {
        elementTemp.innerHTML = error.message
    })
}

function GetHumidity(){
    axios.get <Idata> ("https://thegreenerpihouse.azurewebsites.net/GetLatestData")
    .then(function (response: AxiosResponse <Idata>): void{
        console.log(response.data)
        let result = "Humidity: " + response.data.humidity + "%"
        elementHumi.innerHTML = result
    })
    .catch(function(error: AxiosError): void {
        elementHumi.innerHTML  = error.message
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
    axios.get <Idata> ("https://thegreenerpihouse.azurewebsites.net/GetLatestData")
    .then(function (response: AxiosResponse < Idata> ): void {
        console.log(response.data)
        let result = "Temperatur: " + response.data.temperature + " Luftfugtighed: " + response.data.humidity
        elementTemp.innerHTML = result
    })
    .catch(function (error: AxiosError): void {
        elementTemp.innerHTML = error.message
    })
}

interface CurrentData {
    temperature: number,
    humidity: number,
    skyText: string,
    windText: string
}

let elementTempAPI: HTMLDivElement = <HTMLDivElement> (document.getElementById("temperatureAPI"))
let elementHumiAPI: HTMLDivElement = <HTMLDivElement> (document.getElementById("humidityAPI"))
let elementSkyText: HTMLDivElement = <HTMLDivElement> (document.getElementById("skyTextAPI"))
let elementWindText: HTMLDivElement = <HTMLDivElement> (document.getElementById("windTextAPI"))
let elementBody: HTMLBodyElement = <HTMLBodyElement> (document.getElementById("body"))
elementWindow.addEventListener ("loadedAPI", GetTemperatureAPI)
window.addEventListener("loadAPI", (event)=> {
    GetTemperatureAPI()
    GetHumidityAPI()
    GetSkyTextAPI()
    GetWindTextAPI()
})

function GetTemperatureAPI() {
    axios.get <CurrentData> ("https://vejr.eu/api.php?location=Roskilde&degree=C")
    .then(function (response: AxiosResponse <CurrentData> ): void {
        console.log(response.data)
        let result ="Outside temperature:" + response.data.temperature + "°C"
        elementTemp.innerHTML = result
    })
    .catch(function(error: AxiosError): void {
        elementTempAPI.innerHTML = error.message
    }) 
}

function GetHumidityAPI() {
    axios.get <CurrentData> ("https://vejr.eu/api.php?location=Roskilde&degree=C")
    .then(function(response: AxiosResponse <CurrentData> ): void {
        console.log(response.data)
        let result ="Outside humidity:" + response.data.humidity + "%"
    })
    .catch(function(error: AxiosError): void {
        elementHumiAPI.innerHTML = error.message
    }) 
}

function GetSkyTextAPI() {
    axios.get <CurrentData> ("https://vejr.eu/api.php?location=Roskilde&degree=C")
    .then(function(response: AxiosResponse <CurrentData> ): void {
        console.log(response.data)
        let result ="Current weather:" + response.data.skyText
    })
    .catch(function(error: AxiosError): void {
        elementSkyText.innerHTML = error.message
    }) 
}

function GetWindTextAPI() {
    axios.get <CurrentData> ("")
    .then(function(response: AxiosResponse <CurrentData> ): void {
        console.log(response.data)
        let result ="Wind speed:" + response.data.windText + "m/s"
    })
    .catch(function(error: AxiosError): void {
        elementWindText.innerHTML = error.message
    })
}

function GetLatestAPI() {
    axios.get <CurrentData> ("https://vejr.eu/api.php?location=Roskilde&degree=C")
    .then(function (response: AxiosResponse <CurrentData> ): void {
        console.log(response.data)
        let result = "Temperatur: " + response.data.temperature + " Luftfugtighed: " + response.data.humidity + " Vejrforhold:" + response.data.skyText + " Vindhastighed:" + response.data.windText
        elementTemp.innerHTML = result
    })
    .catch(function (error: AxiosError): void {
        elementTemp.innerHTML = error.message
    })
}