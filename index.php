<!DOCTYPE html>
<html lang="en" ng-app="tarea">
<head>
	<meta charset="UTF-8">
	<title>GRAFICADOR</title>
	<link rel="stylesheet" href="assets/css/app.css">
	<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
	<link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">

</head>
<body id="body" ng-controller="app_controller">
	<div id="loading">
		<h1>G R A F I C A N D O</h1>
		<img src="assets/images/loading.gif" alt="">
	</div>
	<input type="text" id="equation" placeholder="Y = ">
	<div onclick="add_to_list()" id="ok"><i class="ion-checkmark"></i></div>
	<canvas id="canvas" width="500" height="500" style="border: 1px solid #333"></canvas>


	<div class="path">
		<div id="up" class="direction" onclick="move(0,100)"><div class="ion-arrow-left-a"></div></div><br>
		<div id="left" class="direction" onclick="move(100,0)"><div class="ion-arrow-left-a"></div></div>
		<div id="right" class="direction" onclick="move(-100,0)"><div class="ion-arrow-right-a"></div></div><br>
		<div id="down" class="direction" onclick="move(0,-100)"><div class="ion-arrow-right-a"></div></div>
		<p><sub>
			<span id="min"></span>*
			<span id="mid"></span>*
			<span id="max"></span>
		</sub></p>
	</div>
	
	<aside id="functions">
		<div class="function" ng-repeat="f in functions">
			<p><b><span id="function">{{f}}</span></b></p>
			<div class="actions">
				<span class="action" ng-click="delete_f($index)"><i class="ion-ios-close-outline"></i></span>
				<span class="action" ng-click="edit_f($index)"><i class="ion-edit"></i></span>
			</div>
		</div>
	</aside>

	<script src="assets/js/angular.min.js"></script>
	<script src="assets/js/app.js"></script>
</body>
</html>