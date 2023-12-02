$(document).ready(function () {
    selecionarClientes();
});


const divInclusao = document.getElementById("inclusaoDiv");
const overlayCupom = document.getElementById("overlay-cliente");
const popupCupom = document.getElementById("popup-cliente");
const closeButtonCupom = document.getElementById("fechar-cliente");
const addCupomButton = document.getElementById("meuBotaocliente");
const confirmarBotao = document.getElementById("confirmar-cliente");
const modalSuccess = document.getElementById("modalSuccess");
const modalError = document.getElementById("modalError");
const confirmarEndereco = document.getElementById("confirmar-endereco");


//Cartão
const overlayCartao = document.getElementById("overlay-cartao");
const popupCartao = document.getElementById("popup-cartao");
const closeButtonCartao = document.getElementById("fechar-cartao");

//Endereço
const overlayEndereco = document.getElementById("overlay-endereco");
const popupEndereco = document.getElementById("popup-endereco");
const closeButtonEndereco = document.getElementById("fechar-endereco");

closeButtonEndereco.addEventListener("click", closeEnderecoPopup);

addCupomButton.addEventListener("click", openCupomPopup);

closeButtonCartao.addEventListener("click", closeCartaoPopup);

//Endereço
function openEnderecoPopup() {
    overlayEndereco.style.display = "flex";
    popupEndereco.style.display = "block";
}

function closeEnderecoPopup() {
    zerarEnderecos();
    excluirEnderecoEditar();
    overlayEndereco.style.display = "none";
    popupEndereco.style.display = "none";
}

function zerarEnderecos() {

    document.getElementById("EnderecoId").value = "";
    document.getElementById("bairroCliente1").value = "";
    document.getElementById("cidadeCliente1").value = "";
    document.getElementById("estadoCliente1").value = "";
    document.getElementById("numeroEndereco1").value = "";
    document.getElementById("paisCliente1").value = "";
    document.getElementById("cep1").value = "";
    document.getElementById("logradouro1").value = "";

    document.getElementById("PaisId").value = "";
    document.getElementById("CidadeId").value = "";
    document.getElementById("EstadoId").value = "";

    document.getElementById('enderecoEntrega').checked = false;
    document.getElementById('enderecoCobranca').checked = false;

    var selectTipoResidencia1 = document.getElementById("tipoResidencia1");
    selectTipoResidencia1.selectedIndex = 0;

    var selectTipoLogradouro1 = document.getElementById("tipoLogradouro1");
    selectTipoLogradouro1.selectedIndex = 0;
}

//Cartão
function openCartaoPopup() {
    overlayCartao.style.display = "flex";
    popupCartao.style.display = "block";
}

function closeCartaoPopup() {
    overlayCartao.style.display = "none";
    popupCartao.style.display = "none";
}

function gerenciarEnderecos(clienteId) {
    openEnderecoPopup();
    document.getElementById('clientEnderecoId').value = clienteId;
    selecionarEndereco(clienteId);
}

function gerenciarCartoes(clienteId) {
    openCartaoPopup();
    document.getElementById('clientCartaoId').value = clienteId;
    selecionarCartao(clienteId);
}

function recarregarPagina() {
    Location.reload();
}

function selecionarEndereco(clienteId) {
    fetch(`/Endereco/SelecionarEnderecoPoriD?clienteId=${clienteId}`, { async: false })
        .then(response => response.json())
        .then(data => {
            var resultadoPesquisa = document.getElementById('resultadoPesquisaEndereco');
            resultadoPesquisa.innerHTML = ''; // Limpe os resultados anteriores.

            data.forEach(endereco => {

                resultadoPesquisa.innerHTML += `
                    <div class="row">
                        <div class="col">${endereco.end_logradouro}</div>
                        <div class="col">${endereco.end_cep}</div>
                        <div class="col">${endereco.end_bairro}</div>
                        <div class="col">
                            <button class="btn btn-primary btn-sm" id="editar-endereco" onclick="editEndereco('${endereco.end_id}')">Editar</button>
                            <button class="btn btn-danger btn-sm" id="excluir-endereco" onclick="deletEndereco('${endereco.end_id}')">Excluir</button>
                        </div>
                    </div>`;
            });
        });
}

