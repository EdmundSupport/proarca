import config from "./../../../../config/config.json" assert { type: "json" };
import * as verifDatos from "./VerificarDatos.js";

export let usuarios = {
  id: 0,
  usuario: "",
  contra: "",
  estado: 0,
  personas_id: 0,
};

verifDatos.verifTipoDato(usuarios.id, "number");
verifDatos.verifTipoDato(usuarios.usuario, "string");
verifDatos.verifTipoDato(usuarios.contra, "string");
verifDatos.verifTipoDato(usuarios.estado, "number");
verifDatos.verifTipoDato(usuarios.personas_id, "number");

export async function obtenerConUsuarioContra(usuario, contra) {
  verifDatos.verifTipoDato(usuario, "string");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerConUsuarioContra");
  urlencoded.append("usuario", usuario);
  urlencoded.append("contra", contra);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Usuarios.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function crearUsuario() {
  usuarios.usuario = document.getElementById("usuario").value;
  usuarios.contra = document.getElementById("contra").value;
}

export async function iniciarSesion() {
  usuarios.usuario = document.getElementById("usuario").value;
  usuarios.contra = document.getElementById("contra").value;

  let usuarioDatos = await obtenerConUsuarioContra(
    usuarios.usuario,
    usuarios.contra
  );

  console.log(usuarioDatos);

  if (usuarioDatos.codigo != "200") {
    alert(usuarioDatos.datos);
  } else if (usuarioDatos.codigo == "200") {
    alert(usuarioDatos.datos);
    window.location.href = "../../pages/Inicio.php";
  }
}

export async function registrarse() {
  usuarios.usuario = document.getElementById("usuario").value;
  usuarios.contra = document.getElementById("contra").value;
}
