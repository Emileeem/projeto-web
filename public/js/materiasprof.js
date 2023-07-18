let numero = document.getElementById('number');
let contador = 0;
let max = numero.innerHTML;

console.log(max);

setInterval(()=> {
    if(contador == max){
        clearInterval;
    }
    else{
        contador +=1;
        numero.innerHTML = `${contador}`;
    }
}, 30)
