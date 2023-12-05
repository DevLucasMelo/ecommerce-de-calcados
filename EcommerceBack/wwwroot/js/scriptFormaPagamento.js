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
var cupons = [];



confirmarPedido.addEventListener("click", function() {
    modalSuccess.style.display = "block";
    //closeCupomPopup();
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

    function renderizarListaCupons() {
        const listaCupons = document.getElementById("listaCupons");
        listaCupons.innerHTML = "";

        if (cupons.length > 0) {
            listaCupons.style.marginTop = "20px"; 
        } else {
            listaCupons.style.marginTop = "0";
        }

        cupons.forEach(function (cupom, index) {

            const cupomBlock = document.createElement("div");
            cupomBlock.className = "cartao-block-troca";

            const cupId = document.createElement("input");
            cupId.type = "hidden";
            cupId.value = cupom.cupId;

            const nome = document.createElement("p");
            nome.textContent = "Cupom: " + cupom.cupomNome;

            const valor = document.createElement("p");
            valor.textContent = "Valor do Cupom: " + cupom.cupValor;

            const deleteCupomButton = document.createElement("span");
            deleteCupomButton.className = "delete-button";
            deleteCupomButton.innerHTML = '<i class="fas fa-times"></i>'; 

            deleteCupomButton.addEventListener("click", function () {
                cupons.splice(index, 1); 
                renderizarListaCupons();
                carregarValores();
            });

            cupomBlock.appendChild(cupId);
            cupomBlock.appendChild(nome);
            cupomBlock.appendChild(valor);
            cupomBlock.appendChild(deleteCupomButton);
            listaCupons.appendChild(cupomBlock);
        });

        
    }


    function renderizarListaCartoes() {
        const listaCartoes = document.getElementById("listaCartoes");
        listaCartoes.innerHTML = ""; 

        if (cartoes.length > 0) {
            listaCartoes.style.marginTop = "20px"; 
        } else {
            listaCartoes.style.marginTop = "0"; 
        }

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
                
            }

            const nome = document.createElement("p");
            nome.textContent = "Nome: " + cartao.nome;

            const deleteButton = document.createElement("span");
            deleteButton.className = "delete-button";
            deleteButton.innerHTML = '<i class="fas fa-times"></i>';

            deleteButton.addEventListener("click", function () {
                cartoes.splice(index, 1); 
                renderizarListaCartoes(); 
            });

            bandeira.appendChild(bandeiraImg);

            cartaoBlock.appendChild(bandeira);
            cartaoBlock.appendChild(numero);
            cartaoBlock.appendChild(nome);
            cartaoBlock.appendChild(deleteButton);

            listaCartoes.appendChild(cartaoBlock);
        });
    }

    function adicionarCartao(cartaoId, bandeiraImg, numero, cvv, nome, bandeira) {
        cartoes.push({ cartaoId, bandeiraImg, numero, cvv, nome, bandeira });
        var cartoesJSON = localStorage.getItem("cartoes");

        var cartoes1 = cartoesJSON ? JSON.parse(cartoesJSON) : [];

        cartoes1.push({ cartaoId, bandeiraImg, numero, cvv, nome, bandeira });

        cartoesJSON = JSON.stringify(cartoes1);

        localStorage.setItem("cartoes", cartoesJSON);

        renderizarListaCartoes();
    }

    function adicionarCupom(cupomNome, cupValor, cupId, cupTip) {
        cupons.push({ cupomNome, cupValor, cupId, cupTip });
        if (cupTip == 2) {
            renderizarListaCupons();
        }
    }


    const closeButtons = document.querySelectorAll(".modal .close");
    closeButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            modalSuccess.style.display = "none";
            modalError.style.display = "none";
        });
    });

    function openPopup() {
        overlay.style.display = "flex";
        popup.style.display = "block";
    }

    function closePopup() {
        overlay.style.display = "none";
        popup.style.display = "none";
    }
    
    addButton.addEventListener("click", openPopup);
    
    closeButton.addEventListener("click", closePopup);
    
    overlay.addEventListener("click", function(event) {
        if (event.target === overlay) {
            closePopup();
        }
    });

    confirmButton.addEventListener("click", function() {
        const numero = document.getElementById("numero").value;
        const cvv = document.getElementById("cvv").value;
        const titular = document.getElementById("titular").value;
        const bandeira = document.getElementById("bandeira").value;
        
        if (numero === "" || cvv === "" || titular === "") {
            modalError.style.display = "block";
        } else {
            adicionarCartao(0, "/imagens/image7.png", numero, cvv, titular, bandeira);
            
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
    const confirmarPromocional = document.getElementById("botaoPromocional");

    function openCupomPopup() {
        overlayCupom.style.display = "flex";
        popupCupom.style.display = "block";
    }

    function closeCupomPopup() {
        overlayCupom.style.display = "none";
        popupCupom.style.display = "none";
    }

    addCupomButton.addEventListener("click", openCupomPopup);

    closeButtonCupom.addEventListener("click", closeCupomPopup);

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

        var valorCodPromo1 = parseFloat(document.querySelector("#valorCodPromo").textContent.replace('-R$', '').replace(/\./g, '').replace(',', '.'));
        var valorCupomTroca1 = parseFloat(document.querySelector("#cupomTroca").textContent.replace('-R$', '').replace(/\./g, '').replace(',', '.'));
        var valorTotalPromo = valorCodPromo1 + valorCupomTroca1;

        var valorTotal1 = parseFloat(extrairValor('td-direita-pedido').replace('-R$', '').replace(/\./g, '').replace(',', '.'));

        if (valorTotal1 < 0)
        {
            valorGerarCupomTroca = Math.abs(valorTotal1);
        }
        else
        {
            valorGerarCupomTroca = 0;
        }

        var Pedido = {
            ped_sta_comp_id: 1,
            ped_cli_id: 1,
            ped_valor_total: valorTotal1,
            ped_valor_produtos: extrairValor('valorProduto'),
            ped_valor_frete: extrairValor('valorFrete'),
            ped_valor_cod_promo: extrairValor('valorCodPromo'),
            CartaoList: cartoes1.map(cartao => {
                return {
                    car_id: cartao.cartaoId,
                    car_num: cartao.numero,
                    car_nome: cartao.nome,
                    car_cod_seguranca: cartao.cvv,
                    ClienteId: 1,
                    Bandeira: {
                        ban_nome: cartao.bandeira,
                    },
                };
            })
        };

        if (Pedido.ped_valor_total < 0)
        {
            Pedido.ped_valor_total = 0;
        }

        var enderecoArmazenado = localStorage.getItem("EnderecoEntrega");
        if (enderecoArmazenado || localStorage.getItem("EnderecoId") !== null) {
            var enderecoObjeto = JSON.parse(enderecoArmazenado);
            var enderecoId = localStorage.getItem("EnderecoId");

            if (enderecoId !== null && enderecoId !== "") {
                Pedido.ped_end_id = parseInt(enderecoId);

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

                var Cupons = {
                    cupomList: cupons.map(cupom => {
                        return {
                            cup_id: cupom.cupId,
                            pedidoId: numeroPedido,
                            cup_valor: cupom.cupValor,
                        };
                    })
                };

                if (cupons.length != 0) {
                    $.ajax({
                        type: "POST",
                        url: "/FormaPagamento/InserirCupom",
                        dataType: "json",
                        data: Cupons,
                        async: false,
                        success: function (result) {

                        },
                        error: function (status) {

                        }
                    });
                }

                

                const carrinho = JSON.parse(localStorage.getItem("carrinho"));

                if (carrinho[0] && carrinho[0].dados) {
                    carrinho.forEach(function (carrinhoItem) {
                        carrinhoItem.dados.forEach(function (item) {
                            const pedidoCalcado = {
                                ped_cal_ped_id: numeroPedido,
                                ped_cal_cal_id: item.cal_id,
                                ped_cal_quant: item.quantidade,
                                ped_cal_tamanho: parseInt(item.tamanho),
                            };

                            $.ajax({
                                type: "POST",
                                url: "/FormaPagamento/InserirPedidoCalcados",
                                dataType: "json",
                                data: pedidoCalcado,
                                async: false,
                                success: function (result) {
                                    numeroPedido = parseInt(result);
                                },
                                error: function (status) {

                                }
                            });
                        });
                    });
                }

            }
            else if (Object.keys(enderecoObjeto).length > 0) {
                var enderecoArmazenado = localStorage.getItem("EnderecoEntrega");

                
                var endereco = JSON.parse(enderecoArmazenado);
                endereco.ClienteId = 1;

                //var endereco = {
                //    end_logradouro: endereco1.end_logradouro,
                //    end_numero: endereco1.end_numero,
                //    end_bairro: endereco1.end_bairro,
                //    end_cep: endereco1.end_cep,
                //    end_tip_res_id: endereco1.end_tip_res_id,
                //    end_tip_log_id: endereco1.end_tip_log_id,
                //    end_entrega: endereco1.end_entrega,
                //    end_cobranca: endereco1.end_cobranca,
                //    ClienteId: endereco1.ClienteId,
                //    cidade: {
                //        cid_nome: endereco1.cidade.cid_nome
                //    },
                //    estado: {
                //        est_nome: endereco1.estado.est_nome
                //    },
                //    pais: {
                //        pais_nome: endereco1.pais.pais_nome
                //    }
                //};

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

                var Cupons = {
                    cupomList: cupons.map(cupom => {
                        return {
                            cup_id: cupom.cupId,
                            pedidoId: numeroPedido,
                            cup_valor: cupom.cupValor,
                        };
                    })
                };

                if (cupons.length != 0) {
                    $.ajax({
                        type: "POST",
                        url: "/FormaPagamento/InserirCupom",
                        dataType: "json",
                        data: Cupons,
                        async: false,
                        success: function (result) {

                        },
                        error: function (status) {

                        }
                    });
                }

                const carrinho = JSON.parse(localStorage.getItem("carrinho"));

                if (carrinho[0] && carrinho[0].dados) {
                    carrinho.forEach(function (carrinhoItem) {
                        carrinhoItem.dados.forEach(function (item) {
                            const pedidoCalcado = {
                                ped_cal_ped_id: numeroPedido,
                                ped_cal_cal_id: item.cal_id,
                                ped_cal_quant: item.quantidade,
                                ped_cal_tamanho: parseInt(item.tamanho),
                            };

                            $.ajax({
                                type: "POST",
                                url: "/FormaPagamento/InserirPedidoCalcados",
                                dataType: "json",
                                data: pedidoCalcado,
                                async: false,
                                success: function (result) {
                                    numeroPedido = parseInt(result);
                                },
                                error: function (status) {

                                }
                            });
                        });
                    });
                }
            }
        }

        if (valorGerarCupomTroca > 0)
        {
            $.ajax({
                type: "POST",
                url: "/FormaPagamento/gerarCupomPedido",
                dataType: "json",
                data: {
                    valorTroca: valorGerarCupomTroca,
                    cliId: parseInt(1)
                },
                async: false,
                success: function (result) {
                    alert('O valor dos cupons superou o valor dos pedidos, foi criado cupom para que use em outras oportunidades! ' + result.toString());
                },
                error: function (status) {

                }
            });
        }

        alert(`Seu pedido foi inserido e seu número de pedido é: ${numeroPedido}`);

        localStorage.clear();

    });

    confirmarPromocional.addEventListener("click", function () {
        const cupom = document.getElementById("input-pedido").value;

        if (cupom === "") {
            modalError.style.display = "block";
        }
        else
        {
            var cupomObjeto;
            $.ajax({
                type: "GET",
                url: "/FormaPagamento/ConsultarCupom",
                dataType: "json",
                data: { cupomName: cupom.toUpperCase() },
                async: false,
                success: function (jsonResult) {
                    cupomObjeto = jsonResult;
                },
                error: function (status) {

                }
            });

            if (cupomObjeto == null) {
                alert('Digite um cupom válido!');
            } else {
                if (cupomObjeto.cup_ativo) {
                    if (cupomObjeto.cup_tip_id == 1) {
                        cupons = cupons.filter(cupom1 => cupom1.cupTip !== 1);
                        adicionarCupom(cupomObjeto.cup_nome, cupomObjeto.cup_valor, cupomObjeto.cup_id, cupomObjeto.cup_tip_id);
                        modalSuccess.style.display = "block";
                    }
                    else
                    {
                        alert('Digite um cupom promocional!');
                    }
                    
                } else {
                    alert('Digite um cupom que está ativo!');
                }
            }
        }

        carregarValores();
        document.getElementById("input-pedido").value = "";
    });
    

    confirmarBotao.addEventListener("click", function() {
        const cupom = document.getElementById("cupom").value;

        if (cupom === "") {
            modalError.style.display = "block";
        } else {

            let cupomJaExistente = cupons.some(cupons => cupons.cupomNome === cupom);
            if (cupomJaExistente) {
                alert('Esse cupom já foi adicionado!');
            } else { 
                var cupomObjeto;
                $.ajax({
                    type: "GET",
                    url: "/FormaPagamento/ConsultarCupom",
                    dataType: "json",
                    data: { cupomName: cupom.toUpperCase() },
                    async: false,
                    success: function (jsonResult) {
                        cupomObjeto = jsonResult;
                    },
                    error: function (status) {

                    }
                });

                if (cupomObjeto == null) {
                    alert('Digite um cupom válido!');
                } else {
                    if (cupomObjeto.cup_ativo) {
                        adicionarCupom(cupomObjeto.cup_nome, cupomObjeto.cup_valor, cupomObjeto.cup_id, cupomObjeto.cup_tip_id);
                    } else {
                        alert('Digite um cupom que está ativo!');
                    }
                }
                
                modalSuccess.style.display = "block";
            } 
        }
        
        carregarValores();
        document.getElementById("cupom").value = "";
        closeCupomPopup();
        
    });
});

