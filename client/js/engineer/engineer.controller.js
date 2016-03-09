(function() {
    'use strict';

    angular
        .module('app.engineer')
        .controller('engineerCtrl', engineerCtrl);

    engineerCtrl.$inject = ['geolocation', '$http', 'gmapsService', '$rootScope', '$scope'];

    /* @ngInject */
    function engineerCtrl(geolocation, $http, gmapsService, $rootScope, $scope) {
        var vm = this;
        vm.title = 'engineerCtrl';
        vm.createUser = createUser;
        vm.getLocationHtml = getLocationHtml;

        activate();

        ////////////////

        function activate() {
        	vm.engineer = {};
        	vm.engineer.latitude = 39.500;
        	vm.engineer.longitude = -98.350;
            $rootScope.$on("clicked", function(){

                // Run the gservice functions associated with identifying coordinates
                $scope.$apply(function(){
                    vm.engineer.latitude = parseFloat(gmapsService.clickLat).toFixed(3);
                    vm.engineer.longitude = parseFloat(gmapsService.clickLong).toFixed(3);
                    vm.engineer.htmlverified = "Nope";
                });
            });

            getLocationHtml();

        }

        function getLocationHtml() {
            geolocation.getLocation().then(function(data){

                // Set the latitude and longitude equal to the HTML5 coordinates
                var coords = {lat:data.coords.latitude, long:data.coords.longitude};

                // Display coordinates in location textboxes rounded to three decimal points
                vm.engineer.longitude = parseFloat(coords.long).toFixed(3);
                vm.engineer.latitude = parseFloat(coords.lat).toFixed(3);

                // Display message confirming that the coordinates verified.
                vm.engineer.htmlverified = "Yep";

                gmapsService.refresh(vm.engineer.latitude, vm.engineer.longitude);

            });
        }


        function createUser() {
        	var engineer = {
        		username: vm.engineer.username,
        		skill: vm.engineer.skill,
        		location: [vm.engineer.longitude, vm.engineer.latitude],
        		htmlverified: vm.engineer.htmlverified
        	}

        	console.log(engineer);

        	$http.post('/engineers', engineer)
        		.success(function(data) {
        			vm.engineer.username = ""
        			vm.engineer.skill = ""

        			gmapsService.refresh(vm.engineer.latitude, vm.engineer.longitude);
        		})
        		.error(function(data) {
        			console.log("Error: " + data)
        		});
        }
    }
})();