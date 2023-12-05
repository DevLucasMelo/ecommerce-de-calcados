function carregarCupons() {
    fetch(`/ConsultarCupom/ConsultarCupomById?clienteId=${1}`, { async: false })
        .then(response => response.json())
        .then(data => {
            var resultadoPesquisa = document.getElementById('resultadoPesquisa');
            resultadoPesquisa.innerHTML = '';

            data.forEach(cupom => {
                var ativo;
                if (cupom.cup_ativo) {
                    ativo = 'SIM';
                } else {
                    ativo = 'NÃO';
                }

                
                resultadoPesquisa.innerHTML += `
                    <div class="row">
                        <div class="col">${cupom.cup_nome}</div>
                        <div class="col">${cupom.cup_valor}</div>
                        <div class="col">${ativo}</div>
                    </div>`;
            });
        });
}