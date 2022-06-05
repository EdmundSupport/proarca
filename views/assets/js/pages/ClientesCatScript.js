import config from "../../../../config/config.json" assert { type: "json" };
import * as verifDatos from "./VerificarDatos.js";

export let clientesCat = {
  id: 0,
  nombre: "",
  estado: 0,
};

verifDatos.verifTipoDato(clientesCat.id, "number");
verifDatos.verifTipoDato(clientesCat.nombre, "string");
verifDatos.verifTipoDato(clientesCat.estado, "number");

export async function obtenerClientesCategorias() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerClientesCategorias");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(
    config.host + "models/ClientesCategorias.php",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function obtenerClientesCategoriasConNombre(nombre) {
  verifDatos.verifTipoDato(nombre, "string");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerClientesCategoriasConNombre");
  urlencoded.append("nombre", nombre);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(
    config.host + "models/ClientesCategorias.php",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function crearClientesCategorias(nombre, estado) {
  verifDatos.verifTipoDato(nombre, "string");
  verifDatos.verifTipoDato(estado, "number");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "crear");
  urlencoded.append("nombre", nombre);
  urlencoded.append("estado", estado);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(
    config.host + "models/ClientesCategorias.php",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function crear() {
  clientesCat.nombre = document.getElementById("nombre").value;
  clientesCat.estado = document.getElementById("estado").value == "on" ? 1 : 0;

  let categoriasDatos = await obtenerClientesCategoriasConNombre(
    clientesCat.nombre
  );

  if (categoriasDatos.codigo == "404") {
    let cagetorias_id = await crearClientesCategorias(
      clientesCat.nombre,
      Number(clientesCat.estado)
    );

    if (cagetorias_id.codigo == "200") {
      alert("Categoria creada con existo.");
      window.location.href = "./../pages/ClienteCat.php";
    } else {
      alert(cagetorias_id.datos);
    }
  } else if (categoriasDatos.codigo == "200") {
    alert("Ya existe una categoria con este nombre");
  } else {
    alert(categoriasDatos.datos);
  }
}
