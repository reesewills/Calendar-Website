<?PHP
require 'database_signin.php';
header("Content-Type: application/json");
session_unset();
session_destroy();

$stmt = $mysqli->prepare("SELECT COUNT(*), username, password FROM users WHERE username=?");

$stmt->bind_param('s', $user);
$user = (string) $_POST['username'];
$stmt->execute();

$stmt->bind_result($cnt, $user_id, $pwd_hash);
$stmt->fetch();

$pwd_guess = (string) $_POST['password'];

if($cnt == 1 && password_verify($pwd_guess, $pwd_hash)){
	// Login succeeded!
	ini_set("session.cookie_httponly", 1);
    session_start();
    $_SESSION['username'] = $user_id;
    $_SESSION['token'] = substr(md5(rand()), 0, 10);

    echo json_encode(array(
        "success" => true,
        "username" => htmlentities($user_id),
        "token" => $_SESSION['token']
    ));
} else {
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Username or Password"
    ));
}
exit;

?>