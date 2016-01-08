

var map;

// there are 2 required options for every map: `center` and `zoom`
// the JS class that represents a map is the `Map` class
// objects of this class define a single map on a page
// We may create more than one instance of this class
// We create a new instance of this class using the `new` operator

// This code defines a variable `map`, and assigns its value to a new `Map` object
// The function `Map()` is a `constructor`
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 35.667,
      lng: 139.762
    },
    zoom: 16
  });
}