// Global map variable
var map;

// Set the center as Baltimore
var locations = {
  "Baltimore": [39.2833, -76.6167],
};
var center = locations["Baltimore"];

// Query radius
var radiusInKm = 0.5;

// Get a reference to the Firebase public transit open data set
var transitFirebaseRef = new Firebase("https://publicdata-transit.firebaseio.com/")

// Create a new GeoFire instance, pulling data from the public transit data
var geoFire = new GeoFire(transitFirebaseRef.child("_geofire"));

/*************/
/*  GEOQUERY */
/*************/
// Keep track of all of the pets currently within the query
var petsInQuery = {};

// Create a new GeoQuery instance
var geoQuery = geoFire.query({
  center: center,
  radius: radiusInKm
});

/* Adds new pet markers to the map when they enter the query */
geoQuery.on("key_entered", function(petId, petLocation) {
  // Specify that the pet has entered this query
  petId = petId.split(":")[1];
  petssInQuery[petId] = true;

  // Look up the pet's data in the Transit Open Data Set
  transitFirebaseRef.child("sf-muni/pets").child(petId).once("value", function(dataSnapshot) {
    // Get the pet data from the Open Data Set
    pet = dataSnapshot.val();

    // If the pet has not already exited this query in the time it took to look up its data in the Open Data
    // Set, add it to the map
    if (pet !== null && petsInQuery[petId] === true) {
      // Add the pet to the list of pets in the query
      petsInQuery[petId] = pet;

      // Create a new marker for the pet
      pet.marker = createPetMarker(pet, getPetColor(pet));
    }
  });
});

/* Moves pets markers on the map when their location within the query changes */
geoQuery.on("key_moved", function(petId, petLocation) {
  // Get the pet from the list of pets in the query
  petId = petId.split(":")[1];
  var pet = petsInQuery[petId];

  // Animate the pet's marker
  if (typeof pet !== "undefined" && typeof pet.marker !== "undefined") {
    pet.marker.animatedMoveTo(petLocation);
  }
});

/* Removes pet markers from the map when they exit the query */
geoQuery.on("key_exited", function(petId, petLocation) {
  // Get the pet from the list of pets in the query
  petId = petId.split(":")[1];
  var pet = petsInQuery[petId];

  // If the pet's data has already been loaded from the Open Data Set, remove its marker from the map
  if (pet !== true) {
    pet.marker.setMap(null);
  }

  // Remove the pet from the list of pets in the query
  delete petsInQuery[petId];
});

/*****************/
/*  GOOGLE MAPS  */
/*****************/
/* Initializes Google Maps */
function initializeMap() {
  // Get the location as a Google Maps latitude-longitude object
  var loc = new google.maps.LatLng(center[0], center[1]);

  // Create the Google Map
  map = new google.maps.Map(document.getElementById("map-canvas"), {
    center: loc,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // Create a draggable circle centered on the map
  var circle = new google.maps.Circle({
    strokeColor: "#6D3099",
    strokeOpacity: 0.7,
    strokeWeight: 1,
    fillColor: "#B650FF",
    fillOpacity: 0.35,
    map: map,
    center: loc,
    radius: ((radiusInKm) * 1000),
    draggable: true
  });

  //Update the query's criteria every time the circle is dragged
  var updateCriteria = _.debounce(function() {
    var latLng = circle.getCenter();
    geoQuery.updateCriteria({
      center: [latLng.lat(), latLng.lng()],
      radius: radiusInKm
    });
  }, 10);
  google.maps.event.addListener(circle, "drag", updateCriteria);
}

/**********************/
/*  HELPER FUNCTIONS  */
/**********************/
/* Adds a marker for the inputted vehicle to the map */
function createPetMarker(pet, petColor) {
  var marker = new google.maps.Marker({
    icon: "https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small&chld=" + pet.vtype + "|bbT|" + pet.routeTag + "|" + petColor + "|eee",
    position: new google.maps.LatLng(pet.lat, pet.lon),
    optimized: true,
    map: map
  });

  return marker;
}

/* Returns a blue color code for outbound vehicles or a red color code for inbound vehicles */
function getPetColor(pet) {
  return ((pet.dirTag && pet.dirTag.indexOf("OB") > -1) ? "50B1FF" : "FF6450");
}

/* Returns true if the two inputted coordinates are approximately equivalent */
function coordinatesAreEquivalent(coord1, coord2) {
  return (Math.abs(coord1 - coord2) < 0.000001);
}

/* Animates the Marker class (based on https://stackoverflow.com/a/10906464) */
google.maps.Marker.prototype.animatedMoveTo = function(newLocation) {
  var toLat = newLocation[0];
  var toLng = newLocation[1];

  var fromLat = this.getPosition().lat();
  var fromLng = this.getPosition().lng();

  if (!coordinatesAreEquivalent(fromLat, toLat) || !coordinatesAreEquivalent(fromLng, toLng)) {
    var percent = 0;
    var latDistance = toLat - fromLat;
    var lngDistance = toLng - fromLng;
    var interval = window.setInterval(function () {
      percent += 0.01;
      var curLat = fromLat + (percent * latDistance);
      var curLng = fromLng + (percent * lngDistance);
      var pos = new google.maps.LatLng(curLat, curLng);
      this.setPosition(pos);
      if (percent >= 1) {
        window.clearInterval(interval);
      }
    }.bind(this), 50);
  }
};
