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
                _list = ClienteDao.SelecionarClientes();
                cliente.clientes = _list;
            }
            catch (Exception ex)
            {

            }

            return View(cliente);
        }

        [HttpGet]
        public IActionResult ConsultarTodosClientes()
        {
            Cliente cliente = new Cliente();

            try
            {
                _list = ClienteDao.SelecionarClientes();
            }
            catch (Exception ex)
            {

            }


            return Json(_list);
        }


        [HttpPost]
        public IActionResult PostCliente(Cliente cliente)
        {
            long id = 0;
            try
            {
                id = ClienteDao.InserirCliente(cliente);
            }
            catch(Exception ex) 
            {

            }

            return Ok(id);
        }

        [HttpPut]
        public IActionResult PutCliente(Cliente cliente)
        {
            try
            {
                bool result = ClienteDao.UpdateCliente(cliente);
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
                cliente = ClienteDao.SelecionarClienteId(id);
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
            List<Cliente> clientesEncontrados = ClienteDao.ConsultarClientes(termoPesquisa);

            return Json(clientesEncontrados);
        }

        [HttpDelete]
        public IActionResult DeletarClienteId(int id)
        {
            try
            {
                ClienteDao.DeleteCliente(id);
                return Ok();
            }
            catch
            {
                return BadRequest("Erro ao deletar cliente");
            }
        }

        [HttpPost]
        public IActionResult InativarCliente(int id)
        {

            try
            {
                DaoCliente.UpdateStatus(id);
                return Ok();
            }
            catch
            {
                return BadRequest("Erro ao inativar cliente");
            }
        }
    }
    
}
