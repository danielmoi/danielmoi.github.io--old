var model = [{}];

var ViewModel = function () {
  var self = this;

  self.markerIcon = {
    url: "img/foursquare-icon-16x16.png",
    size: new google.maps.Size(16,16),
  };

  self.mapOptions = {
    center: {
      lat: 35.667,
      lng: 139.762
    },
    zoom: 16,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  self.myMap = new google.maps.Map(document.getElementById('map'), self.mapOptions);

  self.marker = new google.maps.Marker({
    position: self.mapOptions.center, // object literal with 2 properties, lat & lng
    map: self.myMap, // my map is called 'map'
    title: "WASSUUUP!", // what displays upon hover
    icon: self.markerIcon

  });

  self.bounds = new google.maps.LatLngBounds();









  // Create empty objects for Foursquare
  self.explore_object = ko.observable();
  self.explore_object_photos = ko.observableArray();



  // set starting city
  self.city = ko.observable("Tokyo");


  // Foursquare stuff
  self.start = "https://api.foursquare.com/v2/venues/explore?";
  self.client_id = "client_id=J4JTA0KKSKB50R1ONPYB3W4H532SPS403IHJKL4VQMNMNKT0";
  self.client_secret = "&client_secret=W5FBT3FTE1X4RVJXPSJJDNNXCYHXL0OMH1TPVINZ40NO0LX5";
  self.location = ko.computed(function () {
    return "&near=" + self.city();
  });
  self.limit = "&limit=10";
  self.v = "&v=20140806";
  self.m = "&m=foursquare";


  // store data
  self.cafeArray = ko.observableArray();


  // the GO button
  self.getStuff = function () {
    $.ajax({
      url: self.start + self.client_id + self.client_secret + self.location() + self.v + self.m + self.limit + '&section=coffee&venuePhotos=1&radius=1000',

      success: function (returnedData) {


        self.explore_object_photos([]);
        self.cafeArray([]);
        self.bounds = new google.maps.LatLngBounds();

        self.mapOptions.center = returnedData.response.geocode.center;
        self.myMap = new google.maps.Map(document.getElementById('map'), self.mapOptions);



        var fsdata = returnedData.response.groups[0].items;

        for (var i = 0; i < fsdata.length; i++) {

          if (fsdata[i].venue.featuredPhotos) {
            self.explore_object_photos.push(
              fsdata[i].venue.featuredPhotos.items[0].prefix +
              'width200' +
              fsdata[i].venue.featuredPhotos.items[0].suffix
            );
          } else {
            console.log("no photos");
          }


          //          console.log(fsdata[i].venue.location.lat);

          self.cafeArray.push(new Cafe(fsdata, i, self));




        }





        self.explore_object(fsdata);


        console.log(returnedData);


      }
    });
  };








};

var Cafe = function (data, index, context) {
  var cafe = this;
  cafe.name = data[index].venue.name;
  cafe.lat = data[index].venue.location.lat;
  cafe.lng = data[index].venue.location.lng;
  cafe.rating = data[index].venue.rating;

  if (data[index].venue.featuredPhotos) {
    cafe.photoURL = data[index].venue.featuredPhotos.items[0].prefix + 'width200' + data[index].venue.featuredPhotos.items[0].suffix;
  } else {
    console.log("NO PHOTOS!!");
  }

  cafe.marker = new google.maps.Marker({
    map: context.myMap,
    position: {
      lat: cafe.lat,
      lng: cafe.lng
    },
    icon: context.markerIcon
  });
  context.bounds.extend(new google.maps.LatLng(cafe.lat, cafe.lng));
  context.myMap.fitBounds(context.bounds);


}


// this applies the data-bind attributes from the whole View to those described in the constructor function ViewModel, and creates a new variable that is an instance of that constructor object (??)

function initMap() {
  ko.applyBindings(new ViewModel());
}