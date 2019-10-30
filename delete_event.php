<?php
/**
 * Created by PhpStorm.
 * User: davidflast
 * Date: 3/18/17
 * Time: 11:09 PM
 */
require 'database_signin.php';
ini_set("session.cookie_httponly", 1);
session_start();
$user = $_SESSION['username'];
$event_id = (int) $_POST['event_id'];

if(!hash_equals($_SESSION['token'], $_POST['token'])){
    die("Request forgery detected");
}

//if they are the person that created the story, delete it from the database
    $stmt = $mysqli->prepare("delete from events where event_id = '$event_id' AND username = '$user'");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->execute();


exit;
?>
