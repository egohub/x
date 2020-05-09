angular.module('app.controllers', [])

      
.controller('menuCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {


}])
   
.controller('watchCtrl', ['$scope', '$stateParams', 'DataLoader',
    function($scope, $stateParams, DataLoader) {
        //https://untitled-d7a4ca7dqc5s.runkit.sh/yadi/?url=
        DataLoader.get('https://moviechannel.herokuapp.com/yadi?url=' + $stateParams.id).then(function(response) {
            $scope.data = response.data;
            console.log(response)
        });
    }
])
   

   
.controller('settingCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {


}])
   
.controller('aboutCtrl', ['$scope', '$stateParams', 'movieService',
function ($scope, $stateParams, movieService) {
        $scope.getSampleData = function () {
            movieService.getSampleList().then(function (result) {
                $scope.sample = result;
            }, function (error) {
                console.log(error.statusText);
            });
        }
    

}])
   
   