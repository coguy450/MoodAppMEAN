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
    this.slideInterval = 5000;


};


function checkIn($scope,$http){

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
                    console.log(data);
                    $scope.myActivities = data.myActivities;

                }
            })
    };
    $scope.hideThis = "true";
        $scope.flyOut = function(happy) {
            $http({
                method  : 'POST',
                url     : '/'+ happy,
                data    : {happiness:happy},  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
                .success(function(data) {
                    console.log(data);
                    if (!data.success) {
                        // if not successful, bind errors to error variables
                     alert('error, you must not be connected to the internet, try again later');
                    } else {
                        $('#bouncer').addClass("animated rotateOutUpLeft");
                        $('#outRight').addClass("animated rotateOutUpRight");
                        $('#bouncer').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            $('#bounceIn').show().addClass('animated rotateInDownRight');
                            $('#bouncer').hide();
                            $('#outRight').hide();
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
                                        console.log(data);
                                        $scope.myActivities = data.myActivities;

                                    }
                                })
                        });
                    }
                });
        };
}

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


angular
    .module('inspinia')
    .controller('MainCtrl ', MainCtrl)
    .controller('checkIn', checkIn)
    .controller('chartJsCtrl', chartJsCtrl);