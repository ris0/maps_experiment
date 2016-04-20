// controllerAs syntax uses 'this' inside controllers, which gets bound to scope
function HomeCtrl (loadMap) {
    var hvm = this;
    //var doSomething = function () { console.log('hi') };
    //hvm.doSomething = doSomething;
    //hvm.message = "Hello";
    hvm.loadMap = loadMap;

}

app.controller('HomeCtrl', HomeCtrl);

