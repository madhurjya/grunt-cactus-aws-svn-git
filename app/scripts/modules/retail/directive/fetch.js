(function() {
    'use strict';

    angular
        .module('retailDirective',['ui.bootstrap'])
        .directive('fetchPopup', fetchPopup);

    fetchPopup.$inject = ['$scope','$uibModal','$log'];
    function fetchPopup($scope, $uibModal, $log) {
        // Usage:
        //
        // Creates:
        //
        var fetchPopup = {
            bindToController: true,
            controller: fetchPopupCtrl,
            template:`<script type="text/ng-template" id="fetch.html">
        <div class="modal-header">
            <h3 class="modal-title">I'm a modal!</h3>
        </div>
        <div class="modal-body" ng-controller="fetchPopupCtrl as vm">
            <ul>
                <li ng-repeat="item in items">
                    <a href="#" ng-click="$event.preventDefault(); selected.item = item">{{ item }}</a>
                </li>
            </ul>
            Selected: <b>{{ selected.item }}</b>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" type="button" ng-click="vm.ok()">OK</button>
            <button class="btn btn-warning" type="button" ng-click="vm.cancel()">Cancel</button>
        </div>
    </script>"`,
            controllerAs: 'vm',
            link: link,
            restrict: 'AE',
            scope: {
            }
        };
        return fetchPopup;
        
        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    function fetchPopupCtrl () {
        this.ok  = function(){
            alert();
        }
    }
})();