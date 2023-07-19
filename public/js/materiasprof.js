let numero = document.getElementById("number");
let contador = 0;
let max = Math.round(numero.innerHTML);

console.log(isNaN(max));

setInterval(() => {
  if (contador == max) {
    clearInterval;
  } else if (isNaN(max)) {
    numero.innerHTML = `${0}`;
    clearInterval;
  } else {
    contador += 1;
    numero.innerHTML = `${contador}`;
  }
}, 30);
