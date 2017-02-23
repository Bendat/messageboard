<?php
/**
* Defines the directory for storing user uploaded images (with a trailing / )
*/
define("IMAGE_DIR", "resources/images/");

/**
* Utility class for handling uploaded images.
*/
class ImageUtils{
    /**
    * Generates a random (not guaranteed unique) id to repsresent an image.
    */
    public static function generateId(){
       return md5(uniqid(rand(), true)); 
    }

    public static function saveImage($image, $id, $folder = null){
        $name = $image['name'];
        $persistentName = $id .".". pathinfo($name, PATHINFO_EXTENSION);
        $target = $folder ? $folder : IMAGE_DIR; 
        $target = $target . $persistentName;
        move_uploaded_file($image["tmp_name"], $target);
    }
}