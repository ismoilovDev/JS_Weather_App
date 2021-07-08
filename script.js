const api = {
    key: "8bbbd247df0043caf05d8dcf1269012f",
    baseUrl: "https://api.openweathermap.org/data/2.5/",
};
const searchBox  = document.querySelector(".search-box");
searchBox.addEventListener('keypress', setQuery);
function setQuery(e) {
    if(e.keyCode == 13) {
        getResult(searchBox.value);
        console.log(searchBox.value);
    }
}

function getResult(query) {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((weather) => {
            return weather.json();
        })
        .then(displayResults)
}
function displayResults(weather) {
    let city = document.querySelector(".city");
    city.innerHTML = `${weather.name}, ${weather.sys.country}`

    let now = new Date();
    let date = document.querySelector(".date");
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.floor(weather.main.temp)} <span>°C</span>`;

    let weatherEl = document.querySelector(".weather");
    weather.innerHTML = weather.weather[0].main;

    let HiLow = document.querySelector(".hi-low");
    HiLow.innerHTML = `${Math.round(weather.main.temp_min)} °c / ${Math.round(weather.main.temp_max)} °c /`
}
function dateBuilder(a) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    let day = days[a.getDay()];
    let date = a.getDate();
    let month = months[a.getMonth()];
    let year = a.getFullYear();
    return `${day} ${date} ${month} ${year}`
} 