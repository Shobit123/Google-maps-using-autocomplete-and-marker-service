var app = angular.module("app", []);

app.controller("appCtrl", function ($scope) {


    $scope.lat = undefined;
    $scope.lon = undefined;
    $scope.place = undefined;
    $scope.loc = { lat: 23, lng: 79 };
    var options ={
                    center: $scope.loc,
                    zoom: 5,
                    mapTypeId: "roadmap"
                };
                var element = document.getElementById('map')
            map = new google.maps.Map(element, options);
    var inputFrom = document.getElementById('searchTextField');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom);
    google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
       this.place = autocompleteFrom.getPlace();
      console.log(this.place, 'places')
      $scope.lat = this.place.geometry.location.lat();
      $scope.lon = this.place.geometry.location.lng();
      $scope.cities = [
        {
            place : this.place.formatted_address,
            desc : 'A country of culture and tradition!',
            lat : $scope.lat,
            lon : $scope.lon
        }
    ]; 
      $scope.$apply();
  }); 

    
    $scope.gotoCurrentLocation = function () {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var c = position.coords;
                $scope.gotoLocation(c.latitude, c.longitude);
            });
            return true;
        }
        return false;
    };
      
    $scope.gotoLocation = function (lat, lon) {
        // if ($scope.lat != lat || $scope.lon != lon) {
            console.log(lat)
            $scope.loc = { lat: lat, lng: lon };
            if (!$scope.$$phase) 
            $scope.$apply("loc");
        // }
    };

  
    $scope.search = "";
    $scope.geoCode = function (search) {
        if ($scope.search && $scope.search.length > 0) {
            $scope.gotoLocation(this.lat, this.lon);
            
            $scope.loc = {lat: this.lat, lng: this.lon}

            map.setCenter(new google.maps.LatLng($scope.loc.lat, $scope.loc.lng));
            var marker = new google.maps.Marker({
                map: map,
                position: $scope.loc
              });
              google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
              });
            
            }
            
        }
            // if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
            // this.geocoder.geocode({ 'address': $scope.search }, function (results, status) {
            //     if (status == google.maps.GeocoderStatus.OK) {
            //         var loc = results[0].geometry.location;
            //         console.log(loc, 'loc')
            //         $scope.gotoLocation(loc.lat(), loc.lng());
            //     } else {
            //         alert("Sorry, this search produced no results.");
            //     }
            // });
        

    
});

