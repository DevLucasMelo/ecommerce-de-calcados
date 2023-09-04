

const overlayCupom = document.getElementById("overlay-cliente");
const popupCupom = document.getElementById("popup-cliente");
const closeButtonCupom = document.getElementById("fechar-cliente");
const addCupomButton = document.getElementById("meuBotaocliente");
const confirmarBotao = document.getElementById("confirmar-cliente");
const modalSuccess = document.getElementById("modalSuccess");
const modalError = document.getElementById("modalError");

function recarregarPagina() {
    Location.reload();
}

function editCartao(cartaoId) {
    const clientRow = document.getElementById(`cartaoRow_${cartaoId}`);
    fillEditModal(clientRow);
    clientRow.remove();
    openCupomPopup(); // Abrir o modal de edição
}

function deleteCartao(cartaoId) {
    const cartaoRow = document.getElementById(`clientRow_${cartaoId}`);
    cartaoRow.remove(); // Remove a linha do cliente do grid
}

function fillEditModalCartao(cartao) {
    const cols = cartao.querySelectorAll('.col');
    const numero = cols[0].textContent;
    const validade = cols[1].textContent;
    const cvv = cols[2].textContent;
    const titular = cols[3].textContent;
    const cpf = cols[4].textContent;

    // Preencher os campos do modal de edição
    document.getElementById('numeroCartao').value = numero;
    document.getElementById('validade').value = validade;
    document.getElementById('cvv').value = cvv;
    document.getElementById('titular').value = titular;
    document.getElementById('cpf').value = cpf;
}

