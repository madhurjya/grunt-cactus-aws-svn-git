/**
 * Created by Madhurjya on 6/13/2016.
 */



(function() {
'use strict';
  angular
    .module('retail', ['bankModel','ngMaterial','ngMaterialDatePicker'])
    .controller('retailController', retailController);

  retailController.$inject = ['$http','$rootScope','$timeout','$mdSidenav','$log','$mdToast','serviceRetailProfile','$interval','$mdDialog',];
  function retailController($scope, $http, $rootScope, $timeout, $mdSidenav, $log, $mdToast, serviceRetailProfile, $interval, $mdDialog) {
    var vm = this;

    this. materialGroupService =  serviceRetailProfile.materialGroup();

    activate();

    ////////////////
   
    function activate() {
      this.materialGroupService.get({
          "serviceUrl": "getMaterialGroup",
          "bid": "1"
        }, function(data) {
          this.model.materialGroups = data.branchBean.materialGroups;
        });
     }

      this.sampleAction = function(name, ev) {
        $mdDialog.show($mdDialog.alert()
          .title(name)
          .textContent('You triggered the "' + name + '" action')
          .ok('Great')
          .targetEvent(ev)
        );
      };


  this.addMaterialGroupMaterial = function(sec) {
          if (this.model.materialGroups[0].name !== undefined && this.model.materialGroups[0].glcode !== undefined && sec === "group") {
            this.model.materialGroups.unshift({
              "materialGrpId": 0
            });
            this.editMaterialGroup("group", this.model.materialGroups[0]);
          } else if (this.modelMaterial.materials[0].name !== undefined && this.modelMaterial.materials[0].glcode !== undefined && sec === "material") {
            this.modelMaterial.materials.unshift({
              "id": this.modelMaterial.materials.length
            });
            this.editMaterialGroup("material", this.modelMaterial.materials[0]);
          }
        }
//inline editable code
      this.modelMaterial = {
        materials: [{
          id: 0,
          name: "Ben",
          glcode: 28
        }, {
          id: 1,
          name: "Sally",
          glcode: 24
        }, {
          id: 2,
          name: "John",
          glcode: 32
        }, {
          id: 3,
          name: "Jane",
          glcode: 40
        }],
        selected: {}
      };

      this.model = {
        materialGroups: [],
        selected: {}
      };


        // gets the template to ng-include for a table row / item
      this.getTemplate = function(sec, material) {
        if (sec === 'material') {
          if (material.id === this.modelMaterial.selected.id) return 'editMat';
          else return 'displayMat';
        } else if (sec === 'group') {
          if (material.materialGrpId === this.model.selected.materialGrpId) return 'edit';
          else return 'display';
        }

      };


     this.editMaterialGroup = function(sec, material) {
        if (sec === "material") {
          this.modelMaterial.selected = angular.copy(material);
        } else if (sec === "group") {
         this.model.selected = angular.copy(material);
        }

      };

      this.saveMaterialGroup = function(sec, idx) {
        if (sec === "material") {
         this.modelMaterial.materials[idx] = angular.copy(this.modelMaterial.selected);
          this.reset("material");

        } else if (sec === "group") {
         this.model.materialGroups[idx] = angular.copy(this.model.selected);
          this.reset("group");
        }

      };

      this.reset = function(sec) {  ``
        if (sec === "material") {
          this.modelMaterial.selected = {};
        } else if (sec === "group") {
          this.model.selected = {};
        }

      };

  }
})();





/*

angular.module('retail', ['bankModel', 'ngMaterial', 'ngMaterialDatePicker'])
  .controller('retailController', ['$scope',
    '$http',
    '$rootScope',
    '$timeout',
    '$mdSidenav',
    '$log',
    '$mdToast',
    'serviceRetailProfile',
    '$interval',
    '$mdDialog',
    function($scope, $http, $rootScope, $timeout, $mdSidenav, $log, $mdToast, serviceRetailProfile, $interval, $mdDialog) {

      
     


      
    
      


     
     



    }
  ])*/