<?php

require_once __DIR__ . "/BaseDao.class.php";

class SneakerDao extends BaseDao{
    function __construct(){
        parent::__construct("sneakers");
    }
    public function get_sneakers(){
        return $this->query(
            "SELECT * FROM sneakers",
            []
        );
    }
}