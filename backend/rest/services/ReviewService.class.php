<?php

require_once __DIR__ . "/../dao/ReviewDao.class.php";

class ReviewService {
    private $review_dao;

    public function __construct(){
        $this->review_dao = new ReviewDao();
    }

    public function get_reviews(){
        return $this->review_dao->get_reviews();
    }
}