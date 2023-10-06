<?php
if (isset($_POST['email'])) {
    $email = $_POST['email'];

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(200);
    echo json_encode(array('message' => 'Email is valid.'));
    } else {
    http_response_code(400);
    echo json_encode(array('message' => 'Email is not valid.'));
    }
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'Email parameter not provided.'));
}
