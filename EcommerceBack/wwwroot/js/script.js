$(document).ready(function () {
    var enderecoArmazenado = localStorage.getItem("EnderecoEntrega");
    if (enderecoArmazenado || localStorage.getItem("EnderecoId") !== null) {
        var enderecoObjeto = JSON.parse(enderecoArmazenado);
        var enderecoId = localStorage.getItem("EnderecoId");

        if (enderecoId !== null && enderecoId !== "") {
            alterarAposAdicionarEndereco();
        }
        else if (Object.keys(enderecoObjeto).length > 0) {
            alterarAposAdicionarEndereco();
        }
    }
});


var circuloSelecionado = null;

const confirmarEndereco = document.getElementById("confirmar-endereco");
const adicionarEndereco = document.getElementById("adicionar-endereco");
const overlay = document.getElementById("overlay-endereco");
const popup = document.getElementById("popup-endereco");
const closeButton = document.getElementById("fechar-endereco");

confirmarEndereco.addEventListener("click", function () {

    const bairroCliente = document.getElementById("bairroCliente1").value;
    const cidadeCliente = document.getElementById("cidadeCliente1").value;
    const estadoCliente = document.getElementById("estadoCliente1").value;
    const numeroEndereco = document.getElementById("numeroEndereco1").value;
    const paisCliente = document.getElementById("paisCliente1").value;
    const cep = document.getElementById("cep1").value;
    const logradouro = document.getElementById("logradouro1").value;

    const selectTipoResidencia = document.getElementById("tipoResidencia1");
    var tipoResidencia = selectTipoResidencia.options[selectTipoResidencia.selectedIndex].value;
    var tipoResInt = parseInt(tipoResidencia, 10);

    const selectTipoLogradouro = document.getElementById("tipoLogradouro1");
    var tipoLogradouro = selectTipoLogradouro.options[selectTipoLogradouro.selectedIndex].value;
    var tipoLogInt = parseInt(tipoLogradouro, 10);

    var endereco = {
        end_logradouro: logradouro,
        end_numero: numeroEndereco,
        end_bairro: bairroCliente,
        end_cep: cep,
        end_tip_res_id: tipoResInt,
        end_tip_log_id: tipoLogInt,
        cidade: {
            cid_nome: cidadeCliente
        },
        estado: {
            est_nome: estadoCliente
        },
        pais: {
            pais_nome: paisCliente
        }
    };

    localStorage.setItem("EnderecoEntrega", endereco);

    alterarAposAdicionarEndereco();
});

function alterarAposAdicionarEndereco() {
    
    var botao = document.querySelector('.btn-add-endereco');

    var elementoTexto = botao.querySelector('#adicionar-endereco p');

    var elementoIcone = botao.querySelector('#icone i');

    elementoTexto.textContent = 'Endereco adicionado';

    elementoIcone.classList.remove('fas', 'fa-map-marker-alt');

    elementoIcone.classList.add('fas', 'fa-check');

    var botaoEndereco = document.getElementById("btn-endereco");
    botaoEndereco.disabled = false;
}

function verificarNomeBotao() {
    var botao = document.querySelector('.btn-add-endereco');

    var elementoTexto = botao.querySelector('#adicionar-endereco p');

    if (elementoTexto.textContent == 'Endereco adicionado') {
        return true;
    }
    else {
        return false;
    }
}

adicionarEndereco.addEventListener("click", verificarAdicionarEndereco);

function verificarAdicionarEndereco() {

    var resposta1 = verificarNomeBotao();

    if (!resposta1) {
        var resposta = window.confirm("Você gostaria de utilizar o endereço de entrega já cadastrado?");
        if (!resposta) {
            openPopupAdicionarEndereco();
        } else {

            $.ajax({
                type: "GET",
                url: "/Endereco/SelecionarUmEnderecoIdCliente",
                dataType: "json",
                data: { clienteId: 1 },
                async: false,
                success: function (id) {
                    localStorage.setItem("EnderecoId", id);
                    alterarAposAdicionarEndereco();
                },
                error: function (status) {
                    //alert(status.toString());
                }
            });
        }
    }
    else {
        alert('Endereco ja foi adicionado!');
    }
}


function adicionarEnderecoCasa() {

    $.ajax({
        type: "GET",
        url: "/Endereco/SelecionarUmEnderecoIdCliente",
        dataType: "json",
        data: { clienteId: 1 },
        async: false,
        success: function (id) {
            localStorage.setItem("EnderecoId", id);
            alterarAposAdicionarEndereco();
        },
        error: function (status) {
            console.log("Não inserido")
        }
    });
        
}

function openPopupAdicionarEndereco() {
    overlay.style.display = "flex";
    popup.style.display = "block";
}

function closePopupAdicionarEndereco() {
    overlay.style.display = "none";
    popup.style.display = "none";
}

