<?php
header("Access-Control-Allow-Origin: http://localhost:5050");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$c_name = $data["c_name"] ?? '';
$c_pef_payment = $data["c_pef_payment"] ?? '';
$c_status = $data["c_status"] ?? '';

$connect = mysqli_connect("localhost", "root", "Pakistan@123", "flight_management_system", 3307);
if (!$connect) {
    echo json_encode(["success" => false, "error" => mysqli_connect_error()]);
    exit;
}

$sql = "INSERT INTO customers (c_name, c_pef_payment, c_status) VALUES ('$c_name', '$c_pef_payment', '$c_status')";
$result = mysqli_query($connect, $sql);

if ($result) {
    echo json_encode(["success" => true, "message" => "Customer added successfully", "c_id" => mysqli_insert_id($connect)]);
} else {
    echo json_encode(["success" => false, "error" => mysqli_error($connect)]);
}
mysqli_close($connect);
?>
