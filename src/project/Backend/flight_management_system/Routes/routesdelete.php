<?php
header("Access-Control-Allow-Origin: http://localhost:5050");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$code = $data["code"];

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

$sql = "DELETE FROM routes WHERE r_id = '$code'";
$result = mysqli_query($connect, $sql);

if ($result) {
    echo json_encode([
        "success" => true,
        "message" => "Deleted successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => mysqli_error($connect)
    ]);
}

mysqli_close($connect);
?>