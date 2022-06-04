<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

$root = $_SERVER["DOCUMENT_ROOT"];

$dirProyecto = "$root/proarca";

$config = json_decode(file_get_contents("$dirProyecto/config/config.json"));

$dirModels = "$dirProyecto/models";
$dirControlers = "$dirProyecto/controlers";
$dirViews = "/proarca/views";
$dirPages = "$dirProyecto/views/pages";

?>