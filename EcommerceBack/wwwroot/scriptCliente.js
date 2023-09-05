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
const overlayCartao = document.getElementById("overlay-cartao");
const popupCartao = document.getElementById("popup-cartao");
const closeButtonCartao = document.getElementById("fechar-cartao");



addCupomButton.addEventListener("click", openCupomPopup);

closeButtonCartao.addEventListener("click", closeCartaoPopup);

function openCartaoPopup() {
    overlayCartao.style.display = "flex";
    popupCartao.style.display = "block";
}

function closeCartaoPopup() {
    overlayCartao.style.display = "none";
    popupCartao.style.display = "none";
}


function gerenciarCartoes(clienteId) {
    openCartaoPopup();
    selecionarCartao(clienteId);
    var clienteId = clienteId.toString();

    document.getElementById('clientCartaoId').value = clienteId;
}

function recarregarPagina() {
    Location.reload();
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
                        <div class="col">${cliente.cli_dt_nascimento}</div>
                        <div class="col">${cliente.cli_email}</div>
                        <div class="col">${cliente.cli_cpf}</div>
                        <div class="col">${genero}</div>
                        <div class="col" id="status-cliente-${cliente.cli_id}">${status}</div>
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
}

function deleteCartao(cartaoId) {
    const cartaoRow = document.getElementById(`clientRow_${cartaoId}`);
    cartaoRow.remove(); // Remove a linha do cliente do grid
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
    document.getElementById('bandeiraCartaoId').value = cartaoObjeto.car_id;
    document.getElementById('clientCartaoId').value = cartaoObjeto.bandeira.ban_id;
    document.getElementById('numeroCartao1').value = cartaoObjeto.car_num;
    document.getElementById('cvv1').value = cartaoObjeto.car_cod_seguranca;
    document.getElementById('titular1').value = cartaoObjeto.car_nome;
    document.getElementById('bandeira1').value = cartaoObjeto.bandeira.ban_nome;
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
    var addClienteCartao = document.getElementById("gerenciar-cartoes");

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

    /*popupCupom.addEventListener("click", function(event) {
        event.stopPropagation();
    });

    popup.addEventListener("click", function(event) {
        event.stopPropagation();
    });*/

    addClienteCartao.addEventListener("click", openCupomPopup);

    // Fechar o modal de cupom ao clicar no botão Fechar
    closeButtonCartao.addEventListener("click", closeCupomPopup);

    // Abrir o modal de cupom ao clicar no botão "Adicionar cupom de troca"
    addClienteCartao.addEventListener("click", function (event) {
        openCartaoPopup();
        event.preventDefault();
    });

    // Fechar o modal de cupom ao clicar no botão Fechar
    //closeButtonCartao.addEventListener("click", closeCartaoPopup);


    confirmarCartao.addEventListener("click", function (event) {
        event.preventDefault();
        var bandeiraId = document.getElementById("bandeiraCartaoId").value;
        var clienteId = document.getElementById("clientEditId").value;
        const numeroCartao = document.getElementById("numeroCartao1").value;
        const cvv = document.getElementById("cvv1").value;
        const titular = document.getElementById("titular1").value;
        const bandeira = document.getElementById("bandeira1").value;


        event.preventDefault();



        if (numeroCartao === "" || validade === "" || cvv === "" || titular === "" || cpfTitular === "" || telefone === "") {
            // Exibir modal de erro
            
        } else {

            if (Number.isInteger(parseInt(clienteId))) {

                var cartao = {
                    car_num: numeroCartao,
                    car_nome: titular,
                    car_cod_seguranca: cvv,
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
                        alert(status.toString());
                    }
                });

                selecionarCartao(parseInt(clienteId));
            }


            event.preventDefault();
            
            // Limpar os campos do formulário
            document.getElementById("numeroCartao").value = "";
            document.getElementById("cvv").value = "";
            document.getElementById("titular").value = "";
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
                                alert(status.toString());
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
                                alert(status.toString());
                            }
                        });
                    },
                    error: function (status) {
                        alert(status.toString());
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
                        <div class="col">${cliente.cli_dt_nascimento}</div>
                        <div class="col">${cliente.cli_email}</div>
                        <div class="col">${cliente.cli_cpf}</div>
                        <div class="col">${genero}</div>
                        <div class="col" id="status-cliente-${cliente.cli_id}">${status}</div>
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
    fetch(`/Cliente/inativar-cliente?id=${cliId}`, {
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