function selecionarCartao(clienteId) {
    fetch(`/Cartao/SelecionarCartaoPoriD?clienteId=${clienteId}`, { async: false })
        .then(response => response.json())
        .then(data => {
            var resultadoPesquisa = document.getElementById('resultadoPesquisaCartao');
            resultadoPesquisa.innerHTML = ''; // Limpe os resultados anteriores.

            data.forEach(cartao => {

                resultadoPesquisa.innerHTML += `
                    <div class="row">
                        <div class="col">${cartao.car_num}</div>
                        <div class="col">${cartao.car_cod_seguranca}</div>
                        <div class="col">${cartao.car_nome}</div>
                        <div class="col">
                            <button class="btn btn-primary btn-sm" id="editar-cartao" onclick="editCartao('${cartao.car_id}')">Editar</button>
                            <button class="btn btn-danger btn-sm" id="excluir-cartao" onclick="deletCartao('${cartao.car_id}')">Excluir</button>
                        </div>
                    </div>`;
            });
        });
}

function selecionarClientes() {
    fetch(`/Cliente/ConsultarTodosClientes`)
        .then(response => response.json())
        .then(data => {
            var resultadoPesquisa = document.getElementById('resultadoPesquisa');
            resultadoPesquisa.innerHTML = ''; // Limpe os resultados anteriores.

            data.forEach(cliente => {
                const status = cliente.cli_status ? "Ativo" : "Inativo";
                if (cliente.cli_gen_id === 1) {
                    genero = "Feminino";
                } else if (cliente.cli_gen_id === 2) {
                    genero = "Masculino";
                }

                resultadoPesquisa.innerHTML += `
                    <div class="row">
                        <div class="col">${cliente.cli_nome}</div>
                        <div class="col">${cliente.cli_dt_nascimento_formatted}</div>
                        <div class="col">${cliente.cli_email}</div>
                        <div class="col">${cliente.cli_cpf}</div>
                        <div class="col">${genero}</div>
                        <div class="col" id="status-cliente-${cliente.cli_id}">${status}</div>
                        <div class="col"><button class="btn btn-primary btn-sm" id="gerenciar-enderecos" onclick="gerenciarEnderecos('${cliente.cli_id}')">Gerenciar</button></div>
                        <div class="col"><button class="btn btn-primary btn-sm" id="gerenciar-cartoes" onclick="gerenciarCartoes('${cliente.cli_id}')">Gerenciar</button></div>
                        <div class="col"><button class="btn btn-primary btn-sm" id="consult-transacoes" onclick="consulTrans('${cliente.cli_id}')">Consultar</button></div>
                        <div class="col">
                            <button class="btn btn-primary btn-sm" id="editar-cliente" onclick="editClient('${cliente.cli_id}')">Editar</button>
                            <button class="btn btn-danger btn-sm" id="excluir-cliente" onclick="deleteClient('${cliente.cli_id}')">Excluir</button>
                            <button class="btn btn-danger btn-sm" id="inativar-cliente" onclick="inativaCliente('${cliente.cli_id}')">Inativar</button>
                        </div>
                    </div>`;
            });
        });
}

function editCartao(cartaoId) {
    fillEditModalCartao(cartaoId); // Abrir o modal de edição
    preencherCartaoEditar(cartaoId);

}

function excluirEnderecoEditar() {
    var divEditarCartoes = document.getElementById("editar-endereco-container");

    // Seleciona o elemento h2 dentro da div (supondo que seja o único h2)
    var h2Element = divEditarCartoes.querySelector("h4");

    // Verifica se o h2 foi encontrado antes de tentar removê-lo
    if (h2Element) {
        // Remove o h2 da div
        divEditarCartoes.removeChild(h2Element);
    }
}

function excluirCartaoEditar() {
    var divEditarCartoes = document.getElementById("editar-cartoes-container");

    // Seleciona o elemento h2 dentro da div (supondo que seja o único h2)
    var h2Element = divEditarCartoes.querySelector("h4");

    // Verifica se o h2 foi encontrado antes de tentar removê-lo
    if (h2Element) {
        // Remove o h2 da div
        divEditarCartoes.removeChild(h2Element);
    }
}

function preencherCartaoEditar(cartaoId) {
    var divEditarCartoes = document.getElementById("editar-cartoes-container");

    // Cria um elemento h2
    var h2Element = document.createElement("h4");

    
    h2Element.innerText = "Editando Cartão: " + cartaoId.toString();


    
    divEditarCartoes.appendChild(h2Element);
}

