using EcommerceBack.Data;
using EcommerceBack.Models;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceBack.Controllers
{
    public class ProdutoController : Controller
    {

        private readonly ILogger<ProdutoController> _logger;

        List<Calcados> _list;

        public ProdutoController(ILogger<ProdutoController> logger)
        {
            _logger = logger;
        }

        public IActionResult Produto(int cal_id)
        {

            List<Calcados> listaDeCalcados;
            List<Estoque> listaEstoque;

            try
            {
                listaDeCalcados = CalcadosDao.SelecionarCalcadosId(cal_id);
                listaEstoque = EstoqueDao.SelecionarEstoqueCalcadoId(cal_id);

            }
            catch (Exception ex)
            {
                listaDeCalcados = new List<Calcados>();
                listaEstoque = new List<Estoque>();
            }

            // Passe ambas as listas diretamente para a view
            ViewData["Calcados"] = listaDeCalcados;
            ViewData["Estoque"] = listaEstoque;

            return View();
        }

    }
}

