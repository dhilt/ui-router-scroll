var myApp = angular.module('routerScroll', ['ui.router', 'ui.scroll', 'ui.scroll.jqlite']);

myApp.config(function($stateProvider) {
  var screen1State = {
    name: 'screen1',
    url: '/screen1',
    templateUrl: 'src/html/screen1.html',
    sticky: true
  }

  var screen2State = {
    name: 'screen2',
    url: '/screen2',
    templateUrl: 'src/html/screen2.html',
    sticky: true
  }

  $stateProvider.state(screen1State);
  $stateProvider.state(screen2State);
});


myApp.controller('MainController', function (remote) {
  var ctrl = this;
  ctrl.hello = "Hello world!";
  remote.initialize();
});

var route = {};

myApp.controller('ScrollerController', function (remote, $scope, $timeout, $state) {

  var ctrl = this;
  ctrl.datasource = {};
  ctrl.datasource.get = function (index, count, success) {
    remote.getPosts(index, count, success);
  };

  $scope.$on('$stateChangeSuccess', function () {
    $timeout(function () {
      if(route[$state.current.name]) {
        ctrl.adapter.reload(route[$state.current.name].$index + 1);
      }
    }, 100);

  });

  $scope.$on('$stateChangeStart', function () {
    route[$state.current.name] = ctrl.adapter.topVisibleScope;
  });

});
