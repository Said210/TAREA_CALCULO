var settings = {
	inital: -250,
	end: 250,
	w_width: 0,
	w_height: 0,
	x_correction: 0,
	y_correction: 0,
	step: .5
};

var functions = [];

function add_to_list(){
	var eq = document.getElementById("equation");
	if (eq.value.indexOf("y") != -1) {
		var uri = encodeURIComponent(eq.value).replace(/\%2B/g,"=p");
		console.log(uri);
		$.get("/wolfram_middleware.php?f="+uri, function(data){
			console.log(data);
			var	xmlDoc = $.parseXML( data ),
			$xml = $( xmlDoc ),
			$solutions = $xml.find( 'pod[title="Solutions"]' );
			$subpods = $solutions.find('subpod');
			console.log($subpods);
			for (var i = 0; i < $subpods.length; i++) { 
				window.functions.push(($subpods[i].getElementsByTagName("plaintext")[0].innerHTML.replace("y = ", "")));
			};
			for (var i = 0; i < functions.length; i++) {
				draw(functions[i]);
			};

		});
	}else{
		window.functions.push(eq.value);
		for (var i = 0; i < functions.length; i++) {
			draw(functions[i]);
		};
	}
	
}

function draw(eq){
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	eq = compile(eq);
	for (var i = settings.inital; i < settings.end; i=i+.5) {
		var _y = evaluate(eq, i);
		var _dy = evaluate(eq, i+settings.step);
		point({x:i, y: _y},{x:i+settings.step, y: _dy},ctx);
	};
	
	console.log("Canvas drawn");
};

function redraw(){
	clear_canvas();
	draw_axes();
	for (var i = 0; i < functions.length; i++) {
		draw(functions[i]);
	};
	console.log("Canvas Redrawn");
}

function draw_axes(){
	var c = document.getElementById("canvas");
	var canvas = c.getContext("2d");
	canvas.beginPath();
	  canvas.moveTo(
	  	(settings.w_width/2) + (settings.x_correction),
	  	0
	  	);
	  canvas.lineTo(
	  	(settings.w_width/2) + (settings.x_correction),
	  	(settings.w_height)
	  	);
	  canvas.strokeStyle = '#3498db';
	  canvas.stroke();

	  canvas.beginPath();
	  canvas.moveTo(
	  	0,
	  	(settings.w_height/2) + (settings.y_correction)
	  	);
	  canvas.lineTo(
	  	(settings.w_width),
	  	(settings.w_height/2) + (settings.y_correction)
	  	);
	  canvas.strokeStyle = '#3498db';
	  canvas.stroke();
}


function point(n, dn, canvas){
  canvas.beginPath();
  canvas.moveTo(
  	(settings.w_width/2) + n.x + (settings.x_correction),
  	(settings.w_height/2) - n.y + (settings.y_correction)
  	);
  canvas.lineTo(
  	(settings.w_width/2) + dn.x + (settings.x_correction),
  	(settings.w_height/2) - dn.y + (settings.y_correction)
  	);
  canvas.strokeStyle = '#2c3e50';
  canvas.stroke();
}

//function pow(x,n){ return Math.pow(x,n);}

function evaluate(eq, v){
	var ex = eq.replace(/x/ig, v);
	//console.log(v, ex, eval(ex));
	return eval(ex);
}

function init_settings(){
	settings.w_width = window.innerWidth - 2;
	settings.w_height = window.innerHeight - 10;			
	
}

function initial_setup(){
	settings.inital = settings.w_width / -2;
	settings.end = settings.w_width / 2;
}

function clear_canvas(){
	var c = document.getElementById("canvas");
	c.height = settings.w_height;
	c.width = settings.w_width;
	console.log("Canvas Cleared");
	draw_axes();
}

function resize(){
	init_settings();
	clear_canvas();
	redraw();
}

function move(x,y){

	window.settings.x_correction += x;
	window.settings.inital -= x;
	window.settings.end -= x;
	window.settings.y_correction += y;
	$("#min").text(window.settings.inital);
	$("#max").text(window.settings.end);
	$("#mid").text(window.settings.x_correction);
	redraw();
}

function zoom(x){
	window.settings.step += x;
	redraw();
}

function reverseString(str) {

  var strArray = str.split("");
  strArray.reverse();

  var strReverse = strArray.join("");

  return strReverse;
}

function begin(str){
	var r = "";
	for (var i = str.length - 1; i >= 0; i--) {
		r += str[i];
		if (str[i]=="(") {break;};
	};
	console.log(r);
	return reverseString(r);
}

function end(str){
	var r = "";
	for (var i = 0; i < str.length; i++) {
		r += str[i];
		if (str[i]==")") {break;};
	};
	console.log(r);
	return r;
}

function compile(str){
	var s = "";
	s = str.replace(/pow/ig, "Math.pow");
	s = pow_conv(s);
	s = s.replace(/pi/ig, "Math.PI");
	s = s.replace(/e/ig, "Math.E");
	s = s.replace(/\)\(/ig, ")*(");
	s = s.replace(/ /ig, "*");
	s = s.replace(/sinh\(/ig, "Math.sinh(");
	s = s.replace(/cosh\(/ig, "Math.cosh(");
	s = s.replace(/tanh\(/ig, "Math.tanh(");
	console.log(s);
	s = s.replace(/acos\(/ig, "Math.acos(");
	s = s.replace(/asin\(/ig, "Math.asin(");
	s = s.replace(/atan\(/ig, "Math.atan(");
	console.log(s);
	s = s.replace(/abs\(/ig, "Math.abs(");
	s = s.replace(/sin\(/ig, "Math.sin(");
	s = s.replace(/cos\(/ig, "Math.cos(");
	s = s.replace(/tan\(/ig, "Math.tan(");
	console.log(s);
	return s;
}

function sqrt(f){ return Math.pow(f, .5)};
function log(n, b){ return Math.log(n) / Math.log(b)};


function pow_conv(str){
	var ind = str.indexOf("^");
	var b, e;
	if(str[ind-1] == ")"){
		console.log("b => ", str.substr(0, ind));
		b = begin(str.substr(0, ind));
	}else{
		b = str[ind-1];
	}
	str = str.replace("^", ",");
	if(str[ind+1] == "("){
		console.log("e => ", str.substr(ind+1, str.length));
		e = end(str.substr(ind+1, str.length));
	}else{
		e = str[ind+1];
	}
	//console.log(b, e, str);
	var result = str.replace(b+","+e, "Math.pow("+b+","+e+")");
	console.log(result);
	if (result.indexOf("^") == -1) {
		return result;
	}else{
		pow_conv(result);
	};
}
