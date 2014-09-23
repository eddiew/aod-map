alert(0);
function initMap() {
	var mapOptions = {
		center: {lat: 0, lng: 0},
		zoom: 8
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	google.maps.event.addDomListener(window, 'load', initialize);
}
initMap();