closeButton.addEventListener("click", closePopupAdicionarEndereco);

function alternarSelecao(circulo) {
    if (circuloSelecionado) {
        circuloSelecionado.classList.remove("selected");
    }
    circulo.classList.add("selected");
    circuloSelecionado = circulo;
}

var divSelecionada = null;

function alternarSelecaoElemento(elemento, cal_id) {

    if (divSelecionada) {
        divSelecionada.classList.remove("selecionado");
        divSelecionada.style.border = "none";
    }

    elemento.classList.add("selecionado");
    elemento.style.border = "1px solid #000000";

    divSelecionada = elemento;

    var numero_calcado = elemento.innerHTML;

    var cal_id = parseInt(cal_id, 10);

    console.log(cal_id)

    /*encontrarItemPorId(cal_id, function (item) {
        if (item) {
            var carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

            item.dados[0].tamanho = numero_calcado;

            carrinho.push(item);

            localStorage.setItem("carrinho", JSON.stringify(carrinho));
        }
    });*/
}


function removerProduto(elemento, cal_id) {
    removeItemCarrinho()

    var itemContainer = elemento.parentNode.parentNode.parentNode;

    itemContainer.parentNode.removeChild(itemContainer);

    var items = JSON.parse(localStorage.getItem("carrinho")) || [];

    var indexToRemove = items.findIndex(function (item) {
        return item.dados[0].cal_id === cal_id;
    });

    if (indexToRemove !== -1) {
        items.splice(indexToRemove, 1);
                
        localStorage.setItem("carrinho", JSON.stringify(items));

        calcularValorTotal()
    }

    console.log(items.length)

    if (items.length === 0) {
        console.log('entrou')
        localStorage.clear()
    } 

    document.location.reload()

}

function selecionarBtn(button) {
    button.classList.toggle("selected");
    calcularValorFrete();
    adicionarEnderecoCasa();
}

var freteAdicionado = false;

function calcularValorFrete() {

    var valorProdutos = parseInt(localStorage.getItem("valorProdutos"));

    var valorFrete = valorProdutos * 0.01;

    var valorFreteFormatado = valorFrete.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    var valorFreteElement = document.querySelector("#valorFrete");
    valorFreteElement.textContent = "R$ " + valorFreteFormatado;

    localStorage.setItem("valorFrete", valorFrete);
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

            item.dados[0].quantidade = quantidadeProduto;
                                    
            valorTotal += valorProduto * quantidadeProduto;

            localStorage.setItem("valorProdutos", valorTotal);

        }
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinhoItens))

    var valorProdutos = parseInt(localStorage.getItem("valorProdutos"));

    var valorProdutosFormatado = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.querySelector("#valorProdutos").textContent = valorProdutosFormatado;

    var valorFrete = parseInt(localStorage.getItem("valorFrete"));

    if (valorFrete !== 0 && !isNaN(valorFrete)) {

        calcularValorFrete();

        var valorFrete = parseInt(localStorage.getItem("valorFrete"));

        valorTotal = valorProdutos + valorFrete

        var valorTotalFormatado = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        document.querySelector("#valorTotal").textContent = valorTotalFormatado;
    }
    else {
        valorTotal = valorProdutos

        var valorTotalFormatado = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        document.querySelector("#valorTotal").textContent = valorTotalFormatado;
    }

   
    
}


function validaDevolucao() {
    var devolucao = document.getElementById("nome").value;

    if (devolucao.trim() == "") {
        alert("É necessário preencher o campo de motivo antes de solicitar a devolução.");
    } else {
        alert("Solicitação de devolução realizada com sucesso!");
    }
}


function addItemCarrinho() {
    let valorAtual = parseInt(document.querySelector("#quantidade-item-cart").textContent);
    let novoValor = valorAtual + 1;
    document.querySelector("#quantidade-item-cart").textContent = novoValor
    localStorage.setItem("carrinhoQuantidade", novoValor);
}

function removeItemCarrinho() {
    let valorAtual = parseInt(document.querySelector("#quantidade-item-cart").textContent);
    let novoValor = valorAtual - 1;
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

    var tamanhoSelecionadoElement = document.querySelector('.numeracoes.selecionado');

    if (tamanhoSelecionadoElement) {
        var tamanhoSelecionado = tamanhoSelecionadoElement.textContent;

        addItemCarrinho();
        encontrarItemPorId(cal_id, tamanhoSelecionado, function (item) {

            if (item) {
                var carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

                item.dados[0].quantidade = 1;

                item.dados[0].tamanho = tamanhoSelecionado;

                tempoLimite = Date.now() + 2000000 // 30 minutos

                item.dados[0].tempoLimite = tempoLimite;

                carrinho.push(item);

                localStorage.setItem("carrinho", JSON.stringify(carrinho));
               
                if (redirecionar) {

                    window.location.href = "/CarrinhoCompras/CarrinhoCompras";
                }
            }
            
        });
        
    } else {
        alert('Tamanho nao selecionado');
    }

}



