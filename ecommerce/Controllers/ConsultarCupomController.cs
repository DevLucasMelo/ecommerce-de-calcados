using EcommerceBack.Data;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceBack.Controllers
{
    public class ConsultarCupomController : Controller
    {
        public IActionResult ConsultarCupomById(int clienteId)
        {
            try
            {
                var cupom = ClienteDao.consultarCupomById(clienteId);
                return Json(cupom);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public IActionResult ConsultarCupom()
        {
            return View();
        }
    }
}
