<?php
header("Access-Control-Allow-Origin: http://localhost:5050");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);



$ori = $data["origin"];
$des = $data["destination"];
$frq = $data["frequency"];
$status = $data["status"];

$distance = $data["distance"];


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

$sql = "INSERT INTO routes (origin,destination,distance,frequency,Status) VALUES ('$ori','$des','$distance','$frq','$status')";
$result = mysqli_query($connect, $sql);

if ($result) {
    echo json_encode([
        "success" => true,
        "message" => "New Route added successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => mysqli_error($connect)
    ]);
}

mysqli_close($connect);
?>