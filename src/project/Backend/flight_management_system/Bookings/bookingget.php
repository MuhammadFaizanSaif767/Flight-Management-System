<?php
header("Access-Control-Allow-Origin: http://localhost:5050");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$connect = mysqli_connect("localhost", "root", "Pakistan@123", "flight_management_system", 3307);

if (!$connect) {
    echo json_encode(["success" => false, "error" => mysqli_connect_error()]);
    exit;
}

$sql = "SELECT * FROM bookings";
$result = mysqli_query($connect, $sql);
$data = [];
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode(["success" => false, "error" => mysqli_error($connect)]);
}
mysqli_close($connect);
?>
