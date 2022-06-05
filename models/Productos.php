<?php

    ini_set('display_errors', 1); 
    ini_set('display_startup_errors', 1); 
    error_reporting(E_ALL);

    require_once(__DIR__."/../controlers/config.php");
    require_once("$dirModels/VerificarDatos.php");
    require_once("$dirControlers/Errores.php");
            
    require_once("Basedatos.php");
    $bd = new Basedatos();
    
    function obtenerProductos(){
        global $bd;
        $bd->consulta("SELECT * FROM productos");
        $modulos = $bd->obtenerResultados();
        if($modulos){
            return MensajeUsuario(200,$modulos);
        }else{
            return MensajeUsuario(404, "No se encontraron productos");
        }
    }

    function obtenerProductosConSKU($sku){
        global $bd;

        $sku = verficarDato($sku, "sku", "existe", "vacio", "longitud=0-10");
        if($sku["codigo"] != 200) return $sku;

        $sku = $sku["datos"];

        $bd->consulta("SELECT * FROM productos WHERE sku = '$sku'");
        $producto = $bd->obtenerResultado();
        if($producto){
            return MensajeUsuario(200,$producto);
        }else{
            return MensajeUsuario(404, "No se encontro la producto buscada");
        }
    }

    function obtenerProductosConId($id){
        global $bd;

        $id = verficarDato($id, "id", "existe", "vacio", "numero-negativo");
        if($id["codigo"] != 200) return $id;

        $id = $id["datos"];

        $bd->consulta("SELECT * FROM productos WHERE productos_id = '$id'");
        $producto = $bd->obtenerResultado();
        if($producto){
            return MensajeUsuario(200,$producto);
        }else{
            return MensajeUsuario(404, "No se encontro la producto buscada");
        }
    }

    function crearProductos($sku, $descripcion, $es_servicio, $precio_hora, $precio_dia, $estado, $es_combo, $costo, $categorias_id){
        global $bd;
        
        $sku = verficarDato($sku, "sku", "existe", "vacio", "longitud=2-10");
        if($sku["codigo"] != 200) return $sku;
        $descripcion = verficarDato($descripcion, "descripcion", "existe", "vacio", "longitud=0-150");
        if($descripcion["codigo"] != 200) return $descripcion;
        $es_servicio = verficarDato($es_servicio, "servicio", "existe", "vacio", "numero-booleano");
        if($es_servicio["codigo"] != 200) return $es_servicio;
        $precio_hora = verficarDato($precio_hora, "precio hora", "existe", "vacio", "numero-negativo");
        if($precio_hora["codigo"] != 200) return $precio_hora;
        $precio_dia = verficarDato($precio_dia, "precio dia", "existe", "vacio", "numero-negativo");
        if($precio_dia["codigo"] != 200) return $precio_dia;
        $estado = verficarDato($estado, "estado", "existe", "vacio", "numero");
        if($estado["codigo"] != 200) return $estado;
        $es_combo = verficarDato($es_combo, "combo", "existe", "vacio", "numero-booleano");
        if($es_combo["codigo"] != 200) return $es_combo;
        $costo = verficarDato($costo, "costo", "existe", "vacio", "numero-negativo");
        if($costo["codigo"] != 200) return $costo;
        $categorias_id = verficarDato($categorias_id, "categorias_id", "existe", "vacio", "numero-negativo");
        if($categorias_id["codigo"] != 200) return $categorias_id;
        
        $sku = $sku["datos"];
        $descripcion = $descripcion["datos"];
        $es_servicio = $es_servicio["datos"];
        $precio_hora = $precio_hora["datos"];
        $precio_dia = $precio_dia["datos"];
        $estado = $estado["datos"];
        $es_combo = $es_combo["datos"];
        $costo = $costo["datos"];
        $categorias_id = $categorias_id["datos"];
        
        $existeProducto = obtenerProductosConSKU($sku);
        if($existeProducto["codigo"] == "200"){
            return MensajeUsuario(404, "Ya existe esta producto.");
        }

        $bd->consulta("INSERT INTO productos  
        (sku, descripcion, es_servicio, precio_hora, precio_dia, estado, es_combo, costo, categorias_id)
        VALUES
        ('$sku', '$descripcion', '$es_servicio', $precio_hora, $precio_dia, $estado, $es_combo, $costo, $categorias_id)");
        $bd->ejecutar();
        
        return MensajeUsuario(200,$bd->ultimoIdInsertado());
         
    }

    function modificarProductos($id, $sku, $descripcion, $es_servicio, $precio_hora, $precio_dia, $estado, $es_combo, $costo, $categorias_id){
        global $bd;
        
        $id = verficarDato($id, "id", "existe", "vacio", "numero-negativo");
        if($id["codigo"] != 200) return $id;
        $sku = verficarDato($sku, "sku", "existe", "vacio", "longitud=2-11");
        if($sku["codigo"] != 200) return $sku;
        $descripcion = verficarDato($descripcion, "descripcion", "existe", "vacio", "longitud=0-100");
        if($descripcion["codigo"] != 200) return $descripcion;
        $es_servicio = verficarDato($es_servicio, "es_servicio", "existe", "vacio", "longitud=0-100");
        if($es_servicio["codigo"] != 200) return $es_servicio;
        $precio_hora = verficarDato($precio_hora, "precio_hora", "existe", "vacio", "numero-negativo");
        if($precio_hora["codigo"] != 200) return $precio_hora;
        $precio_dia = verficarDato($precio_dia, "precio_dia", "existe", "vacio", "numero-negativo");
        if($precio_dia["codigo"] != 200) return $precio_dia;
        $estado = verficarDato($estado, "estado", "existe", "vacio", "numero-negativo");
        if($estado["codigo"] != 200) return $estado;
         $es_combo = verficarDato($es_combo, "combo", "existe", "vacio", "numero-booleano");
        if($es_combo["codigo"] != 200) return $es_combo;
        $costo = verficarDato($costo, "costo", "existe", "vacio", "numero-negativo");
        if($costo["codigo"] != 200) return $costo;
        $categorias_id = verficarDato($categorias_id, "categorias_id", "existe", "vacio", "numero-negativo");
        if($categorias_id["codigo"] != 200) return $categorias_id;

        $id = $id["datos"];
        $sku = $sku["datos"];
        $descripcion = $descripcion["datos"];
        $es_servicio = $es_servicio["datos"];
        $precio_hora = $precio_hora["datos"];
        $precio_dia = $precio_dia["datos"];
        $estado = $estado["datos"];
        $es_combo = $es_combo["datos"];
        $costo = $costo["datos"];
        $categorias_id = $categorias_id["datos"];

        $bd->consulta("UPDATE productos
        SET 
        sku = '$sku', 
        descripcion = '$descripcion', 
        es_servicio = '$es_servicio', 
        precio_hora = $precio_hora,
        precio_dia = $precio_dia,
        estado = $estado,
        es_combo = $es_combo,
        costo = $costo,
        categorias_id = $categorias_id
        WHERE productos_id = $id");
        $bd->ejecutar();
        
        return MensajeUsuario(200,"Producto actualizada con exito");
         
    }

    function eliminarProductos($id){
        global $bd;
        
        $id = verficarDato($id, "id", "existe", "vacio", "numero-negativo");
        if($id["codigo"] != 200) return $id;
        
        $id = $id["datos"];

        $bd->consulta("DELETE FROM productos
        WHERE productos_id = $id");
        $bd->ejecutar();
        
        return MensajeUsuario(200,"Producto eliminada con exito");
         
    }

    if(isset($_POST["accion"])){
        header('Content-Type: application/json; charset=utf-8');

        switch($_POST["accion"]){
            case "verif":{
                break;
            }

            case "obtenerProductos":{
                echo json_encode(obtenerProductos());
                break;
            }

            case "obtenerProductosConSKUe":{
                echo json_encode(obtenerProductosConSKU($_POST["sku"]));
                break;
            }

            case "obtenerProductosConId":{
                echo json_encode(obtenerProductosConId($_POST["id"]));
                break;
            }
            
            case "crear":{
                echo json_encode(crearProductos($_POST["sku"], $_POST["descripcion"], $_POST["es_servicio"], $_POST["precio_hora"], $_POST["precio_dia"], $_POST["estado"], $_POST["es_combo"], $_POST["costo"], $_POST["categorias_id"]));
                break;
            }

            case "modificar":{
                echo json_encode(modificarProductos($_POST["id"], $_POST["sku"], $_POST["descripcion"], $_POST["es_servicio"], $_POST["precio_hora"], $_POST["precio_dia"], $_POST["estado"], $_POST["es_combo"], $_POST["costo"], $_POST["categorias_id"]));
                break;
            }
            
            case "eliminar":{
                echo json_encode(eliminarProductos($_POST["id"]));
                break;
            }
            
            default:{
                echo json_encode(MensajeUsuario(404, "No se encontro la accion"));
                exit();
            }
        }
    }
?>