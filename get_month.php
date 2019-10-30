<?php
/**
 * Created by PhpStorm.
 * User: davidflast
 * Date: 3/18/17
 * Time: 4:03 PM
 */
require 'database_signin.php';
header("Content-Type: application/json");
$search_month = $_POST['month'];
$search_year = $_POST['year'];
ini_set("session.cookie_httponly", 1);
session_start();
$username = $_SESSION['username'];

$stmt = $mysqli->prepare("SELECT event_id,title,YEAR(date) as year, MONTH(date) as month, DAY(date) as day,time FROM events WHERE username=? AND MONTH(date)=? AND YEAR(date)=? ORDER BY time, date ");

$stmt->bind_param('sss', $username, $search_month,$search_year );

$stmt->execute();
$result = $stmt->get_result();

$event_ids = array();
$titles =array();
$year = array();
$month = array();
$days = array();
$times =array();

while($row = $result->fetch_assoc()){
    array_push($event_ids, $row["event_id"] );
    array_push($titles, $row["title"] );
    array_push($year, $row["year"] );
    array_push($month, $row["month"]);
    array_push($days, $row["day"]);
    array_push($times, $row["time"] );
}

$stmt->close();
echo json_encode(array(
    "event_ids"=>$event_ids,
    "titles"=>$titles,
    "year" => $year,
    "month"=>$month,
    "days"=>$days,
    "times"=>$times
));
exit;
