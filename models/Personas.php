<?php

    ini_set('display_errors', 1); 
    ini_set('display_startup_errors', 1); 
    error_reporting(E_ALL);

    require_once("./VerificarDatos.php");
    require_once("./../controlers/Errores.php");
        
    require_once("Basedatos.php");
    $bd = new Basedatos();
    
    function obtenerConNombresApellidos($nombres, $apellidos){
        global $bd;

        $nombres = verficarDato($nombres, "nombres", "existe", "vacio", "longitud=0-100");
        if($nombres["codigo"] != 200) return $nombres;
        $apellidos = verficarDato($apellidos, "apellidos", "existe", "vacio", "longitud=0-100");
        if($apellidos["codigo"] != 200) return $apellidos;


        $nombres = $nombres["datos"];
        $apellidos = $apellidos["datos"];

        $bd->consulta("SELECT personas_id, nombres, apellidos, DATE_FORMAT(fecha_nac, '%d-%m-%Y %H:%i:%s') AS fecha_nac, estado FROM personas WHERE nombres = '$nombres' AND apellidos = '$apellidos'");
        $personas = $bd->obtenerResultado();
        if($personas){
            return MensajeUsuario(200, $personas);
        }else{
            return MensajeUsuario(404, false);
        }
    }

    function crearPersona($nombres, $apellidos, $fecha_nac){
        global $bd;
        $nombres = verficarDato($nombres, "nombres", "existe", "vacio", "longitud=0-100");
        if($nombres["codigo"] != 200) return $nombres;
        $apellidos = verficarDato($apellidos, "apellidos", "existe", "vacio", "longitud=0-100");
        if($apellidos["codigo"] != 200) return $apellidos;
        $fecha_nac = verficarDato($fecha_nac, "apellidos", "existe", "fecha");
        if($fecha_nac["codigo"] != 200) return $fecha_nac;
        
        $estado = 1; // Crear la persona como activa

        $nombres = $nombres["datos"];
        $apellidos = $apellidos["datos"];
        $fecha_nac = $fecha_nac["datos"]." ".date("H:i:s");

        $existePersona = obtenerConNombresApellidos($nombres, $apellidos);
        if($existePersona["codigo"] == 200){
            return MensajeUsuario(200,$existePersona["datos"]["personas_id"]);
        }else{
            $bd->consulta("INSERT INTO personas  
            (nombres, apellidos, fecha_nac, estado)
            VALUES
            ('$nombres', '$apellidos', STR_TO_DATE('$fecha_nac', '%d-%m-%Y %H:%i:%s'), $estado)");
            $bd->ejecutar();
            
            return MensajeUsuario(200,$bd->ultimoIdInsertado());
        }    
    }

    if(isset($_POST["accion"])){
        header('Content-Type: application/json; charset=utf-8');

        switch($_POST["accion"]){
            case "verif":{
                echo json_encode(verficarDato($_POST["fecha"], "fecha", "fecha"));
                break;
            }
            case "crear":{
                echo json_encode(crearPersona($_POST["nombres"], $_POST["apellidos"], $_POST["fecha_nac"]));
                
                break;
            }
    
            case "obtenerConNombresApellidos":{
                echo json_encode(obtenerConNombresApellidos($_POST["nombres"], $_POST["apellidos"]));
                break;
            }
            
            default:{
                echo json_encode(MensajeUsuario(404, "No se encontro la accion"));
            }
        }
    }
?>