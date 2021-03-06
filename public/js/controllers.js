
/**
 * MainCtrl - controller
 */

function MainCtrl($scope,$http) {
    this.userName = "example user";
    this.helloText = 'Welcome to WagonTime';
    this.descriptionText = '';

    this.giveMessage = 'default';
    this.slideInterval = 5000;
    $http({
        method  : 'GET',
        url     : '/dailyScore',
        data    : {}  // pass in data as strings
    })
        .success(function(data) {
            if (!data.success) {
                alert('error, you must not be connected to the internet, try again later');
            } else{
                $scope.dailyScore = 0;
                $scope.dailyScore = $scope.dailyScore + (data.dailyScore.length * 5);

                angular.forEach(data.dailyScore, function(value){
                    if (value.rating){$scope.dailyScore = $scope.dailyScore + 2 }
                    if (value.note){$scope.dailyScore = $scope.dailyScore +2}
                });

            }
        });


}



function checkIn($scope,$http,$state){
    $scope.hideThis = "true";
    $scope.topMessage = "What are you up to?"
    $scope.getActivities = function(){
        $http({
            method  : 'POST',
            url     : '/myActivities',
            data    : {},  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        })
            .success(function(data) {
                if (!data.success) {
                    // if not successful, bind errors to error variables
                    alert('error, you must not be connected to the internet, try again later');
                } else{
                    $scope.myActivities = data.myActivities;
                    console.log(data)
                }
            })
    };
    $scope.flyOut = function(happy) {
            $http({
                method  : 'POST',
                url     : '/'+ happy,
                data    : {happiness:happy},  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
                .success(function(data) {
                    if (!data.success) {
                        // if not successful, bind errors to error variables
                        alert('error, you must not be connected to the internet, try again later');
                    } else {
                            switch (happy) {
                                case "ok":
                                    $scope.topMessage = "You're doing OK, let's make it better by doing an activity"
                                    break;
                            }
                        $('#bouncer').addClass("animated rotateOutUpLeft");
                        $('#outRight').addClass("animated rotateOutUpRight");
                        $('#bouncer').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            $('#bounceIn').show().addClass('animated rotateInDownRight');
                            $('#bouncer').hide();
                            $('#outRight').hide();

                            $http({
                                method: 'POST',
                                url: '/myActivities',
                                data: {},  // pass in data as strings
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                            })
                                .success(function (data) {
                                    if (!data.success) {
                                        alert('error, you must not be connected to the internet, try again later');
                                    } else {
                                        $scope.myActivities = data.myActivities;
                                        $http.get('/ratings').success(function (data) {
                                            angular.forEach($scope.myActivities, function (key, value) {
                                                angular.forEach(data.ratings, function (rkey, rvalue) {
                                                    if (rkey._id === key.activityName) {
                                                        if (rkey.Avg) {
                                                            key.rating = rkey.Avg;
                                                        } else {
                                                            key.rating = 0;
                                                        }
                                                    }
                                                });
                                            });
                                            $scope.predicate = '-rating';
                                            $scope.myRatings = data.ratings;
                                            angular.forEach($scope.myActivities, function (key, value) {
                                                if (!key.rating) {
                                                    key.rating = 0;
                                                }
                                            });
                                        })
                                    }
                                });
                        });
                    }
                })
    };
    $scope.addFeedback = function(feedback){

        $http({
            method  : 'POST',
            url     : '/feedback',
            data    : {feedback:feedback}  // pass in data as strings

        })
            .success(function(data) {
                if (!data.success) {
                    alert('error, you must not be connected to the internet, try again later');
                } else{


                }
            })
    };
    $scope.doActivity = function(activityID){
        $http({
            method  : 'POST',
            url     : '/do',
            data    : {activity:activityID}  // pass in data as strings

        })
            .success(function(data) {
                if (!data.success) {
                    alert('error, you must not be connected to the internet, try again later');
                } else{
                    $state.reload()
                   // $state('checkin');
                  //success function
                    //$('#bounceIn').addClass("animated rotateOutUpLeft");
                   // $('#bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                      //  $('#bounceIn').hide();
                        //$('#bouncer').show();
                            //.addClass('animated rotateInDownRight');
                     //   $('#outRight').show();
                            //.addClass('animated rotateInDownLeft');
                  //  })
                }
            })

    }
};

