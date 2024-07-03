let contador = 3;

function finalizarTarefa(elemento){
    const li = elemento.parentNode; // seleciona o pai do elemento;

const estaFinalizada = li.classList.contains('finalizada') 
if (estaFinalizada === true){
    contador ++;
}else{
    contador--;
}

li.classList.toggle('finalizada') // funciona como um liga e desliga de true e false

const elementoContador = document.querySelector('h1');
elementoContador.innerHTML = `TO-DO LIST (${contador})`

}

function finalizarTodas(){
const tarefas = document.querySelectorAll('li');  // pega todos os elementos com o querySelectorAll

let index = 0;
while(index < tarefas.length){
    tarefas[index].classList.add('finalizada');
    index++
}
contador = 0;
const elementoContador = document.querySelector('h1');
elementoContador.innerHTML = `TO-DO LIST (${contador})`
}

