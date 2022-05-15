// Variables
var apiKey = 'b285d18d11dcc358521846452d848e59';
var apiCall = `https://api.openweathermap.org/data/2.5/onecall`;
var geoCall = `https://api.openweathermap.org/geo/1.0/direct`;

// HTML Targeting Variables
var searchKey = document.getElementById('searchInput');

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
