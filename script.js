let map;
let markers = [];
let placesService;
let geocoder;

// Initialize the map and services
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
        zoom: 12
    });

    placesService = new google.maps.places.PlacesService(map);
    geocoder = new google.maps.Geocoder();
}

// Fisher-Yates shuffle algorithm for randomizing results
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Search for businesses in the specified county
async function searchBusinesses() {
    const businessType = document.getElementById('searchInput').value;
    const countyName = document.getElementById('countyInput').value;

    if (!businessType || !countyName) {
        alert('Please enter both business type and county name');
        return;
    }

    try {
        // First, get the county bounds
        const countyBounds = await getCountyBounds(countyName);
        if (!countyBounds) {
            alert('County not found');
            return;
        }

        // Clear previous results
        clearResults();

        // Search for businesses within the county
        const request = {
            query: businessType,
            bounds: countyBounds,
            type: ['business']
        };

        placesService.textSearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                // Randomize the results
                const randomizedResults = shuffleArray([...results]);
                
                // Display results
                displayResults(randomizedResults);
            } else {
                alert('Error searching for businesses: ' + status);
            }
        });
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while searching');
    }
}

// Get the bounds of a county
function getCountyBounds(countyName) {
    return new Promise((resolve, reject) => {
        geocoder.geocode({
            address: countyName + ' County',
            componentRestrictions: {
                country: 'US'
            }
        }, (results, status) => {
            if (status === 'OK' && results[0]) {
                resolve(results[0].geometry.bounds);
            } else {
                reject(new Error('County not found'));
            }
        });
    });
}

// Display results on the map and in the list
function displayResults(results) {
    const businessList = document.getElementById('business-list');
    businessList.innerHTML = '';

    results.forEach((place, index) => {
        // Create marker
        const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name,
            animation: google.maps.Animation.DROP
        });
        markers.push(marker);

        // Create list item
        const businessItem = document.createElement('div');
        businessItem.className = 'business-item';
        businessItem.innerHTML = `
            <h3>${place.name}</h3>
            <p>${place.formatted_address}</p>
            <p>Rating: ${place.rating ? place.rating + '/5' : 'N/A'}</p>
        `;

        // Add click event to center map on business
        businessItem.addEventListener('click', () => {
            map.setCenter(place.geometry.location);
            map.setZoom(15);
        });

        businessList.appendChild(businessItem);
    });

    // Fit map to show all markers
    if (markers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(marker => bounds.extend(marker.getPosition()));
        map.fitBounds(bounds);
    }
}

// Clear previous results
function clearResults() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    document.getElementById('business-list').innerHTML = '';
}

// Initialize the map when the page loads
window.onload = initMap; 