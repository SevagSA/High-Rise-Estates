<?php

$users["johndoe"] ="12345";
$users["johndoeee"] ="12345";
$users["lrobinson"]="12345";
$users["glafleur"]="12345";
$users["bgainey"]="12345";
$users["proy"]="12345";

$type = isset($_REQUEST["type"]) ? $_REQUEST["type"] : "json";


if(isset($_REQUEST['user']) && isset($_REQUEST['password'])){
	if(isset($users[$_REQUEST['user']]) && $users[$_REQUEST['user']] == $_REQUEST['password']){
		if($type == "xml"){
			echo "<response><val>1</val><message>User Found</message><token>QpwL5tke4Pnpja7X4</token></response>";
		}
		else{
			$arr = array("val"  => 1,"message" => "User Found", "token" => "QpwL5tke4Pnpja7X4");
			echo json_encode($arr);
		}
	}
	else {
		if($type == "xml"){
			echo "<response><val>0</val><message>User Not Found</message></response>";
		}
		else{
			$arr = array("val"  => 0,"message" => "User Not Found");
			echo json_encode($arr);
		}
	}
}
else {
		if($type == "xml"){
			echo "<response><val>-1</val><message>Invalid Request</message></response>";
		}
		else{
			$arr = array("val"  => -1,"message" => "Invalid Request");
			echo json_encode($arr);
		}
}