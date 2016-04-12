/**
 * This file contains common base controllers that are used or inherited by grid controllers on different pages.
 */

(function() {
  var app = angular.module('base-grid', []);

  app.controller('BaseGridCtrl', ['$scope', function($scope) {
    $scope.grid = {
        selectedItemIds: [], // selections
        selectedUIds: [] // used for row highlights
    };

    $scope.removeSelections = function() {
        $scope.grid.selectedItemIds = [];
        $scope.grid.selectedUIds = [];
    };

    $scope.getSelections = function() {
        return $scope.grid.selectedItemIds;
    };

    $scope.getSelectionCount = function() {
        return $scope.grid.selectedItemIds.length;
    };

    $scope.getSelection = function(i) {
        return $scope.grid.selectedItemIds[i];
    };

    $scope.toggleCheckbox = function(itemId, uId) {
        $scope.toggleCheckboxOpt(itemId, uId, true);
    };

    $scope.toggleCheckboxOpt = function(itemId, uId, singleSelection) {
        var pos = $scope.grid.selectedItemIds.indexOf(itemId);
        if (pos === -1) {
            for (var i = 0; i < $scope.grid.selectedUIds.length; i++) {
                angular.element("tr[data-uid='" + $scope.grid.selectedUIds[i] + "']" ).removeClass("bg-selected");
            }
            if (singleSelection) {
                $scope.removeSelections();
            }
            $scope.grid.selectedItemIds.push(itemId);
            $scope.grid.selectedUIds.push(uId);
            angular.element("tr[data-uid='" + uId + "']" ).addClass("bg-selected");
        } else {
            $scope.grid.selectedItemIds.splice(pos, 1);
            $scope.grid.selectedUIds.splice($scope.grid.selectedUIds.indexOf(uId), 1);
            angular.element("tr[data-uid='" + uId + "']" ).removeClass("bg-selected");
        }
    };

    $scope.getPageSizeArray = function() {
        return [ 10, 20, 30, 50, 100 ];
    };
  }]);

  app.controller('ConfirmationModalCtrl', ['$scope', '$modalInstance', 'message', function($scope, $modalInstance, message) {
    $scope.message = message;
    $scope.ok = function() {
        $modalInstance.close(0);
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
  }]);

})();