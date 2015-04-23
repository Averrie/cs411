// var demoApp = angular.module('demoApp', ['demoControllers']);

var demoApp = angular.module('demoApp', ['ngRoute', 'demoControllers', 'demoServices', '720kb.datepicker']);

demoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/movielist', {
    templateUrl: 'partials/movielist.html',
    controller: 'MovieListController'
  }).
  when('/moviegallery', {
          templateUrl: 'partials/moviegallery.html',
          controller: 'MovieGalleryController'
  }).
  when('/movielist/addmovie', {
      templateUrl: 'partials/addmovie.html',
      controller: 'AddMovieController'
  }).
  when('/movielist/moviedetail/:id', {
      templateUrl: 'partials/moviedetail.html',
      controller: 'SecondController'
  }).
  when('/movielist/moviedetail/:id/movieupdate', {
      templateUrl: 'partials/movieupdate.html',
          controller: 'MovieUpdateController'
  }).
      otherwise({
    redirectTo: '/movielist'
  });
}]);