<?php

    ini_set('display_errors', 1); 
    ini_set('display_startup_errors', 1); 
    error_reporting(E_ALL);

    require_once("./VerificarDatos.php");
    require_once("./../controlers/Errores.php");
        
    require_once("Basedatos.php");
    $bd = new Basedatos();
    
    function obtenerConUsuario($usuario){
        global $bd;

        $usuario = verficarDato($usuario, "usuario", "existe", "vacio", "longitud=0-50");
        if($usuario["codigo"] != 200) return $usuario;

        $usuario = $usuario["datos"];

        $bd->consulta("SELECT * FROM usuarios WHERE usuario = '$usuario'");
        $usuario = $bd->obtenerResultado();
        if($usuario){
            $usuario = MensajeUsuario(200, $usuario);
            return $usuario;
        }else{
            return MensajeUsuario(404, "No se encontro el usuario.");
        }
    }

    function obtenerConUsuarioContra($usuario, $contra){
        global $bd;

        $usuario = verficarDato($usuario, "usuario", "existe", "vacio", "longitud=0-50");
        if($usuario["codigo"] != 200) return $usuario;
        $contra = verficarDato($contra, "contrasena", "existe", "vacio", "longitud=8-20");
        if($contra["codigo"] != 200) return $contra;

        $usuario = $usuario["datos"];
        $contra = $contra["datos"];

        $bd->consulta("SELECT * FROM usuarios WHERE usuario = '$usuario' AND contra = '$contra'");
        $usuario = $bd->obtenerResultado();
        if($usuario){
            $usuario = MensajeUsuario(200, $usuario);
            return $usuario;
        }else{
            return MensajeUsuario(404, "Usuario o contrasena incorrectos. Por favor, verfique.");
        }
    }

    function crearUsuario($usuario, $contra, $personas_id){
        global $bd;
        $usuario = verficarDato($usuario, "usuario", "existe", "vacio", "longitud=0-50");
        if($usuario["codigo"] != 200) return $usuario;
        $contra = verficarDato($contra, "contra", "existe", "vacio", "longitud=8-20");
        if($contra["codigo"] != 200) return $contra;
        $personas_id = verficarDato($personas_id, "apellidos", "existe", "numero-negativo");
        if($personas_id["codigo"] != 200) return $personas_id;

        $estado = 1; // Crear la usuario como activa

        $usuario = $usuario["datos"];
        $contra = $contra["datos"];
        $personas_id = $personas_id["datos"];
        
        $existeUsuario = obtenerConUsuario($usuario);
        if($existeUsuario["codigo"] == 200){
            return MensajeUsuario(200,$existeUsuario["datos"]["usuarios_id"]);
        }else{
            $bd->consulta("INSERT INTO usuarios  
            (usuario, contra, personas_id, estado)
            VALUES
            ('$usuario', '$contra', $personas_id, $estado)");
            $bd->ejecutar();
            
            return MensajeUsuario(200,$bd->ultimoIdInsertado());
        }  
    }

    if(isset($_POST["accion"])){
        header('Content-Type: application/json; charset=utf-8');

        switch($_POST["accion"]){
            case "verif":{
                verficarDato($_POST["x"], "x", "longitud=2-2");
                break;
            }
            case "crear":{
                global $bd;
                echo json_encode(crearUsuario($_POST["usuario"], $_POST["contra"], $_POST["personas_id"]));
                break;
            }
    
            case "obtenerConUsuario":{
                echo json_encode(obtenerConUsuario($_POST["usuario"]));
                break;
            }

            case "obtenerConUsuarioContra":{
                echo json_encode(obtenerConUsuarioContra($_POST["usuario"], $_POST["contra"]));
                break;
            }
            
            default:{
                echo json_encode(MensajeUsuario(404, "No se encontro la accion"));
            }
        }
    }
?>