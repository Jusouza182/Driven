let nomeDaBebida = "";
let nomeDaSobremesa = "";
let nomeDoPrato = "";
let bebidaSelecionada = null;
let pratoSelecionado = null;
let sobremesaSelecionada = null;
let precoDoPratoSelecionado = "";
let precoDaBebidaSelecionado = "";
let precoDaSobremesaSelecionado = "";
let valorTotal = 0;

function selecionarPrato(prato) {
  // "prato" é o nome  que dei para o parametro "this" que veio do HTML.
  nomeDoPrato = prato.querySelector(".nomePrato").innerHTML; // como prato já está 'nomeado' é só usar sem colocar em uma variavel.
  let precoPrato = prato.querySelector(".precoPrato").innerHTML; // salva o preço do prato.
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
    precoDoPratoSelecionado = precoPrato;
  }
  console.log(nomeDoPrato);
  verificarItensSelecionados(); // chama a função para ver se todos os itens estão selecionados

  return nomeDoPrato, precoPrato; //retorna o nome dos pratos para o código
}

function selecionarBebida(bebida) {
  nomeDaBebida = bebida.querySelector(".nomePrato").innerHTML;
  let precoBebida = bebida.querySelector(".precoPrato").innerHTML;

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
    precoDaBebidaSelecionado = precoBebida;
  }
  console.log(nomeDaBebida);
  verificarItensSelecionados();
  return nomeDaBebida, precoBebida;
}

function selecionarSobremesa(sobremesa) {
  nomeDaSobremesa = sobremesa.querySelector(".nomePrato").innerHTML;
  let precoSobremesa = sobremesa.querySelector(".precoPrato").innerHTML;

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
    precoDaSobremesaSelecionado = precoSobremesa;
  }
  console.log(nomeDaSobremesa);
  verificarItensSelecionados();
  return nomeDaSobremesa, precoSobremesa;
}

//Responsavel por verificar se todos os itens estão selecionados e motifica o botão de prosseguir.

function verificarItensSelecionados() {
  let botaoPedido = document.querySelector(".botaoPedido");

  if (nomeDoPrato !== "" && nomeDaBebida !== "" && nomeDaSobremesa !== "") {
    botaoPedido.classList.add("botaoSelecionado");
    botaoPedido.innerHTML = "Fechar pedido";
  }
}

// Responsavel por aparecer a tela de finalizar pedido, somente se todos os itens estão selecionados.
function botaoPedido(botao) {
  pedido = document.querySelector(".pedido");

  if (nomeDoPrato !== "" && nomeDaBebida !== "" && nomeDaSobremesa !== "") {
    //faz aparecer a tela de pedido
    pedido.classList.remove("esconder");

    // motifica o item e preço no pedido
    let resumoP = pedido.querySelector(".resumoP");
    resumoP.innerHTML = `${nomeDoPrato}`;
    let precoP = pedido.querySelector(".precoP");
    precoP.innerHTML = `${precoDoPratoSelecionado}`;

    let resumoBebida = pedido.querySelector(".resumoBebida");
    resumoBebida.innerHTML = `${nomeDaBebida}`;
    let precoBebida = pedido.querySelector(".precoBebida");
    precoBebida.innerHTML = `${precoDaBebidaSelecionado}`;

    let resumoSobremesa = pedido.querySelector(".resumoSobremesa");
    resumoSobremesa.innerHTML = `${nomeDaSobremesa}`;
    let precoSobremesa = pedido.querySelector(".precoSobremesa");
    precoSobremesa.innerHTML = `${precoDaSobremesaSelecionado}`;

    calcularTotal();
  }
}

function calcularTotal() {
  // soma os valores depois de transforma-los em numeros decimais e mudar virgula para ponto, só assim o PC entende.

  valorTotal =
    parseFloat(precoDoPratoSelecionado.replace("R$", "").replace(",", ".")) +
    parseFloat(precoDaBebidaSelecionado.replace("R$", "").replace(",", ".")) +
    parseFloat(precoDaSobremesaSelecionado.replace("R$", "").replace(",", "."));

  // formata para o valor ser mostrando com virgula
  let valorFormatado = valorTotal.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // mostra o valor total no pedido
  let total = document.querySelector(".precoTotal");
  total.innerHTML = `R$ ${valorFormatado}`;
}

function finalizar() {
  let nomePrato = pratoSelecionado.querySelector(".nomePrato").innerHTML;
  let nomeBebida = bebidaSelecionada.querySelector(".nomePrato").innerHTML;
  let nomeSobremesa =
    sobremesaSelecionada.querySelector(".nomePrato").innerHTML;

  let mensagem =
    `Olá, gostaria de fazer o pedido:\n` +
    `- Prato: ${nomePrato}\n` +
    `- Bebida: ${nomeBebida}\n` +
    `- Sobremesa: ${nomeSobremesa}\n` +
    `Total: R$ ${valorTotal.toFixed(2).replace(".", ",")}`;

  // Codifica a mensagem para formato de URL
  let mensagemCodificada = encodeURIComponent(mensagem);

  // Monta o link para enviar via WhatsApp
  let whatsappLink = `https://wa.me/48996214896/?text=${mensagemCodificada}`;

  //Abre o Whatsapp
  window.open(whatsappLink, "_blank");
}
function cancelar(){
    pedido = document.querySelector(".pedido");
    pedido.classList.add("esconder");

}

/* 
Ao clicar no botao cancelar, preciso que add a classe escondido ao pedido
*/ 