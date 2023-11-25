using EcommerceBack.Data;
using EcommerceBack.Models;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace EcommerceBack.Controllers
{
    public class DevolucaoController : Controller
    {

        private readonly ILogger<DevolucaoController> _logger;


        public DevolucaoController(ILogger<DevolucaoController> logger)
        {
            _logger = logger;
        }

        public IActionResult DevolucaoCalcado(int ped_cal_cal_id, int ped_cal_ped_id, int quantidade)
        {
            List<PedidosCalcados> listaDePedidosComCalcados;

            try
            {
                listaDePedidosComCalcados = PedidoDao.consultarCalcadoDevolucao(ped_cal_ped_id, ped_cal_cal_id);
            }
            catch (Exception ex)
            {
                listaDePedidosComCalcados = new List<PedidosCalcados>();
            }

            ViewBag.QuantidadeSelecionada = quantidade;
            ViewBag.TipoDevolucao = "Calcado";

            return View("Devolucao", listaDePedidosComCalcados);
        }

        public IActionResult DevolucaoPedido(int ped_cal_ped_id)
        {
            List<PedidosCalcados> listaDePedidosComCalcados;

            try
            {
                listaDePedidosComCalcados = PedidoDao.consultarPedidoDevolucao(ped_cal_ped_id);
            }
            catch (Exception ex)
            {
                listaDePedidosComCalcados = new List<PedidosCalcados>();
            }

            ViewBag.TipoDevolucao = "Pedido";

            return View("Devolucao", listaDePedidosComCalcados);
        }

        [HttpPost]
        public ActionResult InserirMotivoDevolucao(int ped_cal_cal_id, int ped_cal_ped_id, string motivo, string quantidadeSelecionada)
        {
            try
            {
                PedidoDao.InserirMotivoDevolucao(ped_cal_cal_id, ped_cal_ped_id, motivo, quantidadeSelecionada);
            }
            catch (Exception ex)
            {

            }

            return Ok();
        }

        [HttpPost]
        public ActionResult InserirMotivoDevolucaoPedido(int ped_cal_ped_id, string motivo)
        {
            Console.WriteLine("entrou");
            Console.WriteLine(ped_cal_ped_id);

            try
            {
                PedidoDao.InserirMotivoDevolucaoPedidos(ped_cal_ped_id, motivo);
            }
            catch (Exception ex)
            {

            }

            return Ok();
        }
    }
}
