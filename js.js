var map, locs;
// Load google map centered on Stanford
function initMap() {
	var mapOptions = {
		center: {lat: 37.43, lng: -122.17},
		zoom: 15
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	drawHeatmap(locs, map);
}
google.maps.event.addDomListener(window, 'load', initMap);
// Read location history
var fileName = 'history-09-20-2014.kml';
var xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.addEventListener('load', complete, false);
xmlHttpRequest.open("GET", fileName, true);
xmlHttpRequest.send();
// Parse result asynchronously
function complete(evt) {
	console.log('response obtained');
	var locHistXML = xmlHttpRequest.responseXML;
	locs = locHistXML.getElementsByTagName('gx:coord');
	console.log('finished loading location history');
	drawHeatmap(locs, map);
}
// Draw Heatmap once location history is loaded
// TODO line segments between temporally adjacent points
function drawHeatmap(locs, map) {
	if (!locs || !map) return;
	var len = locs.length;
	var coords = new Array(2);
	// first pt
	var loc0 = locs[0];
	var coord0 = loc0.textContent.split(' ');
	coords[0] = new google.maps.LatLng(coord0[1], coord0[0]);
	for (var i = 1; i < len; i++) {
		var loc = locs[i];
		var coord = loc.textContent.split(' ');
		var lat = coord[1];
		var lng = coord[0];
		coords[1] = new google.maps.LatLng(lat, lng);
		var path = new google.maps.Polyline({
			strokeWeight: 2,
			strokeColor: '#8c1515',
			strokeOpacity: 0.05,
			path: coords,
			geodesic: false,
		});
		path.setMap(map);
		coords[0] = coords[1];
	}
}