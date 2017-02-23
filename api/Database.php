<?php
require 'vendor/autoload.php';

/**
* Singleton providing utilities for accessing the database.
* @var string HOST The hostname of the database.
* @var string DB The name of the database to query.
* @var string USER The username to login to the database.
* @var string PASS The password to access the database.
* @var string CHARSET The charset in use for this database.
* @var Pixie\QueryBuilder\QueryBuilderHandler $db The querybuilder in use by this object.
*/
class Database{
    const HOST = "localhost";
    const DB = "messageboard";
    const USER = "root";
    const PASS = "";
    const CHARSET = "utf8";

    public $db;
    
    /**
    * Provides access to the Database singleton instance.
    * @return Database The Database instance.
    */
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