function deletCartao(cartaoId) {
    $.ajax({
        type: "DELETE",
        url: "/Cartao/DeleteCartao",
        dataType: "json",
        data: { cartaoId: parseInt(cartaoId) },
        async: false,
        success: function (jsonResult) {
            
        },
        error: function (status) {
            console.log(status)
        }
    });
    var clienteId = document.getElementById("clientCartaoId").value;
    selecionarCartao(clienteId);
}

function fillEditModalCartao(cartaoId) {
    var cartaoObjeto;
    var jsonC;
    $.ajax({
        type: "GET",
        url: "/Cartao/ConsultarSomenteCartaoPoriD",
        dataType: "json",
        data: { cartaoId: parseInt(cartaoId) },
        async: false,
        success: function (jsonResult) {
            cartaoObjeto = jsonResult;
        },
        error: function (status) {
            console.log(status)
        }
    });

    // Preencher os campos do modal de edição
    document.getElementById('bandeiraCartaoId').value = cartaoObjeto.bandeira.ban_id;
    document.getElementById('CartaoId').value = cartaoObjeto.car_id;
    document.getElementById('numeroCartao1').value = cartaoObjeto.car_num;
    document.getElementById('cvv1').value = cartaoObjeto.car_cod_seguranca;
    document.getElementById('titular1').value = cartaoObjeto.car_nome;
    document.getElementById('bandeira1').value = cartaoObjeto.bandeira.ban_nome;
}


