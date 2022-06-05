<?php
session_start();

if($_SESSION["usuario"]){
    header('Location: views/index.php');
}else{
    header('Location: views/pages/Inicio.php');
}
?>