using EcommerceBack.Data;
using EcommerceBack.Models;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceBack.Controllers
{
    public class StatusPedidoClienteController : Controller
    {

        private readonly ILogger<StatusPedidoClienteController> _logger;


        public StatusPedidoClienteController(ILogger<StatusPedidoClienteController> logger)
        {
            _logger = logger;
        }
        public IActionResult StatusPedidoCliente (int ped_cal_ped_id)
        {
            List<PedidosCalcados> listaDePedidosComCalcados;

            try
            {
                listaDePedidosComCalcados = PedidoDao.consultarPedidoStatusCliente(ped_cal_ped_id);
            }
            catch (Exception ex)
            {
                listaDePedidosComCalcados = new List<PedidosCalcados>();
            }
            return View(listaDePedidosComCalcados);
        }
    }
    
}
