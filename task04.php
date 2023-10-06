<?php
$conn = new mysqli('localhost', 'root', '', 'ajax_products');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $type = $_GET['type'];
    $brand = $_GET['brand'];

    $response = array(
    'typeValidationMsg' => 'Your type validation message here',
    'brandValidationMsg' => 'Your brand validation message here'
);

header('Content-Type: application/json');
echo json_encode($response);
}

$conn->close();
