<?php

    ini_set('display_errors', 1); 
    ini_set('display_startup_errors', 1); 
    error_reporting(E_ALL);

    header('Content-Type: application/json; charset=utf-8');

    require_once("./VerificarDatos.php");
    require_once("./../controlers/Errores.php");

    verficarDato($_POST["accion"], "accion", "existe", "vacio");
        
    require_once("Basedatos.php");
    $bd = new Basedatos();
    
    

    switch($_POST["accion"]){
        case "verif":{
            verficarDato($_POST["x"], "x", "longitud=2-2");
            break;
        }
        case "crear":{
            if(!isset($_POST["nombres"])){
                $error = json_encode(array(
                    "codigo"=>"400",
                    "datos"=>"No se completo el campo nombres."
                ));

                echo $error;
                die();
            }
            
            if(!isset($_POST["apellidos"])){
                $error = json_encode(array(
                    "codigo"=>"400",
                    "datos"=>"No se completo el campo apellidos."
                ));

                echo $error;
                die();
            }

            if(!isset($_POST["usuario"])){
                $error = json_encode(array(
                    "codigo"=>"400",
                    "datos"=>"No se completo el campo usuario."
                ));

                echo $error;
                die();
            }

            if(!isset($_POST["contra"])){
                $error = json_encode(array(
                    "codigo"=>"400",
                    "datos"=>"No se completo el campo contrasena."
                ));

                echo $error;
                die();
            }
            $estado = (isset($_POST["estado"])?$_POST["estado"]:0);
 
            $nombres = $_POST["nombres"]; 
            $apellidos = $_POST["apellidos"];
            $usuario = $_POST["usuario"];
            $contra = $_POST["contra"];
            $estado = $_POST["estado"];
 
            $bd->consulta("SELECT id FROM personas WHERE nombres = '$nombres' AND apellidos = 'apellidos'");
            $persona = $bd->obtenerResultado();
            if(!$persona){
                $bd->consulta("INSERT INTO personas
                (nombres, apellidos, estado)
                VALUES
                ('$nombres', '$apellidos', '$estado')");
                $nuevoUsuario = $bd->ejecutar();


                
                $error = json_encode(array(
                    "codigo"=>"404",
                    "datos"=>"No se encontro la persona"
                ));

                echo $error;
                die();
            }

            $bd->consulta("SELECT * FROM usuarios WHERE usuario = '$usuario'");
            $usuario = $bd->obtenerResultado();
            if($usuario){
                $error = json_encode(array(
                    "codigo"=>"404",
                    "datos"=>"El usuario ya existe"
                ));

                echo $error;
                die();
            }

            $bd->consulta("INSERT INTO usuar 
            ()
            VALUES
            ()");
            $usuario = $bd->obtenerResultado();

            break;
        }

        case "obtenerConUsuarioContra":{
            verficarDato($_POST["usuario"], "usuario", "existe", "vacio", "longitud=0-50");
            $usuario = $_POST["usuario"];

            verficarDato($_POST["contra"], "contra", "existe", "vacio", "longitud=8-20");
            $contra = $_POST["contra"];

            $bd->consulta("SELECT * FROM usuarios WHERE usuario = '$usuario' AND contra = '$contra'");
            $usuario = $bd->obtenerResultado();
            if($usuario){
                $usuario = json_encode(array(
                    "codigo"=>"200",
                    "datos"=>$usuario
                ));

                echo $usuario;
                die();
            }else{
                MensajeUsuario(404, "Usuario o contrasena incorrectos. Por favor, verfique.");
            }
            break;
        }
        
        default:{
            MensajeUsuario(404, "No se encontro la accion");
        }
    }
?>