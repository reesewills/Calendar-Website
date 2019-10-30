<?php
/**
 * Created by PhpStorm.
 * User: davidflast
 * Date: 3/18/17
 * Time: 2:47 AM
 */
header("Content-Type: application/json");
session_unset();
session_destroy();

echo json_encode(array(
    "success" => true
));


?>