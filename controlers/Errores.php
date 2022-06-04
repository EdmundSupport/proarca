<?php
function MensajeUsuario($codigo, $datos){
    $error = json_encode(array(
        "codigo"=>"400",
        "datos"=> $datos
    ));

    echo $error;
    exit();
}

function MensajeProgramador($codigo, $datos){
    $error = json_encode(array(
        "codigo"=>"400",
        "datos"=> $datos
    ));

    echo $error;
    exit();
}
?>