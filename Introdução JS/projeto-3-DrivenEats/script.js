let nomeDaBebida = "";
let nomeDaSobremesa = "";
let nomeDoPrato = "";
let bebidaSelecionada = null;
let pratoSelecionado = null;
let sobremesaSelecionada = null;

function selecionarPrato(prato) {
  // "prato" é o nome  que dei para o parametro "this" que veio do HTML.
  nomeDoPrato = prato.querySelector(".nomePrato").innerHTML; // como prato já está 'nomeado' é só usar sem colocar em uma variavel.

  /*
    Se constar nomeDoPrato e já tiver um prato selecionado (ou seja, pratoSelecionado vai deixar de ser null)
    vai remover as propriedades de prato selecionado. Caso contrario adiciona as propriedades de selecionado. 
    */
  if (nomeDoPrato !== "") {
    if (pratoSelecionado !== null) {
      // Remove a marcação da bebida anteriormente selecionada
      pratoSelecionado.classList.remove("adcBorda");
      let iconAnterior = pratoSelecionado.querySelector("ion-icon");
      iconAnterior.classList.add("esconder");
    }
    // Marca a bebida atual como selecionada
    prato.classList.add("adcBorda");
    let icon = prato.querySelector("ion-icon"); // para pegar uma div dentro de "prato" é necessário nomea-la em uma variavel.
    icon.classList.remove("esconder"); // e depois usar normalmente
    pratoSelecionado = prato; //salva o nome do prato selecionado
  }
  console.log(nomeDoPrato);
  verificarItensSelecionados(); // chama a função para ver se todos os itens estão selecionados

  return nomeDoPrato; //retorna o nome dos pratos para o código
}

function selecionarBebida(bebida) {
  nomeDaBebida = bebida.querySelector(".nomePrato").innerHTML;

  if (nomeDaBebida !== "") {
    if (bebidaSelecionada !== null) {
      bebidaSelecionada.classList.remove("adcBorda");
      let iconAnterior = bebidaSelecionada.querySelector("ion-icon");
      iconAnterior.classList.add("esconder");
    }

    bebida.classList.add("adcBorda");
    let icon = bebida.querySelector("ion-icon");
    icon.classList.remove("esconder");
    bebidaSelecionada = bebida;
  }
  console.log(nomeDaBebida);
  verificarItensSelecionados();
  return nomeDaBebida;
}

function selecionarSobremesa(sobremesa) {
  nomeDaSobremesa = sobremesa.querySelector(".nomePrato").innerHTML;

  if (nomeDaSobremesa !== "") {
    if (sobremesaSelecionada !== null) {
        sobremesaSelecionada.classList.remove("adcBorda");
      let iconAnterior = sobremesaSelecionada.querySelector("ion-icon");
      iconAnterior.classList.add("esconder");
    }

    sobremesa.classList.add("adcBorda");
    let icon = sobremesa.querySelector("ion-icon");
    icon.classList.remove("esconder");
    sobremesaSelecionada = sobremesa;
  }
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