function redirectToStatusPedidoCliente(pedId) {
    document.querySelectorAll('.acompanhar-pedido-button').forEach(function (button) {
        button.addEventListener('click', function () {
            var pedId = this.getAttribute('data-pedidoid');
            window.location.href = '/StatusPedidoCliente/StatusPedidoCliente?ped_cal_ped_id=' + pedId;
        });
    });
}

function redirectToDevolucaoCalcado(calId, pedId) { 
    document.querySelectorAll('.acompanhar-pedido-button').forEach(function (button) {
        button.addEventListener('click', function () {
            var calId = this.getAttribute('data-calcadoid');
            var pedId = this.getAttribute('data-pedidoid');
            console.log(calId)
            var select = document.getElementById("select-quantidade" + "-" + calId);
            var quantidadeSelecionada = select.options[select.selectedIndex].value;

            window.location.href = '/Devolucao/DevolucaoCalcado?ped_cal_cal_id=' + calId + '&ped_cal_ped_id=' + pedId + '&quantidade=' + quantidadeSelecionada;
        });
    });   
}

function redirectToDevolucaoPedido(pedId) {
    document.querySelectorAll('.acompanhar-pedido-button').forEach(function (button) {
        button.addEventListener('click', function () {
            var pedId = this.getAttribute('data-pedidoid');

            window.location.href = '/Devolucao/DevolucaoPedido?ped_cal_ped_id=' + pedId;
        });
    });
}


