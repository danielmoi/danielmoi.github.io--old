var map;

// there are 2 required options for every map: `center` and `zoom`
// the JS class that represents a map is the `Map` class
// objects of this class define a single map on a page
// We may create more than one instance of this class
// We create a new instance of this class using the `new` operator

// This code defines a variable `map`, and assigns its value to a new `Map` object
// The function `Map()` is a `constructor`
function initMap() {
  // `mapOptions` must be placed before `map` assignment
  var mapOptions = {
    center: {
      lat: 35.667,
      lng: 139.762
    },
    zoom: 16,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    mapTypeId: google.maps.MapTypeId.HYBRID
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

}

var ViewModel = function () {
  var self = this;

  self.venue_name_object = ko.observable();
  self.venue_name_array = ko.observableArray();

  self.city = ko.observable("Sydney");

  self.start = "https://api.foursquare.com/v2/venues/search?";
  self.client_id = "client_id=J4JTA0KKSKB50R1ONPYB3W4H532SPS403IHJKL4VQMNMNKT0";
  self.client_secret = "&client_secret=W5FBT3FTE1X4RVJXPSJJDNNXCYHXL0OMH1TPVINZ40NO0LX5";
  self.location = "&near=" + self.city();
  self.limit = "&limit=10";
  self.v = "&v=20140806";
  self.m = "&m=foursquare";

  self.getStuff = function () {
    $.ajax({
      url: self.start + self.client_id + self.client_secret + self.location + self.v + self.m + self.limit,

      success: function (returnedData) {
        for (var key in returnedData.response.venues) {
          self.venue_name_object(returnedData.response.venues[key].name);
          self.venue_name_array(returnedData.response.venues[key].name);
          console.dir(returnedData);
          console.dir(self.venue_name_object());          
          console.dir(self.venue_name_array());
        }
      }
    });
  };


};

ko.applyBindings(new ViewModel());