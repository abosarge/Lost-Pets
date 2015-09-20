function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.2833, lng: -76.6167},
    zoom: 15
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

// Create a Firebase reference where GeoFire will store its information
var firebaseRef = new Firebase("https://radiant-inferno-7526.firebaseio.com/pets");

// Create a GeoFire index
var geoFire = new GeoFire(firebaseRef);

var ref = geoFire.ref(); 



geoFire.get("-JzcI30ra2AY6ufl8itU").then(function(location) {
  if (location.location === null) {
    console.log("Provided key is not in GeoFire" );
  }
  else {
    console.log("Provided key has a location of " + location.location);
  }
}, function(error) {
  console.log("Error: " + error);
});