function carregarValores() {
    carregarValorCupomTroca();
    carregarValorCarrinho();
    carregarValorFrete();
    calcularValorTotalFormaPagamento();
}

function carregarValorCupomPromo() {

    var valorFormatado = (valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.querySelector("#cupomTroca").textContent = valorFormatado;
}


function carregarValorCupomTroca() {
    let totalCupValor = 0;
    let totalCupPromoValor = 0;

    if (cupons.length > 0) {
        for (let i = 0; i < cupons.length; i++) {
            if (cupons[i].cupTip == 2) {
                totalCupValor += cupons[i].cupValor;
            }
            else {
                totalCupPromoValor += cupons[i].cupValor;
            }
        }
        localStorage.setItem("cupons", cupons);
    } else { 
        totalCupValor = 0;
        totalCupPromoValor = 0;
    }

    var valorFormatadoCupTroca = "-" + (totalCupValor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    var valorFormatadoCupPromo = "-" + (totalCupPromoValor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.querySelector("#valorCodPromo").textContent = valorFormatadoCupPromo;
    document.querySelector("#cupomTroca").textContent = valorFormatadoCupTroca;
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
    var valorElemento3 = parseFloat(document.querySelector("#valorCodPromo").textContent.replace('-R$', '').replace(/\./g, '').replace(',', '.'));
    var valorElemento4 = parseFloat(document.querySelector("#cupomTroca").textContent.replace('-R$', '').replace(/\./g, '').replace(',', '.'));


    var valorTotal = valorElemento1 + valorElemento2 - valorElemento3 - valorElemento4;
    

    var valorFormatado = (valorTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.querySelector("#td-direita-pedido").textContent = valorFormatado;
}