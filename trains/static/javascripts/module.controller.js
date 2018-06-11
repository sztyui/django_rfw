
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
        $scope.displayName = parameter;
        $http.post('stations/', parameter).subscribe(
            res => { console.log(res); },
            err => { console.log(err); }
            );
    };

});