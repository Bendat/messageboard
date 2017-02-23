<?php
require 'vendor/autoload.php';

class Database{
    const HOST = "localhost";
    const DB = "messageboard";
    const USER = "root";
    const PASS = "";
    const CHARSET = "utf8";

    public $db;
    
    public static function instance(){
        static $inst = null;
        if ($inst === null) {
            $inst = new Database();
        }
        return $inst;
    }

    protected function __construct(){
        $config = array(
            'driver'    => 'mysql', // Db driver
            'host'      => self::HOST,
            'database'  => self::DB,
            'username'  => self::USER,
            'password'  => self::PASS,
            'charset'   => self::CHARSET, // Optional
        );
        $connection = new \Pixie\Connection('mysql', $config);
        $this->db = new \Pixie\QueryBuilder\QueryBuilderHandler($connection);
    }
}

