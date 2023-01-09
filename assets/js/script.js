//GIVEN a weather dashboard with form inputs
//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//💨🌞🌡☔❄⚡🌩🌨🌧🌦🌥🌤⛈⛅☁🌫🌛💦
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
// var cityBtn = document.querySelector('a.button')
// var iconEl = document.querySelector('#weather-icon')
var todayEl = document.getElementById('today')
var inputVal = document.getElementById('city-input').value
var currentCity = document.getElementById('current-city')
var todayDate = document.getElementById('today-date')
var todayIcon = document.getElementById('today-icon')
var todayTemp = document.getElementById('today-temp')
var todayHumidity = document.getElementById('today-humidity')
var todayWind = document.getElementById('today-wind')
var tomorrowDate = document.getElementById('tomorrow-date')
var tomorrowIcon = document.getElementById('tomorrow-icon')
var tomorrowTemp = document.getElementById('tomorrow-temp')
var tomorrowHumidity = document.getElementById('tomorrow-humidity')
var tomorrowWind = document.getElementById('tomorrow-wind')
var dayThreeDate = document.getElementById('day-3-date')
var dayThreeIcon = document.getElementById('day-3-icon')
var dayThreeTemp = document.getElementById('day-3-temp')
var dayThreeHumidity = document.getElementById('day-3-humidity')
var dayThreeWind = document.getElementById('day-3-wind')
var dayFourDate = document.getElementById('day-4-date')
var dayFourIcon = document.getElementById('day-4-icon')
var dayFourTemp = document.getElementById('day-4-temp')
var dayFourHumidity = document.getElementById('day-4-humidity')
var dayFourWind = document.getElementById('day-4-wind')
var dayFiveDate = document.getElementById('day-5-date')
var dayFiveIcon = document.getElementById('day-5-icon')
var dayFiveTemp = document.getElementById('day-5-temp')
var dayFiveHumidity = document.getElementById('day-5-humidity')
var dayFiveWind = document.getElementById('day-5-wind')


function changeCity() {
    var cityBtnVal = cityButtons.value
    console.log(cityBtnVal)
    var searchChangedCity = `http://api.openweathermap.org/geo/1.0/direct?q=${cityBtnVal}&appid=248ba8680dc03595a2d2c1b9765a1bdb`;

    fetch(searchChangedCity)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            long = data[0].lon
            lat = data[0].lat
            searchWeather();
        });
}


function getLatAndLong() {

    var inputVal = document.getElementById('city-input').value;
    var searchCity = `http://api.openweathermap.org/geo/1.0/direct?q=${inputVal}&appid=248ba8680dc03595a2d2c1b9765a1bdb`;

    fetch(searchCity)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            long = data[0].lon
            lat = data[0].lat
            createList(inputVal);
        });


    function createList(inputVal) {
        var currentCityText = document.getElementById('current-city')
        currentCityText.textContent = inputVal;



        if (cityList.includes(inputVal)) {
            searchWeather()
        }
        else {

            cityList.push(inputVal);
            localStorage.setItem('cityList', JSON.stringify(cityList))

            document.getElementById('city-input').value = "";
            var cityItems = document.createElement("button");
            cityItems.textContent = inputVal;
            cityItems.classList.add("city-btn");
            cityListEl.appendChild(cityItems)
            searchWeather()
        }
    }








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

                    var saveWeatherArr1 = [
                        name,
                        date = dayjs(data.list[i].dt_txt).format('dddd M-D-YYYY'),
                        wind = data.list[i].wind.speed + " MPH",
                        temp = Math.round(data.list[i].main.temp - 273.15) * 9 / 5 + 32 + " °F",
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
    icon = saveWeatherArr2[0][5]
    var iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
    // iconEl.setAttribute('src', iconUrl)
    todayDate.textContent =  saveWeatherArr2[0][1];
    todayIcon.setAttribute('src', iconUrl)
    todayTemp.textContent = "Temperature: " + saveWeatherArr2[0][3];
    todayWind.textContent = "Wind: " + saveWeatherArr2[0][2];
    todayHumidity.textContent = "Humidity: " + saveWeatherArr2[0][4];

    icon = saveWeatherArr2[1][5]
    iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
    tomorrowDate.textContent = saveWeatherArr2[1][1] ;
    tomorrowIcon.setAttribute('src', iconUrl)
    tomorrowTemp.textContent = "🌡" + saveWeatherArr2[1][3];
    tomorrowWind.textContent = "💦" + saveWeatherArr2[1][2];
    tomorrowHumidity.textContent = "💨" + saveWeatherArr2[1][4];

    icon = saveWeatherArr2[2][5]
    iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
    dayThreeDate.textContent = saveWeatherArr2[2][1];
    dayThreeIcon.setAttribute('src', iconUrl)
    dayThreeTemp.textContent = "🌡" + saveWeatherArr2[2][3];
    dayThreeWind.textContent = "💦" + saveWeatherArr2[2][2];
    dayThreeHumidity.textContent = "💨" + saveWeatherArr2[2][4];

    icon = saveWeatherArr2[3][5]
    iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
    dayFourDate.textContent = saveWeatherArr2[3][1];
    dayFourIcon.setAttribute('src', iconUrl)
    dayFourTemp.textContent = "🌡" + saveWeatherArr2[3][3];
    dayFourWind.textContent = "💦" + saveWeatherArr2[3][2];
    dayFourHumidity.textContent = "💨" + saveWeatherArr2[3][4];

    icon = saveWeatherArr2[4][5]
    iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
    dayFiveDate.textContent = saveWeatherArr2[4][1];
    dayFiveIcon.setAttribute('src', iconUrl)
    dayFiveTemp.textContent = "🌡" + saveWeatherArr2[4][3];
    dayFiveWind.textContent = "💦" + saveWeatherArr2[4][2];
    dayFiveHumidity.textContent = "💨" + saveWeatherArr2[4][4];



}

$(document).ready(function () {
    var getStoredCities = JSON.parse(localStorage.getItem("cityList"));
    if (getStoredCities != null) {
        for (var i = 0; i < getStoredCities.length; i++) {
            var cityItems = document.createElement("button");
            cityItems.textContent = getStoredCities[i];
            cityItems.classList.add("city-btn");
            cityListEl.appendChild(cityItems)
        }

    }

    // cityListEl.textContent = getStoredCities
    searchBtn.addEventListener('click', getLatAndLong)

    //if city list has cities in it, search
    //    cityBtn.addEventListener('click', changeCity)
    // var cityButtons = document.getElementsByClassName('city-btn').innerHTML
    //  for (var i = 0; i < cityButtons.length; i++) {
    //     cityButtons[i].addEventListener('click', changeCity(cityButtons))
    // console.log(cityButtons)
    //  }



    // cityButtons.addEventListener('click', changeCity)



})
