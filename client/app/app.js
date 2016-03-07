'use strict';

angular.module('aroundServerApp', [
  'aroundServerApp.auth',
  'aroundServerApp.admin',
  'aroundServerApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
