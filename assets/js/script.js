// Variables
var apiKey = 'b285d18d11dcc358521846452d848e59';
var lat;
var lon;
var part;
var apiCall = `https://api.openweathermap.org/data/2.5/onecall`;
var stateCode;
var countryCode;
var limit;
var geoCall = `https://api.openweathermap.org/geo/1.0/direct`;

// HTML Targeting Variables
var citySearched = document.getElementById('citySearched');
var today = document.getElementById('today');
var weateherIcon = document.getElementById('weatherIcon');
var temp = document.getElementById('temp');
var humid = document.getElementById('humid');
var wind = document.getElementById('windSpeed');
var uvIndex = document.getElementById('uvIndex');
var description = document.getElementById('description');
// var search = document.getElementById('searchButton')
var searchKey = document.getElementById('searchInput');

// Objects to target
// current.dt
// current.humidity
// current.temp
// current.weather[0].description
// current.wind_speed
// current.uvi - UX Index
//  - 0 to 2, Favorable     Green
//  - 3 to 7, Moderate      Yellow
//  - 8 - 11+, Severe       Red

// Function to get cityName's Lat and Lon
function getLatLon(cityName) {
	// GEO Call, Fetch
	fetch(geoCall + `?q=${encodeURI(cityName)}&appid=${apiKey}`)
		.then(function (response) {
			if (response.ok) {
				response.json().then(function (data) {
					// console.log(data)
					// Get and Set - Lat Lon
					lat = data[0].lat;
					lon = data[0].lon;

					// Call Function with Lat and Lon
					getWeather(lat, lon);

					// Display City on Page
					citySearched.textContent = cityName.toUpperCase();
				});
			} else {
				location.assign('./notFound.html');
			}
		})
		.catch(function (error) {
			alert('Something Wrong: ' + response.statusText);
			location.assign('./notFound.html');
		});
}

// API Call, Fetch
function getWeather(lats, lons) {
	fetch(apiCall + `?lat=` + lats + `&lon=` + lons + `&appid=${apiKey}`)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// Date
			var dateUTCScore = data.current.dt;
			var timeZoneOffsetScore = data.timezone_offset;

			// From Chad
			// var hourOffset = timeZoneOffsetScore/3600;
			// Date.now() + hourOffset * 3600 * 1000

			// convert UNIX, UTC to a Date
			var dateUTCScoreMili = dateUTCScore * 1000;
			var timeZoneScoreMili = timeZoneOffsetScore * 1000;
			var dateScore2 = dateUTCScoreMili + timeZoneScoreMili;
			var dateObject = new Date(dateUTCScoreMili);
			var dateObject2 = new Date(dateScore2);
			var dateScore = dateObject.toLocaleDateString();
			var dateScore2 = dateObject2.toLocaleDateString('en-US', {
				timeZoneName: 'short',
			});

			// Humid
			var humidScore = data.current.humidity;
			// Temp
			var tempScore = data.current.temp;
			// Convert Temp from K to F
			imperialScore = (tempScore - 273.15) * 1.8 + 32;
			// Weather Icon
			var weatherScore = data.current.weather[0].icon;
			var iconScore = `http://openweathermap.org/img/wn/${weatherScore}@2x.png`;
			// Wind Speed
			var windScore = Math.round(data.current.wind_speed * 10) / 10;
			// UV Index
			var uvScore = Math.round(data.current.uvi * 10) / 10;

			// Call Function
			displayResults(
				dateScore,
				imperialScore,
				humidScore,
				windScore,
				uvScore,
				iconScore
			);
		});
}

// Call function
getLatLon('tokyo');

// Display API Results
function displayResults(
	dateScore,
	imperialScore,
	humidScore,
	windScore,
	uvScore,
	iconScore
) {
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
	var uvColor = 'greenText';
	if (uvScore > 2 && uvScore < 7) uvColor = 'orangeText';
	if (uvScore >= 7) uvColor = 'redText';
	uvIndex.setAttribute('class', uvColor);

	// Weather Icon
	weateherIcon.src = iconScore;
}

// Get Input Value
// var searchInputVal = document.getElementById('searchInput').value.trim();

// Function for searching city
function searchPlace(city) {
	// Check for an input
	if (!city) {
		return;
	}

	// Store Input Value to localStorage
	// Check if keyValue Pair is empty
	if (localStorage.getItem('cityName') === null) {
		localStorage.setItem('cityName', '[]');
	}

	// Get Previous Data on localStorage
	var old_data = JSON.parse(localStorage.getItem('cityName'));

	// Check for duplicate value
	if (old_data.indexOf(city) === -1) {
		old_data.push(city);

		// Save old and new data
		localStorage.setItem('cityName', JSON.stringify(old_data));
	}

	// Display Search Results on Main
	// getLatLon(searchInputVal)

	var queryString = './weather-results.html?q=' + city;

	// Go to next page
	location.assign(queryString);
}

// Listen for Click on Search
// searchButton.addEventListener('click', searchPlace)

// Listen for Enter Key to searchPlace
searchKey.addEventListener('keypress', function (event) {
	if (event.key === 'Enter') {
		event.preventDefault();
		var searchInputVal = document
			.getElementById('searchInput')
			.value.trim();
		searchPlace(searchInputVal);
	}
});

function displayHistory() {
	// var old_data = JSON.parse(localStorage.getItem('cityName'))

	var history = JSON.parse(localStorage.getItem('cityName'));
	// console.log('history', history)

	// Display on Page
	// JQuery Dynamic HTML Creation
	if (history) {
		for (var i = 0; i < history.length; i++) {
			$('.history').append(
				$(/*html*/ `
                    <button class="historybtn" data-id="${history[i]}">${history[i]} </button> <br>
                `)
			);
		}
	} else {
		console.log('No History');
	}
}

displayHistory();

// Listen for click on History Items
historyEl = document.getElementsByClassName('historybtn');
for (let h = 0; h < historyEl.length; h++) {
	historyEl[h].addEventListener('click', function (event) {
		event.preventDefault();
		clickedValue = event.target.getAttribute('data-id');
		searchPlace(clickedValue);
	});
}
