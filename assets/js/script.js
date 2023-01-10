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
var currentCityText = document.getElementById('current-city')
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

function changeCity(buttonValue) {
    var searchCity = `http://api.openweathermap.org/geo/1.0/direct?q=${buttonValue}&appid=248ba8680dc03595a2d2c1b9765a1bdb`;
    currentCity.textContent = buttonValue;
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

        currentCityText.textContent = inputVal;

        if (cityList.includes(inputVal)) {
            document.getElementById('city-input').value = "";
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
    var days = [
        { date: todayDate, icon: todayIcon, temp: todayTemp, wind: todayWind, humidity: todayHumidity },
        { date: tomorrowDate, icon: tomorrowIcon, temp: tomorrowTemp, wind: tomorrowWind, humidity: tomorrowHumidity },
        { date: dayThreeDate, icon: dayThreeIcon, temp: dayThreeTemp, wind: dayThreeWind, humidity: dayThreeHumidity },
        { date: dayFourDate, icon: dayFourIcon, temp: dayFourTemp, wind: dayFourWind, humidity: dayFourHumidity },
        { date: dayFiveDate, icon: dayFiveIcon, temp: dayFiveTemp, wind: dayFiveWind, humidity: dayFiveHumidity }
    ]


    function updateWeather(day, data) {
        day.date.textContent = data[1];
        day.icon.setAttribute('src', `http://openweathermap.org/img/wn/${data[5]}@2x.png`);
        day.temp.textContent = "🌡" + data[3];
        day.wind.textContent = "💦" + data[4];
        day.humidity.textContent = "💨" + data[2];
    }

    for (let i = 0; i < saveWeatherArr2.length; i++) {
        updateWeather(days[i], saveWeatherArr2[i]);
    }
}

$(document).ready(function () {
    var getStoredCities = JSON.parse(localStorage.getItem("cityList"));
    if (getStoredCities) {
        cityList = getStoredCities;
        for (var i = 0; i < getStoredCities.length; i++) {
            var cityItems = document.createElement("button");
            cityItems.textContent = getStoredCities[i];
            cityItems.classList.add("city-btn");
            cityListEl.appendChild(cityItems)
        }
        document.querySelector('#city-list').addEventListener('click', function (event) {
            if (event.target.matches('.city-btn')) {
                var buttonValue = event.target.textContent;
                changeCity(buttonValue);
            }
        });

    }




    searchBtn.addEventListener('click', getLatAndLong)
})
