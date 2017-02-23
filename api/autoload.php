<?php
require 'vendor/autoload.php';
require "libs/htmlpurifier/library/HTMLPurifier.auto.php";
spl_autoload_register(function($class){
    require __DIR__."/{$class}.php";
});