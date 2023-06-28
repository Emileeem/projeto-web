let numero = document.getElementById('number');
let contador = 0;

setInterval(()=> {
    if(contador == 65){
        clearInterval;
    }
    else{
        contador +=1;
        numero.innerHTML = `${contador}%`;
    }
}, 30)
