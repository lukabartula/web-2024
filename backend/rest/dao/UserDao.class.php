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
        return $this->insert("users", $payload);
    }

    public function get_user_by_username($username){
        return $this->query_unique(
            "SELECT * FROM users WHERE username = :username",
            ["username" => $username]
        );
    }
}