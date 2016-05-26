<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>GRAFICADOR</title>
	<script ssrc=""></script>
	<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
	<style>
			*, *:before, *:after {
		  box-sizing: border-box;
		}
		body{
			padding: 0px;
			margin: 0px;
		}
		#equation, #ok{
			position: fixed;
			top: 1rem;
		}
		#equation{
			width: 80%;
			height: 3rem;
			box-shadow: 0px 0px 5px 0px rgba(40,40,40,.5);
			border-radius: 3px;
			border: none;
			font-size: 2rem;
			padding-left: 1rem;
			left: 10%;
		}
		#ok{
			right: 12%;
			margin-top: .5rem;
		}
		.path{
			position: absolute;
			z-index: 3;
			bottom: 3rem;
			left: 3rem;
		}
		.direction{
			display: inline-block;
			background-color: red;
			padding: 0.5rem;
		}
		#up{
			transform: rotate(90deg);
			margin-left: 1rem;
		}
		#down{
			transform: rotate(90deg);
			margin-left: 1rem;
		}

		#ok{
			background-color: #27ae60;
			border-radius: 100%;
			color: #FFF;
			width: 2rem;
			height: 2rem;
			text-align: center;
			padding-top: .4rem;
		}
	</style>
</head>
<body onload="init_settings(); initial_setup(); clear_canvas()" onresize="resize()">
	<input type="text" id="equation" placeholder="Y = ">
	<div onclick="add_to_list()" id="ok">:)</div>
	<canvas id="canvas" width="500" height="500" style="border: 1px solid #333"></canvas>


	<div class="path">
		<div id="up" class="direction" onclick="move(0,100)"><-</div><br>
		<div id="left" class="direction" onclick="move(100,0)"><-</div>
		<div id="right" class="direction" onclick="move(-100,0)">-></div><br>
		<div id="down" class="direction" onclick="move(0,-100)">-></div>
		<p>
			<span id="min"></span>*
			<span id="mid"></span>*
			<span id="max"></span>
		</p>
	</div>
	
	<aside id="functions">
		<div class="function">
			<div class="actions">
				<div class="action"></div>
				<div class="action"></div>
			</div>
			<p><b><span id="function">Holi</span></b></p>
		</div>
	</aside>

	<script src="assets/js/app.js">
		// WOLPHI ID: LX3PV6-U6EAUVL3L8
	</script>
</body>
</html>