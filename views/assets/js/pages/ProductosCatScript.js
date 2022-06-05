import config from "../../../../config/config.json" assert { type: "json" };
import * as verifDatos from "./VerificarDatos.js";

export let productosCat = {
  id: 0,
  nombre: "",
  estado: 0,
};

verifDatos.verifTipoDato(productosCat.id, "number");
verifDatos.verifTipoDato(productosCat.nombre, "string");
verifDatos.verifTipoDato(productosCat.estado, "number");

export async function obtenerProductosCategorias() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerProductosCategorias");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(
    config.host + "models/ProductosCategorias.php",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function obtenerProductosCategoriasConId(id) {
  verifDatos.verifTipoDato(id, "number");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerProductosCategoriasConId");
  urlencoded.append("id", id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(
    config.host + "models/ProductosCategorias.php",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}
export async function obtenerProductosCategoriasConNombre(nombre) {
  verifDatos.verifTipoDato(nombre, "string");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerProductosCategoriasConNombre");
  urlencoded.append("nombre", nombre);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(
    config.host + "models/ProductosCategorias.php",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function crearProductosCategorias(nombre, estado) {
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
    config.host + "models/ProductosCategorias.php",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}
export async function modificarProductosCategorias(id, nombre, estado) {
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
    config.host + "models/ProductosCategorias.php",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}
export async function eliminarProductosCategorias(id) {
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
    config.host + "models/ProductosCategorias.php",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function crear() {
  productosCat.nombre = document.getElementById("nombre").value;
  productosCat.estado = document.getElementById("estado").value == "on" ? 1 : 0;

  let categoriasDatos = await obtenerProductosCategoriasConNombre(
    productosCat.nombre
  );

  if (categoriasDatos.codigo == "404") {
    let cagetorias_id = await crearProductosCategorias(
      productosCat.nombre,
      Number(productosCat.estado)
    );

    if (cagetorias_id.codigo == "200") {
      alert("Categoria creada con existo.");
      window.location.href = "./../pages/ProductoCat.php";
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
  productosCat.id = document.getElementById("id").value;
  productosCat.nombre = document.getElementById("nombre").value;
  productosCat.estado = document.getElementById("estado").checked ? 1 : 0;

  let categoriasDatos = await obtenerProductosCategoriasConId(
    Number(productosCat.id)
  );

  let categoriasDatos2 = await obtenerProductosCategoriasConNombre(
    productosCat.nombre
  );

  if (categoriasDatos.codigo == "200") {
    if (categoriasDatos2.codigo == "200") {
      if (categoriasDatos2.datos.nombre != categoriasDatos.datos.nombre) {
        alert("Ya existe una categoria con este nombre o ID");
        return;
      }
    }

    let cagetorias_id = await modificarProductosCategorias(
      Number(productosCat.id),
      productosCat.nombre,
      Number(productosCat.estado)
    );

    if (cagetorias_id.codigo == "200") {
      alert("Categoria modificada con existo.");
      window.location.href = "./../pages/ProductoCat.php";
    } else {
      alert(cagetorias_id.datos);
    }
  } else if (categoriasDatos.codigo == "404") {
    alert("No existe una categoria con este nombre o ID");
  } else {
    alert(categoriasDatos.datos);
  }
}

export async function eliminar(id) {
  let resultado = await eliminarProductosCategorias(Number(id));
  console.log(resultado);
  alert(resultado.datos);
  location.reload();
}
