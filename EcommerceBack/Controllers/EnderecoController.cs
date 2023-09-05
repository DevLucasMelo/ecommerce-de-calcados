using EcommerceBack.Data;
using EcommerceBack.Models;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceBack.Controllers
{
    public class EnderecoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult PostEndereco(Endereco endereco) 
        {
            long idEnd = 0;
            long idCid = 0;
            long idEst = 0;
            long idPais = 0;
            try
            {
                endereco.end_cid_id = (int)EnderecoDao.InserirCidade(endereco.cidade);
                endereco.end_est_id = (int)EnderecoDao.InserirEstado(endereco.estado);
                endereco.end_pais_id = (int)EnderecoDao.InserirPais(endereco.pais);

                idEnd = EnderecoDao.InserirEndereco(endereco);
                EnderecoDao.InserirEnderecoCliente(idEnd, endereco.ClienteId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

    }
}
