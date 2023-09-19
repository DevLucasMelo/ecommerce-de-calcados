$(document).ready(function () {

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

    confirmarPedido.addEventListener("click", function () {
        const valorProduto = document.getElementById('valorProduto').textContent;
        const valorFrete = document.getElementById('valorFrete').textContent;
        const valorCodPromo = document.getElementById('valorCodPromo').textContent;
        const total = document.getElementById('td-direita-pedido').textContent;

        const Pedido = {
            ped_sta_comp_id: 1,
            ped_cli_id: 1,
            ped_valor_total: parseFloat(document.getElementById('td-direita-pedido').textContent.replace('R$', '').trim()),
            ped_valor_produtos: parseFloat(document.getElementById('valorProduto').textContent.replace('R$', '').trim()),
            ped_valor_frete: parseFloat(document.getElementById('valorFrete').textContent.replace('R$', '').trim()),
            ped_valor_cod_promo: parseFloat(document.getElementById('valorCodPromo').textContent.replace('R$', '').trim()),
            CartaoList: cartoes.map(cartao => {
                return {
                    car_id: cartao.cartaoId,
                    car_num: cartao.numero,
                    car_nome: cartao.nome,
                    car_cod_seguranca: cartao.cvv
                };
            })
        };

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



        alert(`Seu pedido foi inserido e seu número de pedido é: ${numeroPedido}`);

        const urlDaPaginaEspecifica = 'http://localhost:7247/FormaPagamento/FormaPagamento';

        window.location.href = urlDaPaginaEspecifica;
        window.location.reload(true);
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