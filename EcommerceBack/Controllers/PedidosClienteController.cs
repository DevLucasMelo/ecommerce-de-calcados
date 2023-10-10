using EcommerceBack.Data;
using EcommerceBack.Models;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceBack.Controllers
{
    public class PedidosClienteController : Controller
    {

        private readonly ILogger<PedidosClienteController> _logger;

        List<Pedido> _list;

        public PedidosClienteController(ILogger<PedidosClienteController> logger)
        {
            _logger = logger;
        }

        public IActionResult PedidosCliente()
        {
            List<PedidoCalcados> listaDePedidosComCalcados;

            try
            {
                listaDePedidosComCalcados = PedidoDao.consultarPedidosClienteComCalcados();
                Console.WriteLine(listaDePedidosComCalcados);
            }
            catch (Exception ex)
            {
                listaDePedidosComCalcados = new List<PedidoCalcados>();
            }
            return View(listaDePedidosComCalcados);
        }
    }
}
