export function verifTipoDato(dato, tipo) {
  if (typeof dato !== tipo) {
    throw new Error(
      dato + " esperaba " + tipo + " por recibio un " + typeof dato
    );
  }
}

export function formatoFecha(fecha) {
  let split = fecha.split("-");
  return split[2] + "/" + split[1] + "/" + split[0];
}
