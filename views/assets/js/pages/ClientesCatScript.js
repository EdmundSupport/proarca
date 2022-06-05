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

export async function obtenerClientesCategoriasConId(id) {
  verifDatos.verifTipoDato(id, "number");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerClientesCategoriasConId");
  urlencoded.append("id", id);

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
export async function modificarClientesCategorias(id, nombre, estado) {
  verifDatos.verifTipoDato(id, "number");
  verifDatos.verifTipoDato(nombre, "string");
  verifDatos.verifTipoDato(estado, "number");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "modificar");
  urlencoded.append("id", id);
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
export async function eliminarClientesCategorias(id) {
  verifDatos.verifTipoDato(id, "number");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "eliminar");
  urlencoded.append("id", id);

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

export async function modificar() {
  clientesCat.id = document.getElementById("id").value;
  clientesCat.nombre = document.getElementById("nombre").value;
  clientesCat.estado = document.getElementById("estado").checked ? 1 : 0;

  let categoriasDatos = await obtenerClientesCategoriasConId(
    Number(clientesCat.id)
  );

  let categoriasDatos2 = await obtenerClientesCategoriasConNombre(
    clientesCat.nombre
  );

  if (categoriasDatos.codigo == "200") {
    if (categoriasDatos2.codigo == "200") {
      if (categoriasDatos2.datos.nombre != categoriasDatos.datos.nombre) {
        alert("Ya existe una categoria con este nombre o ID");
      }
    } else {
      let cagetorias_id = await modificarClientesCategorias(
        Number(clientesCat.id),
        clientesCat.nombre,
        Number(clientesCat.estado)
      );

      if (cagetorias_id.codigo == "200") {
        alert("Categoria modificada con existo.");
        window.location.href = "./../pages/ClienteCat.php";
      } else {
        alert(cagetorias_id.datos);
      }
    }
  } else if (categoriasDatos.codigo == "404") {
    alert("No existe una categoria con este nombre o ID");
  } else {
    alert(categoriasDatos.datos);
  }
}

export async function eliminar(id) {
  let resultado = await eliminarClientesCategorias(Number(id));
  console.log(resultado);
  alert(resultado.datos);
  location.reload();
}
