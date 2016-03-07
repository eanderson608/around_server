'use strict';

angular.module('aroundServerApp.auth', [
  'aroundServerApp.constants',
  'aroundServerApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
