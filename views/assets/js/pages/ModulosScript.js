import config from "../../../../config/config.json" assert { type: "json" };
import * as verifDatos from "./VerificarDatos.js";

export let modulos = {
  id: 0,
  ruta: "",
  nombre: "",
  icon: 0,
  estado: 0,
};

verifDatos.verifTipoDato(modulos.id, "number");
verifDatos.verifTipoDato(modulos.ruta, "string");
verifDatos.verifTipoDato(modulos.nombre, "string");
verifDatos.verifTipoDato(modulos.icon, "number");
verifDatos.verifTipoDato(modulos.estado, "number");

export async function obtenerModulos() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerModulos");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Modulos.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
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
