var model = [{}];

var ViewModel = function () {
  var self = this;

  self.markerIcon = {
    url: "img/foursquare-icon-16x16.png",
    size: new google.maps.Size(16, 16)
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
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
         ]
      }
      ]

  };

  self.myMap = new google.maps.Map(document.getElementById('map'), self.mapOptions);

  self.marker = new google.maps.Marker({
    position: self.mapOptions.center, // object literal with 2 properties, lat & lng
    map: self.myMap, // my map is called 'map'
    title: "Let's get coffee!", // what displays upon hover
    icon: self.markerIcon

  });

  self.myInfo = new google.maps.InfoWindow();

  self.bounds = new google.maps.LatLngBounds();
  self.myMap.addListener('click', function () {
    self.myInfo.close();
  });


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



  // filter results
  self.filterValue = ko.observable("");
  self.filterValueLower = ko.observable(self.filterValue().toLowerCase());

  // use ko.computed so this function runs whenever any observable changes
  self.filterStuff = ko.computed(function () {
    var arrayLength = self.cafeArray().length;
    var filterValueLowerCase = self.filterValue().toLowerCase();

    var i;
    for (i = 0; i < arrayLength; i++) {
      var cafeNameLowerCase = self.cafeArray()[i].name.toLowerCase();
      if (cafeNameLowerCase.indexOf(filterValueLowerCase) < 0) {
//        console.log("Not found");
        self.cafeArray()[i].marker.setVisible(false);
        self.cafeArray()[i].visible(false);

      } else {
//        console.log("Found");
        self.cafeArray()[i].marker.setVisible(true);
        self.cafeArray()[i].visible(true);
      }
    }
  });


  // the GO button
  self.getStuff = function () {
    $.ajax({
      url: self.start + self.client_id + self.client_secret + self.location() + self.v + self.m + self.limit + '&section=coffee&venuePhotos=1&radius=1000',

      success: function (returnedData) {

        $("#details").html('');
        self.filterValue("");



        self.cafeArray([]);
        console.log(self.cafeArray());
        self.bounds = new google.maps.LatLngBounds();

        self.mapOptions.center = returnedData.response.geocode.center;
        self.myMap = new google.maps.Map(document.getElementById('map'), self.mapOptions);


        var fsdata = returnedData.response.groups[0].items;
        var i;

        for (i = 0; i < fsdata.length; i++) {
          self.cafeArray.push(new Cafe(fsdata, i, self));
          console.log(self.cafeArray()[i].name);
        }

        console.log(self.cafeArray());


      }
    });
  };

};

var Cafe = function (data, index, context) {
  var cafe = this;

  // can't use `cafeArray` object yet – it hasn't been populated yet
  cafe.name = data[index].venue.name;
  cafe.lat = data[index].venue.location.lat;
  cafe.lng = data[index].venue.location.lng;
  cafe.rating = data[index].venue.rating;
  cafe.visible = ko.observable(true);
  cafe.selected = ko.observable(false);


  if (data[index].venue.featuredPhotos) {
    cafe.photoURL = data[index].venue.featuredPhotos.items[0].prefix + 'height200' + data[index].venue.featuredPhotos.items[0].suffix;
  } else {
    console.log("NO PHOTOS!!");
    cafe.photoURL = "#";
  }

  cafe.marker = new google.maps.Marker({
    map: context.myMap,
    position: {
      lat: cafe.lat,
      lng: cafe.lng
    },
    icon: context.markerIcon
  });


  cafe.marker.addListener('click', function () {
    context.myInfo.setContent('<h3>' + cafe.name + '</h3>');
    context.myInfo.open(context.myMap, cafe.marker);

    $("#details").html(cafe.name + '<br>' +
      'Rating: ' + cafe.rating + '<br>');
    
    $("#photos").html('<img src="' + cafe.photoURL + '">');

    context.mapOptions.center = cafe.marker;

    cafe.marker.setAnimation(google.maps.Animation.BOUNCE);

    window.setTimeout(function () {
      cafe.marker.setAnimation(null);
    }, 1500);
  });

  context.myMap.addListener('click', function () {
    context.myInfo.close();
  });

  cafe.listClick = function () {
    context.myInfo.setContent('<h3>' + cafe.name + '</h3>');
    context.myInfo.open(context.myMap, cafe.marker);

    $("#details").html(cafe.name + '<br>' +
      'Rating: ' + cafe.rating + '<br>');
    
    $("#photos").html('<img src="' + cafe.photoURL + '">');
    context.mapOptions.center = cafe.marker;

    cafe.marker.setAnimation(google.maps.Animation.BOUNCE);

    window.setTimeout(function () {
      cafe.marker.setAnimation(null);
    }, 1500);

  };

  context.bounds.extend(new google.maps.LatLng(cafe.lat, cafe.lng));
  context.myMap.fitBounds(context.bounds);


};


// this applies the data-bind attributes from the whole View to those described in the constructor function ViewModel, and creates a new variable that is an instance of that constructor object (??)

function initMap() {
  ko.applyBindings(new ViewModel());
}