// Variables
var apiKey =  "b285d18d11dcc358521846452d848e59";
// Lat and Lon of Orange County, CA
var lat = 33.7175;
var lon = -117.8311;
var part; 
var apiCall = `https://api.openweathermap.org/data/2.5/onecall`



// Objects to target 
// current.uvi - UX Index
// current.humidity
// current.temp
// current.weather[0].description
// current.wind_speed


// Open Weather API Call Info
// API Call 
// - http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}

// Example of API Call
// - api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}

// One Call How to make an API call
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


// API Call, Fetch
fetch(apiCall + `?lat=${lat}&lon=${lon}&appid=${apiKey}`) 
    .then (function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
    })


