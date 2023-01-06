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
var cityListEl = document.getElementById("city-list")
var searchBtn = document.getElementById("search-btn")
var iconEl = document.querySelector('#weather-icon')
var todayEl = document.getElementById('today')
 




function getLatAndLong() {
    
    var inputVal = document.getElementById('cityInput').value;
    var searchCity = `http://api.openweathermap.org/geo/1.0/direct?q=${inputVal}&appid=248ba8680dc03595a2d2c1b9765a1bdb`;
    cityList.push(inputVal);
    localStorage.setItem('inputVal', JSON.stringify(cityList));

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
   var saveWeatherArr2 = []
   
    fetch(longAndLatURL)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var name = data.city.name
            for (var i = 0; i < data.list.length; i++) {
                if (i % 8 == 0) {

                    saveWeatherArr1 = [
                        name,
                        date = dayjs(data.list[i].dt_txt).format('dddd M-D-YYYY'),
                        wind = data.list[i].wind.speed + " MPH",
                        temp = Math.round(data.list[i].main.temp- 273.15) * 9 / 5 + 32 + " degrees F",
                        humidity = data.list[i].main.humidity + "%",
                        icon = data.list[i].weather[0].icon
                    ]

                    saveWeatherArr2.push(saveWeatherArr1)
                    
                }
            }
            
        
              displayWeather(saveWeatherArr2)
        })

}

function displayWeather(saveWeatherArr2) {
    console.log(saveWeatherArr2)
    var iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
    iconEl.setAttribute('src', iconUrl)
        var today = document.createElement('h3')
            today.textContent = saveWeatherArr2[0][0];
            todayEl.appendChild(today)
}

$(document).ready(function () {
    var getStoredCities = JSON.parse(localStorage.getItem("cityList"))
    cityListEl.textContent = getStoredCities
    searchBtn.addEventListener('click', getLatAndLong)
})

