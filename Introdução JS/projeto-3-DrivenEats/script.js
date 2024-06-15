let nomeDaBebida = "";
let nomeDaSobremesa = "";
let nomeDoPrato = "";

function selecionarPrato(prato) {
  // "prato" é o nome  que dei para o parametro "this" que veio do HTML.
  prato.classList.add("adcBorda"); // como prato já está 'nomeado' é só usar sem colocar em uma variavel.
  let icon = prato.querySelector("ion-icon"); // para pegar uma div dentro de "prato" é necessário nomea-la em uma variavel.
  icon.classList.remove("esconder"); // e depois usar normalmente
  nomeDoPrato = prato.querySelector(".nomePrato").innerHTML; //salva o nome dos pratos
  console.log(nomeDoPrato);
  verificarItensSelecionados(); // chama a função para ver se todos os itens estão selecionados

  return nomeDoPrato; //retorna o nome dos pratos para o código
}

function selecionarBebida(bebida) {
  bebida.classList.add("adcBorda");
  let icon = bebida.querySelector("ion-icon");
  icon.classList.remove("esconder");
  nomeDaBebida = bebida.querySelector(".nomePrato").innerHTML;
  console.log(nomeDaBebida);
  verificarItensSelecionados();

  return nomeDaBebida;
}

function selecionarSobremesa(sobremesa) {
  sobremesa.classList.add("adcBorda");
  let icon = sobremesa.querySelector("ion-icon");
  icon.classList.remove("esconder");
  nomeDaSobremesa = sobremesa.querySelector(".nomePrato").innerHTML;
  console.log(nomeDaSobremesa);
  verificarItensSelecionados();

  return nomeDaSobremesa;
}

//Responsavel por verificar se todos os itens estão selecionados e motifica o botão de prosseguir. 

function verificarItensSelecionados() { 
  let botaoPedido = document.querySelector(".botaoPedido");

  if (nomeDoPrato !== "" && nomeDaBebida !== "" && nomeDaSobremesa !== "") {
    botaoPedido.classList.add("botaoSelecionado");
    botaoPedido.innerHTML = "Fechar pedido";
  }
}


