/**
 * Inspinia theme uses AngularUI Router to manage routing and views
 * Each view are defined as states.
 *
 */
function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/checkin");
    $stateProvider
        .state('checkin', {
            url: "/checkin",
            templateUrl: "views/checkIn.html",
            data: { pageTitle: 'Check In' }
        })
        .state('history', {
            url: "/history",
            templateUrl: "views/history.html",
            data: { pageTitle: 'View your History' }
        })
        .state('login',{
            url: "/login",
            templateUrl: "views/login.html",
            data: { pageTitle: 'login'}
        })
        .state('read', {
            url: '/read',
            templateUrl: 'views/read.html',
            data: { pageTitle: 'Read More'}
        })
        .state('profile',{
            url:'/profile',
            templateUrl: 'views/profile.html',
            data: { pageTitle: 'Profile'}
        })
        .state('discover',{
            url: '/discover',
            templateUrl: 'views/minor.html',
            data: {pageTitle: 'Discover New Activities'}
        })
        .state('love',{
            url: '/love',
            templateUrl: 'views/love.html',
            data: {pageTitle: 'Activities you Love'}

        })
        .state('rate',{
            url: '/rate',
            templateUrl: 'views/rate.html',
            data: {pageTitle: 'Rate Your Activities'}
        })
        .state('activity',{
            url: '/activity',
            templateUrl: 'views/activity.html',
            data: {pageTitle: 'View this Activity'}
        })
}
angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });