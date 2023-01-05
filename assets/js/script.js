//GIVEN a weather dashboard with form inputs
//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//💨🌞🌡☔❄⚡🌩🌨🌧🌦🌥🌤⛈⛅☁🌫🌛
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city
var long;
var lat;
var wind;
var temp;
var humidity;
var date;
var icon;
var cityList = []
var cityListEl = document.getElementById("cities")
var searchBtn = document.getElementById("search-btn")
var iconEl = document.querySelector('#weather-icon')





function getLatAndLong() {
    var inputVal = document.getElementById('cityInput').value
    var searchCity = `http://api.openweathermap.org/geo/1.0/direct?q=${inputVal}&appid=248ba8680dc03595a2d2c1b9765a1bdb`

    cityList.push(inputVal)
    localStorage.setItem('inputVal', JSON.stringify(cityList))

    var cityItems = document.createElement("li");
    cityItems.textContent = inputVal;
    cityListEl.appendChild(cityItems)



    fetch(searchCity)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            long = data[0].lon
            lat = data[0].lat
            searchWeather();
        });


}

function searchWeather() {
    var longAndLatURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=248ba8680dc03595a2d2c1b9765a1bdb`
    var saveWeatherArr = []
    fetch(longAndLatURL)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            for (var i = 0; i < data.list.length; i++) {
                if (i % 8 == 0) {

                    var saveWeatherObj = {
                        date: data.list[i].dt_txt,
                        wind: data.list[i].wind.speed,
                        temp: data.list[i].main.temp,
                        humidity: data.list[i].main.humidity,
                        icon: data.list[i].weather[0].icon
                    }

                    saveWeatherArr.push(saveWeatherObj)
                }
            }
            console.log(saveWeatherArr)
            formatWeather()
        })

}



function formatWeather() {



    temp = Math.round(temp - 273.15) * 9 / 5 + 32 + " degrees F";
    date = dayjs(date).format('dddd M-D-YYYY');
    humidity = humidity + "%";
    wind = wind + " MPH";




}

function displayWeather() {
    var iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
    iconEl.setAttribute('src', iconUrl)
}

$(document).ready(function () {
    var getStoredCities = JSON.parse(localStorage.getItem("cityList"))
    cityListEl.textContent = getStoredCities
    searchBtn.addEventListener('click', getLatAndLong)
})







