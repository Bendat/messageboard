<?php
require "autoload.php";

class Posts{
    public $config;
    private $purifier;

    /**
    * Provides access to the singleton Post object instance.
    * @return Posts an instance of the Posts object.
    */
    public static function instance(){
        static $inst = null;
        if ($inst === null) {
            $inst = new Posts();
        }

        return $inst;
    }

    private function __construct(){
        $config = HTMLPurifier_Config::createDefault();
        $config->set("AutoFormat.AutoParagraph", true);
        $this->purifier = new HTMLPurifier($config);
    }

    /**
    * Adds a new post to the database.
    * @param string $text The comment to be stored.
    * @param string $file The filename of the comments image.
    * @param number $parent The id of the parent comment (the first comment in a thread).
    * @param number $user The id of the user who posted the comment.
    * @return string The result of the insert query as a json string. 
    **/
    public function postMessage($text, $file, $parent = null, $user = null){  
        $fileId = $file ? ImageUtils::generateId(): null;
        $parent = is_numeric($parent) ? intval($parent): null;
        $data = array(
            "text" => $this->purifier->purify(htmlspecialchars($text)),
            "image_id" => $fileId,
            "image_ext" => pathinfo($file["name"], PATHINFO_EXTENSION),
            "image_name" => $file["name"],
            "parent_id" => $parent,
            "board" => "tech"
        );
        $res = Database::instance()->db->table("messages")->insert($data);
        if($res){
            ImageUtils::saveImage($file, $fileId);
        }
        return json_encode($res);
    }

    /**
    * Retrieves the posted comments for a thread.
    * @param int $threadId The id of the thread.
    * @return string The comments for a thread represented by a json string.
    */
    public function getPosts($threadId){
        return json_encode(
            Database::instance()->db
                ->table("messages")
                ->where("id", $threadId)
                ->orWhere("parent_id", $threadId)
                ->get()
        );
    }

    private function manipulateText($text){

    }
}