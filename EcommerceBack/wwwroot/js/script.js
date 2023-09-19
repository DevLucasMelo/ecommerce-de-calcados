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
    calcularValorFrete()
}

var freteAdicionado = false;

function calcularValorFrete() {
    var precoFreteElement = document.querySelector("#preco-frete");
    var valorFreteElement = document.querySelector("#valorFrete");
    var valorTotalElement = document.querySelector("#valorTotal");

    var precoFreteTexto = precoFreteElement.textContent;
    var novoValorFrete = precoFreteTexto;
    var valorFrete = parseFloat(document.querySelector("#preco-frete").textContent.replace("R$", "").trim());

    var valorText = valorTotalElement.textContent.trim(); 
    valorText = valorText.replace("R$", ""); 

    var textoSemPontosEVirgulas = valorText.replace(/[.,]/g, '');

    var parteInteira = textoSemPontosEVirgulas.slice(0, -2);
    var parteDecimal = textoSemPontosEVirgulas.slice(-2);

    var valorTotal = parteInteira + "." + parteDecimal;

    valorTotal = parseFloat(valorTotal)

 
    console.log(valorTotal)

    var valorFreteLocalStorage = parseInt(localStorage.getItem("valorFrete"));

    if (!freteAdicionado && isNaN(valorFreteLocalStorage)) {
        var valorTotalFrete = valorTotal + valorFrete;
        console.log(valorTotalFrete)
        valorTotalElement.textContent = "R$ " + valorTotalFrete.toFixed(2);
        valorFreteElement.textContent = novoValorFrete;
        freteAdicionado = true;
        addValorFrete();
    }
}

function calcularValorTotal() {
    var carrinhoItens = JSON.parse(localStorage.getItem("carrinho")) || [];
    var valorTotal = 0;

    carrinhoItens.forEach(function (item, index) { 
        if (item && item.dados && item.dados.length > 0) {
            var valorProduto = parseFloat(item.dados[0].cal_valor);

            var quantidadeProdutoId = 'select-quantidade' + (index + 1);

            var quantidadeProdutoElement = document.getElementById(quantidadeProdutoId);
            var quantidadeProduto = parseInt(quantidadeProdutoElement.value);


            valorTotal += valorProduto * quantidadeProduto;

        }
    });

    var valorFrete = parseInt(localStorage.getItem("valorFrete"));

    if (!isNaN(valorFrete)) {

        valorTotal += valorFrete

        var precoFreteElement = document.querySelector("#preco-frete");

        var precoFreteTexto = precoFreteElement.textContent;

        var valorFreteElement = document.querySelector("#valorFrete");
        valorFreteElement.textContent = precoFreteTexto;
    }

    var valorFormatado = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.querySelector("#valorProdutos").textContent = valorFormatado;
    document.querySelector("#valorTotal").textContent = valorFormatado;
    localStorage.setItem("valorProdutos", valorTotal);
}


function validaDevolucao() {
    var devolucao = document.getElementById("nome").value;

    if (devolucao.trim() == "") {
        alert("É necessário preencher o campo de motivo antes de solicitar a devolução.");
    } else {
        alert("Solicitação de devolução realizada com sucesso!");
    }
}

function alteraStatusPedido() {
    var selectElement = document.getElementById("pedido");
    var selectedValue = selectElement.value;
    var lineElement = document.querySelector('#linha-status');
    var elipse1 = document.querySelector('#elipse-1')
    var elipse2 = document.querySelector('#elipse-2')
    var elipse3 = document.querySelector('#elipse-3')
    var elipse4 = document.querySelector('#elipse-4')
    var elipse5 = document.querySelector('#elipse-5')

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
}

function addItemCarrinho() {
    let valorAtual = parseInt(document.querySelector("#quantidade-item-cart").textContent);
    let novoValor = valorAtual + 1;
    document.querySelector("#quantidade-item-cart").textContent = novoValor
    localStorage.setItem("carrinhoQuantidade", novoValor);
}

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
        circles.forEach(circle => circle.setAttribute('fill', '#E6E6E6'));

        circles[index].setAttribute('fill', '#15368A'); 
    });
});

const miniProductImage = document.querySelectorAll('.mini-product-image');
const mainProductImage = document.querySelector('.main-product-image img');
const circle = document.querySelectorAll('.circle');

miniProductImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        circles.forEach(circle => circle.setAttribute('fill', '#E6E6E6'));

        circles[index].setAttribute('fill', '#15368A'); 

        mainProductImage.setAttribute('src', image.getAttribute('src'));
    });
});

