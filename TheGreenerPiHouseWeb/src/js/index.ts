import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface Idata {
    temperature: number, 
    humidity: number,
}

let temperatureArray: number[] = 
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 
22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];




let elementTemp: HTMLDivElement = <HTMLDivElement> (document.getElementById("temperature"))
let elementHumi: HTMLDivElement = <HTMLDivElement> (document.getElementById("humidity"))

let elementTempOut: HTMLDivElement = <HTMLDivElement> (document.getElementById("tmpout"))
let elementHumiOut: HTMLDivElement = <HTMLDivElement> (document.getElementById("humout"))
let testbtn : HTMLButtonElement = <HTMLButtonElement> (document.getElementById("testButton"))

let elementWindow: HTMLBodyElement = <HTMLBodyElement> (document.getElementById("body"))
elementWindow.addEventListener("loadend", GetTempterature)
window.addEventListener("load", (event)=> {
    GetTempterature()
    GetHumidity()
})

let temperatureSelector: HTMLOptionElement = <HTMLOptionElement> (document.getElementById("temperatureOption"))


testbtn.addEventListener("click", apiCall)

//let elementButton: HTMLButtonElement = <HTMLButtonElement> (document.getElementById("startbutton"))
// let LatestButton: HTMLButtonElement = <HTMLButtonElement> (document.getElementById("Latestbutton"))
// elementButton.addEventListener("click", GetAll)
// LatestButton.addEventListener("click", GetLatest)

let clickValueTemp: HTMLButtonElement = <HTMLButtonElement> (document.getElementById("chooseTempButton"))
let clickValueHumi: HTMLButtonElement = <HTMLButtonElement> (document.getElementById("chooseHumiButton"))

function temperatureValues() {
for (let i = 0; i < 40; i++){
    console.log(i + "°C")
}
}



function GetTempterature(){
    axios.get <Idata> ("https://thegreenerpihouse.azurewebsites.net/GetLatestData")
    .then(function (response: AxiosResponse <Idata>): void {
        console.log(response.data)
        let result = response.data.temperature + "°C"
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
        let result = response.data.humidity + "%"
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



function apiCall(){
    // let loc = "Roskilde"
    // let unit = "C"
    // axios.get <Idata> ("https://vejr.eu/api.php?location=" + loc + "&degree=" + unit)
    // .then(function (response: AxiosResponse <CurrentData>): void{
    //     console.log(response.data)
    // })
    
    axios.get<any> ("http://api.openweathermap.org/data/2.5/weather?q=Roskilde&units=metric&appid=45ca4ad4019ca871293511a2e165a166")
    .then(function (response: AxiosResponse <any> ): void{
        console.log(response.data)
        let tempRes = response.data.main.temp + "°C"
        let humiRes = response.data.main.humidity + "%"
        
        elementTempOut.innerHTML = tempRes;
        elementHumiOut.innerHTML = humiRes;
    })
}