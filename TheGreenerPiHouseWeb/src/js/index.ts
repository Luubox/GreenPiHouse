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
elementButton.addEventListener("click", start)

function start (){
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