<?php
/**
* Defines the directory for storing user uploaded images (with a trailing / )
*/
define("IMAGE_DIR", "resources/images/");

/**
* Utility class for handling uploading of and uploaded images.
*/
class ImageUtils{
    /**
    * Generates a random (not guaranteed unique) id to repsresent an image for storage.
    * @return string A 32 character (128bit) string.
    */
    public static function generateId(){
       return md5(uniqid(rand(), true)); 
    }

    /**
    * Saves an image to a given location.
    * @param array $image An array of image metadata from an uploaded resource.
    * @param string $id The id to save the name as.
    * @param string $folder Optional parameter specifying where to store the file.
    */
    public static function saveImage($image, $id, $folder = null){
        $name = $image['name'];
        $persistentName = $id .".". pathinfo($name, PATHINFO_EXTENSION);
        $target = $folder ? $folder : IMAGE_DIR; 
        $target = $target . $persistentName;
        move_uploaded_file($image["tmp_name"], $target);
    }
}