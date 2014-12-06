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
    this.helloText = 'Welcome to Wagon Time';
    this.descriptionText = 'This is WagonTime 2.0, we are going to build a really cool application';

};


angular
    .module('inspinia')
    .controller('MainCtrl ', MainCtrl);
