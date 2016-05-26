<?php
	header("Content-Type: text/html;charset=ISO-8859-1");
	$param = str_replace("=p", "%2B",$_GET['f']);
	$uri = "http://api.wolframalpha.com/v2/query?appid=LX3PV6-U6EAUVL3L8&input=".$param;
	$r = file_get_contents($uri);
	echo $r;
?>