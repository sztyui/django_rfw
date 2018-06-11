
app.controller('stationsController', function($scope, $http) {
    $http({
        method : "GET",
        url : "stations/"
    }).then(function mySuccess(response) {
        $scope.stations = response.data;
    }, function myError(response) {
        $scope.stations = response.statusText;
    });
});

app.controller('stationAdd', function($scope, $http){
    $scope.postFunc = function(){
        var parameter = JSON.stringify({
            "name": $scope.addName,
            "weight": $scope.addWeight,
            "price": $scope.addPrice
        });
        $http.post('stations/', parameter).subscribe(
            res => { console.log(res); },
            err => { console.log(err); }
            );
    };

});

app.controller('stationDelete', function($scope, $http){
   $scope.del ={
        model: null,
        availableOptions: null
   };

   $http.get("count_stations/")
   .then(function(response){
        $scope.del.availableOptions = response.data;
   });

   $scope.deleteFunc = function(){
        $http.delete('get_station/' + $scope.del.model).subscribe(
            res => { console.log(res); },
            err => { console.log(err); }
        );
   };
});

app.controller('stationModify', function($scope, $http){
    $scope.modif= {
        model: null,
        availableOptions: null,
        data: null
    };

   $http.get("count_stations/")
   .then(function(response){
        $scope.modif.availableOptions = response.data;
   });
   $scope.selectedRow = function(){
        http.get('get_station/' + $scope.modif.model).then(function(response){
            $scope.modif.data = response.data;
        });
   };

   $scope.modifyFunction = function(){
        $http.post('get_station/', $scope.modif.data).subscribe(
            res => { console.log(res); },
            err => { console.log(err); }
            );
   };
});