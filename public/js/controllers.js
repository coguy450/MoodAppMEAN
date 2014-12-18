/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2014 Webapplayers.com
 *
 */


/**
 * MainCtrl - controller
 */

function MainCtrl() {

    this.userName = 'Example user';
    this.helloText = 'Welcome to WagonTime';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';
    this.giveMessage = 'default';
};


function checkIn($scope,$http,$animate){
    $scope.hideThis = "true";

    $scope.testThis =function(){
        alert("bango");

    };

        $scope.flyOut = function() {
            $http({
                method  : 'POST',
                url     : '/great',
                data    : {},  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
                .success(function(data) {
                    console.log(data);
                    if (!data.success) {
                        // if not successful, bind errors to error variables
                     alert('error, you must not be connected to the internet, try again later');

                    } else {

                        $('#bouncer').addClass("animated rotateOutUpLeft");
                        $('#bouncer').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                           $('#bouncer').hide();
                            $('#bounceIn').show().addClass('animated rotateInDownRight');
                        });

                    }

                });

        };


}

angular
    .module('inspinia')
    .controller('MainCtrl ', MainCtrl)
    .controller('checkIn', checkIn);