using EcommerceBack.Data;
using EcommerceBack.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace EcommerceBack.Controllers
{
    public class AnaliseVendasController : Controller
    {
        private readonly ILogger<AnaliseVendasController> _logger;

        List<Transacoes> _list;

        public AnaliseVendasController(ILogger<AnaliseVendasController> logger)
        {
            _logger = logger;
        }
        public IActionResult AnaliseVendas()
        {
            return View();
        }

        [HttpGet]
        public IActionResult ObterDadosAnaliseVendas(string dataInicio, string dataFim)
        {
            try
            {
                List<Transacoes> listaAnaliseVendas = TransacoesDao.consultarTransacoes(dataInicio, dataFim);
                return Json(listaAnaliseVendas);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao obter dados de análise de vendas: {ex.Message}");
                return StatusCode(500, "Erro ao processar a solicitação.");
            }
        }
    }
}
