app.controller('myCtrl', function($scope, $http) {
   // egy TMP elem
    $scope.element = {
      id: null,
      order: null,
      name: null,
      weight: null,
      price: null,
      hasToPay: null
    };

    $scope.package = {
      calculated: false,
      weight: null
    };

    // Tabla az adatok tarolasahoz.
    $scope.names = null;

   $scope.refreshNames = function (){
      $http.get('stations/')
      .then(
      function(response){
        $scope.names = response.data;
      },
      function(response){
        console.log(response.data);
      }
      );
   };

   $scope.refreshNames();

    $scope.remove = function(index){
        $http.delete('get_station/' + index);
    	$scope.refreshNames();
    };

    $scope.loads = function(index){
        angular.forEach($scope.names, function(value){
            if (value.id == index){
                $scope.element = angular.copy(value);
                delete $scope.element['created'];
            }
        });
    };

    $scope.modify = function(){
        if($scope.element.id){
            console.log($scope.element);
            var tmp = angular.copy($scope.element);
            delete tmp['id'];
            console.log($scope.element.id);
    	    $http.post('get_station/' + $scope.element.id + '/', JSON.stringify(tmp)).then(
                function(response){
                    $scope.refreshNames();
                },
                function(response){
                    $scope.refreshNames();
                    console.log(response.data);
                }
    	    );
    	}
    	refreshNames();
    };

    $scope.addToTable = function(){
    		var tmp = {
                order: parseInt($scope.element.order),
                name: $scope.element.name,
                weight: parseInt($scope.element.weight),
                price: parseInt($scope.element.price)
            };
            $http.post('stations/', JSON.stringify(tmp)).then(
                function(response){
                    $scope.refreshNames();
                },
                function(response){
                    console.log(response.data);
                }
            );

    };

    $scope.clearInput = function(){
        $scope.element = {
          id: null,
          order: null,
          name: null,
          weight:  null,
          price: null,
          hasToPay: null
        };
    };

    $scope.priceCalc = function(){
      angular.forEach($scope.names, function(value, key){
        if($scope.package.weight)
          value.hasToPay = parseInt($scope.package.weight) * value.price;
      });
      $scope.package.calculated = true;
    };

    $scope.clearPackage = function(){
      var tmp = {
        calculated: false,
        weight: null
      };
      $scope.package = angular.copy(tmp);
    };
});