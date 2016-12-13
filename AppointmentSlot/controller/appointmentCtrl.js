
var scheduleApp = angular.module("scheduleApp", ["ngStorage"]);

scheduleApp.controller("appointmentCtrl", function ($scope, $element, $window, $http) {
    //Get data from parent page

    ParentScope = $window.opener.ScopeToShare;
    $scope.name = ParentScope.name;
    $scope.phone = ParentScope.phone;
    $scope.date = ParentScope.date;
    $scope.time = ParentScope.time;
    $scope.status = ParentScope.status;


    //  This close function doesn't need to use jQuery or bootstrap, because
    //  the button has the 'data-dismiss' attribute.
    $scope.close = function (name, phone) {
        $window.close({
            name: $scope.name,
            phone: $scope.phone
        }, 500); // close, but give 500ms for bootstrap to animate
    };

    //  This cancel function must use the bootstrap, 'modal' function because
    //  the doesn't have the 'data-dismiss' attribute.
    $scope.cancel = function () {

        //  Manually hide the modal.
        $element.modal('hide');

        //  Now call close, returning control to the caller.
        $window.close({
            name: $scope.name,
            phone: $scope.phone
        }, 500); // close, but give 500ms for bootstrap to animate
    };



    var data = {};
    $http.get('http://localhost:8080/api/appointment', data).then(response=> {
        $scope.appointments = response.data;
    });


    $scope.addAppointment = function () {

        angular.forEach($scope.appointments, function (name, phone, date, time) {
            if ($scope.name == name && $scope.phone == phone) {
                date = $scope.date;
                time = $scope.time;
                $scope.appointments.name = $scope.name;
                $scope.appointments.phone = $scope.phone;
                $scope.appointments.status = "true";
            }
            else if($scope.date == date && $scope.time == time)
            {
                alert("Slot not available");
            }
            else if(name == "" & phone =="")
            {
                $scope.appointments.remove($scope.appointment);
            }
            else {
                $scope.appointment = [{
                    date: $scope.date,
                    time: $scope.time,
                    name: $scope.name,
                    phone: $scope.phone,
                    status: "true"
                }];
                $scope.appointments = $scope.appointments.concat($scope.appointment);
            }
        });
        $http.post('http://localhost:8080/api/appointment/add', $scope.appointments).then(response=> {
            $scope.appointments = response.data;
        });

        $window.close({
            name: $scope.name,
            phone: $scope.phone
        }, 500); // close, but give 500ms for bootstrap to animate
    };

});