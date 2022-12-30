//GIVEN a weather dashboard with form inputs
//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city
var long;
var lat;
var requestUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=248ba8680dc03595a2d2c1b9765a1bdb"
var searchBtn = document.getElementById("searchBtn")


function getWeather() {

}


var successCallback = (position) => {
    if (successCallback) {
        long = position.coords.longitude;
        lat = position.coords.latitude
    };
    console.log(requestUrl)
}
var errorCallback = (error) => {
    console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

searchBtn.addEventListener('click', searchWeather)

