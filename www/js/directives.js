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
		kml_gps = new google.maps.KmlLayer('http://antaminaseguridadvial.org/visor/app/pativilca_conococha/GPS_PE-16_PATIVILCA_CONOCOCHA/doc.kml');
		kml_gps.setOptions({preserveViewport:false});
		kml_gps.setMap(map);
		
		kml_km = new google.maps.KmlLayer('http://antaminaseguridadvial.org/visor/app/pativilca_conococha/KM_PE-16_PATIVILCA_CONOCOCHA/doc.kml');
		kml_km.setOptions({preserveViewport:false});
		kml_km.setMap(map);
		
		kml_pe = new google.maps.KmlLayer('http://antaminaseguridadvial.org/visor/app/pativilca_conococha/PE-16_PATIVILCA_CONOCOCHA/doc.kml');
		kml_pe.setOptions({preserveViewport:false});
		kml_pe.setMap(map);
		
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
