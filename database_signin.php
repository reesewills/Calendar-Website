<?php
//log into mysql
$mysqli = new mysqli('localhost', 'calendar', 'calexit', 'Calendar');

//connection failed for some reason
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}
?>