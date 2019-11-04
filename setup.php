<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
$myData = $_POST["data"];
$myFile = "setup.txt";
file_put_contents($myFile, $myData);
?>
