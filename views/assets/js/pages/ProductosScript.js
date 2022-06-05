import config from "../../../../config/config.json" assert { type: "json" };
import * as personas from "./PersonasScript.js";
import * as verifDatos from "./VerificarDatos.js";

export let productos = {
  id: 0,
  sku: "",
  descripcion: "",
  es_servicio: 0,
  precio_hora: 0.0,
  precio_dia: 0.0,
  estado: 0,
  es_combo: 0,
  costo: 0.0,
  categorias_id: 0,
};

verifDatos.verifTipoDato(productos.id, "number");
verifDatos.verifTipoDato(productos.sku, "string");
verifDatos.verifTipoDato(productos.descripcion, "string");
verifDatos.verifTipoDato(productos.es_servicio, "number");
verifDatos.verifTipoDato(productos.precio_hora, "number");
verifDatos.verifTipoDato(productos.precio_dia, "number");
verifDatos.verifTipoDato(productos.estado, "number");
verifDatos.verifTipoDato(productos.es_combo, "number");
verifDatos.verifTipoDato(productos.costo, "number");
verifDatos.verifTipoDato(productos.categorias_id, "number");

export async function obtenerProductos() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerProductos");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Productos.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function obtenerProductosConId(id) {
  verifDatos.verifTipoDato(id, "number");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerProductosConId");
  urlencoded.append("id", id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Productos.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}
export async function obtenerProductosConSKU(sku) {
  verifDatos.verifTipoDato(sku, "string");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerProductosConSKU");
  urlencoded.append("sku", sku);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Productos.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function crearProductos(
  sku,
  descripcion,
  es_servicio,
  precio_hora,
  precio_dia,
  estado,
  es_combo,
  costo,
  categorias_id
) {
  verifDatos.verifTipoDato(sku, "string");
  verifDatos.verifTipoDato(descripcion, "string");
  verifDatos.verifTipoDato(es_servicio, "number");
  verifDatos.verifTipoDato(precio_hora, "number");
  verifDatos.verifTipoDato(precio_dia, "number");
  verifDatos.verifTipoDato(estado, "number");
  verifDatos.verifTipoDato(es_combo, "number");
  verifDatos.verifTipoDato(costo, "number");
  verifDatos.verifTipoDato(categorias_id, "number");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "crear");
  urlencoded.append("sku", sku);
  urlencoded.append("descripcion", descripcion);
  urlencoded.append("es_servicio", es_servicio);
  urlencoded.append("precio_hora", precio_hora);
  urlencoded.append("precio_dia", precio_dia);
  urlencoded.append("estado", estado);
  urlencoded.append("es_combo", es_combo);
  urlencoded.append("costo", costo);
  urlencoded.append("categorias_id", categorias_id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Productos.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}
export async function modificarProductos(
  id,
  sku,
  descripcion,
  es_servicio,
  precio_hora,
  precio_dia,
  estado,
  es_combo,
  costo,
  categorias_id
) {
  verifDatos.verifTipoDato(sku, "string");
  verifDatos.verifTipoDato(descripcion, "string");
  verifDatos.verifTipoDato(es_servicio, "number");
  verifDatos.verifTipoDato(precio_hora, "number");
  verifDatos.verifTipoDato(precio_dia, "number");
  verifDatos.verifTipoDato(estado, "number");
  verifDatos.verifTipoDato(es_combo, "number");
  verifDatos.verifTipoDato(costo, "number");
  verifDatos.verifTipoDato(categorias_id, "number");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "modificar");
  urlencoded.append("id", id);
  urlencoded.append("sku", sku);
  urlencoded.append("descripcion", descripcion);
  urlencoded.append("es_servicio", es_servicio);
  urlencoded.append("precio_hora", precio_hora);
  urlencoded.append("precio_dia", precio_dia);
  urlencoded.append("estado", estado);
  urlencoded.append("es_combo", es_combo);
  urlencoded.append("costo", costo);
  urlencoded.append("categorias_id", categorias_id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Productos.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}
export async function eliminarProductos(id) {
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

  return await fetch(config.host + "models/Productos.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function crear() {
  productos.sku = document.getElementById("sku").value;
  productos.descripcion = document.getElementById("descripcion").value;
  productos.es_servicio = document.getElementById("es_servicio").checked
    ? 1
    : 0;
  productos.precio_hora = document.getElementById("precio_hora").value;
  productos.precio_dia = document.getElementById("precio_dia").value;
  productos.estado = document.getElementById("estado").checked ? 1 : 0;
  productos.es_combo = document.getElementById("es_combo").checked ? 1 : 0;
  productos.costo = document.getElementById("costo").value;
  productos.categorias_id = document.getElementById("categorias_id").value;

  let productosDatos = await obtenerProductosConSKU(productos.sku);

  if (productosDatos.codigo == "404") {
    let productos_id = await crearProductos(
      productos.sku,
      productos.descripcion,
      Number(productos.es_servicio),
      Number(productos.precio_hora),
      Number(productos.precio_dia),
      Number(productos.estado),
      Number(productos.es_combo),
      Number(productos.costo),
      Number(productos.categorias_id)
    );

    if (productos_id.codigo == "200") {
      alert("Producto creada con existo.");
      window.location.href = "./../pages/Producto.php";
    } else {
      alert(productos_id.datos);
    }
  } else if (productosDatos.codigo == "200") {
    alert("Ya existe una producto con este nombre");
  } else {
    alert(productosDatos.datos);
  }
}

export async function modificar() {
  productos.id = document.getElementById("id").value;
  productos.sku = document.getElementById("sku").value;
  productos.descripcion = document.getElementById("descripcion").value;
  productos.es_servicio = document.getElementById("es_servicio").checked
    ? 1
    : 0;
  productos.precio_hora = document.getElementById("precio_hora").value;
  productos.precio_dia = document.getElementById("precio_dia").value;
  productos.estado = document.getElementById("estado").checked ? 1 : 0;
  productos.es_combo = document.getElementById("es_combo").checked ? 1 : 0;
  productos.costo = document.getElementById("costo").value;
  productos.categorias_id = document.getElementById("categorias_id").value;

  let productosDatos = await obtenerProductosConId(Number(productos.id));

  let productosDatos2 = await obtenerProductosConSKU(productos.sku);

  if (productosDatos.codigo == "200") {
    if (productosDatos2.codigo == "200") {
      if (productosDatos2.datos.sku != productosDatos.datos.sku) {
        alert("Ya existe una producto con este nombre o ID");
        return;
      }
    }

    let productos_id = await modificarProductos(
      Number(productos.id),
      productos.sku,
      productos.descripcion,
      Number(productos.es_servicio),
      Number(productos.precio_hora),
      Number(productos.precio_dia),
      Number(productos.estado),
      Number(productos.es_combo),
      Number(productos.costo),
      Number(productos.categorias_id)
    );

    if (productos_id.codigo == "200") {
      alert("Producto modificada con existo.");
      window.location.href = "./../pages/Producto.php";
    } else {
      alert(productos_id.datos);
    }
  } else if (productosDatos.codigo == "404") {
    alert("No existe una producto con este nombre o ID");
  } else {
    alert(productosDatos.datos);
  }
}

export async function eliminar(id) {
  let resultado = await eliminarProductos(Number(id));
  console.log(resultado);
  alert(resultado.datos);
  location.reload();
}
