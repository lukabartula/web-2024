<?php

require_once __DIR__ . "/rest/services/UserService.class.php";

$users_service = new UserService();
$data = $users_service-> get_users();
header("Content-Type: application/json");
echo json_encode($data);