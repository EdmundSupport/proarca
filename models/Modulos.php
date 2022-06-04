<?php

    ini_set('display_errors', 1); 
    ini_set('display_startup_errors', 1); 
    error_reporting(E_ALL);

    require_once("./../controlers/Errores.php");
            
    require_once("Basedatos.php");
    $bd = new Basedatos();
    
    function obtenerModulos(){
        $bd->consulta("SELECT * FROM modulos");
        $modulos = $bd->obtenerResultado();
        if($modulos){
            return MensajeUsuario(200,$modulos);
        }else{
            return MensajeUsuario(404, "No se encontraron modulos");
        }
    }

    if(isset($_POST["accion"])){
        header('Content-Type: application/json; charset=utf-8');

        switch($_POST["accion"]){
            case "verif":{
                break;
            }

            case "obtenerModulos":{
                echo json_encode(obtenerModulos());
                break;
            }
            
            default:{
                echo json_encode(MensajeUsuario(404, "No se encontro la accion"));
                exit();
            }
        }
    }
?>