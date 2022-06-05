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

export async function obtenerConId(id) {
  verifDatos.verifTipoDato(id, "number");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerConNombresApellidos");
  urlencoded.append("personas_id", id);

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

export async function crearPersonas(nombres, apellidos, fecha_nac) {
  verifDatos.verifTipoDato(nombres, "string");
  verifDatos.verifTipoDato(apellidos, "string");
  verifDatos.verifTipoDato(fecha_nac, "string");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "crear");
  urlencoded.append("nombres", nombres);
  urlencoded.append("apellidos", apellidos);
  urlencoded.append("fecha_nac", fecha_nac);

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
