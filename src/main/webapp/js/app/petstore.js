(function() {
  var app = angular.module('petstore', ['base-page', 'base-grid', 'pet-service', 'ui.bootstrap', 'kendo.directives']);

  app.controller('PageCtrl', ['$controller', '$scope', '$timeout', function($controller, $scope, $timeout) {
    $controller('BasePageCtrl', {$scope: $scope, $timeout: $timeout}); // inherit from BasePageCtrl
  }]);

  app.controller('PetModalCtrl', ['$scope', '$http', '$modalInstance', 'petService', 'pet', function($scope, $http, $modalInstance, petService, pet) {
    $scope.categories = petService.getCategories();
    $scope.statuses = petService.getStatuses();
    $scope.tags = petService.getTags();
    $scope.pet = pet;

    $scope.objectById = function(array, id) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id == id) {
                return array[i];
            }
        }
    };

    $scope.ok = function() {
        if (!$scope.petForm.$valid) {
            $scope.error = "Please fill in mandatory form fields.";
            return;
        }

        $scope.pet.photoUrls = [ $scope.pet.photoUrls0, $scope.pet.photoUrls1 ];
        $scope.pet.category = $scope.objectById($scope.categories, $scope.pet.category);
        var tags = [];
        for (var i = 0; i < $scope.pet.tags.length; i++) {
            var tag = $scope.objectById($scope.tags, $scope.pet.tags[i]);
            tags[i] = tag; 
        }
        $scope.pet.tags = tags;
        $scope.page = { "bodyMask": true };

        $http.post('/pet',
            $scope.pet
        ).success(function(data, status, headers, config) {
            if (!data) {
                $scope.error = 'Cannot access Pet service.';
                $scope.page.bodyMask = false;
                return;
            } else {
                $scope.pet.id = data.id;
                $scope.page.bodyMask = false;
                $modalInstance.close($scope.pet);
            }
        }).error(function(data, status, headers, config) {
            $scope.error = 'Cannot access Pet service.';
            $scope.page.bodyMask = false;
            return;
        });
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
  }]);

  app.controller('GridCtrl', ['$controller', '$scope', '$position', '$modal', '$http', 'petService', function($controller, $scope, $position, $modal, $http, petService) {
    $controller('BaseGridCtrl', {$scope: $scope}); // inherit from BaseGridCtrl

    $scope.openAddPetModal = function() {
        var modalInstance = $modal.open({
            templateUrl: 'petModal.html',
            controller: 'PetModalCtrl',
            resolve: {
                pet: function () {
                    return {
                        "title" : "Adding a pet",
                        "id" : -1
                    };
                }
            }
        });

        modalInstance.result.then(function (result) {
            var ds = $scope.petGrid.dataSource;
            ds.pushCreate(result);
            $scope.setAlert('success', 'Pet is created.', true);
        }, function () {
        });
    };

    $scope.openEditPetModal = function() {
        $http.get('/pet/' + $scope.getSelection(0)).success(function(data, status, headers, config) {
            if (!data) {
                $scope.error = 'Cannot access Pet service.';
                $scope.page.bodyMask = false;
                return;
            } else {
                $scope.pet = data;
                $scope.page.bodyMask = false;
                var modalInstance = $modal.open({
                    templateUrl: 'petModal.html',
                    controller: 'PetModalCtrl',
                    resolve: {
                        pet: function () {
                            $scope.pet.title = "Viewing pet";
                            $scope.pet.photoUrls0 = data.photoUrls[0];
                            $scope.pet.photoUrls1 = data.photoUrls[1];
                            $scope.pet.category = data.category.id;
                            var tags = [];
                            for (var i = 0; i < data.tags.length; i++) {
                                tags[i] = data.tags[i].id;
                            }
                            $scope.pet.tags = tags;
                            return $scope.pet;
                        }
                    }
                });
            }
        }).error($scope.reportError);
    };

    $scope.openDeletePetModal = function() {
        var modalInstance = $modal.open({
            templateUrl: 'confirmationModal.html',
            controller: 'ConfirmationModalCtrl',
            resolve: {
                message: function () {
                    return {
                        "title" : "Confirmation",
                        "text" : "Are you sure you want to delete selected pet?"
                    };
                }
            }
        });

        modalInstance.result.then(function (result) {
            $scope.page.bodyMask = true;
            $http.delete('/pet/' + $scope.getSelection(0)).success(function (data) {
                var ds = $scope.petGrid.dataSource;
                ds.remove(ds.get($scope.getSelection(0)));
                $scope.removeSelections();
                $scope.setAlert('success', 'Pet is deleted.', true);
            }).error($scope.reportError);
        }, function () {
        });
    };

    $scope.reportError = function(data, status, headers, config) {
        $scope.setAlert('danger', 'Cannot access Pet service.', true);
    };

    $scope.refreshPage = function() {
        $scope.clearAlerts();
        $scope.removeSelections();
        $scope.petGrid.dataSource.read();
    };

    $scope.mainGridOptions = {
        dataSource: {
            transport: {
  	            read: function (options) {
                    return $http.get('/petList'
                    ).success(function (data) {
                    	if (!data || data.length == 0) {
                            $scope.setAlert('warning', 'No records found.', true);
                            options.success([]);
                    	} else if (data[0].returnMsg) {
                            $scope.addAlert('danger', data[0].returnMsg, true);
                            options.success([]);
                    	} else {
                            $scope.clearAlerts();
                            options.success(data);
                            $scope.petGrid.dataSource.page(1);
                            $scope.petGrid.dataSource.sort({});
                    	}
                    }).error($scope.reportError);
                },
                dataType: "json"
            },
            schema: {
                model: {
                    id: "id",
                    fields: {
                        "name": { type: "string" },
                        "category.name": { type: "string" },
                        "status": { type: "string" },
                        "photoUrls": { type: "array" },
                        "tags": { type: "array" }
                    }
                }
            },
            pageSize: 10
        },
        toolbar: kendo.template($("#toolbarTemplate").html()),
        columnMenu: true,
        sortable: true,
        reorderable: false,
        resizable: true,
        pageable: {
            pageSizes: $scope.getPageSizeArray()
        },
        columns: [{
            field: "id",
            title: "&nbsp;",
            template: "<div class=\"text-center\"><input type=\"checkbox\" id=\"chb#=id#\" ng-checked=\"getSelections().indexOf(#=id#) > -1\" ng-click=\"toggleCheckbox(#=id#, '#=uid#');\"/></div>",
            headerAttributes: {"class":"grid-header-hidden-menu"},
            sortable: false,
            menu: false,
            width: 40
        },{
            field: "name",
            title: "Name"
        },{
            field: "category.name",
            title: "Category"
        },{
            field: "status",
            title: "Status"
        },{
            field: "photoUrls",
            title: "Photo Urls",
            sortable: false,
            menu: false,
            template: kendo.template($("#photoUrlsTemplate").html())
        },{
            field: "tags",
            title: "Tags",
            sortable: false,
            menu: false,
            template: kendo.template($("#tagsTemplate").html())
        }]
    };
  }]);

})();