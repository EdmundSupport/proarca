import config from "../../../../config/config.json" assert { type: "json" };
import * as verifDatos from "./VerificarDatos.js";

export let proveedoresCat = {
  id: 0,
  nombre: "",
  estado: 0,
};

verifDatos.verifTipoDato(proveedoresCat.id, "number");
verifDatos.verifTipoDato(proveedoresCat.nombre, "string");
verifDatos.verifTipoDato(proveedoresCat.estado, "number");

export async function obtenerProveedoresCategorias() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerProveedoresCategorias");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(
    config.host + "models/ProveedoresCategorias.php",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function obtenerProveedoresCategoriasConId(id) {
  verifDatos.verifTipoDato(id, "number");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerProveedoresCategoriasConId");
  urlencoded.append("id", id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(
    config.host + "models/ProveedoresCategorias.php",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}
export async function obtenerProveedoresCategoriasConNombre(nombre) {
  verifDatos.verifTipoDato(nombre, "string");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerProveedoresCategoriasConNombre");
  urlencoded.append("nombre", nombre);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(
    config.host + "models/ProveedoresCategorias.php",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function crearProveedoresCategorias(nombre, estado) {
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
    config.host + "models/ProveedoresCategorias.php",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}
export async function modificarProveedoresCategorias(id, nombre, estado) {
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
    config.host + "models/ProveedoresCategorias.php",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}
export async function eliminarProveedoresCategorias(id) {
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
    config.host + "models/ProveedoresCategorias.php",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function crear() {
  proveedoresCat.nombre = document.getElementById("nombre").value;
  proveedoresCat.estado =
    document.getElementById("estado").value == "on" ? 1 : 0;

  let categoriasDatos = await obtenerProveedoresCategoriasConNombre(
    proveedoresCat.nombre
  );

  if (categoriasDatos.codigo == "404") {
    let cagetorias_id = await crearProveedoresCategorias(
      proveedoresCat.nombre,
      Number(proveedoresCat.estado)
    );

    if (cagetorias_id.codigo == "200") {
      alert("Categoria creada con existo.");
      window.location.href = "./../pages/ProveedorCat.php";
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
  proveedoresCat.id = document.getElementById("id").value;
  proveedoresCat.nombre = document.getElementById("nombre").value;
  proveedoresCat.estado = document.getElementById("estado").checked ? 1 : 0;

  let categoriasDatos = await obtenerProveedoresCategoriasConId(
    Number(proveedoresCat.id)
  );

  let categoriasDatos2 = await obtenerProveedoresCategoriasConNombre(
    proveedoresCat.nombre
  );

  if (categoriasDatos.codigo == "200") {
    if (categoriasDatos2.codigo == "200") {
      if (categoriasDatos2.datos.nombre != categoriasDatos.datos.nombre) {
        alert("Ya existe una categoria con este nombre o ID");
        return;
      }
    }

    let cagetorias_id = await modificarProveedoresCategorias(
      Number(proveedoresCat.id),
      proveedoresCat.nombre,
      Number(proveedoresCat.estado)
    );

    if (cagetorias_id.codigo == "200") {
      alert("Categoria modificada con existo.");
      window.location.href = "./../pages/ProveedorCat.php";
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
  let resultado = await eliminarProveedoresCategorias(Number(id));
  console.log(resultado);
  alert(resultado.datos);
  location.reload();
}
