(function () {
  var app = angular.module("fakeAPI", []);

  app.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      "self",
      // Allow loading from outer templates domain.
      "https://jsonplaceholder.typicode.com/**",
    ]);
  });

  app.service("loadPosts", [
    "$http",
    "$q",
    function ($http, $q) {
      this.getData = function () {
        var d = $q.defer();
        $http.get("https://jsonplaceholder.typicode.com/posts").then(
          (data) => {
            d.resolve(data);
          },
          (error) => {
            d.reject(error);
          }
        );
        return d.promise;
      };
    },
  ]);

  app.controller("mainCtrl", [
    "$scope",
    "loadPosts",
    function ($scope, loadPosts) {
      $scope.dataPosts = {};
      $scope.serviceDataPosts = {};
      loadPosts
        .getData()
        .then(function (data) {
          $scope.serviceDataPosts = data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  ]);
})();
