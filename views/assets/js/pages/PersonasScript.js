import config from "../../../../config/config.json" assert { type: "json" };
import * as verifDatos from "./VerificarDatos.js";

export let personas = {
  id: 0,
  nombres: "",
  apellidos: "",
  fecha_nac: "",
  estado: 0,
};

verifDatos.verifTipoDato(personas.id, "number");
verifDatos.verifTipoDato(personas.nombres, "string");
verifDatos.verifTipoDato(personas.apellidos, "string");
verifDatos.verifTipoDato(personas.fecha_nac, "string");
verifDatos.verifTipoDato(personas.estado, "number");

export async function obtenerConNombresApellidos(nombres, apellidos) {
  verifDatos.verifTipoDato(nombres, "string");
  verifDatos.verifTipoDato(apellidos, "string");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerConNombresApellidos");
  urlencoded.append("nombres", nombres);
  urlencoded.append("apellidos", apellidos);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Personas.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function crearPersonas() {
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
