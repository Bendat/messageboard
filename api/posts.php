<?php
require_once "dataBaseConnector.php";

class Posts{
    public static function postMessage($text, $file, int $parent = null, int $user = null){
        $config = array(
            'driver'    => 'mysql', // Db driver
            'host'      => HOST,
            'database'  => DB,
            'username'  => USER,
            'password'  => PASS,
            'charset'   => CHARSET, // Optional
        );
        new Pixie\Connection('mysql', $config, "QDB");
        $data = array(
            "text" => $text,
            "image_id" => $file
        );
        return json_encode(QDB::table("messages")->insert($data));
    }
}