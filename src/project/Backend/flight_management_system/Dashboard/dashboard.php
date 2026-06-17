<?php
header("Access-Control-Allow-Origin: http://localhost:5050");
header("Content-Type: application/json");

$con = mysqli_connect("localhost", "root", "Pakistan@123", "flight_management_system", 3307);

if (!$con) {
    die(mysqli_connect_error());
}

$response = [];

// Total flights
$totalFlights = $con->query("SELECT COUNT(flight_code) as total FROM flights")
    ->fetch_assoc()["total"];

// On time flights
$onTimeFlights = $con->query("SELECT COUNT(flight_code) as total FROM flights WHERE f_status='On Time'")
    ->fetch_assoc()["total"];

// On time rate calculation
$timerate = 0;
if ($totalFlights > 0) {
    $timerate = ($onTimeFlights / $totalFlights) * 100;
}

// Customers
$customers = $con->query("SELECT COUNT(c_id) as total FROM customers");
$response["totalcustomers"] = $customers->fetch_assoc()["total"];

// Revenue
$revenue = $con->query("SELECT COALESCE(SUM(price), 0) as total FROM bookings");
$response["revenue"] = $revenue->fetch_assoc()["total"];

// Final response
$response["totalflights"] = $totalFlights;
$response["ontime"] = round($timerate, 2);

echo json_encode($response);

mysqli_close($con);
?>