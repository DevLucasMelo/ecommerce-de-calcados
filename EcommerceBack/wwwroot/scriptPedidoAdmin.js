const botaoConfirmar = document.getElementById("confirmar");
const overlayPedido = document.getElementById("overlay-pedidoadmin");
const popupPedido = document.getElementById("popup-pedidoadmin");
const closeButtonPedido = document.getElementById("fechar-pedido");

closeButtonPedido.addEventListener("click", closeCupomPedidoPopup);
function closeCupomPedidoPopup() {
    overlayPedido.style.display = "none";
    popupPedido.style.display = "none";
}

function abrirModalPedido() { 
    overlayPedido.style.display = "flex";
    popupPedido.style.display = "block";
}

function preencherModalPedido(pedidoId) {
    var pedidoObjeto;
    $.ajax({
        type: "GET",
        url: "/PedidoAdmin/ConsultarPreencherAdmin",
        dataType: "json",
        data: { pedidoId: parseInt(pedidoId) },
        async: false,
        success: function (jsonResult) {
            pedidoObjeto = jsonResult;
        },
        error: function (status) {
            console.log(status)
        }
    });

    document.getElementById('pedidoId').value = pedidoId;

    var selectElementGenero = document.getElementById('faseCompra');
    selectElementGenero.value = pedidoObjeto.ped_sta_comp_id.toString();

    document.getElementById('valorTotal').value = pedidoObjeto.ped_valor_total;
    document.getElementById('valorProdutos').value = pedidoObjeto.ped_valor_produtos;

    document.getElementById('enderecoSimples').value = pedidoObjeto.endereco.end_logradouro + " " +
        pedidoObjeto.endereco.end_numero + ", " +
        pedidoObjeto.endereco.cidade.cid_nome + ", " +
        pedidoObjeto.endereco.estado.est_nome
        pedidoObjeto.endereco.pais.pais_nome + " - " + pedidoObjeto.endereco.end_cep;

    var resultadoPesquisa = document.getElementById('resultadoProdutos');
    resultadoPesquisa.innerHTML = '';
    pedidoObjeto.pedidosCalcados.forEach(data => {

        resultadoPesquisa.innerHTML += `
                    <div class="row">
                        <div class="col">${data.ped_cal_cal_id}</div>
                        <div class="col">${data.cal_marca + '' + data.cal_modelo}</div>
                        <div class="col">${data.ped_cal_tamanho}</div>
                        <div class="col">${data.ped_cal_quant}</div>
                    </div>`;
    });
}



function consultarPedido(pedidoId) {
    preencherModalPedido(pedidoId);
    abrirModalPedido();
}

document.getElementById('consultarPedidos').addEventListener('click', function () {
    var termoPesquisa = document.getElementById('termoPesquisa').value;

    if (!Number.isInteger(parseInt(termoPesquisa))) {
        alert('Insira um numero de pedido valido');
    }
    else {
        fetch(`/PedidoAdmin/ConsultarPedidoAdmin?pedidoId=${termoPesquisa}`)
            .then(response => response.json())
            .then(data => {
                var resultadoPesquisa = document.getElementById('resultadoPesquisa');
                resultadoPesquisa.innerHTML = '';

                resultadoPesquisa.innerHTML += `
                    <div class="row">
                        <div class="col">${data.ped_id}</div>
                        <div class="col">${data.cliente.cli_nome}</div>
                        <div class="col">${data.ped_valor_total}</div>
                        <div class="col">
                            <button class="btn btn-primary btn-sm" id="consultar-pedido" onclick="consultarPedido('${data.ped_id}')">Consultar</button>
                        </div>
                    </div>`;
            });
    }
});
botaoConfirmar.addEventListener("click", function () {

    var selectElementGenero = document.getElementById('faseCompra');
    var statusId = selectElementGenero.value;
    var pedidoId = document.getElementById('pedidoId').value;

    $.ajax({
        type: "POST",
        url: "/PedidoAdmin/atualizarStatusCompra",
        dataType: "json",
        data: {
            statusId: parseInt(statusId),
            pedidoId: parseInt(pedidoId)
        },
        async: false,
        success: function (jsonResult) {
            
        },
        error: function (status) {
            console.log(status)
        }
    });

    closeCupomPedidoPopup();

});
