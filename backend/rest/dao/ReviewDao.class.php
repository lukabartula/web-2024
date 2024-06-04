<?php

require_once __DIR__ . "/BaseDao.class.php";

class ReviewDao extends BaseDao{
    function __construct(){
        parent::__construct("reviews");
    }
    public function get_reviews(){
        return $this->query(
            "SELECT * FROM reviews
            LEFT JOIN users ON reviews.user_id = users.id",
            []
        );
    }

    public function add_reviews($payload){
        $this->insert("reviews", $payload);
    }
}