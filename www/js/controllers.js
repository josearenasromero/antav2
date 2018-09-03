angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $location, $localForage, $http) {
	$scope.filter = {gps:true, ruta:true, riesgo:true};
})

.controller('LogoutCtrl', function($scope, $location, $localForage, $http) {
	$scope.local = {user:'', password:'', email:'', business_id:'', user_id:'', elogin:false};
	$localForage.clear().then(function(){
		console.log("all data removed");
		$location.path("/login");
	});
})

.controller('LoginCtrl', function($scope, $location, $localForage, $http) {
	$scope.local = {user:'', password:'', email:'', business_id:'', user_id:'', elogin:false};
	
	$localForage.getItem('localBusinessId').then(function(data) {
		console.log("localForage recovered businessid...", data);
		if(data != null && data != "") {
			$location.path("/tab/dash");
		}
	});
	
	$scope.doLogin = function() {
		$http.get("http://antaminaseguridadvial.org/service.php?method=do_login", {params: {username:$scope.local.user,password:$scope.local.password}}).then(function(result) {
			console.log("result from login", result);
			if(result.data.status == "ok") {
				$scope.local.elogin  = false;
				$scope.local.email = result.data.data.email;
				$scope.local.business_id = result.data.data.business_id;
				$scope.local.user_id = result.data.data.id;
				
				console.log($scope.local.email, $scope.local.business_id, "---");
				
				$localForage.setItem('localBusinessId', $scope.local.business_id).then(function(data) {
					$localForage.setItem('localEmail', $scope.local.email).then(function(da) {
						$localForage.setItem('localUser', $scope.local.user).then(function(d) {
							$localForage.setItem('localUserId', $scope.local.user_id).then(function(dd) {
								console.log("logged");
								$location.path("/tab/dash");
								$scope.$apply();
							});
						});
					});
				});
			} else {
				$scope.local.elogin  = true;
			}	
		});
	}
})

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
	$scope.showMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};
	$scope.showRightMenu = function () {
		$ionicSideMenuDelegate.toggleRight();
	};
})

.controller('DashCtrl', function($scope, $localForage, $http, $location, $ionicLoading) {
	$scope.local = {user:'', password:'', email:'', business_id:'', business_name:'', user_id:'', report_count:-1};
	
	$scope.doLogout = function() {
		$localForage.clear().then(function(){
			console.log("all data removed");
			$location.path("/login");
		});
	}
	
	$localForage.getItem('localBusinessId').then(function(data) {
		console.log("localForage recovered businessid...", data);
		if(data != null && data != "") {
		} else {
			$location.path("/login");
		}	
	});
	
	$localForage.getItem('localBusinessId').then(function(data) {
		$localForage.getItem('localUserId').then(function(dd) {
			$scope.loading = $ionicLoading.show({
			  content: 'Obteniendo información...',
			  showBackdrop: true
			});
			
			$scope.local.business_id = data;
			$scope.local.user_id = dd;
			console.log("localForage recovered businessid...", data);
			
			$http.get("http://antaminaseguridadvial.org/service.php?method=get_dash_info", {params: {business_id:$scope.local.business_id, user_id:$scope.local.user_id}}).then(function(result) {
				if(result.data.status == "ok") {
					$scope.local.business_name  = result.data.data.name;
					$scope.local.report_count = result.data.data.report_count;
				} else {
					
				}
				$ionicLoading.hide();
			});
		});
	});
	$localForage.getItem('localEmail').then(function(data) {
		$scope.local.email = data;
		console.log("localForage recovered localEmail...", data);
	});
	$localForage.getItem('localUser').then(function(data) {
		$scope.local.user = data;
		console.log("localForage recovered localUser...", data);
	});
})

.controller('RouteDetailCtrl', function($scope, $ionicLoading) {
	//$scope.filter = {gps:true, ruta:false, riesgo:true};
	
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
	  $scope.map.setZoom(20);
      $ionicLoading.hide();
    }, function (error) {
		$ionicLoading.hide();
		alert('No es posible obtener la posición actual: ' + error.message);
    });
  };
})

.controller('ChatsCtrl', function($scope, $localForage, $http, $location, $ionicLoading) {
	$scope.local = {user:'', password:'', email:'', business_id:'', business_name:'', user_id:'', report_count:-1};
	$scope.search = "";
	$localForage.getItem('localBusinessId').then(function(data) {
		console.log("localForage recovered businessid...", data);
		if(data != null && data != "") {
		} else {
			$location.path("/login");
		}	
	});
	
	$localForage.getItem('localBusinessId').then(function(data) {
		$scope.loading = $ionicLoading.show({
		  content: 'Obteniendo reportes...',
		  showBackdrop: true
		});
		
		$scope.local.business_id = data;
		$localForage.getItem('localUserId').then(function(dd) {
			$scope.local.user_id = dd;
			console.log("localForage recovered userid...", data, dd);
			
			$http.get("http://antaminaseguridadvial.org/service.php?method=get_all_reports", {params: {business_id:$scope.local.business_id, user_id:$scope.local.user_id}}).then(function(result){
				if(result.data.status == "ok") {
					$scope.chats = result.data.data;
				} else {
					
				}
				$ionicLoading.hide();
			});
		});
	});
	
	$scope.newReport = function() {
		$location.path("/tab/new/report");
	};
	
	$scope.chats = [];
})

.controller('ChatNewCtrl', function($scope, $stateParams, $http, $localForage, $ionicLoading, $timeout, $location) {
	$scope.local = {user_id:''};
	$scope.lists = {};
	
	$scope.report = {id:'', business_id:'', status:'Pendiente'};
	
	$scope.createInformNumber = function(){
		$http.get("http://antaminaseguridadvial.org/service.php?method=create_inform_number", {params: { base_id:$scope.report.base_id }}).then(function(result){
			if(result.data.status == "ok") {
				$scope.report.correlative = result.data.data;
				console.log($scope.report.correlative, "-- correlativo");
			} else {
				
			}
		});
	}
	
	$localForage.getItem('localUserId').then(function(dd) {
		$scope.loading = $ionicLoading.show({
		  content: 'Obteniendo data...',
		  showBackdrop: true
		});
		
		$scope.local.user_id = dd;
		$http.get("http://antaminaseguridadvial.org/service.php?method=get_data_for_new_report", {params: { user_id:$scope.local.user_id }}).then(function(result){
			if(result.data.status == "ok") {
				$scope.lists = result.data.data;
				console.log($scope.lists, "--listas");
				
				$localForage.getItem('localBusinessId').then(function(d) {
					$scope.report.business_id = d;
				});
			} else {
				
			}
			$ionicLoading.hide();
		});
	});
	
	$scope.createReport = function() {
		$http.post("http://antaminaseguridadvial.org/service.php?method=create_report", $scope.report).then(function(result){
			console.log(result);
			if(result.data.status == "ok") {
				$ionicLoading.show({ template: 'Reporte creado', noBackdrop: false, duration: 3000 });
				$timeout(function(){
					$location.path("/tab/chats");
				}, 2500);
			} else {
				$ionicLoading.show({ template: 'Error al crear reporte. Falta ingresar información', noBackdrop: false, duration: 3000 });
			}
		});
	};
	
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
