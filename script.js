const apikey = "YOUR OWN KEY";

//the API
const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

//Calling the API via city
async function getWeatherByLocation(city){
    const resp = await fetch(url(city), {
        origin: "cors"});
    const respData = await resp.json()

    console.log(respData)
    addWeatherToPage(respData)
}

getWeatherByLocation("London")

//this function puts the result on the page
function addWeatherToPage(data){
    const temp = KtoC(data.main.temp)

    const weather = document.createElement("div")
    weather.classList.add("weather")

    //the HTML for the weather
    weather.innerHTML = `
    <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> </h2>
    <small>${data.weather[0].main}</small> 
    <p>${search.value}</p>`

    main.innerHTML = ""
    main.appendChild(weather)
}

//this calculates from Kelvin to celcius
function KtoC(K){
    return (K - 273.15).toFixed(2)
}

//this makes the search button work 
form.addEventListener("submit", (e) => {
    e.preventDefault()

    const city = search.value

    if(city){
        getWeatherByLocation(city)
    }
})