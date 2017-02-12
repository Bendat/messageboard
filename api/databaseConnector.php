<?php
require 'vendor/autoload.php';

define("HOST", "localhost");
define("DB", "messageboard");
define("USER", "root");
define("PASS", "");
define("CHARSET", "utf8");

class Database{
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
            'host'      => HOST,
            'database'  => DB,
            'username'  => USER,
            'password'  => PASS,
            'charset'   => CHARSET, // Optional
        );
        $this->db = new Pixie\Connection('mysql', $config);
    }
}

