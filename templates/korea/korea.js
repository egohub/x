
angular.module('app.korea', [])


.controller('koreaCtrl', KoreaCtrl)
.controller('koreaWatchCtrl', koreaWatchCtrl)


function KoreaCtrl($scope, $log, $timeout, config, DataLoader) {

        var singlePostApi = 'https://moviechannel.herokuapp.com/xxx';
        $scope.moreItems = false;

        $scope.loadPosts = function() {

        // Get all of our posts
        DataLoader.get('https://moviechannel.herokuapp.com/xxx/page/1').then(function(response) {

            $scope.posts = response.data;

            $scope.moreItems = true;

            console.log( response.data);

        }, function(response) {
            console.log( response.data);
        });

        }
        $scope.loadPosts();
        paged = 2;
        $scope.loadMore = function() {
        if (!$scope.moreItems) {
            return;
        }
        var pg = paged++;
        console.log('loadMore ' + pg);
        $timeout(function() {

            DataLoader.get(singlePostApi + '/page/' + pg).then(function(response) {
                angular.forEach(response.data, function(value, key) {
                    $scope.posts.push(value);
                });
                if (response.data.length <= 0) {
                    $scope.moreItems = false;
                }
            }, function(response) {
                $scope.moreItems = false;
                $log.error(response);
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.resize');
        }, 1000);
        }
        $scope.moreDataExists = function() {
        return $scope.moreItems;
        }

        $scope.doRefresh = function() {
        $timeout(function() {
            $scope.loadPosts();
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
        };
    }


    function koreaWatchCtrl($scope, $stateParams, DataLoader, config) {
        DataLoader.get('https://moviechannel.herokuapp.com/xxx/' + $stateParams.id).then(function(resp) {
            $scope.news = resp.data;
        });
    }
