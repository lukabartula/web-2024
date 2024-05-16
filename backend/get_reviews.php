<?php

require_once __DIR__ . "/rest/services/ReviewService.class.php";

$reviews_service = new ReviewService();
$data = $reviews_service-> get_reviews();
header("Content-Type: application/json");
echo json_encode($data);