<?php

require_once __DIR__ . "/../dao/UserDao.class.php";

class UserService {
    private $user_dao;

    public function __construct(){
        $this->user_dao = new UserDao();
    }

    public function get_users(){
        return $this->user_dao->get_users();
    }

    public function add_users($payload){
        $payload['password'] = password_hash($payload['password'], PASSWORD_BCRYPT);
        return $this->user_dao->add_users($payload);
    }

    public function get_user_by_username($username) {
        return $this->user_dao->get_user_by_username($username);
    }

}