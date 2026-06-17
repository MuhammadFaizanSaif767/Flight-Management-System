<?php
header("Access-Control-Allow-Origin: http://localhost:5050");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$crew_id = $data["crew_id"] ?? '';
$flight_code = $data["flight_code"] ?? '';
$crew_statue = $data["crew_statue"] ?? '';

$connect = mysqli_connect("localhost", "root", "Pakistan@123", "flight_management_system", 3307);
if (!$connect) {
    echo json_encode(["success" => false, "error" => mysqli_connect_error()]);
    exit;
}

$fc_val = empty($flight_code) ? "NULL" : "'$flight_code'";

$sql = "UPDATE crew SET flight_code = $fc_val, crew_statue = '$crew_statue' WHERE crew_id = '$crew_id'";
$result = mysqli_query($connect, $sql);

if ($result) {
    echo json_encode(["success" => true, "message" => "Crew assigned successfully"]);
} else {
    echo json_encode(["success" => false, "error" => mysqli_error($connect)]);
}
mysqli_close($connect);
?>
