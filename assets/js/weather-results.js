// Variables
var apiKey =  "b285d18d11dcc358521846452d848e59";
var apiCall = `https://api.openweathermap.org/data/2.5/onecall`
var geoCall = `https://api.openweathermap.org/geo/1.0/direct`
var part; 
var lon;
var lat;
var stateCode;
var countryCode;
var limit;


// HTML Targeting Variables
var citySearched = document.getElementById('citySearched');
var today = document.getElementById('today')
var weateherIcon = document.getElementById('weatherIcon')
var temp = document.getElementById('temp')
var humid = document.getElementById('humid')
var wind = document.getElementById('windSpeed')
var uvIndex = document.getElementById('uvIndex')
var description = document.getElementById('description')
// var search = document.getElementById('searchButton')
var searchKey = document.getElementById('searchInput')




// Get City from URL
var cityParam = document.location.search 
var queryParam = cityParam.split('=').pop();
    // Check Results in Dev Tools
    console.log('decodueURI', decodeURI(queryParam))

// Display Function on Load
getLatLon(decodeURI(queryParam))

// Function to get cityName's Lat and Lon
function getLatLon (cityName) {
    // GEO Call, Fetch
    fetch(geoCall + `?q=${encodeURI(cityName)}&appid=${apiKey}`) 
    .then (function (response) {
    return response.json();
    })
    .then (function (data) {
        // console.log(data);
        // Get and Set - Lat Lon
        lat =  data[0].lat
            console.log(lat)
        lon = data[0].lon
            console.log(lon)
        
        // Call Function with Lat and Lon
        getWeather(lat, lon)

        // Display City on Page
        citySearched.textContent = cityName.toUpperCase()
    })

}   

// Function get Weather by Latitude and Longitude
function getWeather (lats,lons) {
fetch(apiCall + `?lat=` + lats + `&lon=` + lons + `&appid=${apiKey}`) 
.then (function (response) {
    return response.json();
})
.then (function (data) {
    console.log(data);
    // Date
    var dateUTCScore = data.current.dt;
    var timeZoneOffsetScore = data.timezone_offset;
    // console.log('timeZoneOffsetScore', timeZoneOffsetScore);

    // From Chad
    // var hourOffset = timeZoneOffsetScore/3600;
    // Date.now() + hourOffset * 3600 * 1000

        // convert UNIX, UTC to a Date
        var dateUTCScoreMili = dateUTCScore * 1000
        var timeZoneScoreMili = timeZoneOffsetScore * 1000

        var dateScore2 = dateUTCScoreMili + timeZoneScoreMili

        var dateObject = new Date(dateUTCScoreMili)
        var dateObject2 = new Date(dateScore2)
        
        var dateScore = dateObject.toLocaleDateString();  


        var dateScore2 = dateObject2.toLocaleDateString("en-US", {timeZoneName: "short"})

        // Display the Date, no Timezone Offset
        // console.log('dateScore', dateScore)
        // Display the Date, WITH Timezone Offset
        // console.log('dateScore2', dateScore2)
        // console.log('timeZoneOffset', timeZoneOffsetScore)

            // ISSUE
            // Tokyo - Displays the correct date with dateUTCScore + timeZoneOffsetScore
            // New York - Does NOT display the correct date with dateUTCScore + timeZoneOffsetScore
            

            
        // Humid
        var humidScore = data.current.humidity
            // console.log("Humid", humidScore)
        // Temp
        var tempScore = data.current.temp
            // console.log('tempScore', tempScore)
                // Convert Temp from K to F
                imperialScore = ((tempScore-273.15)*1.8)+32
                // console.log('imperialScore:', imperialScore)
        // Weather Description
        var weatherScore = data.current.weather[0].icon;
        var iconScore = `http://openweathermap.org/img/wn/${weatherScore}@2x.png`
            // console.log('Weather Description', descripScore);
        // Wind Speed
        var windScore = Math.round(data.current.wind_speed * 10) / 10;
            // console.log('windscore', windScore)
        // UV Index
        var uvScore = Math.round(data.current.uvi * 10) / 10;
            // console.log('uvi', uvScore)

        displayResults(dateScore, imperialScore, humidScore, windScore, uvScore, iconScore)

        // Get 5 day forecast
        // Loop thru the data
        for (var i = 1; i < 6; i++) {
            // Date
            var fiveDateUTCScore = data.daily[i].dt;
                // console.log('5dateScore', fiveDateUTCScore);
                // convert UNIX, UTC to a Date
                var fiveDateUTCScoreMili = fiveDateUTCScore * 1000
                var dateScore3 = fiveDateUTCScoreMili + timeZoneScoreMili
                var dateObject3 = new Date(dateScore3)
                var fiveDateScore = dateObject3.toLocaleDateString();  
                    // console.log('5dateScore Converted', fiveDateScore)

            // Weather Icon
            var fiveWeatherScore = data.daily[i].weather[0].icon
            var fiveIconScore = `http://openweathermap.org/img/wn/${fiveWeatherScore}@2x.png`
                // console.log('5weatherScore', fiveWeatherScore);
            // Temp
            var fiveTempScore = data.daily[i].temp.day
                // console.log('fiveTempScore', fiveTempScore)
                // Convert Temp from K to F
                var fiveImperialScore = ((fiveTempScore-273.15)*1.8)+32
            // Humid
            var fiveHumidScore = Math.round(data.daily[i].humidity * 10) / 10;
                // console.log('5humidScore', fiveHumidScore);
            // Wind
            var fiveWindScore = Math.round(data.daily[i].wind_speed * 10) / 10;
                // console.log('5windScore', fiveWindScore);

            displayFiveResults(fiveDateScore, fiveIconScore, fiveImperialScore, fiveHumidScore, fiveWindScore)

        }

    })
}


