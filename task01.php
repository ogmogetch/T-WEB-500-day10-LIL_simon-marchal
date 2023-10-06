<?php
if (isset($_GET['name'])) {
    $name = $_GET['name'];
    $response = array('name' => $name, 'input' => $name);

    header('Content-Type: application/json');

    echo json_encode($response);
} else {
    echo 'An error occurred.';
}