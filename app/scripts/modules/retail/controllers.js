 /**
 * Created by Madhurjya on 6/13/2016.
 */
(function() {
'use strict';
  angular
    .module('retail', ['bankModel','ngMaterial','ngMaterialDatePicker','retailDirective'])
    .controller('retailController', retailController);

  retailController.$inject = ['$scope','$http','$rootScope','$timeout','$mdSidenav','$log','$mdToast','serviceRetailProfile','$interval','$mdDialog'];
  function retailController($scope, $http, $rootScope, $timeout, $mdSidenav, $log, $mdToast, serviceRetailProfile, $interval, $mdDialog) {
    var vm = this;

    vm.materialGroupService =  serviceRetailProfile.materialGroup();
    vm.materialService =  serviceRetailProfile.materials();
    activate();
   function activate() {
      vm.materialGroupService.get({
          "serviceUrl": "getMaterialGroup",
          "bid": "1"
        }, function(data) {
          vm.model.materialGroups = data.branchBean.materialGroups;
          vm.modelMaterial.materials = data.branchBean.materialGroups;
        });

        
     }
      
     
      vm.sampleAction = function(name, ev) {
        $mdDialog.show($mdDialog.alert()
          .title(name)
          .textContent('You triggered the "' + name + '" action')
          .ok('Great')
          .targetEvent(ev)
        );
      };


  vm.addMaterialGroupMaterial = function(sec) {
          if (vm.model.materialGroups[0].name !== undefined && vm.model.materialGroups[0].glcode !== undefined && sec === "group") {
            vm.model.materialGroups.unshift({
              "materialGrpId": 0
            });
            vm.editMaterialGroup("group", vm.model.materialGroups[0]);
          } else if (vm.modelMaterial.materials[0].name !== undefined && vm.modelMaterial.materials[0].glcode !== undefined && sec === "material") {
            vm.modelMaterial.materials.unshift({
              "id": vm.modelMaterial.materials.length
            });
            vm.editMaterialGroup("material", vm.modelMaterial.materials[0]);
          }
        }
//inline editable code
      vm.modelMaterial = {
        materials: [],
        selected: {}
      };

      vm.model = {
        materialGroups: [],
        selected: {}
      };


        // gets the template to ng-include for a table row / item
      vm.getTemplate = function(sec, material) {
        if (sec === 'material') {
         if (material.materialGrpId === vm.model.selected.materialGrpId) return 'editMat';
          else return 'displayMat';
        } else if (sec === 'group') {
          if (material.materialGrpId === vm.model.selected.materialGrpId) return 'edit';
          else return 'display';
        }

      };


     vm.editMaterialGroup = function(sec, material) {
        if (sec === "material") {
          vm.modelMaterial.selected = angular.copy(material);
        } else if (sec === "group") {
         vm.model.selected = angular.copy(material);
        }

      };

      vm.saveMaterialGroup = function(sec, idx) {
        if (sec === "material") {
         vm.modelMaterial.materials[idx] = angular.copy(vm.modelMaterial.selected);
          vm.reset("material");

        } else if (sec === "group") {
         vm.model.materialGroups[idx] = angular.copy(vm.model.selected);
          vm.reset("group");
        }

      };

      vm.reset = function(sec) {  ``
        if (sec === "material") {
          vm.modelMaterial.selected = {};
        } else if (sec === "group") {
          vm.model.selected = {};
        }

      };

  }
})();
