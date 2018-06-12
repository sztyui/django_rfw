app.factory('gtc', function($http){
    var myService = {
        getTableData: function(){
            return $http.get('stations/');
        }
    };
    return myService;
});

app.factory('add', function($http){
    var myService = {
        loadStation: function(parameter){
            return $http.post('stations/', JSON.stringify(parameter));
        }
    };
    return myService;
});

app.factory('del', function($http){
    var myService = {
        deleteStation: function(index){
            return $http.delete('get_station/' + index + '/');
        }
    };
    return myService;
});

app.factory('modif', function($http){
    var myService = {
        modifyStation: function(elem){
            var tmp = angular.copy(elem);
            delete tmp['id'];
    	    return $http.post('get_station/' + elem.id + '/', JSON.stringify(tmp));
        }
    };
    return myService;
});

app.controller('myCtrl', function(gtc, add, del, modif, $scope) {
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

    $scope.names = null;
    // Tabla az adatok tarolasahoz.
    $scope.refreshNames = function(){
        dataStream = gtc.getTableData();
        dataStream.then(
            function(result){
                $scope.names = result.data;
            },
            function(result){
                console.log(result.data);
            }
    )};

    $scope.orderAttribute = "order";

   $scope.refreshNames();

    $scope.remove = function(index){
        del.deleteStation(index).then(
            function(response){
                $scope.refreshNames();
            },
            function(response){}
        );
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
            modif.modifyStation($scope.element).then(
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
            add.loadStation(tmp).then(
                function(response){
                    $scope.refreshNames();
                    console.log(response.data);
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
      $scope.orderAttribute = ['hasToPay' ,'order'];
    };

    $scope.clearPackage = function(){
      var tmp = {
        calculated: false,
        weight: null
      };
      $scope.package = angular.copy(tmp);
    };
});