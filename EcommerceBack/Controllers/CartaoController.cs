using EcommerceBack.Data;
using EcommerceBack.Models;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceBack.Controllers
{
    public class CartaoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult PostCartao(Cartao cartao)
        {
            
            try
            {
                cartao.car_ban_id = (int)CartaoDao.InserirBandeira(cartao.Bandeira);
                cartao.car_id = (int)CartaoDao.InserirCartao(cartao);

                CartaoDao.InserirCartaoCliente(cartao.car_id, cartao.ClienteId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

    }
}
