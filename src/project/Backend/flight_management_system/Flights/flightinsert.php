<?php
header("Access-Control-Allow-Origin: http://localhost:5050");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$r_id = $data["r_id"];
$fc = $data["flight_code"];
$gate = $data["gate"];
$dep = $data["departs"];
$fl = $data["f_load"];
$fs = $data["f_status"];
$aircraft = $data["aircraft"];
$date = $data["date"];
$eco = !empty($data["eco"]) ? $data["eco"] : 0;
$busi = !empty($data["business"]) ? $data["business"] : 0;
$first = !empty($data["first"]) ? $data["first"] : 0;


$connect = mysqli_connect(
    "localhost",
    "root",
    "Pakistan@123",
    "flight_management_system",
    3307
);

if (!$connect) {
    echo json_encode([
        "success" => false,
        "error" => mysqli_connect_error()
    ]);
    exit;
}

$sql = "INSERT INTO flights (r_id, flight_code, gate, departs, f_load, f_status, aircraft,f_date,Economy,Business,Firstclass) VALUES ('$r_id', '$fc', '$gate', '$dep', '$fl', '$fs', '$aircraft','$date','$eco','$busi','$first')";
$result = mysqli_query($connect, $sql);

if ($result) {
    echo json_encode([
        "success" => true,
        "message" => "New Flight added successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => mysqli_error($connect)
    ]);
}

mysqli_close($connect);
?>