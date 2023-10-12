using EcommerceBack.Data;
using EcommerceBack.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;


namespace EcommerceBack.Controllers
{
    public class StatusPedidoClienteController : Controller
    {

        private readonly ILogger<StatusPedidoClienteController> _logger;


        public StatusPedidoClienteController(ILogger<StatusPedidoClienteController> logger)
        {
            _logger = logger;
        }
        public IActionResult StatusPedidoCliente(int ped_cal_ped_id)
        {
            List<PedidosCalcados> listaDePedidosComCalcados;

            ped_cal_ped_id = 1;
            try
            {
                listaDePedidosComCalcados = PedidoDao.consultarPedidoStatusCliente(ped_cal_ped_id);
                Console.WriteLine(listaDePedidosComCalcados);
            }
            catch (Exception ex)
            {
                listaDePedidosComCalcados = new List<PedidosCalcados>();
            }
            return View(listaDePedidosComCalcados);
        }
    }
    
}
