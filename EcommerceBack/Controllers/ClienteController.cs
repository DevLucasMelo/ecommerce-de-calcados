using EcommerceBack.Data;
using EcommerceBack.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace EcommerceBack.Controllers
{
    public class ClienteController : Controller
    {
        private readonly ILogger<ClienteController> _logger;

        List<Cliente> _list;

        public ClienteController(ILogger<ClienteController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Cliente()
        {
            Cliente cliente = new Cliente();

            try
            {
                _list = DaoCliente.SelecionarClientes();
                cliente.clientes = _list;
            }
            catch (Exception ex)
            {

            }

            return View(cliente);
        }

        [HttpPost]
        public IActionResult PostCliente(Cliente cliente)
        {
            long id = 0;
            try
            {
                id = DaoCliente.InserirCliente(cliente);
            }
            catch(Exception ex) 
            {

            }

            return RedirectToAction("Cliente");
        }

        [HttpPut]
        public IActionResult PutCliente(Cliente cliente)
        {
            try
            {
                bool result = DaoCliente.UpdateCliente(cliente);
                return Ok();
            }
            catch(Exception ex)
            {

            }

            return RedirectToAction("Cliente");
        }

        [HttpGet]
        public IActionResult SelecionarClienteId(int id)
        {
            Cliente cliente = new Cliente();
            string json;
            try
            {
                cliente = DaoCliente.SelecionarClienteId(id);
                json = JsonConvert.SerializeObject(cliente);
                return Ok(json);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public IActionResult ConsultarClientes(string termoPesquisa)
        {
            // Chame o método no DAOCliente que executa a pesquisa e retorna os resultados.
            List<Cliente> clientesEncontrados = DaoCliente.ConsultarClientes(termoPesquisa);

            // Retorne os resultados para a visualização (por exemplo, como JSON).
            return Json(clientesEncontrados);
        }

        [HttpDelete]
        public IActionResult DeletarClienteId(int id)
        {
            try
            {
                DaoCliente.DeleteCliente(id);
                return Ok();
            }
            catch
            {
                return BadRequest("Erro ao deletar cliente");
            }
        }
    }
}
