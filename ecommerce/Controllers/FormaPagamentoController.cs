using EcommerceBack.Data;
using EcommerceBack.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

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

                PedidoDao.InserirTransacoes(pedido);

                int qtdCartoes = pedido.CartaoList.Count;
                decimal valorCartoes = pedido.ped_valor_total / qtdCartoes;

                foreach (var item in pedido.CartaoList)
                {
                    if(item.car_id == 0)
                    {
                        item.car_ban_id = (int)CartaoDao.InserirBandeira(item.Bandeira);
                        item.car_id = (int)CartaoDao.InserirCartao(item);

                        CartaoDao.InserirCartaoCliente(item.car_id, pedido.ped_cli_id);
                    }
                    PedidoDao.InserirCartao(item, id, valorCartoes);
                }

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
            long id;
            try
            {
                PedidoDao.InserirPedidoCalcado(pedidoCalcado);

                PedidoDao.BaixarEstoque(pedidoCalcado);
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
                    PedidoDao.StatusCupom(item);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpPost]
        public IActionResult gerarCupomPedido(decimal valorTroca, int cliId)
        {
            try
            {
                var nomeCupom = string.Empty;
                
                nomeCupom = PedidoDao.incluirCupomTrocaAprovada(valorTroca, cliId);

                return Json(nomeCupom);
            }
            catch (Exception ex)
            {

            }
            return Ok();
        }
    }
}
