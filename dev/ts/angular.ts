var app = angular.module("tarea", []);

app.controller("app_controller", function($scope){
	$scope.functions = [];

	$scope.delete_f = function (i) {
		pop(i, $scope.functions);
		window.functions = $scope.functions;
		window.redraw();
	}

	$scope.edit_f = function (i) {
		$scope.functions[i] = prompt("Editar: ", $scope.functions[i]);
		window.functions[i] = $scope.functions[i];
		window.redraw();
	}

});

function update_functions(a){
	angular.element(document.getElementById('body')).scope().functions = functions;
	angular.element(document.getElementById('body')).scope().$apply();
}

function pop(i,a){
	a.splice(i, 1);
}