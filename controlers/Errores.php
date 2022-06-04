<?php
function MensajeUsuario($codigo, $datos){
    $error = array(
        "codigo"=>$codigo,
        "datos"=> $datos
    );

    return $error;
}

function MensajeProgramador($codigo, $datos){
    $error = array(
        "codigo"=>$codigo,
        "datos"=> $datos
    );

    return $error;
}
?>