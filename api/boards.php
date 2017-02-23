<?php
require "autoload.php";

class Boards{
    /**
    * Provides access to the singleton Boards object instance.
    * @return Boards an instance of the Boards object.
    */
    public static function instance(){
        static $inst = null;
        if ($inst === null) {
            $inst = new Boards();
        }

        return $inst;
    }

    private function __construct(){
    }

    public function getBoardsList($name){
        return json_encode(
            Database::instance()->db
                ->table("boards")
                ->select("name")
                ->orderBy("id", "ASC")
                ->get()
        );
    }

    public function getThreadBlurbs($board){
        $res = Database::instance()
                ->db
                ->query("SELECT id FROM `messages` t1 WHERE parent_id IS NULL")->get();
        $parents = json_decode(json_encode($res), true);
        $children = [];
        // Try convert to single query
        foreach($parents as $ids){
            $tmp = Database::instance()
                    ->db
                    ->table("messages")
                    ->select("*")
                    ->whereIn("id", $ids)
                    ->orWhereIn("parent_id", $ids)
                    ->orderBy("id", "ASC")
                    ->limit(5)
                    ->get();
            array_push($children, $tmp);
        }
        return json_encode($children);
    }


}