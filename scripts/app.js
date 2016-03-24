// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var template;
var map;


$(document).on("ready", function() {
  var source = $('#earthquake-template').html();
  template = Handlebars.compile(source);

  initMap();
  getEarthquakes();
});

function initMap() {
  var myLatLng = {lat: 37.78, lng: -122.44};
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 2
  });
}

function getEarthquakes() {
  $.ajax({
    method: 'GET',
    url: weekly_quakes_endpoint,
    success: onSuccess, //callback function
    error: onError
  });
}

function onSuccess(json) {
  var earthquakeTitle = template({ objects: json.features });
  $('#earthquake-list').append(earthquakeTitle);
  json.features.forEach( function (object) {
    new google.maps.Marker({
      position: {
        lat: object.geometry.coordinates[0],
        lng: object.geometry.coordinates[1]
      },
      map: map
    });
  });
}

function onError() {
  console.log("error");
}
