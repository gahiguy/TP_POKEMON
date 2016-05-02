var pokeApp = angular.module('pokedex', ['ngResource']);

pokeApp.directive("pokemon" , function(){
    return{
        template : ""
    };
});

pokeApp.config(['$resourceProvider', function($resourceProvider) {
$resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.factory('pokeFactory', function($resource){
    return $resource("http://pokeapi.co/api/v2/pokemon/:id/");
});

pokeApp.service('pokeService', function(pokeFactory, $log){
    var nom="";
    var id=0;
    var skills = [];

    //NOM
    this.setNom = function(nompkmn){
        nom = nompkmn;
    };

    this.getNom = function(){
        return nom;
    };

    //SKILLS
    this.setSkills = function(skillspkmn){
        skills = skillspkmn;
    };

    this.getSkills = function(){
        return skills;
    };

    //ID
    this.setId = function(idpkmn){
        id = idpkmn;
    };

    this.getId = function(){
        return id;
    };

});

//var app = angular.module('myApp', ['ngResource']);
pokeApp.controller('myCtrl1', function($scope , $log , $resource , $http, pokeFactory, pokeService) {

    $scope.goClick = function(param){

        pokeFactory.get({ id: param}, function(data){
            pokeService.setId(data.id);
            pokeService.setNom(data.name);
            pokeService.setSkills(data.moves);

            $scope.idp = pokeService.getId();
            $scope.namep = pokeService.getNom();
            $scope.skills = pokeService.getSkills();
        });

    };

    $scope.$watch(function(){
        return $scope.id ;}, function(){
        if($scope.id != ''){
            $scope.goClick($scope.id);
        }
    });

});


pokeApp.controller('myCtrl2',function($resource, $http , $log , $scope){
    $http.get("http://pokeapi.co/api/v2/pokemon/").then(function(response){
        $log.info("test"+response.data.results);
        $scope.names = response.data.results;});
		
	$scope.$watch(function(){
        return $scope.pokRace ;}, function(){
        if($scope.pokRace != ''){
            $scope.goClick($scope.pokRace);
        }
    });
		
		
});




