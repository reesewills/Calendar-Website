<?php
require "database_signin.php";
ini_set("session.cookie_httponly", 1);
session_start();

$username = $_SESSION['username'];
$title = (string)$_POST['title'];
$date =  $_POST['date'];
$time =  $_POST['time'];

$stmt = $mysqli->prepare("insert into events (title, username, date, time) values (?, ?,?,?)");
if(!$stmt){
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}

$stmt->bind_param('ssss', $title, $username, $date,$time);

if($stmt->execute()){
    $stmt->close();
    echo json_encode(array(
        "success" => true));
}else {
    $stmt->close();
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Username or Password"
    ));}
exit;



?>