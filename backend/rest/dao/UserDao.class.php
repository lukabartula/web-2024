<?php

require_once __DIR__ . "/BaseDao.class.php";

class UserDao extends BaseDao{
    function __construct(){
        parent::__construct("users");
    }

    public function get_users(){
        return $this->query(
            "SELECT * FROM users",
            []
        );
    }

    public function add_users($payload){
        $this->insert("users", $payload);
    }
}