function encontrarItemPorId(cal_id, tamanhoSelecionado, callback) {

    $.ajax({
        url: '/Produto/SelecionarProdutoId/' + cal_id,
        type: 'GET',
        dataType: 'json',
        data: {
            cal_id: parseInt(cal_id),
            tamanhoSelecionado: tamanhoSelecionado
        },
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
                itemContainer.id = item.dados[0].cal_id;                    ;

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

                var tamanhoProduto = document.createElement("p");
                tamanhoProduto.classList.add("descricao-produto");
                tamanhoProduto.textContent = "Tamanho: " + item.dados[0].tamanho;

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
                productInfo.appendChild(tamanhoProduto);
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

                quantidadeEstoque = parseInt(item.dados[0].estq_quantidade)

                for (var i = 1; i <= quantidadeEstoque; i++) {
                    var option = document.createElement("option");
                    option.classList.add("Option");
                    option.value = i;
                    quantidade_localStorage = item.dados[0].quantidade
                    if (option.value == quantidade_localStorage) {
                        option.selected = true;
                    }
                    option.textContent = i;
                    selectQuantidade.appendChild(option);
                }

                var bottomElement = document.createElement("div");
                bottomElement.classList.add("bottom-element");
                var aRemover = document.createElement("a");
                aRemover.href = "#";
                aRemover.classList.add("btn-remove");
                aRemover.textContent = "Remover";
                aRemover.addEventListener("click", function () {
                    removerProduto(this, item.dados[0].cal_id);
                });

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

function solicitarDevolucao(ped_cal_cal_id, ped_cal_ped_id) {
    const motivo = document.getElementById("motivo").value;

    var quantElemento = document.getElementById('quantidade-selecionada');

    var quantidadeSelecionada = quantElemento.textContent;



    if (!motivo) {
        alert("Por favor, informe o motivo antes de solicitar a devolução.");
        return;
    }


    fetch(`/Devolucao/InserirMotivoDevolucao?ped_cal_cal_id=${ped_cal_cal_id}&ped_cal_ped_id=${ped_cal_ped_id}&motivo=${motivo}&quantidadeSelecionada=${quantidadeSelecionada}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                alert("Solicitacao de devolucao enviada com sucesso.");
            } else {
                alert("Erro ao enviar a solicitação de devolução.");
            }
        })
        .catch(error => {
            console.error("Erro ao enviar a solicitação de devolução: " + error);
        });
}

function solicitarDevolucaoPedido(pedId) {
    const motivo = document.getElementById("motivo").value;

    const ped_cal_ped_id = parseInt(pedId, 10);

    if (!motivo) {
        alert("Por favor, informe o motivo antes de solicitar a devolução.");
        return;
    }

    fetch(`/Devolucao/InserirMotivoDevolucaoPedido?ped_cal_ped_id=${ped_cal_ped_id}&motivo=${motivo}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                alert("Solicitacao de devolucao enviada com sucesso.");
            } else {
                alert("Erro ao enviar a solicitação de devolução.");
            }
        })
        .catch(error => {
            console.error("Erro ao enviar a solicitação de devolução: " + error);
        });
}

function alteraStatusPedido(pedidos) {

    pedidos.forEach(function (pedido, index) {
        statusFase = pedido.sta_comp_fase;

    });

    var lineElement = document.querySelector('#linha-status');
    var elipse1 = document.querySelector('#elipse-1')
    var elipse2 = document.querySelector('#elipse-2')
    var elipse3 = document.querySelector('#elipse-3')
    var elipse4 = document.querySelector('#elipse-4')
    var elipse5 = document.querySelector('#elipse-5')

    var pedidoAprovadoText = document.querySelector('#pedidoAprovadoText');
    var pagamentoRecusadoText = document.querySelector('#pagamentoRecusadoText');
    var elipsePedidoAprovado = document.querySelector('#elipse-pedido-aprovado');

    var emTrocaText = document.querySelector('#emTrocaText');
    var trocaRealizadaText = document.querySelector('#trocaRealizadaText');
    var trocaRecusadoText = document.querySelector('#trocaRecusadaText');

    if (statusFase === 'EM PROCESSAMENTO') {
        elipse1.setAttribute('fill', '#15368A');
        elipse2.setAttribute('fill', '#E5E5E5');
        elipse3.setAttribute('fill', '#E5E5E5');
        elipse4.setAttribute('fill', '#E5E5E5');
        elipse5.setAttribute('fill', '#E5E5E5');
    } else if (statusFase === 'EM TRANSITO') {
        pedidoAprovadoText.style.display = 'block';
        lineElement.setAttribute('y2', '70');
        elipse1.setAttribute('fill', '#15368A');
        elipse2.setAttribute('fill', '#15368A');
        elipsePedidoAprovado.setAttribute('fill', '#15368A');
        elipse3.setAttribute('fill', '#E5E5E5');
        elipse4.setAttribute('fill', '#E5E5E5');
        elipse5.setAttribute('fill', '#E5E5E5');
    } else if (statusFase === 'ENTREGUE') {
        pedidoAprovadoText.style.display = 'block';
        lineElement.setAttribute('y2', '120');
        elipse1.setAttribute('fill', '#15368A');
        elipse2.setAttribute('fill', '#15368A');
        elipse3.setAttribute('fill', '#15368A');
        elipsePedidoAprovado.setAttribute('fill', '#15368A');
        elipse4.setAttribute('fill', '#E5E5E5');
        elipse5.setAttribute('fill', '#E5E5E5');

    } else if (statusFase === 'TROCA SOLICITADA') {
        pedidoAprovadoText.style.display = 'block';
        emTrocaText.style.display = 'block';
        lineElement.setAttribute('y2', '180');
        elipse1.setAttribute('fill', '#15368A');
        elipse2.setAttribute('fill', '#15368A');
        elipse3.setAttribute('fill', '#15368A');
        elipsePedidoAprovado.setAttribute('fill', '#15368A');
        elipse4.setAttribute('fill', '#15368A');
        elipse5.setAttribute('fill', '#E5E5E5');

    } else if (statusFase === 'TROCA REALIZADA') {
        pedidoAprovadoText.style.display = 'block';
        emTrocaText.style.display = 'block';
        trocaRealizadaText.style.display = 'block';
        lineElement.setAttribute('y2', '240');
        elipse1.setAttribute('fill', '#15368A');
        elipse2.setAttribute('fill', '#15368A');
        elipse3.setAttribute('fill', '#15368A');
        elipsePedidoAprovado.setAttribute('fill', '#15368A');
        elipse4.setAttribute('fill', '#15368A');
        elipse5.setAttribute('fill', '#15368A');
    }
    else if (statusFase === 'TROCA RECUSADA') {
        pedidoAprovadoText.style.display = 'block';
        emTrocaText.style.display = 'block';
        trocaRecusadoText.style.display = 'block';
        lineElement.setAttribute('y2', '240');
        elipse1.setAttribute('fill', '#15368A');
        elipse2.setAttribute('fill', '#15368A');
        elipse3.setAttribute('fill', '#15368A');
        elipsePedidoAprovado.setAttribute('fill', '#15368A');
        elipse4.setAttribute('fill', '#15368A');
        elipse5.setAttribute('fill', '#15368A');
    }

    else if (statusFase === 'PEDIDO APROVADO') {
        pedidoAprovadoText.style.display = 'block';
        lineElement.setAttribute('y2', '30');
        elipse1.setAttribute('fill', '#15368A');
        elipsePedidoAprovado.setAttribute('fill', '#15368A');
    } else if (statusFase === 'PAGAMENTO RECUSADO') {
        pagamentoRecusadoText.style.display = 'block';
        lineElement.setAttribute('y2', '30');
        elipse1.setAttribute('fill', '#15368A');
        elipsePedidoAprovado.setAttribute('fill', '#15368A');

    }


}