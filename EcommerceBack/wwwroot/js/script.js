

/* function addQuantidade(button) {
    let elementoContador = button.parentElement.querySelector('.contador');
    let valorAtual = parseInt(elementoContador.textContent);
    let novoValor = valorAtual + 1;
    elementoContador.textContent = novoValor;

    calcularValorTotal();
}

function subQuantidade(button) {
    let elementoContador = button.parentElement.querySelector('.contador');
    let valorAtual = parseInt(elementoContador.textContent);
    if (valorAtual > 1) {
        let novoValor = valorAtual - 1;
        elementoContador.textContent = novoValor;
    }

    calcularValorTotal();
} */

var circuloSelecionado = null;

function alternarSelecao(circulo) {
    if (circuloSelecionado) {
        circuloSelecionado.classList.remove("selected");
    }
    circulo.classList.add("selected");
    circuloSelecionado = circulo;
}

var divSelecionada = null;

function alternarSelecaoElemento(elemento) {
    if (divSelecionada) {
        divSelecionada.classList.remove("selecionado");
        divSelecionada.style.border = "Nenhum";
    }

    elemento.classList.add("selecionado");
    elemento.style.border = "1px solid #000000";

    divSelecionada = elemento;
}

function removerProduto(button) {
    var containerGeral = button.closest(".container-geral");
    containerGeral.remove();
}


function selecionarBtn(button) {
    button.classList.toggle("selected");
    valorFrete()
}

var freteAdicionado = false;

function valorFrete() {
    var precoFreteElement = document.querySelector("#preco-frete p");
    var valorFreteElement = document.querySelector("#valorFrete");
    var valorTotalElement = document.querySelector("#valorTotal");

    var precoFreteTexto = precoFreteElement.textContent;
    var novoValorFrete = precoFreteTexto;
    var valorFrete = parseFloat(document.querySelector("#preco-frete p").textContent.replace("R$", "").trim());
    var valorTotal = parseFloat(valorTotalElement.textContent.replace("R$", "").trim());

    if (!freteAdicionado) {
        var valorTotalFrete = valorTotal + valorFrete;
        valorTotalElement.textContent = "R$ " + valorTotalFrete.toFixed(2);
        valorFreteElement.textContent = novoValorFrete;
        freteAdicionado = true;
    }    
}

