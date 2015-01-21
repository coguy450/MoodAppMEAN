/**
 * Created by erichartmann on 1/19/15.
 */



var module = angular.module('inspinia');

module.service('getData', function ($http) {


    this.getting = function(url,outbound){
    var request= $http({
            method: 'GET',
            url: url,
            data: outbound
        })
     .success(function (data) {
                if (!data.success) {
                    // if not successful, bind errors to error variables
                    alert('error, you must not be connected to the internet, try again later');
                } else {

                }
            });
            return request.success;

    };


});



/*

function getData ($http) {


    this.posting = function(url,outbound){
        $http({
            method: 'POST',
            url: url,
            data: outbound
        })
            .success(function (data) {
                if (!data.success) {
                    // if not successful, bind errors to error variables
                    alert('error, you must not be connected to the internet, try again later');
                } else {
                    return data
                    }
            })
    };

}

angular
    .module('inspinia')
    .service('getData ', getData);*/
