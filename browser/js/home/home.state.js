app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'views/home/home.html',
        controller: 'HomeCtrl'
    });
});

//HomeCtrl.resolve = {
//  loadMap: function (HomeFactory) {
//      return HomeFactory.loadMap();
//  }
//};
//
//function homeConfig($stateProvider) {
//    $stateProvider.state('home', {
//        url: '/',
//        templateUrl: 'views/home/home.html',
//        controller: 'HomeCtrl as hvm',
//        resolve: HomeCtrl.resolve
//    });
//}
//
//app.config(homeConfig);

