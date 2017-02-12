<?php

require "posts.php";
$base  = dirname($_SERVER['PHP_SELF']);

// Update request when we have a subdirectory    
if(ltrim($base, '/')){ 
    $_SERVER['REQUEST_URI'] = substr($_SERVER['REQUEST_URI'], strlen($base));
}
if (preg_match('#^/.js/#', $_SERVER["REQUEST_URI"])) {
    echo "resource";
    return false;    // serve the requested resource as-is.
}

$klein =  new Klein\Klein();


$klein->respond('GET', '/hello-world', function () {
    echo 'Hello World! Test Route';
});

$klein->with('/board', function () use ($klein) {

    $klein->respond('GET', '/?', function ($request, $response) {
        echo "default?";
    });

    $klein->respond('GET', '/[a:id]', function ($request, $response, $service) {
        $service->render("build/views/boards/board.html");

    });

    $klein->respond('GET', '/bower_components', function($req, $res, $ser){
        echo "file found";
        return $res->file(__DIR__ . $req->pathname());
    });

    $klein->respond("POST", "/message",function($req, $res, $ser){
        echo "message posted";
    });

    $klein->respond("POST", "/[a:board]/message", function($req, $res, $ser){
        $text =  $req->paramsPost()["message"];
        $file = "";

        return Posts::postMessage($text, $file);
    });

    $klein->respond("GET", "/[a:board]/thread/[i:threadId]", function($req, $res, $ser){
        $ser->render("build/views/boards/thread.html");
    });

});

$klein->dispatch();
