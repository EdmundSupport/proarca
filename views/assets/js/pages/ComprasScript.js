import config from "../../../../config/config.json" assert { type: "json" };
import * as proveedores from "./ProveedoresScript.js";
import * as verifDatos from "./VerificarDatos.js";

export let comprasDet = {
  id: 0,
  cantidad: 0,
  sku: "",
  descripcion: "",
  precio: 0.0,
  compras_id: 0,
  productos_id: 0,
};

export let compras = {
  id: 0,
  serie: "",
  numero: "",
  fecha: 0,
  estado: 0.0,
  proveedores_id: 0.0,
  usuarios_id: 0,
  detalle: [],
};

verifDatos.verifTipoDato(compras.id, "number");
verifDatos.verifTipoDato(compras.serie, "string");
verifDatos.verifTipoDato(compras.numero, "string");
verifDatos.verifTipoDato(compras.fecha, "number");
verifDatos.verifTipoDato(compras.estado, "number");
verifDatos.verifTipoDato(compras.proveedores_id, "number");
verifDatos.verifTipoDato(compras.usuarios_id, "number");
verifDatos.verifTipoDato(compras.detalle, "object");

verifDatos.verifTipoDato(comprasDet.id, "number");
verifDatos.verifTipoDato(comprasDet.cantidad, "number");
verifDatos.verifTipoDato(comprasDet.sku, "string");
verifDatos.verifTipoDato(comprasDet.descripcion, "string");
verifDatos.verifTipoDato(comprasDet.precio, "number");
verifDatos.verifTipoDato(comprasDet.compras_id, "number");
verifDatos.verifTipoDato(comprasDet.productos_id, "number");

export async function obtenerCompras() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerCompras");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Compras.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function obtenerComprasConId(id) {
  verifDatos.verifTipoDato(id, "number");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerComprasConId");
  urlencoded.append("id", id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Compras.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}
