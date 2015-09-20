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


var info;
var petID;
var testing;
var points = new Array();

// Attach an asynchronous callback to read the data at our posts reference
geoFire.ref().on("child_added", function(snapshot) {
  info = snapshot.val();
  petID = snapshot.key();

  console.log(info.lat_long)
  testing = info.name;

  points.push(info.lat_long);

    geoFire.set("pet_1", [39.2833, -76.6167]).then(function() {
      console.log("Points Added ");

     }).catch(function(error) {
       console.log("Error adding venue " + petID + " to GeoFire:", error);
   });

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

console.log("Entering get()");
geoFire.get("pet_1").then(function(location) {
  console.log(location);
  if (location === null) {
    console.log("Provided key is not in GeoFire" );
  }
  else {
    console.log("Provided key has a location of " + location);
  }
}, function(error) {
  console.log("Error: " + error);
});

var petsInQuery = {};

var geoQuery = geoFire.query({
  center: [39.2833, 76.6167],
  radius: 10.5
});

var onKeyEnteredRegistration = geoQuery.on("key_entered", function("pet_1", location, distance) {
  console.log(key + " entered query at " + location + " (" + distance + " km from center)");
});
