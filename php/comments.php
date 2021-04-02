<?php


$type = isset($_REQUEST["type"]) ? $_REQUEST["type"] : "json";

$url = "posts.json";
if($type == "xml") $url = "posts.xml";

$myfile = fopen($url, "r") or die("Unable to open file!");
echo fread($myfile,filesize("posts.xml"));
fclose($myfile);

