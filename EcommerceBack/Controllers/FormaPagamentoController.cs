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
            Console.WriteLine(pedido);
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

        [HttpPost]
        public IActionResult InserirPedidoCalcados(PedidosCalcados pedidoCalcado)
        {
            Console.WriteLine(pedidoCalcado);

            long id;
            try
            {
                PedidoDao.InserirPedidoCalcado(pedidoCalcado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpGet]
        public IActionResult ConsultarCupom(string cupomName)
        {
            try
            {
                var cupom = PedidoDao.consultarCupomByName(cupomName);
                return Json(cupom);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult InserirCupom(Cupom cupons)
        {
            try
            {
                foreach(var item in cupons.cupomList)
                {
                    PedidoDao.InserirCupom(item);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }
    }
}
