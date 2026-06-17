<?php
header("Access-Control-Allow-Origin: http://localhost:5050");

$connect = mysqli_connect("localhost", "root", "Pakistan@123", "flight_management_system", 3307);
if (!$connect) {
    die(mysqli_connect_error());
}

$sql = "select concat(Origin,' -> ',Destination) as Routes,f.r_id, flight_code,gate,departs,aircraft,f_load,f_status,f_date, Economy as eco, Business as business, Firstclass as first from flights as f join routes as r on f.r_id=r.r_id";
$result = mysqli_query($connect, $sql);
$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);
mysqli_close($connect);

?>