<?php
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Access-Control-Max-Age: 86400');
$myData = $_POST["data"];
$myFile = "setup.csv";
file_put_contents($myFile, $myData);
?>
