<?php
$connect = mysqli_connect("localhost", "root", "Pakistan@123", "flight_management_system", 3307);
if (!$connect) { die("DB Error: " . mysqli_connect_error()); }
$result = mysqli_query($connect, "DESCRIBE flights");
if (!$result) { die("SQL Error: " . mysqli_error($connect)); }
while ($row = mysqli_fetch_assoc($result)) {
    echo $row['Field'] . " | " . $row['Type'] . "\n";
}
?>
