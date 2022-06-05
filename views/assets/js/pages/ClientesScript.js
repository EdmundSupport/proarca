import config from "../../../../config/config.json" assert { type: "json" };
import * as personas from "./PersonasScript.js";
import * as verifDatos from "./VerificarDatos.js";

export let clientes = {
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

verifDatos.verifTipoDato(clientes.id, "number");
verifDatos.verifTipoDato(clientes.nombre, "string");
verifDatos.verifTipoDato(clientes.estado, "number");

export async function obtenerClientes() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerClientes");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Clientes.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function obtenerClientesConId(id) {
  verifDatos.verifTipoDato(id, "number");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerClientesConId");
  urlencoded.append("id", id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Clientes.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}
export async function obtenerClientesConNombre(nombre) {
  verifDatos.verifTipoDato(nombre, "string");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerClientesConNombre");
  urlencoded.append("nombre", nombre);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Clientes.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function crearClientes(
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

  return await fetch(config.host + "models/Clientes.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}
export async function modificarClientes(
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

  return await fetch(config.host + "models/Clientes.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}
export async function eliminarClientes(id) {
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

  return await fetch(config.host + "models/Clientes.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function crear() {
  clientes.nit = document.getElementById("nit").value;
  clientes.nombre = document.getElementById("nombre").value;
  clientes.direccion = document.getElementById("direccion").value;
  clientes.estado = document.getElementById("estado").checked ? 1 : 0;
  clientes.nombres = document.getElementById("nombres").value;
  clientes.apellidos = document.getElementById("apellidos").value;
  clientes.fecha_nac = verifDatos.formatoFecha(
    document.getElementById("fecha_nac").value
  );
  // clientes.personas_id = document.getElementById("personas_id").value;
  clientes.categorias_id = document.getElementById("categorias_id").value;

  let clientesDatos = await obtenerClientesConNombre(clientes.nombre);
  console.log(clientes.fecha_nac);
  let personasDatos = await personas.crearPersonas(
    clientes.nombres,
    clientes.apellidos,
    clientes.fecha_nac
  );
  if (personasDatos.codigo == 200) clientes.personas_id = personasDatos.datos;
  else {
    alert(personasDatos.datos);
    return;
  }

  if (clientesDatos.codigo == "404") {
    let clientes_id = await crearClientes(
      clientes.nit,
      clientes.nombre,
      clientes.direccion,
      Number(clientes.estado),
      Number(clientes.personas_id),
      Number(clientes.categorias_id)
    );

    if (clientes_id.codigo == "200") {
      alert("Cliente creada con existo.");
      window.location.href = "./../pages/Cliente.php";
    } else {
      alert(clientes_id.datos);
    }
  } else if (clientesDatos.codigo == "200") {
    alert("Ya existe una cliente con este nombre");
  } else {
    alert(clientesDatos.datos);
  }
}

export async function modificar() {
  clientes.id = document.getElementById("id").value;
  clientes.nit = document.getElementById("nit").value;
  clientes.nombre = document.getElementById("nombre").value;
  clientes.direccion = document.getElementById("direccion").value;
  clientes.estado = document.getElementById("estado").checked ? 1 : 0;
  clientes.nombres = document.getElementById("nombres").value;
  clientes.apellidos = document.getElementById("apellidos").value;
  clientes.fecha_nac = verifDatos.formatoFecha(
    document.getElementById("fecha_nac").value
  );
  clientes.personas_id = document.getElementById("personas_id").value;
  clientes.categorias_id = document.getElementById("categorias_id").value;

  let clientesDatos = await obtenerClientesConId(Number(clientes.id));

  let clientesDatos2 = await obtenerClientesConNombre(clientes.nombre);

  if (clientesDatos.codigo == "200") {
    if (clientesDatos2.codigo == "200") {
      if (clientesDatos2.datos.nombre != clientesDatos.datos.nombre) {
        alert("Ya existe una cliente con este nombre o ID");
        return;
      }
    }

    let clientes_id = await modificarClientes(
      Number(clientes.id),
      clientes.nit,
      clientes.nombre,
      clientes.direccion,
      Number(clientes.estado),
      Number(clientes.personas_id),
      Number(clientes.categorias_id)
    );

    if (clientes_id.codigo == "200") {
      alert("Cliente modificada con existo.");
      window.location.href = "./../pages/Cliente.php";
    } else {
      alert(clientes_id.datos);
    }
  } else if (clientesDatos.codigo == "404") {
    alert("No existe una cliente con este nombre o ID");
  } else {
    alert(clientesDatos.datos);
  }
}

export async function eliminar(id) {
  let resultado = await eliminarClientes(Number(id));
  console.log(resultado);
  alert(resultado.datos);
  location.reload();
}
