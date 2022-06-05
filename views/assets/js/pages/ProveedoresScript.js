import config from "../../../../config/config.json" assert { type: "json" };
import * as personas from "./PersonasScript.js";
import * as verifDatos from "./VerificarDatos.js";

export let proveedores = {
  id: 0,
  nit: "",
  nombre: "",
  direccion: "",
  estado: 0,
  nombres: "",
  apellidos: "",
  fecha_nac: "",
  personas_id: 0,
  categorias_id: 0,
};

verifDatos.verifTipoDato(proveedores.id, "number");
verifDatos.verifTipoDato(proveedores.nombre, "string");
verifDatos.verifTipoDato(proveedores.estado, "number");

export async function obtenerProveedores() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerProveedores");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Proveedores.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function obtenerProveedoresConId(id) {
  verifDatos.verifTipoDato(id, "number");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerProveedoresConId");
  urlencoded.append("id", id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Proveedores.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}
export async function obtenerProveedoresConNombre(nombre) {
  verifDatos.verifTipoDato(nombre, "string");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerProveedoresConNombre");
  urlencoded.append("nombre", nombre);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Proveedores.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function crearProveedores(
  nit,
  nombre,
  direccion,
  estado,
  personas_id,
  categorias_id
) {
  verifDatos.verifTipoDato(nit, "string");
  verifDatos.verifTipoDato(nombre, "string");
  verifDatos.verifTipoDato(direccion, "string");
  verifDatos.verifTipoDato(estado, "number");
  verifDatos.verifTipoDato(personas_id, "number");
  verifDatos.verifTipoDato(categorias_id, "number");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "crear");
  urlencoded.append("nit", nit);
  urlencoded.append("nombre", nombre);
  urlencoded.append("direccion", direccion);
  urlencoded.append("estado", estado);
  urlencoded.append("personas_id", personas_id);
  urlencoded.append("categorias_id", categorias_id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Proveedores.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}
export async function modificarProveedores(
  id,
  nit,
  nombre,
  direccion,
  estado,
  personas_id,
  categorias_id
) {
  verifDatos.verifTipoDato(id, "number");
  verifDatos.verifTipoDato(nit, "string");
  verifDatos.verifTipoDato(nombre, "string");
  verifDatos.verifTipoDato(direccion, "string");
  verifDatos.verifTipoDato(estado, "number");
  verifDatos.verifTipoDato(personas_id, "number");
  verifDatos.verifTipoDato(categorias_id, "number");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "modificar");
  urlencoded.append("id", id);
  urlencoded.append("nit", nit);
  urlencoded.append("nombre", nombre);
  urlencoded.append("direccion", direccion);
  urlencoded.append("estado", estado);
  urlencoded.append("personas_id", personas_id);
  urlencoded.append("categorias_id", categorias_id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Proveedores.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}
export async function eliminarProveedores(id) {
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

  return await fetch(config.host + "models/Proveedores.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function crear() {
  proveedores.nit = document.getElementById("nit").value;
  proveedores.nombre = document.getElementById("nombre").value;
  proveedores.direccion = document.getElementById("direccion").value;
  proveedores.estado = document.getElementById("estado").checked ? 1 : 0;
  proveedores.nombres = document.getElementById("nombres").value;
  proveedores.apellidos = document.getElementById("apellidos").value;
  proveedores.fecha_nac = verifDatos.formatoFecha(
    document.getElementById("fecha_nac").value
  );
  // proveedores.personas_id = document.getElementById("personas_id").value;
  proveedores.categorias_id = document.getElementById("categorias_id").value;

  let proveedoresDatos = await obtenerProveedoresConNombre(proveedores.nombre);
  console.log(proveedores.fecha_nac);
  let personasDatos = await personas.crearPersonas(
    proveedores.nombres,
    proveedores.apellidos,
    proveedores.fecha_nac
  );
  if (personasDatos.codigo == 200)
    proveedores.personas_id = personasDatos.datos;
  else {
    alert(personasDatos.datos);
    return;
  }

  if (proveedoresDatos.codigo == "404") {
    let proveedores_id = await crearProveedores(
      proveedores.nit,
      proveedores.nombre,
      proveedores.direccion,
      Number(proveedores.estado),
      Number(proveedores.personas_id),
      Number(proveedores.categorias_id)
    );

    if (proveedores_id.codigo == "200") {
      alert("Proveedor creada con existo.");
      window.location.href = "./../pages/Proveedor.php";
    } else {
      alert(proveedores_id.datos);
    }
  } else if (proveedoresDatos.codigo == "200") {
    alert("Ya existe una proveedor con este nombre");
  } else {
    alert(proveedoresDatos.datos);
  }
}

export async function modificar() {
  proveedores.id = document.getElementById("id").value;
  proveedores.nit = document.getElementById("nit").value;
  proveedores.nombre = document.getElementById("nombre").value;
  proveedores.direccion = document.getElementById("direccion").value;
  proveedores.estado = document.getElementById("estado").checked ? 1 : 0;
  proveedores.nombres = document.getElementById("nombres").value;
  proveedores.apellidos = document.getElementById("apellidos").value;
  proveedores.fecha_nac = verifDatos.formatoFecha(
    document.getElementById("fecha_nac").value
  );
  proveedores.personas_id = document.getElementById("personas_id").value;
  proveedores.categorias_id = document.getElementById("categorias_id").value;

  let proveedoresDatos = await obtenerProveedoresConId(Number(proveedores.id));

  let proveedoresDatos2 = await obtenerProveedoresConNombre(proveedores.nombre);

  if (proveedoresDatos.codigo == "200") {
    if (proveedoresDatos2.codigo == "200") {
      if (proveedoresDatos2.datos.nombre != proveedoresDatos.datos.nombre) {
        alert("Ya existe una proveedor con este nombre o ID");
        return;
      }
    }

    let proveedores_id = await modificarProveedores(
      Number(proveedores.id),
      proveedores.nit,
      proveedores.nombre,
      proveedores.direccion,
      Number(proveedores.estado),
      Number(proveedores.personas_id),
      Number(proveedores.categorias_id)
    );

    if (proveedores_id.codigo == "200") {
      alert("Proveedor modificada con existo.");
      window.location.href = "./../pages/Proveedor.php";
    } else {
      alert(proveedores_id.datos);
    }
  } else if (proveedoresDatos.codigo == "404") {
    alert("No existe una proveedor con este nombre o ID");
  } else {
    alert(proveedoresDatos.datos);
  }
}

export async function eliminar(id) {
  let resultado = await eliminarProveedores(Number(id));
  console.log(resultado);
  alert(resultado.datos);
  location.reload();
}
