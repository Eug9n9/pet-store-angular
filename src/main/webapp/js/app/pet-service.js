(function() {
  var service = angular.module('pet-service', []).service('petService', function() {

    this.getCategories = function() {
        return [{
            id: 1,
            name: "Category 1"
        },{
            id: 2,
            name: "Category 2"
        }];
    };

    this.getStatuses = function() {
        return [
            "available",
            "pending",
            "sold"
        ];
    };

    this.getTags = function() {
        return [{
            id: 1,
            name: "Tag 1"
        },{
            id: 2,
            name: "Tag 2"
        },{
            id: 3,
            name: "Tag 3"
        },{
            id: 4,
            name: "Tag 4"
        }];
    };
  });
})();