export async function obtenerCompraConSerieNumero(serie, numero) {
  verifDatos.verifTipoDato(serie, "string");
  verifDatos.verifTipoDato(numero, "number");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerCompraConSerieNumero");
  urlencoded.append("serie", serie);
  urlencoded.append("numero", numero);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Compras.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

function VerificarDatos() {}

export async function crearCompras(
  serie,
  numero,
  fecha,
  estado,
  proveedores_id,
  usuarios_id,
  detalle
) {
  verifDatos.verifTipoDato(serie, "string");
  verifDatos.verifTipoDato(numero, "number");
  verifDatos.verifTipoDato(fecha, "string");
  verifDatos.verifTipoDato(estado, "number");
  verifDatos.verifTipoDato(proveedores_id, "number");
  verifDatos.verifTipoDato(usuarios_id, "number");
  verifDatos.verifTipoDato(detalle, "object");

  detalle.forEach((fila) => {
    verifDatos.verifTipoDato(fila.cantidad, "number");
    verifDatos.verifTipoDato(fila.sku, "string");
    verifDatos.verifTipoDato(fila.descripcion, "string");
    verifDatos.verifTipoDato(fila.precio, "number");
    verifDatos.verifTipoDato(fila.productos_id, "number");
  });

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "crear");
  urlencoded.append("serie", serie);
  urlencoded.append("numero", numero);
  urlencoded.append("fecha", fecha);
  urlencoded.append("estado", estado);
  urlencoded.append("proveedores_id", proveedores_id);
  urlencoded.append("usuarios_id", usuarios_id);
  urlencoded.append("detalle", JSON.stringify(detalle));

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Compras.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function modificarCompras(
  id,
  serie,
  numero,
  fecha,
  estado,
  proveedores_id,
  usuarios_id,
  detalle
) {
  verifDatos.verifTipoDato(id, "number");
  verifDatos.verifTipoDato(serie, "string");
  verifDatos.verifTipoDato(numero, "number");
  verifDatos.verifTipoDato(fecha, "string");
  verifDatos.verifTipoDato(estado, "number");
  verifDatos.verifTipoDato(proveedores_id, "number");
  verifDatos.verifTipoDato(usuarios_id, "number");
  verifDatos.verifTipoDato(detalle, "object");

  detalle.forEach((fila) => {
    verifDatos.verifTipoDato(fila.cantidad, "number");
    verifDatos.verifTipoDato(fila.sku, "string");
    verifDatos.verifTipoDato(fila.descripcion, "string");
    verifDatos.verifTipoDato(fila.precio, "number");
    verifDatos.verifTipoDato(fila.productos_id, "number");
  });

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "modificar");
  urlencoded.append("serie", serie);
  urlencoded.append("numero", numero);
  urlencoded.append("fecha", fecha);
  urlencoded.append("estado", estado);
  urlencoded.append("proveedores_id", proveedores_id);
  urlencoded.append("usuarios_id", usuarios_id);
  urlencoded.append("detalle", JSON.stringify(detalle));

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Compras.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function eliminarCompras(id) {
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

  return await fetch(config.host + "models/Compras.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function crear() {
  compras.serie = document.getElementById("serie").value;
  compras.numero = document.getElementById("numero").value;
  compras.fecha = verifDatos.formatoFecha(
    document.getElementById("fecha").value
  );
  compras.estado = 0;
  compras.nit = document.getElementById("nit").value;
  compras.nombre = document.getElementById("nombre").value;
  compras.direccion = document.getElementById("direccion").value;
  compras.usuarios_id = 1;

  let comprasDatos = await obtenerCompraConSerieNumero(
    compras.serie,
    Number(compras.numero)
  );

  let proveedorDatos = await proveedores.obtenerProveedoresConNombre(
    compras.nombre
  );

  if (proveedorDatos.codigo == "200")
    compras.proveedores_id = proveedorDatos.datos.proveedores_id;
  else {
    alert(
      "El proveedor no existe. Por favor, crearlo en le modulo de proveedores."
    );
    return;
  }

  if (comprasDatos.codigo == "404") {
    let compras_id = await crearCompras(
      compras.serie,
      Number(compras.numero),
      compras.fecha,
      Number(compras.estado),
      Number(compras.proveedores_id),
      Number(compras.usuarios_id),
      []
    );

    if (compras_id.codigo == "200") {
      alert("Compra creada con existo.");
      window.location.href = "./../pages/Compra.php";
    } else {
      alert(compras_id.datos);
    }
  } else if (comprasDatos.codigo == "200") {
    alert("Ya existe una compra con este nombre");
  } else {
    alert(comprasDatos.datos);
  }
}

export async function modificar() {
  compras.id = document.getElementById("id").value;
  compras.sku = document.getElementById("sku").value;
  compras.descripcion = document.getElementById("descripcion").value;
  compras.es_servicio = document.getElementById("es_servicio").checked ? 1 : 0;
  compras.precio_hora = document.getElementById("precio_hora").value;
  compras.precio_dia = document.getElementById("precio_dia").value;
  compras.estado = document.getElementById("estado").checked ? 1 : 0;
  compras.es_combo = document.getElementById("es_combo").checked ? 1 : 0;
  compras.costo = document.getElementById("costo").value;
  compras.categorias_id = document.getElementById("categorias_id").value;

  let comprasDatos = await obtenerComprasConId(Number(compras.id));

  let comprasDatos2 = await obtenerComprasConSKU(compras.sku);

  if (comprasDatos.codigo == "200") {
    if (comprasDatos2.codigo == "200") {
      if (comprasDatos2.datos.sku != comprasDatos.datos.sku) {
        alert("Ya existe una compra con este nombre o ID");
        return;
      }
    }

    let compras_id = await modificarCompras(
      Number(compras.id),
      compras.sku,
      compras.descripcion,
      Number(compras.es_servicio),
      Number(compras.precio_hora),
      Number(compras.precio_dia),
      Number(compras.estado),
      Number(compras.es_combo),
      Number(compras.costo),
      Number(compras.categorias_id)
    );

    if (compras_id.codigo == "200") {
      alert("Compra modificada con existo.");
      window.location.href = "./../pages/Compra.php";
    } else {
      alert(compras_id.datos);
    }
  } else if (comprasDatos.codigo == "404") {
    alert("No existe una compra con este nombre o ID");
  } else {
    alert(comprasDatos.datos);
  }
}

export async function eliminar(id) {
  let resultado = await eliminarCompras(Number(id));
  console.log(resultado);
  alert(resultado.datos);
  location.reload();
}

export async function agregarFila(i) {
  let detalle = document.getElementById("detalle");
  let filaNueva = document.getElementById("filaNueva").cloneNode(true);
  filaNueva.setAttribute("id", "fila-" + i);
  filaNueva.removeAttribute("hidden");
  detalle.append(filaNueva);
  i++;
}

export async function eliminarFila(fila) {
  console.log(fila);
  fila.parentElement.parentElement.parentElement.remove();
}
