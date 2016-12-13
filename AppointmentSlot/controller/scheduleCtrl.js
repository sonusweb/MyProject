var scheduleApp = angular.module("scheduleApp", []);
scheduleApp.controller("scheduleCtrl",['$scope', '$http',  '$window',
            function ($scope, $http,  $window) {
                $scope.date = new Date();
                $scope.appointments = [];
                $scope.name = '';
                $scope.phone = '';
                $scope.slots = [];
                //Used for json test
                //$http.get('appointment.json').success(function (data) {
                //    $scope.appointments = data;
                //});

                var data = {};
                $http.get('http://localhost:8080/api/appointment',data).then(response=> {
                        $scope.appointments=response.data;
                       
                    });
       
              
                    $scope.openWindow = function (name,phone) {
                        $scope.name = name;
                        $scope.phone = phone;
                        $window.ScopeToShare = $scope;
                        $window.open('../view/addAppointment.html', "width=400,height=400");
                    };

               
       
      
}]);