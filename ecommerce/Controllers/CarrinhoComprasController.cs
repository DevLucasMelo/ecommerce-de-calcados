using EcommerceBack.Data;
using EcommerceBack.Models;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceBack.Controllers
{
    public class CarrinhoComprasController : Controller
    {

        private readonly ILogger<CarrinhoComprasController> _logger;

        List<Calcados> _list;

        public CarrinhoComprasController(ILogger<CarrinhoComprasController> logger)
        {
            _logger = logger;
        }

        public IActionResult CarrinhoCompras(int cal_id)
        {
            
            List<Calcados> listaDeCalcados;

            try
            {
                listaDeCalcados = CalcadosDao.SelecionarCalcadosId(cal_id);

            }
            catch (Exception ex)
            {
                listaDeCalcados = new List<Calcados>();
            }

            return View(listaDeCalcados);
        }

    }
}