function addValorFrete() {
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

function adicionarItemAoCarrinho(cal_id, redirecionar) {
    var cal_id = parseInt(cal_id, 10);
    addItemCarrinho();
    encontrarItemPorId(cal_id, function (item) {

        if (item) {
            var carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

            carrinho.push(item);

            localStorage.setItem("carrinho", JSON.stringify(carrinho));

            if (redirecionar) {
                window.location.href = "/CarrinhoCompras/CarrinhoCompras"; 
            }
        }
    });
}



function encontrarItemPorId(cal_id, callback) {

    $.ajax({
        url: '/Produto/SelecionarProdutoId/' + cal_id,
        type: 'GET',
        dataType: 'json',
        data: { cal_id: parseInt(cal_id) },
        async: false,
        success: function (data) {
            if (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            } else {
                console.log('Produto não encontrado.');
                if (typeof callback === 'function') {
                    callback(null); 
                }
            }
        },
        error: function () {
            console.error('Ocorreu um erro ao buscar o produto.');
            if (typeof callback === 'function') {
                callback(null); 
            }
        }
    });
}

function preencherItemDiv(itens) {
    var divItem = document.querySelector(".container-geral"); 
    var contadorIdProduto = 1; 

    if (divItem && itens && itens.length > 0) {
        divItem.innerHTML = "";

        itens.forEach(function (item) {
            if (item && item.dados && item.dados.length > 0) {

                var itemContainer = document.createElement("div");
                itemContainer.classList.add("item-container");

                var img = document.createElement("img");
                img.width = "166";
                img.height = "107";
                img.alt = "";
                img.src = "/imagens/" + item.dados[0].cal_marca.replace(/\s/g, "").toLowerCase() + item.dados[0].cal_modelo.replace(/\s/g, "").toLowerCase() + "-1.png";

                var productInfo = document.createElement("div");
                productInfo.classList.add("product-info");

                var descricaoProduto = document.createElement("p");
                descricaoProduto.classList.add("descricao-produto");
                descricaoProduto.textContent = item.dados[0].cal_marca + " " + item.dados[0].cal_modelo;

                var precoProduto = document.createElement("p");
                precoProduto.classList.add("descricao-produto");
                precoProduto.textContent = "R$ " + item.dados[0].cal_valor;

                precoProduto.id = "produto" + contadorIdProduto; 

                var valoresProduto = document.createElement("p");
                valoresProduto.classList.add("valores-produto");

                var parcelaProduto = document.createElement("p");
                parcelaProduto.classList.add("parcela-produto");
                parcelaProduto.textContent = "10x R$ " + (item.dados[0].cal_valor / 10).toFixed(2);

                var semJuros = document.createElement("p");
                semJuros.classList.add("parcela-produto");
                semJuros.textContent = "sem juros";

                productInfo.appendChild(descricaoProduto);
                productInfo.appendChild(precoProduto);
                productInfo.appendChild(valoresProduto);
                productInfo.appendChild(parcelaProduto);
                productInfo.appendChild(semJuros);

                var quantidadeDiv = document.createElement("div");
                quantidadeDiv.classList.add("quantidade");

                var topElement = document.createElement("div");
                topElement.classList.add("top-element");
                var pQuantidade = document.createElement("p");
                pQuantidade.textContent = "Quantidade";

                var centerElement = document.createElement("div");
                centerElement.classList.add("center-element");
                var selectQuantidade = document.createElement("select");
                selectQuantidade.classList.add("select-input");
                selectQuantidade.id = "select-quantidade" + contadorIdProduto;
                selectQuantidade.setAttribute("onchange", "calcularValorTotal()");
                selectQuantidade.style.width = "65px";

                selectQuantidade.name = "pedido";

                contadorIdProduto++;

                for (var i = 1; i <= 6; i++) {
                    var option = document.createElement("option");
                    option.classList.add("Option");
                    option.value = i;
                    option.textContent = i;
                    selectQuantidade.appendChild(option);
                }

                var bottomElement = document.createElement("div");
                bottomElement.classList.add("bottom-element");
                var aRemover = document.createElement("a");
                aRemover.href = "#";
                aRemover.classList.add("btn-remove");
                aRemover.textContent = "Remover";
                aRemover.setAttribute("onclick", "removerProduto(this)");

                topElement.appendChild(pQuantidade);
                centerElement.appendChild(selectQuantidade);
                bottomElement.appendChild(aRemover);

                quantidadeDiv.appendChild(topElement);
                quantidadeDiv.appendChild(centerElement);
                quantidadeDiv.appendChild(bottomElement);

                itemContainer.appendChild(img);
                itemContainer.appendChild(productInfo);
                itemContainer.appendChild(quantidadeDiv);

                divItem.appendChild(itemContainer);
            }
        });
    }
}


document.addEventListener("DOMContentLoaded", function () {

    var itemDoCarrinho = JSON.parse(localStorage.getItem("carrinho"));

    if (itemDoCarrinho) {
        preencherItemDiv(itemDoCarrinho);
    }

    calcularValorTotal();
});
