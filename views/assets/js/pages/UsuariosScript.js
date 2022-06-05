import config from "./../../../../config/config.json" assert { type: "json" };
import * as verifDatos from "./VerificarDatos.js";
import * as personas from "./PersonasScript.js";

export let usuarios = {
  id: 0,
  usuario: "",
  contra: "",
  estado: 0,
  personas_id: 0,
  nombres: "",
  apellidos: "",
  fecha_nac: "",
};

verifDatos.verifTipoDato(usuarios.id, "number");
verifDatos.verifTipoDato(usuarios.usuario, "string");
verifDatos.verifTipoDato(usuarios.contra, "string");
verifDatos.verifTipoDato(usuarios.estado, "number");
verifDatos.verifTipoDato(usuarios.personas_id, "number");
verifDatos.verifTipoDato(usuarios.nombres, "string");
verifDatos.verifTipoDato(usuarios.apellidos, "string");
verifDatos.verifTipoDato(usuarios.fecha_nac, "string");

export async function obtenerConUsuario(usuario) {
  verifDatos.verifTipoDato(usuario, "string");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerConUsuario");
  urlencoded.append("usuario", usuario);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Usuarios.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function obtenerConUsuarioContra(usuario, contra) {
  verifDatos.verifTipoDato(usuario, "string");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "obtenerConUsuarioContra");
  urlencoded.append("usuario", usuario);
  urlencoded.append("contra", contra);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Usuarios.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
}

export async function crearUsuarios(usuario, contra, personas_id) {
  verifDatos.verifTipoDato(usuario, "string");
  verifDatos.verifTipoDato(contra, "string");
  verifDatos.verifTipoDato(personas_id, "number");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("accion", "crear");
  urlencoded.append("usuario", usuario);
  urlencoded.append("contra", contra);
  urlencoded.append("personas_id", personas_id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return await fetch(config.host + "models/Usuarios.php", requestOptions)
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

  if (usuarioDatos.codigo != "200") {
    alert(usuarioDatos.datos);
  } else if (usuarioDatos.codigo == "200") {
    console.log(usuarioDatos.datos);
    alert(
      "Inicio de sesion exitoso... Bienvenido " + usuarioDatos.datos.usuario
    );
    window.location.href =
      "./../pages/Inicio.php?token=" + urlencoded(usuarioDatos.datos.usuario);
  }
}

export async function registrarse() {
  usuarios.usuario = document.getElementById("usuario").value;
  usuarios.contra = document.getElementById("contra").value;
  usuarios.nombres = document.getElementById("nombres").value;
  usuarios.apellidos = document.getElementById("apellidos").value;
  usuarios.fecha_nac = document.getElementById("fecha_nac").value;

  let usuarioDatos = await obtenerConUsuario(usuarios.usuario);

  if (usuarioDatos.codigo == "404") {
    // Usuario no existe
    let personasDatos = await personas.obtenerConNombresApellidos(
      usuarios.nombres,
      usuarios.apellidos
    );

    if (personasDatos.codigo == "404") {
      // Persona no existe
      let personas_id = await personas.crearPersonas(
        usuarios.nombres,
        usuarios.apellidos,
        usuarios.fecha_nac
      );

      if (personas_id.codigo == "200") {
        // Persona Creada
        usuarios.personas_id = personas_id.datos;
      } else {
        // No se creo la persona
        alert(personas_id.datos);
      }
    } else if (personasDatos.codigo == "200") {
      usuarios.personas_id = personasDatos.datos.personas_id;
    }

    let usuarios_id = await crearUsuarios(
      usuarios.usuario,
      usuarios.contra,
      Number(usuarios.personas_id)
    );

    if (usuarios_id.codigo == "200") {
      alert("Usuario creado con existo.");
      window.location.href = "./../pages/IniciarSesion.php";
    } else {
      alert(usuarios_id.datos);
    }
  } else if (usuarioDatos.codigo != "200") {
    alert(usuarioDatos.datos);
  } else if (usuarioDatos.codigo == "200") {
    alert("El nombre de usuario ya se encuentra en uso.");
  }
}
