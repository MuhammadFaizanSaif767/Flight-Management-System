<?php
header("Access-Control-Allow-Origin: http://localhost:5050");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$bk_id = $data["bk_id"] ?? '';
$bk_name = $data["bk_name"] ?? '';
$class = $data["class"] ?? '';
$payment = $data["payment"] ?? '';
$price = $data["price"] ?? 0;
$bk_status = $data["bk_status"] ?? '';
$flight_code = $data["flight_code"] ?? '';

$connect = mysqli_connect("localhost", "root", "Pakistan@123", "flight_management_system", 3307);
if (!$connect) {
    echo json_encode(["success" => false, "error" => mysqli_connect_error()]);
    exit;
}

$sql = "INSERT INTO bookings (bk_id, bk_name, class, payment, price, bk_status, flight_code) VALUES ('$bk_id', '$bk_name', '$class', '$payment', '$price', '$bk_status', '$flight_code')";
$result = mysqli_query($connect, $sql);

if ($result) {
    echo json_encode(["success" => true, "message" => "Booking added successfully"]);
} else {
    echo json_encode(["success" => false, "error" => mysqli_error($connect)]);
}
mysqli_close($connect);
?>
