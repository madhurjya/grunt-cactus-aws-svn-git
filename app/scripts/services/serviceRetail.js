/**
 * Created by Madhurjya on 6/21/2016.
 */
'use strict';
var isLocalEnv = true;
//var ip = "52.36.18.167";
//var ip = "52.38.174.233";
var ip = "52.36.207.255";

serviceAdmin.factory('serviceRetailProfile', function ($resource,$http) {
 
  return {
      materialGroup: function () {
      var URL = isLocalEnv ? "assets/data/getMaterialGroup.json" : "http://" + ip + "/RetailSvcWS/rest/:serviceUrl?branchId=:bid";
      return $resource(URL, null, {
        update: {
          method: 'POST',
          params: {},
          isArray: false,
          headers: {
            'Authorization': "Basic " + btoa('ujan' + ":" + 'ashish')
          }
        },
        get: {
          method: 'GET',
          params: {},
          isArray: false,
          headers: {
            'Authorization': "Basic " + btoa('ujan' + ":" + 'ashish'),
          }
        }
      })
    },
    materials: function () {
      var URL = isLocalEnv ? "assets/data/getAllMaterials.json" : "http://" + ip + "/RetailSvcWS/rest/:serviceUrl?branchId=:bid";
      return $resource(URL, null, {
        update: {
          method: 'POST',
          params: {},
          isArray: false,
          headers: {
            'Authorization': "Basic " + btoa('ujan' + ":" + 'ashish')
          }
        },
        get: {
          method: 'GET',
          params: {},
          isArray: false,
          headers: {
            'Authorization': "Basic " + btoa('ujan' + ":" + 'ashish'),
          }
        }
      })
    }
  }
});
