<?php

    ini_set('display_errors', 1); 
    ini_set('display_startup_errors', 1); 
    error_reporting(E_ALL);

    require_once(__DIR__."/../controlers/config.php");
    require_once("$dirModels/VerificarDatos.php");
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

    function obtenerClientesCategoriasConNombre($nombre){
        global $bd;

        $nombre = verficarDato($nombre, "nombre", "existe", "vacio", "longitud=0-50");
        if($nombre["codigo"] != 200) return $nombre;

        $nombre = $nombre["datos"];

        $bd->consulta("SELECT * FROM categorias_clientes WHERE nombre = '$nombre'");
        $categoria = $bd->obtenerResultado();
        if($categoria){
            return MensajeUsuario(200,$categoria);
        }else{
            return MensajeUsuario(404, "No se encontro la categoria de cliente buscada");
        }
    }

    function obtenerClientesCategoriasConId($id){
        global $bd;

        $id = verficarDato($id, "id", "existe", "vacio", "numero-negativo");
        if($id["codigo"] != 200) return $id;

        $id = $id["datos"];

        $bd->consulta("SELECT * FROM categorias_clientes WHERE categorias_id = '$id'");
        $categoria = $bd->obtenerResultado();
        if($categoria){
            return MensajeUsuario(200,$categoria);
        }else{
            return MensajeUsuario(404, "No se encontro la categoria de cliente buscada");
        }
    }

    function crearClientesCategorias($nombre, $estado){
        global $bd;

        $nombre = verficarDato($nombre, "nombre", "existe", "vacio", "longitud=0-50");
        if($nombre["codigo"] != 200) return $nombre;
        $estado = verficarDato($estado, "estado", "existe", "vacio", "numero-negativo");
        if($estado["codigo"] != 200) return $estado;
        
        $estado = $estado["datos"];
        $nombre = $nombre["datos"];

        $existeCategoria = obtenerClientesCategoriasConNombre($nombre);
        if($existeCategoria["codigo"] == "200"){
            return MensajeUsuario(404, "Ya existe esta categoria.");
        }

        $bd->consulta("INSERT INTO categorias_clientes  
        (nombre, estado)
        VALUES
        ('$nombre', $estado)");
        $bd->ejecutar();
        
        return MensajeUsuario(200,$bd->ultimoIdInsertado());
         
    }

    function modificarClientesCategorias($id, $nombre, $estado){
        global $bd;
        
        $id = verficarDato($id, "id", "existe", "vacio", "numero-negativo");
        if($id["codigo"] != 200) return $id;
        $nombre = verficarDato($nombre, "nombre", "existe", "vacio", "longitud=0-50");
        if($nombre["codigo"] != 200) return $nombre;
        $estado = verficarDato($estado, "estado", "existe", "vacio", "numero-negativo");
        if($estado["codigo"] != 200) return $estado;
        
        $id = $id["datos"];
        $estado = $estado["datos"];
        $nombre = $nombre["datos"];

        $bd->consulta("UPDATE categorias_clientes
        SET nombre = '$nombre', estado = $estado
        WHERE categorias_id = $id");
        $bd->ejecutar();
        
        return MensajeUsuario(200,"Categoria actualizada con exito");
         
    }

    function eliminarClientesCategorias($id){
        global $bd;
        
        $id = verficarDato($id, "id", "existe", "vacio", "numero-negativo");
        if($id["codigo"] != 200) return $id;
        
        $id = $id["datos"];

        $bd->consulta("DELETE FROM categorias_clientes
        WHERE categorias_id = $id");
        $bd->ejecutar();
        
        return MensajeUsuario(200,"Categoria eliminada con exito");
         
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

            case "obtenerClientesCategoriasConNombre":{
                echo json_encode(obtenerClientesCategoriasConNombre($_POST["nombre"]));
                break;
            }

            case "obtenerClientesCategoriasConId":{
                echo json_encode(obtenerClientesCategoriasConId($_POST["id"]));
                break;
            }
            
            case "crear":{
                echo json_encode(crearClientesCategorias($_POST["nombre"],$_POST["estado"]));
                break;
            }

            case "modificar":{
                echo json_encode(modificarClientesCategorias($_POST["id"], $_POST["nombre"],$_POST["estado"]));
                break;
            }
            
            case "eliminar":{
                echo json_encode(eliminarClientesCategorias($_POST["id"]));
                break;
            }
            
            default:{
                echo json_encode(MensajeUsuario(404, "No se encontro la accion"));
                exit();
            }
        }
    }
?>