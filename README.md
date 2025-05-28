# Randomized Google Maps Business Search

This is a proof of concept for a randomized Google Maps business search functionality that ensures equal exposure for businesses within the same county.

## Features

- Search for businesses by type within a specific county
- Randomized results to ensure fair exposure
- Interactive map with business markers
- List view of businesses with basic information
- Click on businesses to center the map on their location

## Setup

1. Get a Google Maps API key:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the following APIs:
     - Maps JavaScript API
     - Places API
     - Geocoding API
   - Create credentials (API key)
   - Copy your API key

2. Replace the API key in `index.html`:
   - Find the line with `YOUR_API_KEY`
   - Replace it with your actual Google Maps API key

3. Open `index.html` in a web browser

## Usage

1. Enter a business type (e.g., "restaurants", "coffee shops", "hotels")
2. Enter a county name (e.g., "Los Angeles", "Orange")
3. Click the Search button
4. View the randomized results on the map and in the list
5. Click on any business in the list to center the map on its location

## Implementation Details

- Uses the Google Maps JavaScript API
- Implements the Fisher-Yates shuffle algorithm for randomization
- Geocodes county names to get accurate search boundaries
- Displays results both on a map and in a list format
- Responsive design that works on desktop and mobile devices

## WordPress Integration

To integrate this into a WordPress site:

1. Create a new page template
2. Copy the HTML, CSS, and JavaScript code into the template
3. Enqueue the Google Maps JavaScript API in your theme's `functions.php`
4. Add the API key to your WordPress configuration
5. Create a new page using the template

## Notes

- This is a proof of concept and may need additional features for production use
- Consider implementing caching for better performance
- Add error handling for API rate limits
- Implement pagination for large result sets
- Add filters for business types and other criteria 