<?php

    ini_set('display_errors', 1); 
    ini_set('display_startup_errors', 1); 
    error_reporting(E_ALL);

    require_once(__DIR__."/../controlers/config.php");
    require_once("$dirModels/VerificarDatos.php");
    require_once("$dirControlers/Errores.php");
            
    require_once("Basedatos.php");
    $bd = new Basedatos();
    
    function obtenerClientes(){
        global $bd;
        $bd->consulta("SELECT * FROM clientes");
        $modulos = $bd->obtenerResultados();
        if($modulos){
            return MensajeUsuario(200,$modulos);
        }else{
            return MensajeUsuario(404, "No se encontraron clientes");
        }
    }

    function obtenerClientesConNombre($nombre){
        global $bd;

        $nombre = verficarDato($nombre, "nombre", "existe", "vacio", "longitud=0-50");
        if($nombre["codigo"] != 200) return $nombre;

        $nombre = $nombre["datos"];

        $bd->consulta("SELECT * FROM clientes WHERE nombre = '$nombre'");
        $cliente = $bd->obtenerResultado();
        if($cliente){
            return MensajeUsuario(200,$cliente);
        }else{
            return MensajeUsuario(404, "No se encontro la cliente de cliente buscada");
        }
    }

    function obtenerClientesConId($id){
        global $bd;

        $id = verficarDato($id, "id", "existe", "vacio", "numero-negativo");
        if($id["codigo"] != 200) return $id;

        $id = $id["datos"];

        $bd->consulta("SELECT * FROM clientes WHERE clientes_id = '$id'");
        $cliente = $bd->obtenerResultado();
        if($cliente){
            return MensajeUsuario(200,$cliente);
        }else{
            return MensajeUsuario(404, "No se encontro la cliente de cliente buscada");
        }
    }

    function crearClientes($nit, $nombre, $direccion, $estado, $personas_id, $categorias_id){
        global $bd;
        
        $nit = verficarDato($nit, "nit", "existe", "vacio", "longitud=2-11");
        if($nit["codigo"] != 200) return $nit;
        $nombre = verficarDato($nombre, "nombre", "existe", "vacio", "longitud=0-100");
        if($nombre["codigo"] != 200) return $nombre;
        $direccion = verficarDato($direccion, "direccion", "existe", "vacio", "longitud=0-100");
        if($direccion["codigo"] != 200) return $direccion;
        $estado = verficarDato($estado, "estado", "existe", "vacio", "numero-negativo");
        if($estado["codigo"] != 200) return $estado;
        $personas_id = verficarDato($personas_id, "personas_id", "existe", "vacio", "numero-negativo");
        if($personas_id["codigo"] != 200) return $personas_id;
        $categorias_id = verficarDato($categorias_id, "categorias_id", "existe", "vacio", "numero-negativo");
        if($categorias_id["codigo"] != 200) return $categorias_id;
        
        $nit = $nit["datos"];
        $nombre = $nombre["datos"];
        $direccion = $direccion["datos"];
        $estado = $estado["datos"];
        $personas_id = $personas_id["datos"];
        $categorias_id = $categorias_id["datos"];

        $existeCliente = obtenerClientesConNombre($nombre);
        if($existeCliente["codigo"] == "200"){
            return MensajeUsuario(404, "Ya existe esta cliente.");
        }

        $bd->consulta("INSERT INTO clientes  
        (nit, nombre, direccion, estado, personas_id, categorias_id)
        VALUES
        ('$nit', '$nombre', '$direccion', $estado, $personas_id, $categorias_id)");
        $bd->ejecutar();
        
        return MensajeUsuario(200,$bd->ultimoIdInsertado());
         
    }

    function modificarClientes($id, $nit, $nombre, $direccion, $estado, $personas_id, $categorias_id){
        global $bd;
        
        $id = verficarDato($id, "id", "existe", "vacio", "numero-negativo");
        if($id["codigo"] != 200) return $id;
        $nit = verficarDato($nit, "nit", "existe", "vacio", "longitud=2-11");
        if($nit["codigo"] != 200) return $nit;
        $nombre = verficarDato($nombre, "nombre", "existe", "vacio", "longitud=0-100");
        if($nombre["codigo"] != 200) return $nombre;
        $direccion = verficarDato($direccion, "direccion", "existe", "vacio", "longitud=0-100");
        if($direccion["codigo"] != 200) return $direccion;
        $estado = verficarDato($estado, "estado", "existe", "vacio", "numero-negativo");
        if($estado["codigo"] != 200) return $estado;
        $personas_id = verficarDato($personas_id, "personas_id", "existe", "vacio", "numero-negativo");
        if($personas_id["codigo"] != 200) return $personas_id;
        $categorias_id = verficarDato($categorias_id, "categorias_id", "existe", "vacio", "numero-negativo");
        if($categorias_id["codigo"] != 200) return $categorias_id;
        
        $id = $id["datos"];
        $nit = $nit["datos"];
        $nombre = $nombre["datos"];
        $direccion = $direccion["datos"];
        $estado = $estado["datos"];
        $personas_id = $personas_id["datos"];
        $categorias_id = $categorias_id["datos"];

        $bd->consulta("UPDATE clientes
        SET 
        nit = '$nit', 
        nombre = '$nombre', 
        direccion = '$direccion', 
        estado = $estado,
        personas_id = $personas_id,
        categorias_id = $categorias_id
        WHERE clientes_id = $id");
        $bd->ejecutar();
        
        return MensajeUsuario(200,"Cliente actualizada con exito");
         
    }

    function eliminarClientes($id){
        global $bd;
        
        $id = verficarDato($id, "id", "existe", "vacio", "numero-negativo");
        if($id["codigo"] != 200) return $id;
        
        $id = $id["datos"];

        $bd->consulta("DELETE FROM clientes
        WHERE clientes_id = $id");
        $bd->ejecutar();
        
        return MensajeUsuario(200,"Cliente eliminada con exito");
         
    }

    if(isset($_POST["accion"])){
        header('Content-Type: application/json; charset=utf-8');

        switch($_POST["accion"]){
            case "verif":{
                break;
            }

            case "obtenerClientes":{
                echo json_encode(obtenerClientes());
                break;
            }

            case "obtenerClientesConNombre":{
                echo json_encode(obtenerClientesConNombre($_POST["nombre"]));
                break;
            }

            case "obtenerClientesConId":{
                echo json_encode(obtenerClientesConId($_POST["id"]));
                break;
            }
            
            case "crear":{
                echo json_encode(crearClientes($_POST["nit"], $_POST["nombre"], $_POST["direccion"], $_POST["estado"], $_POST["personas_id"], $_POST["categorias_id"]));
                break;
            }

            case "modificar":{
                echo json_encode(modificarClientes($_POST["id"], $_POST["nit"], $_POST["nombre"], $_POST["direccion"], $_POST["estado"], $_POST["personas_id"], $_POST["categorias_id"]));
                break;
            }
            
            case "eliminar":{
                echo json_encode(eliminarClientes($_POST["id"]));
                break;
            }
            
            default:{
                echo json_encode(MensajeUsuario(404, "No se encontro la accion"));
                exit();
            }
        }
    }
?>