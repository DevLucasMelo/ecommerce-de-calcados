using Microsoft.AspNetCore.Mvc;

namespace EcommerceBack.Controllers
{
    public class PainelAdministradorController : Controller
    {
        public IActionResult PainelAdministrador()
        {
            return View();
        }
    }
}