function calcularValorTotal() {
    console.log('entrou')
    var valorElemento1 = parseFloat(document.querySelector("#produto1").textContent.replace("R$", "").trim());
    var valorElemento2 = parseFloat(document.querySelector("#produto2").textContent.replace("R$", "").trim());
    
    var quantidadeProduto1 = document.getElementById('select-quantidade');
    var quantidadeProduto1 = parseInt(quantidadeProduto1.value);

    var valorTotal = (valorElemento1 * quantidadeProduto1) + valorElemento2;

    var valorFormatado = (valorTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  
    document.querySelector("#valorProdutos").textContent = valorFormatado;
    document.querySelector("#valorTotal").textContent = valorFormatado;
    localStorage.setItem("valorProdutos", valorTotal);
  
  }

document.addEventListener("DOMContentLoaded", calcularValorTotal);


function validaDevolucao(){
    var devolucao = document.getElementById("nome").value;
    
    if (devolucao.trim() == "") {
        alert("É necessário preencher o campo de motivo antes de solicitar a devolução.");
    } else {
        alert("Solicitação de devolução realizada com sucesso!");
    }
}

function alteraStatusPedido(){
    var selectElement = document.getElementById("pedido");
    var selectedValue = selectElement.value;
    console.log(selectedValue)
    var lineElement = document.querySelector('#linha-status');
    var elipse1 = document.querySelector('#elipse-1')
    var elipse2 = document.querySelector('#elipse-2')
    var elipse3 = document.querySelector('#elipse-3')
    var elipse4 = document.querySelector('#elipse-4')
    var elipse5 =  document.querySelector('#elipse-5')

        // Acessar e alterar o valor do atributo y2 baseado na opção selecionada
    switch (selectedValue) {
        case 'fase1':
            elipse1.setAttribute('fill', '#15368A');
            elipse2.setAttribute('fill', '#E5E5E5');
            elipse3.setAttribute('fill', '#E5E5E5');
            elipse4.setAttribute('fill', '#E5E5E5');
            elipse5.setAttribute('fill', '#E5E5E5');
            break;
        case 'fase2':
            lineElement.setAttribute('y2', '70');
            elipse1.setAttribute('fill', '#15368A');
            elipse2.setAttribute('fill', '#15368A');
            elipse3.setAttribute('fill', '#E5E5E5');
            elipse4.setAttribute('fill', '#E5E5E5');
            elipse5.setAttribute('fill', '#E5E5E5');
            break;
        case 'fase3':
            lineElement.setAttribute('y2', '120');
            elipse1.setAttribute('fill', '#15368A');
            elipse2.setAttribute('fill', '#15368A');
            elipse3.setAttribute('fill', '#15368A');
            elipse4.setAttribute('fill', '#E5E5E5');
            elipse5.setAttribute('fill', '#E5E5E5');
            break;
        case 'fase4':
            lineElement.setAttribute('y2', '180');
            elipse1.setAttribute('fill', '#15368A');
            elipse2.setAttribute('fill', '#15368A');
            elipse3.setAttribute('fill', '#15368A');
            elipse4.setAttribute('fill', '#15368A');
            elipse5.setAttribute('fill', '#E5E5E5');
            break;
        case 'fase5':
            lineElement.setAttribute('y2', '240');
            elipse1.setAttribute('fill', '#15368A');
            elipse2.setAttribute('fill', '#15368A');
            elipse3.setAttribute('fill', '#15368A');
            elipse4.setAttribute('fill', '#15368A');
            elipse5.setAttribute('fill', '#15368A');
            break;
        default:
    }

        /* if (lineElement) {
            // Acessar e alterar o valor do atributo y2
            lineElement.setAttribute('y2', '300'); // Alterando para 300
            lineElement.setAttribute('y2', '300'); // Alterando para 300
        } else {
            console.log('Elemento não encontrado.');
        } */
        
}

function addItemCart(){
    let valorAtual = parseInt(document.querySelector("#quantidade-item-cart").textContent);
    let novoValor = valorAtual + 1;
    document.querySelector("#quantidade-item-cart").textContent = novoValor
    localStorage.setItem("carrinhoQuantidade", novoValor);
}

// Carregar o valor do carrinho do Local Storage ao carregar a página
function carregarValorCarrinho() {
    let valorCarrinho = localStorage.getItem("carrinhoQuantidade");
    if (valorCarrinho !== null) {
        document.querySelector("#quantidade-item-cart").textContent = valorCarrinho;
    }
}

  const miniProductImages = document.querySelectorAll('.mini-product-image');
  const circles = document.querySelectorAll('.circle');

  miniProductImages.forEach((image, index) => {
    image.addEventListener('click', () => {
      // Remover destaque de todos os círculos
      circles.forEach(circle => circle.setAttribute('fill', '#E6E6E6'));
      
      // Destacar o círculo correspondente à imagem selecionada
      circles[index].setAttribute('fill', '#15368A'); // Substitua pela cor que você deseja
    });
  });

  const miniProductImage = document.querySelectorAll('.mini-product-image');
  const mainProductImage = document.querySelector('.main-product-image img');
  const circle = document.querySelectorAll('.circle');

  miniProductImages.forEach((image, index) => {
    image.addEventListener('click', () => {
      // Remover destaque de todos os círculos
      circles.forEach(circle => circle.setAttribute('fill', '#E6E6E6'));

      // Destacar o círculo correspondente à imagem selecionada
      circles[index].setAttribute('fill', '#15368A'); // Substitua pela cor que você deseja
      
      // Atualizar a imagem principal com a imagem correspondente
      mainProductImage.setAttribute('src', image.getAttribute('src'));
    });
  });

  function addValorFrete(){
    let valorFrete = parseInt(document.querySelector("#valorFrete").textContent.replace("R$", "").trim());
    localStorage.setItem("valorFrete", valorFrete);

}

function carregarValorFrete() {
    let valor = parseInt(localStorage.getItem("valorProdutos"));
    var valorFormatado = (valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let frete = parseInt(localStorage.getItem("valorFrete"));
    var freteFormatado = (frete).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    if (valor !== null) {
        document.querySelector("#valorProduto").textContent = valorFormatado;
    }
    if (frete !== null) {
        document.querySelector("#valorFrete").textContent = freteFormatado;
    }
}

function carregarValores() {
    carregarValorCarrinho();
    carregarValorFrete();
    calcularValorTotalFormaPagamento();
}



function calcularValorTotalFormaPagamento() {
    var valorElemento1 = parseFloat(localStorage.getItem("valorProdutos"));
    var valorElemento2 = parseFloat(localStorage.getItem("valorFrete"));
    var valorElemento3 = parseFloat(document.querySelector("#valorCodPromo").textContent.replace("R$", "").trim());
    var valorElemento4 = parseFloat(document.querySelector("#cupomTroca").textContent.replace("R$", "").trim());

    var valorTotal = valorElemento1 + valorElemento2 - valorElemento3 - valorElemento4;
    var valorFormatado = (valorTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  
    document.querySelector("#td-direita-pedido").textContent = valorFormatado;
  }