confirmarEndereco.addEventListener("click", function (event) {
    const EnderecoId = document.getElementById("EnderecoId").value;
    const ClienteId = document.getElementById("clientEnderecoId").value;
    
    const enderecoEntrega = $('#enderecoEntrega').is(':checked');
    const enderecoCobranca = $('#enderecoCobranca').is(':checked');

    const bairroCliente = document.getElementById("bairroCliente1").value;
    const cidadeCliente = document.getElementById("cidadeCliente1").value;
    const estadoCliente = document.getElementById("estadoCliente1").value;
    const numeroEndereco = document.getElementById("numeroEndereco1").value;
    const paisCliente = document.getElementById("paisCliente1").value;
    const cep = document.getElementById("cep1").value;
    const logradouro = document.getElementById("logradouro1").value;

    const PaisId = document.getElementById("PaisId").value;
    const CidadeId = document.getElementById("CidadeId").value;
    const EstadoId = document.getElementById("EstadoId").value;

    const selectTipoResidencia = document.getElementById("tipoResidencia1");
    var tipoResidencia = selectTipoResidencia.options[selectTipoResidencia.selectedIndex].value;
    var tipoResInt = parseInt(tipoResidencia, 10);

    const selectTipoLogradouro = document.getElementById("tipoLogradouro1");
    var tipoLogradouro = selectTipoLogradouro.options[selectTipoLogradouro.selectedIndex].value;
    var tipoLogInt = parseInt(tipoLogradouro, 10);

    

    if (Number.isInteger(parseInt(EnderecoId))) {

        var endereco = {
            end_logradouro: logradouro,
            end_numero: numeroEndereco,
            end_bairro: bairroCliente,
            end_cep: cep,
            end_tip_res_id: tipoResInt,
            end_tip_log_id: tipoLogInt,
            end_entrega: enderecoEntrega,
            end_cobranca: enderecoCobranca,
            cidade: {
                cid_nome: cidadeCliente,
                cid_id: CidadeId
            },
            estado: {
                est_nome: estadoCliente,
                est_id: EstadoId
            },
            pais: {
                pais_nome: paisCliente,
                pais_id: PaisId
            }
        };
        
        endereco.end_id = EnderecoId;

        $.ajax({
            type: "PUT",
            url: "/Endereco/PutEndereco",
            dataType: "json",
            data: endereco,
            async: false,
            success: function (result) {

            },
            error: function (status) {
                //alert(status.toString());
            }
        });

        excluirEnderecoEditar();
        selecionarEndereco(parseInt(clienteId));

    } else {

        var endereco = {
            end_logradouro: logradouro,
            end_numero: numeroEndereco,
            end_bairro: bairroCliente,
            end_cep: cep,
            end_tip_res_id: tipoResInt,
            end_tip_log_id: tipoLogInt,
            end_entrega: enderecoEntrega,
            end_cobranca: enderecoCobranca,
            ClienteId: ClienteId,
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

        $.ajax({
            type: "POST",
            url: "/Endereco/PostEndereco",
            dataType: "json",
            data: endereco,
            async: false,
            success: function (result) {

            },
            error: function (status) {
                //alert(status.toString());
            }
        });

        selecionarEndereco(parseInt(clienteId));
    }

    document.getElementById("EnderecoId").value = "";
    document.getElementById("bairroCliente1").value = "";
    document.getElementById("cidadeCliente1").value = "";
    document.getElementById("estadoCliente1").value = "";
    document.getElementById("numeroEndereco1").value = "";
    document.getElementById("paisCliente1").value = "";
    document.getElementById("cep1").value = "";
    document.getElementById("logradouro1").value = "";

    document.getElementById("PaisId").value = "";
    document.getElementById("CidadeId").value = "";
    document.getElementById("EstadoId").value = "";

     document.getElementById('enderecoEntrega').checked = false;
     document.getElementById('enderecoCobranca').checked = false;

    var selectTipoResidencia1 = document.getElementById("tipoResidencia1");
    selectTipoResidencia1.selectedIndex = 0;
    
    var selectTipoLogradouro1 = document.getElementById("tipoLogradouro1");
    selectTipoLogradouro1.selectedIndex = 0;


});


function editEndereco(enderecoId) {
    fillEditModalEndereco(enderecoId);
    preencherEnderecoEditar(enderecoId);
}

function fillEditModalEndereco(enderecoId) {
    var enderecobjeto;
    var jsonC;
    $.ajax({
        type: "GET",
        url: "/PedidoAdmin/consultarEnderecoId",
        dataType: "json",
        data: { enderecoId: parseInt(enderecoId) },
        async: false,
        success: function (jsonResult) {
            enderecobjeto = jsonResult;
        },
        error: function (status) {
            console.log(status)
        }
    });

    // Preencher os campos do modal de edição
    document.getElementById('logradouro1').value = enderecobjeto.end_logradouro;
    document.getElementById('cidadeCliente1').value = enderecobjeto.cidade.cid_nome;
    document.getElementById('CidadeId').value = enderecobjeto.cidade.cid_id;

    document.getElementById('bairroCliente1').value = enderecobjeto.end_bairro;
    document.getElementById('numeroEndereco1').value = enderecobjeto.end_numero;
    document.getElementById('cep1').value = enderecobjeto.end_cep;

    document.getElementById('estadoCliente1').value = enderecobjeto.estado.est_nome;
    document.getElementById('EstadoId').value = enderecobjeto.estado.est_id;

    document.getElementById('paisCliente1').value = enderecobjeto.pais.pais_nome;
    document.getElementById('PaisId').value = enderecobjeto.pais.pais_id;

    document.getElementById('EnderecoId').value = enderecoId;

    document.getElementById('enderecoEntrega').checked = enderecobjeto.end_entrega;
    document.getElementById('enderecoCobranca').checked = enderecobjeto.end_cobranca;

    setSelectedValue('tipoResidencia1', enderecobjeto.end_tip_res_id);
    setSelectedValue('tipoLogradouro1', enderecobjeto.end_tip_log_id);
}

function setSelectedValue(selectId, value) {
    var selectElement = document.getElementById(selectId);
    for (var i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value == value) {
            selectElement.options[i].selected = true;
            break;
        }
    }
}

function preencherEnderecoEditar(cartaoId) {
    var divEditarCartoes = document.getElementById("editar-endereco-container");

    // Cria um elemento h2
    var h2Element = document.createElement("h4");


    h2Element.innerText = "Editando Endereço: " + cartaoId.toString();



    divEditarCartoes.appendChild(h2Element);
}


function editClient(clientId) {
    fillEditModal(clientId);
    
    openClienteEditarPopup(); // Abrir o modal de edição


    var clienteId = clientId.toString();

    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("id", "clienteEditId");
    input.setAttribute("value", clienteId);
}

function deleteClient(clientId) {
    $.ajax({
        type: "DELETE",
        url: "/Cliente/DeletarClienteId",
        dataType: "json",
        data: { id: parseInt(clientId) },
        async: false,
        success: function (jsonResult) {
            
        },
        error: function (status) {
            
        }
    });
    selecionarClientes();
}

