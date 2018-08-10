angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $location) {
	$scope.doLogin = function() {
		$location.path("/tabs/dash");
	}
})

.controller('DashCtrl', function($scope) {

})

.controller('RouteDetailCtrl', function($scope, $ionicLoading) {
	$scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Obteniendo posición actual...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
      alert('No es posible obtener la posición actual: ' + error.message);
    });
  };
})

.controller('ChatsCtrl', function($scope, $http) {
	$scope.chats = [];
  
	$http.get("http://antaminaseguridadvial.org/service.php?method=get_all_reports").then(function(result){
		$scope.chats = result.data.data;
		console.log(result.data.data);
	});
})

.controller('ChatDetailCtrl', function($scope, $stateParams, $http) {
	$scope.report;
	$http.get("http://antaminaseguridadvial.org/service.php?method=get_report", {params: { id:$stateParams.chatId }}).then(function(result){
		$scope.report = result.data.data;
		console.log(result.data.data);
	});
})

.controller('AccountCtrl', function($scope, Routes) {
  $scope.routes = Routes.all();
  $scope.remove = function(route) {
    Routes.remove(route);
  };
});
