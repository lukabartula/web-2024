<?php

require_once __DIR__ . "/../dao/SneakerDao.class.php";

class SneakerService {
    private $sneakers_dao;

    public function __construct(){
        $this->sneakers_dao = new SneakerDao();
    }

    public function get_sneakers(){
        return $this->sneakers_dao->get_sneakers();
    }
}