function fillEditModal(id) {
    var clienteObjeto;
    var jsonC;
    $.ajax({
        type: "GET",
        url: "/Cliente/SelecionarClienteId",
        dataType: "json",
        data: { id: parseInt(id) },
        async: false,
        success: function (jsonResult) {
            clienteObjeto = jsonResult;
        },
        error: function (status) {
            console.log(status)
        }
    });

    const nome = clienteObjeto.cli_nome;
    const dataNascimento = clienteObjeto.cli_dt_nascimento.toString().substr(0, 10);
    const email = clienteObjeto.cli_email;
    const cpf = clienteObjeto.cli_cpf;
    const telefone = clienteObjeto.cli_telefone;
    const tipoTelefone = clienteObjeto.cli_tip_tel_id;
    const genero = clienteObjeto.cli_gen_id;
    const status_cliente = clienteObjeto.cli_status;

    var selectElementGenero = document.getElementById('genero');
    var selectElementTipoTelefone = document.getElementById('tipoTelefone');

    // Preencher os campos do modal de edição
    document.getElementById('clientEditId').value = id;
    document.getElementById('nomeCliente').value = nome;
    document.getElementById('dataNascimento').value = dataNascimento;
    document.getElementById('emailCliente').value = email;
    document.getElementById('cpfCliente').value = cpf;
    document.getElementById('statusCliente').checked = status_cliente;
    document.getElementById('telefone').value = telefone;

    selectElementGenero.value = genero.toString();
    selectElementTipoTelefone.value = tipoTelefone.toString();

}

// Função para abrir o modal de cupom
function openCupomPopup() {
    overlayCupom.style.display = "flex";
    popupCupom.style.display = "block";
}

function openClienteEditarPopup() {
    overlayCupom.style.display = "flex";
    popupCupom.style.display = "block";
    divInclusao.style.display = "none";
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
//overlayCupom.addEventListener("click", function (event) {
//if (event.target === overlayCupom) {
//closeCupomPopup();
//}
//});


function generateClientId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000); // Número aleatório entre 0 e 999
    return `${timestamp}_${random}`;
}

function generateCartaoId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000); // Número aleatório entre 0 e 999
    return `${timestamp}_${random}`;
}

document.addEventListener("DOMContentLoaded", function () {
    const cartoes = document.getElementById("gerenciar-cartoes");
    const closeButtonCartao = document.getElementById("fechar-cartao");
    const overlay = document.getElementById("overlay-cartao");
    const popup = document.getElementById("popup-cartao");
    const closeButton = document.getElementById("fechar");
    const confirmarCartao = document.getElementById("confirmar-cartao");
    const overlayCupom = document.getElementById("overlay-cliente");
    const popupCupom = document.getElementById("popup-cliente");
    //var addClienteCartao = document.getElementById("gerenciar-cartoes");

    // Função para abrir o modal de cupom
    function openCartaoPopup() {
        overlay.style.display = "flex";
        popup.style.display = "block";
    }

    // Função para fechar o modal de cupom
    function closeCartaoPopup() {
        overlay.style.display = "none";
        popup.style.display = "none";
    }


    //addClienteCartao.addEventListener("click", openCupomPopup);

    // Fechar o modal de cupom ao clicar no botão Fechar
    closeButtonCartao.addEventListener("click", closeCupomPopup);

    // Abrir o modal de cupom ao clicar no botão "Adicionar cupom de troca"
    //addClienteCartao.addEventListener("click", function (event) {
    //    openCartaoPopup();
    //    event.preventDefault();
    //});

    // Fechar o modal de cupom ao clicar no botão Fechar
    //closeButtonCartao.addEventListener("click", closeCartaoPopup);


    confirmarCartao.addEventListener("click", function (event) {
        event.preventDefault();
        const cartaoId = document.getElementById("CartaoId").value;

        var bandeiraId = document.getElementById("bandeiraCartaoId").value;
        var clienteId = document.getElementById("clientCartaoId").value;
        const numeroCartao = document.getElementById("numeroCartao1").value;
        const cvv = document.getElementById("cvv1").value;
        const titular = document.getElementById("titular1").value;
        const bandeira = document.getElementById("bandeira1").value;


        event.preventDefault();



        if (numeroCartao === "" || cvv === "" || titular === "") {
            // Exibir modal de erro
            
        } else {

            if (Number.isInteger(parseInt(cartaoId))) {

                var cartao = {
                    car_id: cartaoId,
                    car_num: numeroCartao,
                    car_nome: titular,
                    car_cod_seguranca: cvv,
                    car_ban_id: parseInt(bandeiraId),
                    Bandeira: {
                        ban_id: parseInt(bandeiraId),
                        ban_nome: bandeira
                    }
                };

                cartao.ClienteId = parseInt(clienteId);

                $.ajax({
                    type: "POST",
                    url: "/Cartao/PutCartao",
                    dataType: "json",
                    data: cartao,
                    async: false,
                    success: function (result) {

                    },
                    error: function (status) {
                        
                    }
                });
                excluirCartaoEditar();
                selecionarCartao(parseInt(clienteId));
            }
            else
            {
                var cartao = {
                    ClienteId: clienteId,
                    car_num: numeroCartao,
                    car_nome: titular,
                    car_cod_seguranca: cvv,
                    Bandeira: {
                        ban_nome: bandeira
                    }
                };


                $.ajax({
                    type: "POST",
                    url: "/Cartao/PostCartao",
                    dataType: "json",
                    data: cartao,
                    async: false,
                    success: function (result) {

                    },
                    error: function (status) {
                        
                    }
                });
                
                selecionarCartao(parseInt(clienteId));
            }


            event.preventDefault();
            
            // Limpar os campos do formulário
            document.getElementById("bandeiraCartaoId").value = "";
            document.getElementById("CartaoId").value = "";
            document.getElementById("numeroCartao1").value = "";
            document.getElementById("cvv1").value = "";
            document.getElementById("titular1").value = "";
            document.getElementById("bandeira1").value = "";
        }
    });

    //event.preventDefault();
});

