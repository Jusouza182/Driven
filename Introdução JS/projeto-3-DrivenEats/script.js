function selecionarPrato(prato){ // "prato" é o nome  que dei para o parametro "this" que veio do HTML. 
prato.classList.add('adcBorda'); // como prato já está 'nomeado' é só usar sem colocar em uma variavel. 
let icon = prato.querySelector('ion-icon'); // para pegar uma div dentro de "prato" é necessário nomea-la em uma variavel. 
icon.classList.remove('esconder'); // e depois usar normalmente 
let nomeDoPrato = prato.querySelector('.nomePrato').innerHTML; //salva o nome dos pratos
console.log(nomeDoPrato); 

return nomeDoPrato; //retorna o nome dos pratos para o código
}

function selecionarBebida(bebida){ 
    bebida.classList.add('adcBorda'); 
    let icon = bebida.querySelector('ion-icon'); 
    icon.classList.remove('esconder'); 
    let nomeDaBebida = bebida.querySelector('.nomePrato').innerHTML; 
    console.log(nomeDaBebida); 
    
    return nomeDaBebida; 
    }
