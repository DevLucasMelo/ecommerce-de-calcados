using Microsoft.AspNetCore.Mvc;

namespace EcommerceBack.Controllers
{
    public class ProdutoController : Controller
    {

        public IActionResult Produto()
        {

            return View();
        }
    }
}
