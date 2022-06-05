<?php

    ini_set('display_errors', 1); 
    ini_set('display_startup_errors', 1); 
    error_reporting(E_ALL);

    require_once(__DIR__."/../controlers/config.php");
    require_once("$dirModels/VerificarDatos.php");
    require_once("$dirControlers/Errores.php");
            
    require_once("Basedatos.php");
    $bd = new Basedatos();
    
    function obtenerProductosCategorias(){
        global $bd;
        $bd->consulta("SELECT * FROM categorias_productos");
        $modulos = $bd->obtenerResultados();
        if($modulos){
            return MensajeUsuario(200,$modulos);
        }else{
            return MensajeUsuario(404, "No se encontraron categorias de productos");
        }
    }

    function obtenerProductosCategoriasConNombre($nombre){
        global $bd;

        $nombre = verficarDato($nombre, "nombre", "existe", "vacio", "longitud=0-50");
        if($nombre["codigo"] != 200) return $nombre;

        $nombre = $nombre["datos"];

        $bd->consulta("SELECT * FROM categorias_productos WHERE nombre = '$nombre'");
        $categoria = $bd->obtenerResultado();
        if($categoria){
            return MensajeUsuario(200,$categoria);
        }else{
            return MensajeUsuario(404, "No se encontro la categoria de producto buscada");
        }
    }

    function obtenerProductosCategoriasConId($id){
        global $bd;

        $id = verficarDato($id, "id", "existe", "vacio", "numero-negativo");
        if($id["codigo"] != 200) return $id;

        $id = $id["datos"];

        $bd->consulta("SELECT * FROM categorias_productos WHERE categorias_id = '$id'");
        $categoria = $bd->obtenerResultado();
        if($categoria){
            return MensajeUsuario(200,$categoria);
        }else{
            return MensajeUsuario(404, "No se encontro la categoria de producto buscada");
        }
    }

    function crearProductosCategorias($nombre, $estado){
        global $bd;

        $nombre = verficarDato($nombre, "nombre", "existe", "vacio", "longitud=0-50");
        if($nombre["codigo"] != 200) return $nombre;
        $estado = verficarDato($estado, "estado", "existe", "vacio", "numero-negativo");
        if($estado["codigo"] != 200) return $estado;
        
        $estado = $estado["datos"];
        $nombre = $nombre["datos"];

        $existeCategoria = obtenerProductosCategoriasConNombre($nombre);
        if($existeCategoria["codigo"] == "200"){
            return MensajeUsuario(404, "Ya existe esta categoria.");
        }

        $bd->consulta("INSERT INTO categorias_productos  
        (nombre, estado)
        VALUES
        ('$nombre', $estado)");
        $bd->ejecutar();
        
        return MensajeUsuario(200,$bd->ultimoIdInsertado());
         
    }

    function modificarProductosCategorias($id, $nombre, $estado){
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

        $bd->consulta("UPDATE categorias_productos
        SET nombre = '$nombre', estado = $estado
        WHERE categorias_id = $id");
        $bd->ejecutar();
        
        return MensajeUsuario(200,"Categoria actualizada con exito");
         
    }

    function eliminarProductosCategorias($id){
        global $bd;
        
        $id = verficarDato($id, "id", "existe", "vacio", "numero-negativo");
        if($id["codigo"] != 200) return $id;
        
        $id = $id["datos"];

        $bd->consulta("DELETE FROM categorias_productos
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

            case "obtenerProductosCategorias":{
                echo json_encode(obtenerProductosCategorias());
                break;
            }

            case "obtenerProductosCategoriasConNombre":{
                echo json_encode(obtenerProductosCategoriasConNombre($_POST["nombre"]));
                break;
            }

            case "obtenerProductosCategoriasConId":{
                echo json_encode(obtenerProductosCategoriasConId($_POST["id"]));
                break;
            }
            
            case "crear":{
                echo json_encode(crearProductosCategorias($_POST["nombre"],$_POST["estado"]));
                break;
            }

            case "modificar":{
                echo json_encode(modificarProductosCategorias($_POST["id"], $_POST["nombre"],$_POST["estado"]));
                break;
            }
            
            case "eliminar":{
                echo json_encode(eliminarProductosCategorias($_POST["id"]));
                break;
            }
            
            default:{
                echo json_encode(MensajeUsuario(404, "No se encontro la accion"));
                exit();
            }
        }
    }
?>