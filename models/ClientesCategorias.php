<?php

    ini_set('display_errors', 1); 
    ini_set('display_startup_errors', 1); 
    error_reporting(E_ALL);

    require_once("../../controlers/config.php");
    require_once("$dirControlers/Errores.php");
            
    require_once("Basedatos.php");
    $bd = new Basedatos();
    
    function obtenerClientesCategorias(){
        global $bd;
        $bd->consulta("SELECT * FROM categorias_clientes");
        $modulos = $bd->obtenerResultados();
        if($modulos){
            return MensajeUsuario(200,$modulos);
        }else{
            return MensajeUsuario(404, "No se encontraron categorias de clientes");
        }
    }

    if(isset($_POST["accion"])){
        header('Content-Type: application/json; charset=utf-8');

        switch($_POST["accion"]){
            case "verif":{
                break;
            }

            case "obtenerClientesCategorias":{
                echo json_encode(obtenerClientesCategorias());
                break;
            }
            
            default:{
                echo json_encode(MensajeUsuario(404, "No se encontro la accion"));
                exit();
            }
        }
    }
?>