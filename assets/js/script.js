// Variables
var apiKey =  "b285d18d11dcc358521846452d848e59";
// Lat and Lon of Orange County, CA
var lat;
// = 33.7175;
var lon; 
// = -117.8311;
var part; 
var apiCall = `https://api.openweathermap.org/data/2.5/onecall`
// `?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}`


// Geo Variables
var cityName = "Baldwin Park"
var stateCode;
var countryCode;
var limit;
var geoCall = `http://api.openweathermap.org/geo/1.0/direct`
// ?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}



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


// Geocoding API Call
//  - http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}


// Function to get cityName's Lat and Lon
function getLatLon () {
    
    // GEO Call, Fetch
    fetch(geoCall + `?q=${cityName}&appid=${apiKey}`) 
    .then (function (response) {
    return response.json();
    })
    .then (function (data) {
        console.log(data);
        // Get and Set - Lat Lon
        lat =  data[0].lat
        lon = data[0].lon
        console.log(lat)
        console.log(lon)
        getWeather(lat, lon)
    })

}   

// API Call, Fetch
function getWeather (lats,lons) {
fetch(apiCall + `?lat=` + lats + `&lon=` + lons + `&appid=${apiKey}`) 
// + `?lat=` + lats + `&lon=` + lons + `&appid=${apiKey}`
// `?lat=${lat}&lon=${lon}&appid=${apiKey}`
    .then (function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
    })
}

// call function
getLatLon();


// Food for thought
/* 

Use Geo to get the LAT and LON?

*/


