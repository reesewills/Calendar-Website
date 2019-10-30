<?php
session_unset();
session_destroy();
require "database_signin.php";

$username = (string)$_POST['username'];
$password = (string) $_POST['password'];
$hash_password = password_hash($password, PASSWORD_DEFAULT);
//insert the new user into the database
$stmt = $mysqli->prepare("insert into users (username, password) values (?, ?)");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}

$stmt->bind_param('ss', $username, $hash_password);


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