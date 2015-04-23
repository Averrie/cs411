var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('FirstController', ['$scope', 'CommonData'  , function($scope, CommonData) {
    $scope.setData = function(newMovieId){
        CommonData.setData(newMovieId);
    };
}]);

demoControllers.controller('SecondController', function($scope, CommonData, Movies, $routeParams) {
    $scope.movieId = $routeParams.id;

    CommonData.getMovie($scope.movieId).success(function(detail){
        $scope.movie = detail;
        var movieGenre = $scope.movie.data.genre[1];
        var where = '?where={"genre": ' + JSON.stringify(movieGenre) + '}&skip='+JSON.stringify($scope.movie.data.rank)+'&limit=5';

        CommonData.getMovieByGenre(where).success(function(detail){
            $scope.recommendations = detail;
        });

        CommonData.avgRate($scope.movie.data._id).success(function(detail){
            $scope.avgRating = detail;
        });
    });

    $scope.refreshMovie = function() {
        CommonData.getMovie($scope.movieId).success(function(detail){
            $scope.movie = detail;
        });
    }

    $scope.rate = function () {
        var rating = $.param({
            "movieId": $scope.movie.data._id,
            "rating": $scope.ratingScore
        });

        CommonData.rate(rating)
            .success(function(data, status) {
                alert("successfully rated");
                $scope.status = status;
                $scope.message = "successfully rated";
            })
            .error(function(data, status) {
                alert("fail to rate");
                $scope.status = status;
                $scope.message = "fail to rate";
            });
    }

    $scope.calculateRate = function() {
        var sum = 0;
        var number = 0;
        //var temp = JSON.stringify($scope.avgRating)
        //console.log(temp);
        angular.forEach($scope.avgRating, function (t) {
            number++;
            sum += t.rating;
        })
        console.log(sum/number);
        $scope.result = sum/number;

        var movie = $.param({
            "title": $scope.movie.data.title,
            "rank": $scope.movie.data.rank,
            "genre": $scope.movie.data.genre,
            "director": $scope.movie.data.director,
            "actors": $scope.movie.data.actors,
            "plot": $scope.movie.data.plot,
            "country": $scope.movie.data.country,
            "rated":$scope.movie.data.rated,
            "released": $scope.movie.data.released,
            "runtime": $scope.movie.data.runtime,
            "awards": $scope.movie.data.awards,
            "imdbID": $scope.movie.data.imdbID,
            "imdbVotes": $scope.movie.data.imdbVotes,
            "imdbRating": $scope.result,
            "metascore": $scope.movie.data.metascore
        });

        Movies.put($scope.movie.data._id, movie)
            .success(function(data, status) {
                $scope.status = status;
                alert("update userrating");
                $scope.message = "sucessfully update movie";
            })
            .error(function(data, status) {
                $scope.status = status;
                alert("fail to update userrating");
                $scope.message = "title is already used";
            });

        console.log(movie);

        /*
        for (var i = 0; i < temp.length; i++)) {
            console.log(a);
            sum = sum + a.rating;
        }
        $scope.rateSum = sum;
        */
    }
});

demoControllers.controller('MovieListController', ['$scope', 'Movies', function($scope,  Movies) {
    $scope.orderProp = 'rank';
  Movies.get().success(function(data){
        $scope.movies = data;
  });

  $scope.deletemovie = function(id) {
      Movies.delete(id)
            .success(function() {
                Movies.get().success(function(data){
                  $scope.movies = data;
                });
                $scope.status = 'delete movie! Refreshing movie list.';
            })
            .error(function(error) {
                $scope.status = 'Unable to delete movie: ' + error.message;
            });
  }
}]);

demoControllers.controller('MovieUpdateController', function($scope, CommonData, $routeParams, Movies) {
    $scope.movieId = $routeParams.id;

    CommonData.getMovie($scope.movieId).success(function(detail){
        $scope.movie = detail;
    });

    $scope.movieupdate = function() {
        var movieGenre = $scope.movie.genre;
        var movie = $.param({
            "title": $scope.movie.title,
            "genre": movieGenre,
            "director": $scope.movie.director,
            "actors": $scope.movie.actors,
            "plot": $scope.movie.plot,
            "country": $scope.movie.country,
            "released": $scope.movie.released,
            "runtime": $scope.movie.runtime,
            "awards": $scope.movie.awards
        });


        Movies.put($scope.movieId, movie)
            .success(function(data, status) {
                $scope.movieId = CommonData.getMovieId();

                CommonData.getMovie($scope.movieId).success(function(detail){
                    $scope.movie = detail;
                    $scope.status = status;
                    $scope.message = "sucessfully update movie";
                });
            })
            .error(function(data, status) {
                $scope.status = status;
                $scope.message = "title is already used";
            });
    }

});

demoControllers.controller('AddMovieController', ['$scope', 'Movies', function($scope, Movies) {
    $scope.addmovie = function() {
        var movie = $.param({
            "title": $scope.movie.title,
            "rank": $scope.movie.rank,
            "genre": $scope.movie.genre
        });

        Movies.post(movie)
            .success(function(data, status) {
                $scope.status = status;
                $scope.message = "sucessfully added movie";
            })
            .error(function(data, status) {
                $scope.status = status;
                $scope.message = "title is already used";
            });
    }
}]);

demoControllers.controller('TaskListController', ['$scope', 'Tasks', function($scope, Tasks) {

    Tasks.get().success(function(data){
        $scope.tasks = data;
    });

}]);

demoControllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
        $window.sessionStorage.baseurl = $scope.url;
        $scope.displayText = "URL set";

  };

}]);


