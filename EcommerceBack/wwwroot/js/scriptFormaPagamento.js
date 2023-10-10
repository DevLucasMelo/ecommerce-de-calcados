$(document).ready(function () {
    localStorage.removeItem("cartoes");
    var resposta = window.confirm("Você gostaria de utilizar os cartões já cadastrados?");
    if (resposta) {
        selecionarCartao(1);
    } 
});

let numeroPedido = 1;

const confirmarPedido = document.getElementById("finaliza-pedido");
var cartoes = [];



confirmarPedido.addEventListener("click", function() {
    // Exibir modal de sucesso
    modalSuccess.style.display = "block";
    closeCupomPopup();
});

    const overlay = document.getElementById("overlay");
    const popup = document.getElementById("popup");
    const closeButton = document.getElementById("fechar");
    const addButton = document.getElementById("meuBotaoCartao");
    const confirmButton = document.getElementById("confirmar");
    const modalSuccess = document.getElementById("modalSuccess");
    const modalError = document.getElementById("modalError");

    function selecionarCartao(clienteId) {
    fetch(`/Cartao/SelecionarCartaoPoriD?clienteId=${clienteId}`, { async: false })
        .then(response => response.json())
        .then(data => {

            data.forEach(cartao => {

                adicionarCartao(cartao.car_id, "/imagens/image7.png", cartao.car_num,
                    cartao.car_cod_seguranca, cartao.car_nome, "Mastercard");
            });
        });
    }

     // Array para armazenar os cartões

    // Função para renderizar a lista de cartões
    function renderizarListaCartoes() {
        const listaCartoes = document.getElementById("listaCartoes");
        listaCartoes.innerHTML = ""; // Limpa a lista

        if (cartoes.length > 0) {
            listaCartoes.style.marginTop = "20px"; // Aplica a margem superior
        } else {
            listaCartoes.style.marginTop = "0"; // Remove a margem superior
        }

        // Itera pelos cartões e cria um bloco para cada um
        cartoes.forEach(function (cartao, index) {

            const numeroCartao1 = document.createElement("input");
            numeroCartao1.type = "hidden";
            numeroCartao1.value = cartoes.numero;

            const bandeiraCartao1 = document.createElement("input");
            bandeiraCartao1.type = "hidden";
            bandeiraCartao1.value = cartoes.bandeira;

            const cvvCartao1 = document.createElement("input");
            cvvCartao1.type = "hidden";
            cvvCartao1.value = cartoes.cvv;

            const nomeCartao1 = document.createElement("input");
            nomeCartao1.type = "hidden";
            nomeCartao1.value = cartoes.nome;

            const cartaoBlock = document.createElement("div");
            cartaoBlock.className = "cartao-block";

            const bandeira = document.createElement("p");
            bandeira.textContent = "Bandeira: ";

            const bandeiraImg = document.createElement("img");
            bandeiraImg.src = cartao.bandeiraImg;
            bandeiraImg.alt = "Bandeira";
            bandeiraImg.className = "bandeira";

            const numero = document.createElement("p");
            if (cartao.numero && typeof cartao.numero === 'string') {
                numero.textContent = "Número: **** **** **** " + cartao.numero.slice(-2);
            } else {
                // Lidar com o caso em que cartao.numero não está definido ou não é uma string
            }

            const nome = document.createElement("p");
            nome.textContent = "Nome: " + cartao.nome;

            const deleteButton = document.createElement("span");
            deleteButton.className = "delete-button";
            deleteButton.innerHTML = '<i class="fas fa-times"></i>'; // Ícone X do Font Awesome

            // Adiciona um evento de clique para excluir o cartão
            deleteButton.addEventListener("click", function () {
                cartoes.splice(index, 1); // Remove o cartão do array
                renderizarListaCartoes(); // Renderiza novamente a lista
            });

            bandeira.appendChild(bandeiraImg);

            cartaoBlock.appendChild(bandeira);
            cartaoBlock.appendChild(numero);
            cartaoBlock.appendChild(nome);
            cartaoBlock.appendChild(deleteButton);

            listaCartoes.appendChild(cartaoBlock);
        });
    }

    // Função para adicionar cartão à lista
    function adicionarCartao(cartaoId, bandeiraImg, numero,cvv, nome, bandeira) {
        cartoes.push({ cartaoId, bandeiraImg, numero, cvv, nome, bandeira });
        var cartoesJSON = localStorage.getItem("cartoes");

        var cartoes1 = cartoesJSON ? JSON.parse(cartoesJSON) : [];

        cartoes1.push({ cartaoId, bandeiraImg, numero, cvv, nome, bandeira });

        cartoesJSON = JSON.stringify(cartoes1);

        localStorage.setItem("cartoes", cartoesJSON);

        renderizarListaCartoes();
    }


    // Fechar o modal ao clicar no botão "x"
    const closeButtons = document.querySelectorAll(".modal .close");
    closeButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            modalSuccess.style.display = "none";
            modalError.style.display = "none";
        });
    });

    // Função para abrir o popup
    function openPopup() {
        overlay.style.display = "flex";
        popup.style.display = "block";
    }
    
    // Função para fechar o popup
    function closePopup() {
        overlay.style.display = "none";
        popup.style.display = "none";
    }
    
    // Abrir o popup ao clicar no botão Adicionar Cartão
    addButton.addEventListener("click", openPopup);
    
    // Fechar o popup ao clicar no botão Fechar
    closeButton.addEventListener("click", closePopup);
    
    // Fechar o popup ao clicar fora do popup
    overlay.addEventListener("click", function(event) {
        if (event.target === overlay) {
            closePopup();
        }
    });
    
    // Validar campos e exibir modais ao clicar em Confirmar
    confirmButton.addEventListener("click", function() {
        const numero = document.getElementById("numero").value;
        const cvv = document.getElementById("cvv").value;
        const titular = document.getElementById("titular").value;
        const bandeira = document.getElementById("bandeira").value;
        
        if (numero === "" || cvv === "" || titular === "") {
            // Exibir modal de erro
            modalError.style.display = "block";
        } else {
            // Adicionar cartão à lista
            adicionarCartao(0, "/imagens/image7.png", numero, cvv, titular, bandeira);
            
            // Exibir modal de sucesso
            modalSuccess.style.display = "block";
            document.getElementById("numero").value = '';
            document.getElementById("cvv").value = '';
            document.getElementById("titular").value = '';
            document.getElementById("bandeira").value = '';
            closePopup();
        }
    });

