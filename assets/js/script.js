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
var inputVal = document.getElementById('city-input').value
var currentCity = document.getElementById('current-city')

var today = {
    date: document.getElementById('today-date'),
    icon: document.getElementById('today-icon'),
    temp: document.getElementById('today-temp'),
    humidity: document.getElementById('today-humidity'),
    wind: document.getElementById('today-wind')
}
var tomorrow = {
    date: document.getElementById('tomorrow-date'),
    icon: document.getElementById('tomorrow-icon'),
    temp: document.getElementById('tomorrow-temp'),
    humidity: document.getElementById('tomorrow-humidity'),
    wind: document.getElementById('tomorrow-wind')
}
var dayThree = {
    date: document.getElementById('day-3-date'),
    icon: document.getElementById('day-3-icon'),
    temp: document.getElementById('day-3-temp'),
    humidity: document.getElementById('day-3-humidity'),
    wind: document.getElementById('day-3-wind')
}
var dayFour = {
    date: document.getElementById('day-4-date'),
    icon: document.getElementById('day-4-icon'),
    temp: document.getElementById('day-4-temp'),
    humidity: document.getElementById('day-4-humidity'),
    wind: document.getElementById('day-4-wind')
}
var dayFive = {
    date: document.getElementById('day-5-date'),
    icon: document.getElementById('day-5-icon'),
    temp: document.getElementById('day-5-temp'),
    humidity: document.getElementById('day-5-humidity'),
    wind: document.getElementById('day-5-wind')
}
var daySix = {
    date: document.getElementById('day-6-date'),
    icon: document.getElementById('day-6-icon'),
    temp: document.getElementById('day-6-temp'),
    humidity: document.getElementById('day-6-humidity'),
    wind: document.getElementById('day-6-wind')
}


// function changeCity(buttonValue) {
// var inputVal = buttonValue

// getLatAndLong(inputVal)
// }
//     var searchCity = `https://api.openweathermap.org/data/2.5/weather?q=${buttonValue}&appid=248ba8680dc03595a2d2c1b9765a1bdb&units=imperial`;
//     currentCity.textContent = buttonValue;
//     fetch(searchCity)

//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data)
//             long = data.coord.lon
//             lat = data.coord.lat
//             // console.log(long, lat)
//             todayWeather();
//         });

// }


function createList() {
    
    var inputVal = document.getElementById('city-input').value;
    currentCityText.textContent = inputVal;

    if (cityList.includes(inputVal)) {
        document.getElementById('city-input').value = "";
        getLatAndLong(inputVal)
    }
    else {
        cityList.push(inputVal);
        localStorage.setItem('cityList', JSON.stringify(cityList))

        document.getElementById('city-input').value = "";
        var cityItems = document.createElement("button");
        cityItems.textContent = inputVal;
        cityItems.classList.add("city-btn");
        cityListEl.appendChild(cityItems)
        getLatAndLong(inputVal)
    }
}

function getLatAndLong(inputVal) {
  var weatherContainerEl = document.getElementById('weather-container').style.visibility = "visible" 
    var searchCity = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=248ba8680dc03595a2d2c1b9765a1bdb&units=imperial`;

    fetch(searchCity)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data)
            long = data.coord.lon
            lat = data.coord.lat
            todayWeather(data)
        });

    function todayWeather(data) {
        today.date.textContent = dayjs(data.coord.dt).format('dddd M-D-YYYY');
        todayIcon = data.weather[0].icon;
        today.icon.setAttribute('src', `http://openweathermap.org/img/wn/${todayIcon}@2x.png`);
        today.temp.textContent = "🌡" + data.main.temp;
        today.wind.textContent = "💨" + data.wind.speed;
        today.humidity.textContent = "💦" + data.main.humidity
        searchWeather()

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
            var name = data.city.name;
            currentCity.textContent = name;
            for (var i = 1; i < data.list.length; i++) {
                if (i === 1 || i === 9 || i === 17 || i === 25 || i === 33) {

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
            fiveDay(saveWeatherArr2)
        })

}


function fiveDay(saveWeatherArr2) {
    var days = [

        { date: tomorrow.date, icon: tomorrow.icon, temp: tomorrow.temp, wind: tomorrow.wind, humidity: tomorrow.humidity },
        { date: dayThree.date, icon: dayThree.icon, temp: dayThree.temp, wind: dayThree.wind, humidity: dayThree.humidity },
        { date: dayFour.date, icon: dayFour.icon, temp: dayFour.temp, wind: dayFour.wind, humidity: dayFour.humidity },
        { date: dayFive.date, icon: dayFive.icon, temp: dayFive.temp, wind: dayFive.wind, humidity: dayFive.humidity },
        { date: daySix.date, icon: daySix.icon, temp: daySix.temp, wind: daySix.wind, humidity: daySix.humidity }
    ]

    for (let i = 0; i < saveWeatherArr2.length; i++) {
        displayFiveDay(days[i], saveWeatherArr2[i]);
    }
}

function displayFiveDay(day, data) {
    console.log(day, data)
    day.date.textContent = data[1];
    day.icon.setAttribute('src', `http://openweathermap.org/img/wn/${data[5]}@2x.png`);
    day.temp.textContent = "🌡" + data[3];
    day.wind.textContent = "💦" + data[4];
    day.humidity.textContent = "💨" + data[2];
    
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
            var inputVal = getStoredCities[getStoredCities.length-1]
            getLatAndLong(inputVal)
        }
        document.querySelector('#city-list').addEventListener('click', function (event) {
            if (event.target.matches('.city-btn')) {
                var inputVal = event.target.textContent;
                getLatAndLong(inputVal);
            }
        });
    }
    searchBtn.addEventListener('click', createList)
})
