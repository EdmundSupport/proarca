<?php
require_once("./../controlers/Errores.php");
function verificarExisteDato($dato, $campo){
    if($dato == false){
        MensajeUsuario(400, "No se recibio el campo $campo");
    }
}

function verificarDatoVacio($dato, $campo){
    verificarExisteDato(isset($dato), $campo);
    if(strlen($dato) == 0){
        MensajeUsuario(400, "El campo $campo se encuentra vacio");
    }
}

function verficarDato($dato, $campo, ...$args){
    $fallido = false;
    foreach($args AS $arg){
        switch($arg){
            case "existe":{
                if(isset($dato) == false){
                    return MensajeUsuario(400, " El campo $campo no se ha definido o no existe. Por favor, contacte al administrador.");
                } 
                break;
            }

            case "vacio":{
                if(strlen($dato) == 0){
                    return MensajeUsuario(400, "El campo $campo se encuentra vacio.");
                }
                break;
            }

            case "numero":{
                if(is_numeric($dato) == false){
                    return MensajeUsuario(400, "El campo $campo solo debe contener numeros.");
                }
                break;
            }

            case "numero-negativo":{
                if($dato < 0){
                    return MensajeUsuario(400, "El campo $campo no puede contener numeros negativos.");
                }
                break;
            }

            case (preg_match("/(longitud)+(=)([0-9])+(-)([0-9])+/", $arg) ? true : false) :{ // longitud=0-1
                $split = explode("=",$arg);
                $lon = explode("-",$split[1]);
                if($split[0] != "longitud"){
                    $fallido = true;
                    return MensajeUsuario(400, "En $campo. La instruccion debe iniciar con la palabra longitud. Contacte al administardor.");
                }else if($lon[0] > $lon[1]){
                    $fallido = true;
                    return MensajeUsuario(400, "En $campo. La longitud inicial no puede ser mayor a la longitud final. Contacte al administardor.");
                }else{
                    if(strlen($dato) < $lon[0] || strlen($dato) > $lon[1]){
                        return MensajeUsuario(400, "El campo $campo no puede tener menos de $lon[0] caracteres y mas de $lon[1] caracteres.");
                    }
                }
                
                break;
            }

            case "email":{ //email
                if(!filter_var($dato, FILTER_VALIDATE_EMAIL)){
                    return MensajeUsuario(400, "El $campo no es un correo. Ej. ejemplo@empresa.com");
                }
                break;
            }
        }
    }
    return MensajeUsuario(200, $dato);
}

?>