function editClient(clientId) {
    fillEditModal(clientId);
    
    openCupomPopup(); // Abrir o modal de edição



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
            console.log(status)
        }
    });
    location.reload();
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
    const genero = clienteObjeto.cli_genero;
    const status_cliente = clienteObjeto.cli_status;

    // Preencher os campos do modal de edição
    document.getElementById('clientEditId').value = id;
    document.getElementById('nomeCliente').value = nome;
    document.getElementById('dataNascimento').value = dataNascimento;
    document.getElementById('emailCliente').value = email;
    document.getElementById('cpfCliente').value = cpf;
    document.getElementById('statusCliente').checked = status_cliente;
    document.getElementById('genero').value = genero;
    document.getElementById('telefone').value = telefone;
}

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
    const addClienteCartao = document.getElementById("botaoModalCartao");
    const closeButtonCartao = document.getElementById("fechar-cartao");
    const overlay = document.getElementById("overlay-cartao");
    const popup = document.getElementById("popup-cartao");
    const closeButton = document.getElementById("fechar");
    const confirmarCatao = document.getElementById("confirmar-cartao");
    const overlayCupom = document.getElementById("overlay-cliente");
    const popupCupom = document.getElementById("popup-cliente");


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

    // Abrir o modal de cupom ao clicar no botão "Adicionar cupom de troca"
    addClienteCartao.addEventListener("click", function (event) {
        openCartaoPopup();
        event.preventDefault();
    });

    // Fechar o modal de cupom ao clicar no botão Fechar
    closeButtonCartao.addEventListener("click", closeCartaoPopup);

    const closeButtonCartao1 = document.querySelectorAll(".modal .close-button-cartao");
    closeButtonCartao1.forEach(function (button) {
        button.addEventListener("click", function () {
            modalSuccess.style.display = "none";
            modalError.style.display = "none";
        });
    });

    confirmarCatao.addEventListener("click", function (event) {
        event.preventDefault();
        const numeroCartao = document.getElementById("numeroCartao").value;
        const validade = document.getElementById("validade").value;
        const cvv = document.getElementById("cvv").value;
        const titular = document.getElementById("titular").value;
        const cpfTitular = document.getElementById("cpf").value;


        event.preventDefault();



        if (numeroCartao === "" || validade === "" || cvv === "" || titular === "" || cpfTitular === "" || telefone === "") {
            // Exibir modal de erro
            modalError.style.display = "block";
        } else {
            // Exibir modal de sucesso
            //modalSuccess.style.display = "block";
            //closeCupomPopup();
            event.preventDefault();
            // Adicionar o cliente ao grid
            const cartaoGrid = document.getElementById("cartoesGrid");
            const newRow = document.createElement("div");
            const cartaoId = generateCartaoId(); // Função para gerar um ID único
            newRow.setAttribute("id", `cartaoRow_${cartaoId}`); // Definir o ID da linha
            newRow.classList.add("row");
            newRow.innerHTML = `
                <div class="col">${numeroCartao}</div>
                <div class="col">${validade}</div>
                <div class="col">${cvv}</div>
                <div class="col">${titular}</div>
                <div class="col">${cpfTitular}</div>
                <div class="col">
                    <button class="btn btn-primary btn-sm" onclick="editCartao('${cartaoId}')">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteCartao('${cartaoId}')">Excluir</button>
                </div>
            `;
            cartaoGrid.appendChild(newRow);

            // Limpar os campos do formulário
            document.getElementById("numeroCartao").value = "";
            document.getElementById("validade").value = "";
            document.getElementById("cvv").value = "";
            document.getElementById("titular").value = "";
            document.getElementById("cpf").value = "";
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
        const genero = document.getElementById("genero").value;
        var id;

        var cliente = {
            cli_nome: nomeCliente,
            cli_dt_nascimento: dataNascimento,
            cli_genero: genero,
            cli_cpf: cpfCliente,
            cli_status: statusCliente,
            cli_telefone: telefone,
            cli_email: emailCliente,
        };

        
        if (nomeCliente === "" || dataNascimento === "" || emailCliente === "" || cpfCliente === "" || telefone === "" || genero === "") {
            // Exibir modal de erro
            modalError.style.display = "block";
        } else {

            if (Number.isInteger(parseInt(clienteId)))
            {
                id = clienteId;
                
                closeCupomPopup();

                var cliente = {
                    cli_id: id,
                    cli_nome: nomeCliente,
                    cli_dt_nascimento: dataNascimento,
                    cli_genero: genero,
                    cli_cpf: cpfCliente,
                    cli_status: statusCliente,
                    cli_telefone: telefone,
                    cli_email: emailCliente,
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

                $.ajax({
                    type: "GET",
                    url: "/Cliente/Cliente",
                });
                
            }
            else
            {
                closeCupomPopup();

                event.preventDefault();

                id;

                $.ajax({
                    type: "POST",
                    url: "/Cliente/PostCliente",
                    dataType: "json",
                    data: cliente,
                    async: false,
                    success: function (result) {
                    },
                    error: function (status) {
                        console.log(status)
                    }
                });
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
            resultadoPesquisa.innerHTML = ''; // Limpe os resultados anteriores.

            data.forEach(cliente => {
                resultadoPesquisa.innerHTML += `
                    <div class="row">
                        <div class="col">${cliente.cli_nome}</div>
                        <div class="col">${cliente.cli_dt_nascimento}</div>
                        <div class="col">${cliente.cli_email}</div>
                        <div class="col">${cliente.cli_cpf}</div>
                        <div class="col">${cliente.cli_genero}</div>
                        <div class="col" id="status-cliente-${cliente.cli_id}">${cliente.cli_status}</div>
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
        method: "POST", // Você pode usar POST ou outro método apropriado
    })
        .then(response => response.json())
        .then(data => {
            // Verifique se a operação foi bem-sucedida no servidor
            if (data.success) {
                // Atualize o frontend para exibir "Inativo" no lugar de "Ativo" (ou atualize a lista de clientes)
                const elementoStatus = document.getElementById(`status-cliente-${cliId}`);
                if (elementoStatus) {
                    elementoStatus.textContent = "Inativo";
                }
                // Outras atualizações de interface do usuário, se necessário
            } else {
                alert("Não foi possível inativar o cliente. Tente novamente mais tarde.");
            }
        })
        .catch(error => {
            console.error("Erro ao processar a solicitação:", error);
        });
  
}

function formatarCPF() {
    // Obtém o valor atual do campo de entrada
    let cpf = document.getElementById("cpfCliente").value;

    // Remove todos os caracteres não numéricos do CPF
    cpf = cpf.replace(/\D/g, "");

    // Formata o CPF com pontos e traço
    if (cpf.length >= 3 && cpf.length < 6) {
        cpf = cpf.replace(/(\d{3})/, "$1.");
    } else if (cpf.length >= 6 && cpf.length < 9) {
        cpf = cpf.replace(/(\d{3})(\d{3})/, "$1.$2.");
    } else if (cpf.length >= 9) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3-");
    }

    if (cpf.length > 14) {
        cpf = cpf.substring(0, 14);
    }

    // Define o valor formatado de volta no campo de entrada
    document.getElementById("cpfCliente").value = cpf;
}


document.getElementById("cpfCliente").addEventListener("input", formatarCPF);