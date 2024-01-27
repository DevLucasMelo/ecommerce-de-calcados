using EcommerceBack.Data;
using EcommerceBack.Models;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceBack.Controllers
{

    public class PaginaInicialController : Controller
    {
        private readonly ILogger<PaginaInicialController> _logger;

        List<Calcados> _list;

        public PaginaInicialController(ILogger<PaginaInicialController> logger)
        {
            _logger = logger;
        }

        public IActionResult PaginaInicial()
        {
            List<Calcados> listaDeCalcados;

            try
            {
                listaDeCalcados = CalcadosDao.SelecionarCalcados();
            }
            catch (Exception ex)
            {
                // Lidar com exceções, se necessário.
                listaDeCalcados = new List<Calcados>(); // Pode definir uma lista vazia ou tratar a exceção de outra forma.
            }

            return View(listaDeCalcados);
        }
    }
}
