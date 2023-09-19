using EcommerceBack.Data;
using EcommerceBack.Models;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceBack.Controllers
{
    public class FormaPagamentoController : Controller
    {
        public IActionResult FormaPagamento()
        {
            return View();
        }


        [HttpPost]
        public IActionResult InserirPedido(Pedido pedido)
        {
            long id;
            try
            {
                id = PedidoDao.InserirPedido(pedido);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
            return Ok(id);
        }
    }
}
