<?php
/**
 * Created by PhpStorm.
 * User: davidflast
 * Date: 3/18/17
 * Time: 11:12 PM
 */
require 'database_signin.php';
ini_set("session.cookie_httponly", 1);
session_start();

//if a different token is detected, tell them, this is because they are trying to type in the URL
$title = (string)$_POST['title'];
$date = $_POST['date'];
$time = $_POST['time'];
$event_id = $_POST['event_id'];
$username = $_SESSION['username'];

if(!hash_equals($_SESSION['token'], $_POST['token'])){
    die("Request forgery detected");
}

//update the story in the database
$stmt = $mysqli->prepare("UPDATE events SET title='$title', date='$date', time='$time' where event_id='$event_id' AND username='$username'");
if(!$stmt){
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}

$stmt->execute();

//send them back after the story is updated
$stmt->close();

exit;
?>