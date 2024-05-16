<?php

require_once __DIR__ . "/rest/services/SneakerService.class.php";

$sneakers_service = new SneakerService();
$data = $sneakers_service -> get_sneakers();
header("Content-Type: application/json");
echo json_encode($data);

