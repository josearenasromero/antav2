angular.module('starter.directives', [])

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(-9.85761,-76.880577),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        var map = new google.maps.Map($element[0], mapOptions);
        $scope.onCreate({map: map});
		kml_ruta = new google.maps.KmlLayer('http://antaminaseguridadvial.org/visor/lima_pativilca/Ruta/doc.kml');
		kml_ruta.setOptions({preserveViewport:false});
		kml_ruta.setMap(map);
		
		kml_riesgo = new google.maps.KmlLayer('http://antaminaseguridadvial.org/visor/lima_pativilca/Riesgo/doc.kml');
		kml_riesgo.setOptions({preserveViewport:false});
		kml_riesgo.setMap(map);
		
        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});
