using Microsoft.AspNetCore.Mvc;

namespace EcommerceBack.Controllers
{
    public class PainelAdministradorController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