document.addEventListener("DOMContentLoaded", function () {
    const overlayCupom = document.getElementById("overlay-cliente");
    const popupCupom = document.getElementById("popup-cliente");
    const closeButtonCupom = document.getElementById("fechar-cliente");
    const addCupomButton = document.getElementById("meuBotaocliente");
    const confirmarBotao = document.getElementById("confirmar-cliente");
    const modalSuccess = document.getElementById("modalSuccess");
    const modalError = document.getElementById("modalError");
    const confirmarEndereco = document.getElementById("confirmar-endereco");



    // Função para excluir um cliente



    // Função para editar um cliente


    //const closeButtons = document.querySelectorAll(".modal .close-button");
    //closeButtons.forEach(function(button) {
    //button.addEventListener("click", function() {
    //modalSuccess.style.display = "none";
    //modalError.style.display = "none";
    //});
    //});

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
    //overlayCupom.addEventListener("click", function (event) {
    //if (event.target === overlayCupom) {
    //   closeCupomPopup();
    //}
    //});

    confirmarBotao.addEventListener("click", function (event) {
        event.preventDefault();
        var clienteId = document.getElementById("clientEditId").value;
        const nomeCliente = document.getElementById("nomeCliente").value;
        const dataNascimento = document.getElementById("dataNascimento").value;
        const emailCliente = document.getElementById("emailCliente").value;
        const cpfCliente = parseInt(document.getElementById("cpfCliente").value);
        const statusCliente = document.getElementById("statusCliente").checked;
        //const ruaCliente = document.getElementById("ruaCliente").value;
        //const bairroCliente = document.getElementById("bairroCliente").value;
        //const cidadeCliente = document.getElementById("cidadeCliente").value;
        //const estadoCliente = document.getElementById("estadoCliente").value;
        //const paisCliente = document.getElementById("paisCliente").value;
        const telefone = parseInt(document.getElementById("telefone").value);

        const selectTipoTelefone = document.getElementById("tipoTelefone");
        var tipoTelefone = selectTipoTelefone.options[selectTipoTelefone.selectedIndex].value;
        var tipoTelInt = parseInt(tipoTelefone, 10);

        const select = document.getElementById("genero");
        var genero = select.options[select.selectedIndex].value;
        var generoInt = parseInt(genero, 10);

        var id;

        var cliente = {
            cli_nome: nomeCliente,
            cli_dt_nascimento: dataNascimento,
            cli_gen_id: generoInt,
            cli_cpf: cpfCliente,
            cli_status: statusCliente,
            cli_telefone: telefone,
            cli_email: emailCliente,
            cli_tip_tel_id: tipoTelInt,
        };

        
        if (nomeCliente === "" || dataNascimento === "" || emailCliente === "" ||
            cpfCliente === "" || telefone === "" || genero === "") {
            // Exibir modal de erro
            modalError.style.display = "block";
        } else {

            if (Number.isInteger(parseInt(clienteId)))
            {
                id = clienteId;
                
                closeCupomPopup();

                var cliente = {
                    cli_id: parseInt(id),
                    cli_nome: nomeCliente,
                    cli_dt_nascimento: dataNascimento,
                    cli_gen_id: generoInt,
                    cli_cpf: cpfCliente,
                    cli_status: statusCliente,
                    cli_telefone: telefone,
                    cli_email: emailCliente,
                    cli_tip_tel_id: tipoTelInt,
                };

                $.ajax({
                    type: "PUT",
                    url: "/Cliente/PutCliente",
                    dataType: "json",
                    data: cliente,
                    async: false,
                    success: function (result) {
                        
                    },
                    error: function (status) {
                        console.log(status)
                    }
                });

                selecionarClientes();
                
            }
            else
            {
                const bairroCliente = document.getElementById("bairroCliente").value;
                const cidadeCliente = document.getElementById("cidadeCliente").value;
                const estadoCliente = document.getElementById("estadoCliente").value;
                const numeroEndereco = document.getElementById("numeroEndereco").value;
                const paisCliente = document.getElementById("paisCliente").value;
                const cep = document.getElementById("cep").value;
                const logradouro = document.getElementById("logradouro").value;

                const selectTipoResidencia = document.getElementById("tipoResidencia");
                var tipoResidencia = selectTipoResidencia.options[selectTipoResidencia.selectedIndex].value;
                var tipoResInt = parseInt(tipoResidencia, 10);

                const selectTipoLogradouro = document.getElementById("tipoLogradouro");
                var tipoLogradouro = selectTipoLogradouro.options[selectTipoLogradouro.selectedIndex].value;
                var tipoLogInt = parseInt(tipoLogradouro, 10);

                const numeroCartao = document.getElementById("numeroCartao").value;
                const cvv = document.getElementById("cvv").value;
                const titular = document.getElementById("titular").value;
                const bandeira = document.getElementById("bandeira").value;



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


                

                event.preventDefault();

                var cartao = {
                    car_num: numeroCartao,
                    car_nome: titular,
                    car_cod_seguranca: cvv,
                    Bandeira: {
                        ban_nome: bandeira
                    }
                };


                id;

                $.ajax({
                    type: "POST",
                    url: "/Cliente/PostCliente",
                    dataType: "json",
                    data: cliente,
                    async: false,
                    success: function (result) {

                        id = parseInt(result);

                        endereco.ClienteId = id;
                        cartao.ClienteId = id;

                        $.ajax({
                            type: "POST",
                            url: "/Endereco/PostEndereco",
                            dataType: "json",
                            data: endereco,
                            async: false,
                            success: function (result) {
                                
                            },
                            error: function (status) {
                                //alert(status.toString());
                            }
                        });

                        $.ajax({
                            type: "POST",
                            url: "/Cartao/PostCartao",
                            dataType: "json",
                            data: cartao,
                            async: false,
                            success: function (result) {

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

                closeCupomPopup();

            }
            

        //     //Adicionar o cliente ao grid
        //    const clientGrid = document.getElementById("clientGrid");
        //    const newRow = document.createElement("div");
        //    const clientId = id; // Função para gerar um ID único (implemente esta função)
        //    newRow.setAttribute("id", `clientRow_${clientId}`); // Definir o ID da linha
        //    newRow.classList.add("row");
        //    newRow.innerHTML = `
        //    <div class="col">${nomeCliente}</div>
        //    <div class="col">${dataNascimento}</div>
        //    <div class="col">${emailCliente}</div>
        //    <div class="col">${cpfCliente}</div>
        //    <div class="col">${genero}</div>
        //    <div class="col">
        //        <button class="btn btn-primary btn-sm" onclick="editClient('${clientId}')">Editar</button>
        //        <button class="btn btn-danger btn-sm" onclick="deleteClient('${clientId}')">Excluir</button>
        //    </div>
        //`;
        //    clientGrid.appendChild(newRow);

            // Limpar os campos do formulário
            document.getElementById("nomeCliente").value = "";
            document.getElementById("dataNascimento").value = "";
            document.getElementById("emailCliente").value = "";
            document.getElementById("cpfCliente").value = "";
            document.getElementById("statusCliente").value = "";
            document.getElementById("genero").value = "";
            document.getElementById("telefone").value = "";
            document.getElementById("clientEditId").value = "";
            location.reload();
        //    //document.getElementById("telefone").value = "";
        //    //document.getElementById("ruaCliente").value = "";
        //    //document.getElementById("bairroCliente").value = "";
        //    //document.getElementById("cidadeCliente").value = "";
        //    //document.getElementById("estadoCliente").value = "";
        //    //document.getElementById("paisCliente").value = "";

        }
    });
});


document.getElementById('consultarClientes').addEventListener('click', function () {
    var termoPesquisa = document.getElementById('termoPesquisa').value;

    fetch(`/Cliente/ConsultarClientes?termoPesquisa=${termoPesquisa}`)
        .then(response => response.json())
        .then(data => {
            var resultadoPesquisa = document.getElementById('resultadoPesquisa');
            resultadoPesquisa.innerHTML = ''; 

            data.forEach(cliente => {
                const status = cliente.cli_status ? "Ativo" : "Inativo";
                if (cliente.cli_gen_id === 1) {
                    genero = "Feminino";
                } else if (cliente.cli_gen_id === 2) {
                    genero = "Masculino";
                }
                
                resultadoPesquisa.innerHTML += `
                    <div class="row">
                        <div class="col">${cliente.cli_nome}</div>
                        <div class="col">${cliente.cli_dt_nascimento_formatted}</div>
                        <div class="col">${cliente.cli_email}</div>
                        <div class="col">${cliente.cli_cpf}</div>
                        <div class="col">${genero}</div>
                        <div class="col" id="status-cliente-${cliente.cli_id}">${status}</div>
                        <div class="col"><button class="btn btn-primary btn-sm" id="gerenciar-enderecos" onclick="gerenciarEnderecos('${cliente.cli_id}')">Gerenciar</button></div>
                        <div class="col"><button class="btn btn-primary btn-sm" id="gerenciar-cartoes" onclick="gerenciarCartoes('${cliente.cli_id}')">Gerenciar</button></div>
                        <div class="col"><button class="btn btn-primary btn-sm" id="consult-transacoes" onclick="consulTrans('${cliente.cli_id}')">Consultar</button></div>
                        <div class="col">
                            <button class="btn btn-primary btn-sm" id="editar-cliente" onclick="editClient('${cliente.cli_id}')">Editar</button>
                            <button class="btn btn-danger btn-sm" id="excluir-cliente" onclick="deleteClient('${cliente.cli_id}')">Excluir</button>
                            <button class="btn btn-danger btn-sm" id="inativar-cliente" onclick="inativaCliente('${cliente.cli_id}')">Inativar</button>
                        </div>
                    </div>`;
            });
        });
});

function inativaCliente(cliId) {
    fetch(`/inativar-cliente?id=${cliId}`, {
        method: "POST",
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const elementoStatus = document.getElementById(`status-cliente-${cliId}`);

                if (elementoStatus) {
                    elementoStatus.textContent = "Inativo";
                }

            } else {
                alert("Não foi possível inativar o cliente. Tente novamente mais tarde.");
            }
        })
        .catch(error => {
            console.error("Erro ao processar a solicitação:", error);
        });
  
}

function consulTrans(clienteId) {
    preencherTransacoes(clienteId);
    abrirModalTransacao();
}

function preencherTransacoes(clienteId)
{ 
    fetch(`/PedidoAdmin/ConsultarPedidoCliente?clienteId=${clienteId}`)
        .then(response => response.json())
        .then(data => {
            var resultadoPesquisa = document.getElementById('resultadoPesquisaTransacoes');
            resultadoPesquisa.innerHTML = '';
            
            data.forEach(pedido => {
                console.log(pedido)
                resultadoPesquisa.innerHTML += `
                    <div class="row">
                        <div class="col">${pedido.ped_id}</div>
                        <div class="col">${pedido.cliente.cli_nome}</div>
                        <div class="col">${pedido.ped_valor_total}</div>
                        <div class="col">${pedido.ped_valor_frete}</div>
                        <div class="col">${pedido.ped_valor_produtos}</div>
                        <div class="col">${pedido.tra_data_hora}</div>
                        <div class="col">${pedido.endereco.end_logradouro}</div>
                    </div>`;
            });
            
        });
}

const overlayTransacao = document.getElementById("overlay-transacoes");
const popupTransacao = document.getElementById("popup-transacoes");
const closeButtonTransacao = document.getElementById("fechar-transacao");

closeButtonTransacao.addEventListener("click", closeTransacaoPopup);
function closeTransacaoPopup() {
    overlayTransacao.style.display = "none";
    popupTransacao.style.display = "none";
}

function abrirModalTransacao() {
    overlayTransacao.style.display = "flex";
    popupTransacao.style.display = "block";
} 