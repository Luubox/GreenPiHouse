import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";
interface Idata {
    sensorName: string, 
    temperature: number,
    co2: number
}

let elementTemp: HTMLDivElement = <HTMLDivElement> (document.getElementById("temperature"))
let elementHumi: HTMLDivElement = <HTMLDivElement> (document.getElementById("humidity"))
let elementButton: HTMLButtonElement = <HTMLButtonElement> (document.getElementById("startbutton"))
let LatestButton: HTMLButtonElement = <HTMLButtonElement> (document.getElementById("Latestbutton"))
elementButton.addEventListener("click", GetAll)
LatestButton.addEventListener("click", GetLatest)

function GetAll (){
    console.log("Hej")
    axios.get <Idata []> ("https://thegreenerpihouse.azurewebsites.net/api/data")
    .then(function (response: AxiosResponse < Idata[] > ): void {
        let result: string = "<ul>";
        console.log(response.data)
        response.data.forEach((c: Idata) => {
            result += "<li>" + c.sensorName + " " + c.temperature + " " + c.co2 + "</li>"
        })
        result + "</ul>"
        elementTemp.innerHTML = result
    })
    .catch(function (error: AxiosError): void {
        elementTemp.innerHTML = error.message
    })
}

function GetLatest() {
    axios.get <Idata> ("https://thegreenerpihouse.azurewebsites.net/GetLatest")
    .then(function (response: AxiosResponse < Idata> ): void {
        let result: string = "<ul>";
        console.log(response.data)
        result += response.data.co2 + " " + response.data.sensorName + " " + response.data.temperature
        // response.data.((c: Idata) => {
        //     result += c.co2 + " " + c.sensorName + " " + c.temperature
        // })
        result + "</ul>"
        elementTemp.innerHTML = result
    })
    .catch(function (error: AxiosError): void {
        elementTemp.innerHTML = error.message
    })
}