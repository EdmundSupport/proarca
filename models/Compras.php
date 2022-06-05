<?php

    ini_set('display_errors', 1); 
    ini_set('display_startup_errors', 1); 
    error_reporting(E_ALL);

    require_once(__DIR__."/../controlers/config.php");
    require_once("$dirModels/VerificarDatos.php");
    require_once("$dirControlers/Errores.php");
            
    require_once("Basedatos.php");
    $bd = new Basedatos();
    
    function estado($estado){
        switch($estado){
            case 0:{
                return array(
                    "color" =>"success",
                    "texto" =>"Creado"
                );
                break;
            }
            case 1:{
                return array(
                    "color" =>"success",
                    "texto" =>"Aprobada"
                );
                break;
            }
            case 2:{
                return array(
                    "color" =>"success",
                    "texto" =>"Comprado"
                );
                break;
            }
            case 3:{
                return array(
                    "color" =>"success",
                    "texto" =>"Recibida"
                );
                break;
            }
        }
        return array(
            "color" =>"success",
            "texto" =>"Creado"
        );
    }

    function obtenerCompras(){
        global $bd;
        $bd->consulta("SELECT 
            a.*, 
            c.nit,
            c.nombre AS proveedor,
            SUM(IFNULL(b.cantidad*b.precio,0.00)) AS total
        FROM compras_cab a 
        LEFT JOIN compras_det b ON b.compras_id = a.compras_id
        LEFT JOIN proveedores c ON c.proveedores_id = a.proveedores_id
        ");
        $modulos = $bd->obtenerResultados();
        if($modulos){
            return MensajeUsuario(200,$modulos);
        }else{
            return MensajeUsuario(404, "No se encontraron compras");
        }
    }

    function obtenerComprasConSerieNumero($serie, $numero){
        global $bd;

        $serie = verficarDato($serie, "seire", "existe", "vacio", "longitud=0-100");
        if($serie["codigo"] != 200) return $serie;
        $numero = verficarDato($numero, "numero", "existe", "vacio", "numero-negativo");
        if($numero["codigo"] != 200) return $numero;

        $serie = $serie["datos"];
        $numero = $numero["datos"];

        $bd->consulta("SELECT * FROM compras_cab WHERE serie = '$serie' AND numero=$numero");
        $compra = $bd->obtenerResultado();
        if($compra){
            return MensajeUsuario(200,$compra);
        }else{
            return MensajeUsuario(404, "No se encontro la compra buscada");
        }
    }

    function obtenerComprasConId($id){
        global $bd;

        $id = verficarDato($id, "id", "existe", "vacio", "numero-negativo");
        if($id["codigo"] != 200) return $id;

        $id = $id["datos"];

        $bd->consulta("SELECT * FROM compras_cab WHERE compras_id = '$id'");
        $compra = $bd->obtenerResultado();
        if($compra){
            return MensajeUsuario(200,$compra);
        }else{
            return MensajeUsuario(404, "No se encontro la compra buscada");
        }
    }

    function crearCompras($serie, $numero, $fecha, $estado, $proveedores_id, $usuarios_id){
        global $bd;
        
        $serie = verficarDato($serie, "serie", "existe", "vacio", "longitud=0-100");
        if($serie["codigo"] != 200) return $serie;
        $numero = verficarDato($numero, "numero", "existe", "vacio", "numero");
        if($numero["codigo"] != 200) return $numero;
        $fecha = verficarDato($fecha, "fecha", "existe", "vacio", "fecha");
        if($fecha["codigo"] != 200) return $fecha;
        $estado = verficarDato($estado, "estado", "existe", "vacio", "numero");
        if($estado["codigo"] != 200) return $estado;
        $proveedores_id = verficarDato($proveedores_id, "proveedores_id", "existe", "vacio", "numero-negativo");
        if($proveedores_id["codigo"] != 200) return $proveedores_id;
        $usuarios_id = verficarDato($usuarios_id, "usuarios_id", "existe", "vacio", "numero-negativo");
        
        
        $serie = $serie["datos"];
        $numero = $numero["datos"];
        $fecha = formatoFecha($fecha["datos"])." ".date("H:i:s");
        $estado = $estado["datos"];
        $proveedores_id = $proveedores_id["datos"];
        $usuarios_id = $usuarios_id["datos"];
        
        $existeCompra = obtenerComprasConSerieNumero($serie, $numero);
        if($existeCompra["codigo"] == "200"){
            return MensajeUsuario(404, "Ya existe esta compra.");
        }

        $bd->consulta("INSERT INTO compras_cab  
        (serie, numero, fecha, estado, proveedores_id, usuarios_id)
        VALUES
        ('$serie', $numero, '$fecha', $estado, $proveedores_id, $usuarios_id)");
        $bd->ejecutar();
        
        return MensajeUsuario(200,$bd->ultimoIdInsertado());
         
    }

    function modificarCompras($id, $serie, $numero, $fecha, $estado, $proveedores_id, $usuarios_id){
        global $bd;
        
        $id = verficarDato($id, "id", "existe", "vacio", "numero-negativo");
        if($id["codigo"] != 200) return $id;
        $serie = verficarDato($serie, "serie", "existe", "vacio", "longitud=2-11");
        if($serie["codigo"] != 200) return $serie;
        $numero = verficarDato($numero, "numero", "existe", "vacio", "longitud=0-100");
        if($numero["codigo"] != 200) return $numero;
        $fecha = verficarDato($fecha, "fecha", "existe", "vacio", "longitud=0-100");
        if($fecha["codigo"] != 200) return $fecha;
        $estado = verficarDato($estado, "estado", "existe", "vacio", "numero-negativo");
        if($estado["codigo"] != 200) return $estado;
        $proveedores_id = verficarDato($proveedores_id, "proveedores_id", "existe", "vacio", "numero-negativo");
        if($proveedores_id["codigo"] != 200) return $proveedores_id;
        $usuarios_id = verficarDato($usuarios_id, "usuarios_id", "existe", "vacio", "numero-negativo");
        if($usuarios_id["codigo"] != 200) return $usuarios_id;

        $id = $id["datos"];
        $serie = $serie["datos"];
        $numero = $numero["datos"];
        $fecha = $fecha["datos"];
        $estado = $estado["datos"];
        $proveedores_id = $proveedores_id["datos"];
        $usuarios_id = $usuarios_id["datos"];

        $bd->consulta("UPDATE compras
        SET 
        serie = '$serie', 
        numero = $numero, 
        fecha = '$fecha', 
        estado = $estado,
        proveedores_id = $proveedores_id,
        usuarios_id = $usuarios_id,
        es_combo = $es_combo,
        costo = $costo,
        categorias_id = $categorias_id
        WHERE compras_id = $id");
        $bd->ejecutar();
        
        return MensajeUsuario(200,"Compra actualizada con exito");
         
    }

    function eliminarCompras($id){
        global $bd;
        
        $id = verficarDato($id, "id", "existe", "vacio", "numero-negativo");
        if($id["codigo"] != 200) return $id;
        
        $id = $id["datos"];

        $bd->consulta("DELETE FROM compras
        WHERE compras_id = $id");
        $bd->ejecutar();
        
        return MensajeUsuario(200,"Compra eliminada con exito");
         
    }

    if(isset($_POST["accion"])){
        header('Content-Type: application/json; charset=utf-8');

        switch($_POST["accion"]){
            case "verif":{
                break;
            }

            case "obtenerCompras":{
                echo json_encode(obtenerCompras());
                break;
            }

            case "obtenerComprasConSKUe":{
                echo json_encode(obtenerComprasConSKU($_POST["sku"]));
                break;
            }

            case "obtenerComprasConId":{
                echo json_encode(obtenerComprasConId($_POST["id"]));
                break;
            }
            
            case "crear":{
                echo json_encode(crearCompras($_POST["serie"], $_POST["numero"], $_POST["fecha"], $_POST["estado"], $_POST["proveedores_id"], $_POST["usuarios_id"]));
                break;
            }

            case "modificar":{
                echo json_encode(modificarCompras($_POST["id"], $_POST["sku"], $_POST["descripcion"], $_POST["es_servicio"], $_POST["precio_hora"], $_POST["precio_dia"], $_POST["estado"], $_POST["es_combo"], $_POST["costo"], $_POST["categorias_id"]));
                break;
            }
            
            case "eliminar":{
                echo json_encode(eliminarCompras($_POST["id"]));
                break;
            }
            
            default:{
                echo json_encode(MensajeUsuario(404, "No se encontro la accion"));
                exit();
            }
        }
    }
?>