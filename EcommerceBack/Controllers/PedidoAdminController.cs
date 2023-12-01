using EcommerceBack.Data;
using EcommerceBack.Models;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceBack.Controllers
{
    public class PedidoAdminController : Controller
    {
        public IActionResult PedidoAdmin()
        {
            return View();
        }

        [HttpGet]
        public IActionResult ConsultarPedidoAdmin(int pedidoId)
        {
            Pedido pedido = new Pedido();

            try
            {
                pedido = PedidoDao.ConsultarPedidoById(pedidoId);
                pedido.Cliente = ClienteDao.SelecionarClienteId(pedido.ped_cli_id);
                pedido.Endereco = EnderecoDao.SelecionarEnderecoById(pedido.ped_end_id);
                
            }
            catch (Exception ex)
            {
                return BadRequest("Erro ao trazer o pedido em questão: " + ex.Message);
            }

            return Json(pedido);
        }

        public IActionResult ConsultarPedidoCliente(int clienteId)
        {
            List<Pedido> pedido = new List<Pedido>();

            try
            {
                pedido = PedidoDao.ConsultarPedidoByClienteId(clienteId);

                foreach (var item in pedido)
                {
                    item.Cliente = ClienteDao.SelecionarClienteId(item.ped_cli_id);
                    item.Endereco = EnderecoDao.SelecionarEnderecoById(item.ped_end_id);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Erro ao trazer o pedido em questão: " + ex.Message);
            }

            return Json(pedido);
        }

        [HttpGet]
        public IActionResult ConsultarPreencherAdmin(int pedidoId)
        {
            Pedido pedido = new Pedido();

            try
            {
                pedido = PedidoDao.ConsultarPedidoById(pedidoId);
                pedido.Cliente = ClienteDao.SelecionarClienteId(pedido.ped_cli_id);
                pedido.Endereco = EnderecoDao.SelecionarEnderecoById(pedido.ped_end_id);
                pedido.Endereco.pais = EnderecoDao.SelecionarPaisById(pedido.Endereco.end_pais_id);
                pedido.Endereco.estado = EnderecoDao.SelecionarEstadoById(pedido.Endereco.end_est_id);
                pedido.Endereco.cidade = EnderecoDao.SelecionarCidadeById(pedido.Endereco.end_cid_id);
                pedido.PedidosCalcados = PedidoDao.ConsultarPedidosProdutosById(pedidoId);
            }
            catch (Exception ex)
            {
                return BadRequest("Erro ao trazer o pedido em questão: " + ex.Message);
            }

            return Json(pedido);
        }

        [HttpPost]
        public IActionResult atualizarStatusCompra(int statusId, int pedidoId)
        {
            try
            {
                var nomeCupom = string.Empty;
                decimal valorTroca = 0;

                if (statusId == 7)
                {
                    var pedido = PedidoDao.ConsultarPedidoById(pedidoId);
                    var listaCalcados = PedidoDao.consultarCalcadosDevolucao(pedidoId);

                    foreach (var item in listaCalcados)
                    {
                        if (item.sta_comp_fase == "TROCA SOLICITADA")
                        {
                            valorTroca += item.cal_valor * item.ped_cal_quant;
                        }
                    }
                    nomeCupom = PedidoDao.incluirCupomTrocaAprovada(valorTroca, pedido.ped_cli_id);
                }

                PedidoDao.atualizarStatusCompra(statusId, pedidoId);

                return Json(nomeCupom);
            }
            catch(Exception ex)
            {

            }
            return Ok();
        }
    }
}
