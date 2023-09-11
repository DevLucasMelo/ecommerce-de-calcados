using EcommerceBack.Models;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceBack.Controllers
{

    public class PaginaInicialController : Controller
    {
        private readonly ILogger<PaginaInicialController> _logger;

        public PaginaInicialController(ILogger<PaginaInicialController> logger)
        {
            _logger = logger;
        }

        public IActionResult PaginaInicial()
        {
            return View("PaginaInicial/PaginaInicial.cshtml");
        }
    }
}
