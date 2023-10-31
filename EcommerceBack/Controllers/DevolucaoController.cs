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

        public IActionResult Devolucao(int ped_cal_cal_id, int ped_cal_ped_id, int quantidade)
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

            return View(listaDePedidosComCalcados);
        }

        [HttpPost]
        public ActionResult InserirMotivoDevolucao(int ped_cal_cal_id, int ped_cal_ped_id, string motivo)
        {
            try
            {
                PedidoDao.InserirMotivoDevolucao(ped_cal_cal_id, ped_cal_ped_id, motivo);
            }
            catch (Exception ex)
            {

            }

            return Ok();
        }
    }
}
