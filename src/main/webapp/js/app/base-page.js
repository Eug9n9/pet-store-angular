/**
 * This file contains common base controllers that are used or inherited by page controllers on different pages.
 */

(function() {
  var app = angular.module('base-page', []);

  app.controller('BasePageCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
    $scope.page = {
        alerts: [],
        bodyMask: false
    };

    $scope.setAlert = function(type, msg, closeable) {
        $scope.clearAlerts();
        $scope.addAlert(type, msg, closeable);
    };

    $scope.addAlert = function(type, msg, closeable) {
        $scope.page.bodyMask = false;
        var time = new Date();
        $scope.page.alerts.push({'time': time, 'type': type, 'msg': msg, 'closeable': closeable});
        if ('success' == type) {
            $timeout(function() {
                for (var i = $scope.page.alerts.length - 1; i >= 0; i--) {
                    var a = $scope.page.alerts[i];
                    if (a.time == time) {
                        $scope.page.alerts.splice(i, 1);
                        break;
                    }
                }
            }, 5000);
        }
    };

    $scope.closeAlert = function(time) {
        for (var i = $scope.page.alerts.length - 1; i >= 0; i--) {
            var a = $scope.page.alerts[i];
            if (time == a.time) {
                $scope.page.alerts.splice(i, 1);
                break;
            }
        }
    };

    $scope.clearAlerts = function() {
        for (var i = $scope.page.alerts.length - 1; i >= 0; i--) {
            var a = $scope.page.alerts[i];
            if ("success" != a.type) {
                $scope.page.alerts.splice(i, 1);
            }
        }
    };
  }]);

})();