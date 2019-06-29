/*--------------Inicializacia------------*/

let vozidla = [];
let drony = [];

class Vozidlo {
    constructor(spz, nosnostVozidla, nakladyVozidla) {
        this.spz = spz;
        this.nosnostVozidla = nosnostVozidla;
        this.nakladyVozidla = nakladyVozidla;
    }
}

const TYP_DRONU = {
    TYPE_ONE: {oznacenie: 1, nosnost: 2, rychlost: 80, dobaLetu: 40, nabitieNaMin: 3},
    TYPE_TWO: {oznacenie: 2, nosnost: 5, rychlost: 40, dobaLetu: 60, nabitieNaMin: 5}
};

class Dron {
    constructor(serioveCislo, typ) {
        this.serioveCislo = serioveCislo;
        (typ === '1') ? this.typ = TYP_DRONU.TYPE_ONE : this.typ = TYP_DRONU.TYPE_TWO;
        this.celkNalHod = 0;    //celkovy pocet nalietanych hodin
        this.celkPreZas = 0;    //celkovy pocet prepravenych zasielok
    }
}

class CentralnySklad {
    constructor(skratka) {
        this.skratka = skratka;
        this.drony = [];
    }
}

let centralnySklad = new CentralnySklad('TS');


/*--------------Aplikacia-----------*/
var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/first', {
        templateUrl : 'pages/first.html',
        controller : 'FirstController'
    })

    .when('/second', {
        templateUrl : 'pages/second.html',
        controller : 'SecondController'
    })

    .when('/third', {
        templateUrl : 'pages/third.html',
        controller : 'ThirdController'
    })

    .when('/forth', {
        templateUrl : 'pages/forth.html',
        controller : 'ForthController'
    })

    .otherwise({redirectTo: '/'});
});

app.controller('FirstController', function($scope) {
    $scope.pridajVozidlo = function() {
        let vozidlo = new Vozidlo($scope.spz, $scope.nosnostVozidla, $scope.nakladyVozidla);
        vozidlo.datum = new Date();
        vozidlo.celkoveNaklady = 0;
        vozidla.push(vozidlo);
        console.log(vozidla);
    }
});
    
app.controller('SecondController', function($scope) {
    $scope.vozidla = vozidla;
});
    
app.controller('ThirdController', function($scope) {
    let typ = 'data';
    $scope.getVal = function(){
        typ = $scope.typDronu;
        (typ === '1') ? console.log('1') : console.log('2');
    }

    $scope.pridajDron = function() {
        let dron = new Dron($scope.serioveCislo, typ);
        centralnySklad.drony.push(dron);
        console.log(centralnySklad.drony);
    }
});

app.controller('ForthController', function($scope) {
    $scope.flotilaDronov = centralnySklad.drony;
});