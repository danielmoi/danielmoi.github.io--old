var model = [{
}];

var ViewModel = function () {
  var self = this;


  self.mapOptions = {
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

  self.myMap = new google.maps.Map(document.getElementById('map'), self.mapOptions);

  self.marker = new google.maps.Marker({
    position: self.mapOptions.center, // object literal with 2 properties, lat & lng
    map: self.myMap, // my map is called 'map'
    title: "WASSUP!" // what displays upon hover
  });



  self.myGeo = new google.maps.Geocoder();

//  self.service = new google.maps.places.PlacesService(self.myMap);
  
  
  self.venues_object = ko.observable();
  self.venue_name_array = ko.observableArray();
  self.venue_location = ko.observableArray();
  
  self.explore_object = ko.observable();
  self.explore_object_photos = ko.observableArray();

  self.googlePlacesArray = ko.observableArray();

  self.city = ko.observable("Sydney");

  self.start = "https://api.foursquare.com/v2/venues/explore?";
  self.client_id = "client_id=J4JTA0KKSKB50R1ONPYB3W4H532SPS403IHJKL4VQMNMNKT0";
  self.client_secret = "&client_secret=W5FBT3FTE1X4RVJXPSJJDNNXCYHXL0OMH1TPVINZ40NO0LX5";

  self.location = ko.computed(function () {
    return "&near=" + self.city();
  });

  self.mapMap = function () {
    console.log("mapMap!");
  };


  self.limit = "&limit=10";
  self.v = "&v=20140806";
  self.m = "&m=foursquare";

  self.getStuff = function () {
    $.ajax({
      url: self.start + self.client_id + self.client_secret + self.location() + self.v + self.m + self.limit + '&section=coffee&venuePhotos=1',

      success: function (returnedData) {
        for (var i = 0; i < returnedData.response.groups[0].items.length; i++) {
//          self.venue_name_array.push(returnedData.response.venues[i].name);
//          self.venue_location.push(returnedData.response.venues[i].location);
//          self.venues_object(returnedData.response.venues);
          console.log(returnedData.response.groups[0].items[i].venue.featuredPhotos.items[0].prefix);

        }
//        console.dir(self.venues_object());
//        console.log(self.city());
        self.explore_object(returnedData.response.groups[0].items);
//        self.explore_object_photos.push(
//          returnedData.response.groups[0].items.featuredPhotos.prefix + 
//          'width=400' + 
//          returnedData.response.groups[0].items.featuredPhotos.suffix
//        
//        );
        console.log(returnedData.response.groups[0].items);
        console.log(self.explore_object_photos);

      }
    });
  };

  self.geoGeo = function () {
    myGeo.geocode({
      address: self.city()
    }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.dir(results); // results is an Array object
        self.googlePlacesArray(results);
        console.log(self.googlePlacesArray());
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }


    });
  }






};

// this applies the data-bind attributes from the whole View to those described in the constructor function ViewModel, and creates a new variable that is an instance of that constructor object (??)

function initMap() {
  ko.applyBindings(new ViewModel());
}