using Microsoft.AspNetCore.Mvc;

namespace EcommerceBack.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }
    }
}
