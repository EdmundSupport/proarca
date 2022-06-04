export function verifTipoDato(dato, tipo){
    if (typeof dato !== tipo) {
        throw new Error(dato+" esperaba "+tipo+" por recibio un "+typeof(dato));
    }
}