document.addEventListener("DOMContentLoaded", function() {
    const overlayCupom = document.getElementById("overlay-cupom");
    const popupCupom = document.getElementById("popup-cupom");
    const closeButtonCupom = document.getElementById("fechar-cupom");
    const addCupomButton = document.getElementById("meuBotaoCupom");
    const confirmarBotao = document.getElementById("confirmar-cupom");
    const modalSuccess = document.getElementById("modalSuccess");
    const modalError = document.getElementById("modalError");
    const confirmarPedido = document.getElementById("finaliza-pedido");

    // Função para abrir o modal de cupom
    function openCupomPopup() {
        overlayCupom.style.display = "flex";
        popupCupom.style.display = "block";
    }

    // Função para fechar o modal de cupom
    function closeCupomPopup() {
        overlayCupom.style.display = "none";
        popupCupom.style.display = "none";
    }

    // Abrir o modal de cupom ao clicar no botão "Adicionar cupom de troca"
    addCupomButton.addEventListener("click", openCupomPopup);

    // Fechar o modal de cupom ao clicar no botão Fechar
    closeButtonCupom.addEventListener("click", closeCupomPopup);

    // Fechar o modal de cupom ao clicar fora do modal
    overlayCupom.addEventListener("click", function (event) {
        if (event.target === overlayCupom) {
            closeCupomPopup();
        }
    });

    function extrairValor(elementId) {
        var valorTexto = document.getElementById(elementId).textContent.trim();
        var valorSemR = valorTexto.replace('R$', '').replace('.', '').replace(/\s/g, '');
        return valorSemR;
    }


    confirmarPedido.addEventListener("click", function () {
        const valorProduto = document.getElementById('valorProduto').textContent;
        const valorFrete = document.getElementById('valorFrete').textContent;
        const valorCodPromo = document.getElementById('valorCodPromo').textContent;
        const total = document.getElementById('td-direita-pedido').textContent;

        var cartoesJSON = localStorage.getItem("cartoes");

        var cartoes1 = cartoesJSON ? JSON.parse(cartoesJSON) : [];


        var Pedido = {
            ped_sta_comp_id: 1,
            ped_cli_id: 1,
            ped_valor_total: extrairValor('td-direita-pedido'),
            ped_valor_produtos: extrairValor('valorProduto'),
            ped_valor_frete: extrairValor('valorFrete'),
            ped_valor_cod_promo: extrairValor('valorCodPromo'),
            CartaoList: cartoes1.map(cartao => {
                return {
                    car_id: cartao.cartaoId,
                    car_num: cartao.numero,
                    car_nome: cartao.nome,
                    car_cod_seguranca: cartao.cvv
                };
            })
        };

        var enderecoArmazenado = localStorage.getItem("EnderecoEntrega");
        if (enderecoArmazenado || localStorage.getItem("EnderecoId") !== null) {
            var enderecoObjeto = JSON.parse(enderecoArmazenado);
            var enderecoId = localStorage.getItem("EnderecoId");

            if (enderecoId !== null && enderecoId !== "") {
                Pedido.ped_end_id = enderecoId;

                $.ajax({
                    type: "POST",
                    url: "/FormaPagamento/InserirPedido",
                    dataType: "json",
                    data: Pedido,
                    async: false,
                    success: function (result) {
                        numeroPedido = parseInt(result);
                    },
                    error: function (status) {
                        //alert(status.toString());
                    }
                });

                const carrinho = JSON.parse(localStorage.getItem("carrinho"));
                if (carrinho[0] && carrinho[0].dados) {
                    for (const item of carrinho[0].dados) {
                        const pedidoCalcado = {
                            ped_cal_ped_id: numeroPedido,
                            ped_cal_cal_id: item.cal_id,
                            ped_cal_quant: 1,
                            ped_cal_tamanho: item.cal_tamanho,
                        };

                        $.ajax({
                            type: "POST",
                            url: "/FormaPagamento/InserirPedidoCalcados",
                            dataType: "json",
                            data: Pedido,
                            async: false,
                            success: function (result) {
                                numeroPedido = parseInt(result);
                            },
                            error: function (status) {
                                
                            }
                        });

                    }
                }

            }
            else if (Object.keys(enderecoObjeto).length > 0) {
                var enderecoArmazenado = localStorage.getItem("EnderecoEntrega");

                enderecoArmazenado.ClienteId = 1;

                $.ajax({
                    type: "POST",
                    url: "/Endereco/PostEnderecoRetornoId",
                    dataType: "json",
                    data: endereco,
                    async: false,
                    success: function (id) {
                        Pedido.ped_end_id = id;

                        $.ajax({
                            type: "POST",
                            url: "/FormaPagamento/InserirPedido",
                            dataType: "json",
                            data: Pedido,
                            async: false,
                            success: function (result) {
                                numeroPedido = parseInt(result);
                            },
                            error: function (status) {
                                //alert(status.toString());
                            }
                        });
                    },
                    error: function (status) {
                        //alert(status.toString());
                    }
                });

            }
        }


        



        alert(`Seu pedido foi inserido e seu número de pedido é: ${numeroPedido}`);

        
    });

    confirmarBotao.addEventListener("click", function() {
        const cupom = document.getElementById("cupom").value;
        
        if (cupom === "") {
            // Exibir modal de erro
            modalError.style.display = "block";
        } else {
            // Exibir modal de sucesso
            modalSuccess.style.display = "block";
            closeCupomPopup();
        }
    });
});

function carregarValores() {
    carregarValorCarrinho();
    carregarValorFrete();
    calcularValorTotalFormaPagamento();
}

function carregarValorCarrinho() {
    let valorCarrinho = localStorage.getItem("carrinhoQuantidade");
    if (valorCarrinho !== null) {
        document.querySelector("#quantidade-item-cart").textContent = valorCarrinho;
    }
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

function calcularValorTotalFormaPagamento() {
    var valorElemento1 = parseFloat(localStorage.getItem("valorProdutos"));
    var valorElemento2 = parseFloat(localStorage.getItem("valorFrete"));
    var valorElemento3 = parseFloat(document.querySelector("#valorCodPromo").textContent.replace("R$", "").trim());
    var valorElemento4 = parseFloat(document.querySelector("#cupomTroca").textContent.replace("R$", "").trim());

    var valorTotal = valorElemento1 + valorElemento2 - valorElemento3 - valorElemento4;
    var valorFormatado = (valorTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.querySelector("#td-direita-pedido").textContent = valorFormatado;
}