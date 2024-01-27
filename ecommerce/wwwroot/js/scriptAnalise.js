var meuGrafico;

document.getElementById('analise-vendas').addEventListener('click', function () {
    var dataInicio = document.getElementById('data-inicio').value;
    var dataFim = document.getElementById('data-fim').value;

    fetch(`/AnaliseVendas/ObterDadosAnaliseVendas?dataInicio=${dataInicio}&dataFim=${dataFim}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição AJAX: ${response.statusText}`);
            }
            return response.json();
        })
        .then(transacoes => {
            var data = {
                labels: [],
                datasets: []
            };

            var marcas = {};

            transacoes.forEach(function (item) {
                if (!marcas[item.cal_marca]) {
                    marcas[item.cal_marca] = {
                        label: item.cal_marca,
                        data: [],
                        fill: false
                    };
                }

                marcas[item.cal_marca].data.push(item.valor_total);
                if (data.labels.indexOf(item.tra_data_hora) === -1) {
                    data.labels.push(item.tra_data_hora);
                }
            });

            for (var marca in marcas) {
                if (marcas.hasOwnProperty(marca)) {
                    data.datasets.push(marcas[marca]);
                }
            }

            var ctx = document.getElementById('meuGrafico').getContext('2d');

            if (meuGrafico instanceof Chart) {
                meuGrafico.destroy();
            }

            meuGrafico = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Valor Total'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error(error.message);
        });
});