function chartJsCtrl($scope,$http) {
    /**
     * Data for Polar chart
     */
    $scope.polarData = [
        {
            value: 300,
            color:"#a3e1d4",
            highlight: "#1ab394",
            label: "App"
        },
        {
            value: 140,
            color: "#dedede",
            highlight: "#1ab394",
            label: "Software"
        },
        {
            value: 200,
            color: "#b5b8cf",
            highlight: "#1ab394",
            label: "Laptop"
        }
    ];
    /**
     * Options for Polar chart
     */
    $scope.polarOptions = {
        scaleShowLabelBackdrop : true,
        scaleBackdropColor : "rgba(255,255,255,0.75)",
        scaleBeginAtZero : true,
        scaleBackdropPaddingY : 1,
        scaleBackdropPaddingX : 1,
        scaleShowLine : true,
        segmentShowStroke : true,
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 2,
        animationSteps : 100,
        animationEasing : "easeOutBounce",
        animateRotate : true,
        animateScale : false
    };
    /**
     * Data for Doughnut chart
     */
    $scope.doghnutGreat =[];
    $scope.doghnutOK = [];
    $scope.doghnutNotSoGood = [];
    $scope.doghnutBad = [];

    /**
     * Options for Doughnut chart
     */

    /**
     * Data for Line chart
     */

    $http({
        method  : 'POST',
        url     : '/myHistory',
        data    : {},  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
        .success(function(data) {
            if (!data.success) {

                // if not successful, bind errors to error variables
                alert('error, you must not be connected to the internet, try again later');
            } else{
                $scope.labels = [];
                $scope.dataImported=[];

                $scope.myHistory = data.myHistory;
                angular.forEach($scope.myHistory, function(value, key) {
                    var newDate = new Date(value.createdOn);
                    var newDay =(newDate.getMonth()+1) + '-' + newDate.getDate() + '-' + newDate.getFullYear();
                    $scope.dataImported.push(value.type);
                    $scope.labels.push(newDay);

                    switch (value.type) {
                        case 5:
                          $scope.doghnutGreat.push(value.type);
                            break;
                        case 3:
                          $scope.doghnutOK.push(value.type);
                            break;
                        case 2:
                            $scope.doghnutNotSoGood.push(value.type);
                            break;
                        case 1:
                          $scope.doghnutBad.push(value.type);
                            break;
                    }

                });

                $scope.lineData = {
                    labels: $scope.labels,
                    datasets: [
                        {
                            label: "Mood",
                            fillColor: "rgba(0,255,0,0.3)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: $scope.dataImported
                        }
                    ]
                };

                /**
                 * Options for Line chart
                 */
                $scope.lineOptions = {
                    scaleShowGridLines : true,
                    scaleGridLineColor : "rgba(0,0,0,.05)",
                    scaleGridLineWidth : 1,
                    bezierCurve : true,
                    bezierCurveTension : 0.4,
                    pointDot : true,
                    pointDotRadius : 4,
                    pointDotStrokeWidth : 1,
                    pointHitDetectionRadius : 1,
                    datasetStroke : true,
                    datasetStrokeWidth : 2,
                    datasetFill : true
                };
                $scope.doughnutData = [
                    {
                        value: $scope.doghnutGreat.length,
                        color:"#00FF00",
                        highlight: "#339900",
                        label: "Great"
                    },
                    {
                        value: $scope.doghnutOK.length,
                        color: "#0000CC",
                        highlight: "#0000FF",
                        label: "OK"
                    },
                    {
                        value: $scope.doghnutNotSoGood.length,
                        color: "#FFFF99",
                        highlight: "#FFFF99",
                        label: "Not So Good"
                    },
                    {
                        value: $scope.doghnutBad.length,
                        color: "#FF0000",
                        highlight: "#FF3399",
                        label: "Miserable"

                    }
                ];
                $scope.doughnutOptions = {
                    segmentShowStroke : true,
                    segmentStrokeColor : "#fff",
                    segmentStrokeWidth : 2,
                    percentageInnerCutout : 45, // This is 0 for Pie charts
                    animationSteps : 100,
                    animationEasing : "easeOutBounce",
                    animateRotate : true,
                    animateScale : false,
                    legendTemplate: "<ul><li>test first thing</li>"


                };
            }
        });


    /**
     * Options for Bar chart
     */
    $scope.barOptions = {
        scaleBeginAtZero : true,
        scaleShowGridLines : true,
        scaleGridLineColor : "rgba(0,0,0,.05)",
        scaleGridLineWidth : 1,
        barShowStroke : true,
        barStrokeWidth : 2,
        barValueSpacing : 5,
        barDatasetSpacing : 1
    };

    /**
     * Data for Bar chart
     */
    $scope.barData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(26,179,148,0.5)",
                strokeColor: "rgba(26,179,148,0.8)",
                highlightFill: "rgba(26,179,148,0.75)",
                highlightStroke: "rgba(26,179,148,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    /**
     * Data for Radar chart
     */
    $scope.radarData = {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(26,179,148,0.2)",
                strokeColor: "rgba(26,179,148,1)",
                pointColor: "rgba(26,179,148,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    };

    /**
     * Options for Radar chart
     */
    $scope.radarOptions = {
        scaleShowLine : true,
        angleShowLineOut : true,
        scaleShowLabels : false,
        scaleBeginAtZero : true,
        angleLineColor : "rgba(0,0,0,.1)",
        angleLineWidth : 1,
        pointLabelFontFamily : "'Arial'",
        pointLabelFontStyle : "normal",
        pointLabelFontSize : 10,
        pointLabelFontColor : "#666",
        pointDot : true,
        pointDotRadius : 3,
        pointDotStrokeWidth : 1,
        pointHitDetectionRadius : 20,
        datasetStroke : true,
        datasetStrokeWidth : 2,
        datasetFill : true
    };


};

function rateCtrl($scope,$http,$state){
    $http({
        method  : 'GET',
        url     : '/unrated',
        data    : {},  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
        .success(function(data) {
            if (!data.success) {
                alert('error, you must not be connected to the internet, try again later');
            } else{
                if (data.myUnrated.length > 0){$scope.hideNo = true}
                $scope.myUnrated= data.myUnrated;
            }
        });
    $scope.rateOne = function(actID, rate){
        $http({
            method  : 'POST',
            url     : '/rate',
            data    : {activity: actID, rating: rate}  // pass in data as strings

        })
            .success(function(data) {
                if (!data.success) {
                    alert('error, you must not be connected to the internet, try again later');
                } else{
                //successful save]
                    $('#unrated'+ actID).hide();
                    $('#rated'+ actID).show();
                    $('#feelHide'+actID).hide();
                    $('#buttonBnc' +actID).addClass("animated rotateOutUpRight");
                    $('#buttonBnc' +actID).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                        function () {
                            $('#buttonBnc' + actID).hide();
                            $('#notesMove').removeClass("project-actions").addClass("project-completion")
                        });
                }
            });

    };
    $scope.refreshPage = function(){
        $state.reload();
    };
    $scope.addNotes = function(actID,note){
        $http({
            method  : 'POST',
            url     : '/note',
            data    : {activity: actID, note: note}  // pass in data as strings

        })
            .success(function(data) {
                if (!data.success) {
                    alert('error, you must not be connected to the internet, try again later');
                } else{
                    //successful save
                    $("#noted" + actID).show();
                    $('#notesMove' +actID).addClass("animated rotateOutUpRight");
                   // $('#notesMove' +actID).hide();

                }
            });


    }
}

function activityCtrl($scope,$http,$rootScope,$state,$filter) {
    $http({
        method: 'POST',
        url: '/myActivities',
        data: {}  // pass in data as strings
    })
        .success(function (data) {
            if (!data.success) {
                // if not successful, bind errors to error variables
                alert('error, you must not be connected to the internet, try again later');
            } else {
                $scope.myActivities = data.myActivities;
                $http.get('/ratings').success(function (data) {

                    angular.forEach($scope.myActivities, function (key, value) {
                        angular.forEach(data.ratings, function (rkey, rvalue) {
                            if (rkey._id === key.activityName) {
                                if (rkey.Avg) {
                                    key.rating = rkey.Avg;
                                } else {
                                    key.rating = 0;
                                }
                            }
                        });
                    });
                });
                            $scope.predicate = '-rating';

                            $scope.myRatings = data.ratings;
                            angular.forEach($scope.myActivities, function(key,value){
                                if (!key.rating){
                                    key.rating = 0;
                                }
                            })
                        }
                    });


    $scope.goToActivity = function(act){
        $rootScope.activityViewing = act;
        $state.go('activity');
    };
    $scope.doActivity = function(activityID) {

        $http({
            method: 'POST',
            url: '/do',
            data: {activity: activityID}  // pass in data as strings

        })
            .success(function (data) {
                if (!data.success) {
                    alert('error, you must not be connected to the internet, try again later');
                } else {
                    $state.go('rate');


                }
            })
    }
    };

function activityDetailCtrl($scope,$http,$filter,$state,$rootScope) {
   //pull the activity name from the root scope
    $scope.thisActivity = $rootScope.activityViewing.activityName;
    $scope.actObject = $rootScope.activityViewing;
    $scope.todayAct = new Date();
    //get the rating for this activity
    $http({
        method: 'POST',
        url: '/oneRating',
        data: {activity: $scope.thisActivity }  // pass in data as strings
    })

        .success(function (data) {
            if (!data.success) {
                // if not successful, bind errors to error variables
                alert('error, you must not be connected to the internet, try again later');
            } else {
                if (!data.ratings[0]) {
                    $scope.totalRating = 'Not Rated Yet';
                    $scope.notRated = true;
                } else {
                  $scope.totalRating = data.ratings[0].Avg + '%';
                }
          }});
    //get the notes
    $http({
        method: 'POST',
        url: '/getNotes',
        data: {activity: $scope.thisActivity }  // pass in data as strings
    })
        .success(function (data) {
            if (!data.success) {
                // if not successful, bind errors to error variables
                alert('error, you must not be connected to the internet, try again later');
            } else {
                if (!data.notes) {
                    $scope.notes = "You haven't tried this activity yet";

                } else {
                   $scope.notes = data.notes;
                    $scope.timesDone = $scope.notes.length;
                }
            }});
}


function profileCtrl($scope,$http) {
    $scope.newPassword = function () {
        if ($scope.newP === $scope.confirmedPassword) {
            $http({
                method: 'POST',
                url: '/newPass',
                data: {newPassword: $scope.newP }  // pass in data as strings
            })
                .success(function (data) {
                    if (!data.success) {
                        // if not successful, bind errors to error variables
                        alert('error, you must not be connected to the internet, try again later');
                    } else {
                        $scope.successMessage = "Your Password has been changed"
                        $scope.newP = '';
                        $scope.confirmedPassword = '';
                    }

                })

        } else {
            $scope.successMessage = "Your Passwords don't match"
        }

    }
}

angular
    .module('inspinia')
    .controller('MainCtrl ', MainCtrl)
    .controller('checkIn', checkIn)
    .controller('rateCtrl', rateCtrl)
    .controller('activityCtrl', activityCtrl)
    .controller('activityDetailCtrl', activityDetailCtrl)
    .controller('chartJsCtrl', chartJsCtrl)
    .controller('profileCtrl', profileCtrl);