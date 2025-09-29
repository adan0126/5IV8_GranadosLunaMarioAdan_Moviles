const btnVerify = document.getElementById("btn-validate");
btnVerify.addEventListener("click", ()=> alert(validacionDNI()));

var letters = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];

function validacionDNI() {
    const numDNI = document.getElementById("text-dni").value;
    const letraDNI = document.getElementById("text-letter").value.toUpperCase();
    if (numDNI.length !== 8 || isNaN(numDNI)) {
        alert("DNI inválido. Debe tener 8 dígitos numéricos.");
        return;
    }
    if (letraDNI.length !== 1 || !/[A-Z]/.test(letraDNI)) {
        alert("Letra inválida. Debe ser una sola letra.");
        return;
    }
    if (Number(numDNI) < 0 || Number(numDNI) > 99999999) {
        alert("Número de DNI fuera de rango. Debe estar entre 0 y 99999999.");
        return;
    }
    if (letraDNI === letters[Number(numDNI) % 23]) {
        alert("DNI válido.");
    } else {
        alert("DNI inválido. La letra correcta es: " + letters[Number(numDNI) % 23]);
    }
}