using Microsoft.AspNetCore.Mvc;

namespace EcommerceBack.Controllers
{
    public class FormaPagamentoController : Controller
    {
        public IActionResult FormaPagamento()
        {
            return View();
        }
    }
}
