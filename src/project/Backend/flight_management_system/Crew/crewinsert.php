<?php
header("Access-Control-Allow-Origin: http://localhost:5050");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$crew_name = $data["crew_name"] ?? '';
$crew_role = $data["crew_role"] ?? '';
$crew_base = $data["crew_base"] ?? '';
$flight_code = $data["flight_code"] ?? null;
$crew_statue = $data["crew_statue"] ?? '';

$connect = mysqli_connect("localhost", "root", "Pakistan@123", "flight_management_system", 3307);
if (!$connect) {
    echo json_encode(["success" => false, "error" => mysqli_connect_error()]);
    exit;
}

$fc_val = empty($flight_code) ? "NULL" : "'$flight_code'";

$sql = "INSERT INTO crew (crew_name, crew_statue, crew_base, crew_role, flight_code) VALUES ('$crew_name', '$crew_statue', '$crew_base', '$crew_role', $fc_val)";
$result = mysqli_query($connect, $sql);

if ($result) {
    echo json_encode(["success" => true, "message" => "Crew added successfully", "crew_id" => mysqli_insert_id($connect)]);
} else {
    echo json_encode(["success" => false, "error" => mysqli_error($connect)]);
}
mysqli_close($connect);
?>
