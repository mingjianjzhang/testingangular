'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('testingangularApp'));

  var MainCtrl;
  var scope;
  var serviceApi;
  var apiService; // $http dependent
  // these are used to mock the .then() function ($q). create a promise, and then resolve it.
  var q;
  var deferred;
  // variables used to hold the data that we'll be sending back and forth
  var settings;
  var status;
  var profiles;


beforeEach(function () {
        settings = {"netbiosName": "DIYController", "minutesBetweenNTPUpdate": "600000", "ntpServerName": "pool.ntp.org", "historyFilename": "temperatures.txt", "timeZoneOffset": "0", "temperatureOffset": "10", "minutesBetweenReadings": "600000", "enableDHCP": "true", "staticIPAddress": "0.0.0.0", "subnetMask": "255.255.255.0", "defaultGateway": "0.0.0.0", "primaryDNSAddress": "192.168.1.1", "secondaryDNSAddress": "0.0.0.0", "voltageReference": "3.3", "padResistance": "10000", "resistanceRT": "10000", "coefficientA": "0.003354016", "coefficientB": "0.0002744032", "coefficientC": "0.000003666944", "coefficientD": "0.0000001375492", "kpValue": "400", "kiValue": "435.56", "kdValue": "0"};
        status = {"timeOfReading": "11\/29\/2011 04:09:31", "temperatureCelsius": "21.174", "temperatureFahrenheit": "70.112", "isHeating": "True", "pidOutput": "50", "setTemperature": "154.0", "currentMashStep": "0", "currentMashTemp": "154", "currentMashTime": "10"};
        profiles = [{mashTemperature: 120, mashStepLength:20},{mashTemperature: 135, mashStepLength:20},{mashTemperature: 154, mashStepLength:60},{mashTemperature: 170, mashStepLength:20}];
        // I would think that this would eventually be replaced by the actual factory, something along the lines of a $service to be injected. This is just the skeleton to be used for the first unit tests before the service is actually implemented.
        apiService = {
            getSettings: function () {
                deferred = q.defer();
                return deferred.promise;
            },
            updateSettings: function (settings) {
                return;
            },
            getStatus: function () {
                deferred = q.defer();
                return deferred.promise;
            },
            updateTargetTemperature: function (target) {
                return;
            },
            getMashProfile: function() {
                deferred = q.defer();
                return deferred.promise;
            },
            updateMashProfile: function(profile){
                return;
            }
        };
    });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    q = $q;
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      // second paramter that would be sent to controlller when instantiated($scope, apiService)
      backendService: apiService
      // place here mocked dependencies
    });
  }));

  it('should request the current status when created', function(){
      // spy on the object in a certain method
      spyOn(apiService, 'getStatus').and.callThrough();
      // assumes the existence of a function that loads all the initialization settings
      scope.init();
      expect(apiService.getStatus).toHaveBeenCalled();

  });

  it('should save the retrieved status in currentStatus on the scope', function(){
      scope.init();
      expect(scope.currentStatus).not.toBe(undefined);
  });
  it('currentStatus should have the current temperature in Celsius', function(){
      scope.init();

      expect(scope.currentStatus.temperatureCelsius).toBe("21.174")
  })
});
