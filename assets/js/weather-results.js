// Variables
var apiKey =  "b285d18d11dcc358521846452d848e59";
var apiCall = `https://api.openweathermap.org/data/2.5/onecall`
var geoCall = `http://api.openweathermap.org/geo/1.0/direct`


// HTML Targeting Variables
var citySearched = document.getElementById('citySearched');
var today = document.getElementById('today')
var weateherIcon = document.getElementById('weatherIcon')
var temp = document.getElementById('temp')
var humid = document.getElementById('humid')
var wind = document.getElementById('windSpeed')
var uvIndex = document.getElementById('uvIndex')
var description = document.getElementById('description')
var search = document.getElementById('searchButton')


// Get City from URL
var cityParam = document.location.search 
var queryParam = cityParam.split('=').pop();
    // Check Results in Dev Tools
    console.log('cityParam', cityParam)
    console.log('queryParam', queryParam)
    // decodeURI opposite of encodeURI
    console.log('encodueURI', decodeURI(queryParam))

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
        console.log(data);
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

// API Call, Fetch
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
    console.log('timeZoneOffsetScore', timeZoneOffsetScore);

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
        console.log('dateScore', dateScore)
        // Display the Date, WITH Timezone Offset
        console.log('dateScore2', dateScore2)
        console.log('timeZoneOffset', timeZoneOffsetScore)

            // ISSUE
            // Tokyo - Displays the correct date with dateUTCScore + timeZoneOffsetScore
            // New York - Does NOT display the correct date with dateUTCScore + timeZoneOffsetScore
            

            
        // Humid
        var humidScore = data.current.humidity
            console.log("Humid", humidScore)
        // Temp
        var tempScore = data.current.temp
            console.log('tempScore', tempScore)
                // Convert Temp from K to F
                imperialScore = ((tempScore-273.15)*1.8)+32
                console.log('imperialScore:', imperialScore)
        // Weather Description
        var descripScore = data.current.weather[0].description;
            console.log('Weather Description', descripScore);
        // Wind Speed
        var windScore = data.current.wind_speed;
            console.log('windscore', windScore)
        // UV Index
        var uvScore = data.current.uvi;
            console.log('uvi', uvScore)

        displayResults(dateScore, imperialScore, humidScore, windScore, uvScore, descripScore)

    })
}


// Display API Results
function displayResults (dateScore, imperialScore, humidScore, windScore, uvScore, descripScore) {
    // Display Date
    today.textContent = dateScore;

    // Display Temp
    temp.textContent = Math.ceil(imperialScore) + ` °F`;

    // Display Humidity
    humid.textContent = humidScore;

    // Display Wind Score
    wind.textContent = windScore;

    // Display UV Score
    uvIndex.textContent = uvScore;

    // Display Description:
    description.textContent = descripScore;

}