// Display API Results
function displayResults (dateScore, imperialScore, humidScore, windScore, uvScore, iconScore) {
    // Display Date
    today.textContent = dateScore;

    // Weather Icon
    weateherIcon.src = iconScore;

    // Display Temp
    temp.textContent = Math.ceil(imperialScore) + ` °F`;

    // Display Humidity
    humid.textContent = humidScore;

    // Display Wind Score
    wind.textContent = windScore;

    // Display UV Score
    uvIndex.textContent = uvScore;
    var uvColor = 'greenText';
    if (uvScore > 2 && uvScore < 7 ) uvColor = 'orangeText';
    if (uvScore >= 7) uvColor = 'redText';
    uvIndex.setAttribute('class', uvColor)

    // Display Description:
    // description.textContent = descripScore;

}

// Display 5 Day Forecast
function displayFiveResults(fiveDateScore, fiveIconScore, fiveImperialScore, fiveHumidScore, fiveWindScore) {
    // Create Each Day's Weather Info
    $(".fiveDay").append(
        $(`
        <div class="eachDay">
            <p> <b>${fiveDateScore}</b></p>
            <img src="${fiveIconScore}" atl="Weather Icon">
            <p>TEMP: ${Math.ceil(fiveImperialScore)} °F</p>
            <p>HUM: ${fiveHumidScore}</p>
            <p>WS: ${fiveWindScore}</p>
        </div>
        `)

    );
}

// Function for searching city
function searchPlace(city) {
    console.log('searchPlace Function called')
    // Store Input Value to localStorage
    // Check if keyValue Pair is empty
    if (localStorage.getItem('cityName') === null) {
        localStorage.setItem('cityName', '[]')
    }

    // Get Previous Data on localStorage
    var old_data = JSON.parse(localStorage.getItem('cityName'))
    
    // Check for duplicate value
    if (old_data.indexOf(city) === -1) {
        old_data.push(city)

        // Save old and new data
        localStorage.setItem('cityName', JSON.stringify(old_data))
    }

    // Check for an input
    if (!city) {
        console.log("searchInputVal", city)
        return;
    }

    // Display Search Results on Main
    // getLatLon(searchInputVal)

    var queryString = './weather-results.html?q=' + city;

    // Go to next page
    location.assign(queryString)
}

// Listen for Click on Search
// searchButton.addEventListener('click', searchPlace)

// Listen for Enter Key to searchPlace
searchKey.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        console.log("Enter was pressed")
        event.preventDefault();
        var searchInputVal = document.getElementById('searchInput').value.trim();
        searchPlace(searchInputVal);
    }
})

function displayHistory() {
    // var old_data = JSON.parse(localStorage.getItem('cityName'))

    var history = JSON.parse(localStorage.getItem('cityName'))
    // console.log('history', history)

    // Display on Page
    // JQuery Dynamic HTML Creation
    if (history) {
        for (var i = 0; i < history.length; i++) {
            $(".history").append(
                $(/*html*/`
                    <button class="historybtn" data-id="${history[i]}">${history[i]} </button> <br>
                `)
            )
        }
    } else {
        console.log('No History')
    }
}

displayHistory()

// Listen for click on History Items
historyEl = document.getElementsByClassName("historybtn")
for (let h = 0; h < historyEl.length; h++) {
    historyEl[h].addEventListener('click', function (event) {
        event.preventDefault();
        clickedValue = event.target.getAttribute("data-id")
        console.log('i was clicked', clickedValue)
        searchPlace(clickedValue)
    })
}