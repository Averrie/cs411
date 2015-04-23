// js/services/todos.js
angular.module('demoServices', [])
        .factory('CommonData', function($http, $window){
        var movieId = "";
        return{
            getMovieId : function(){
                return movieId;
            },

            setData : function(newUserId){
                movieId = newUserId;
            },

            getMovie: function (id) {
                return $http.get('http://162.243.192.110:4000/'+id);
            },

            getMovieByGenre: function (where) {
                return $http.get('http://162.243.192.110:4000'+where);
            },

            rate: function (rating) {
                return $http(
                    {
                        method: "POST",
                        url: "http://162.243.192.110:4000/rating",
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        data: rating
                    }
                )
            },

            avgRate: function (id) {
                return $http.get('http://162.243.192.110:4000/rating/'+id);
            }
        }
    })

    .factory('Movies', function($http, $window) {
        return {
            get : function() {
                return $http.get('http://162.243.192.110:4000');
            },

            post : function(movie) {
                return $http(
                    {
                        method: "POST",
                        url: "http://162.243.192.110:4000/",
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        data: movie
                    }
                )
            },

            delete : function(id) {
                return $http.delete('http://162.243.192.110:4000/'+id);
            },

            put : function(id, movie) {
                return $http(
                    {
                        method: "PUT",
                        url: "http://162.243.192.110:4000/" + id,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        data: movie
                    }
                )
            },

            resource: function() {
                return $resource('/:_id');
            }
        }
    })
    ;
