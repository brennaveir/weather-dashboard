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

var cityList = document.getElementById("cities")

var searchBtn = document.getElementById("search-btn")

function getLatAndLong() {
    var inputVal = document.getElementById('cityInput').value
    var searchCity = `http://api.openweathermap.org/geo/1.0/direct?q=${inputVal}&appid=248ba8680dc03595a2d2c1b9765a1bdb`
   
    var cityItems = document.createElement("li");
          cityItems.textContent = inputVal;
          cityList.appendChild(cityItems)
   
   
   
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

function searchWeather () {
    var longAndLatURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=248ba8680dc03595a2d2c1b9765a1bdb`

    fetch(longAndLatURL) 

    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
}
searchBtn.addEventListener('click', getLatAndLong)






