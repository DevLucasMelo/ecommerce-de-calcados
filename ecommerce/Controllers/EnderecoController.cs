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

        [HttpPut]
        public IActionResult PutEndereco(Endereco endereco)
        {
            bool atualizado;

            try
            {
                atualizado = EnderecoDao.UpdateCidade(endereco.cidade);
                atualizado = EnderecoDao.UpdateEstado(endereco.estado);
                atualizado = EnderecoDao.UpdatePais(endereco.pais);

                endereco.end_cid_id = endereco.cidade.cid_id;
                endereco.end_est_id = endereco.estado.est_id;
                endereco.end_pais_id = endereco.pais.pais_id;

                atualizado = EnderecoDao.UpdateEndereco(endereco);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpPost]
        public IActionResult PostEnderecoRetornoId(Endereco endereco)
        {
            long idEnd = 0;
            long idCid = 0;
            long idEst = 0;
            long idPais = 0;
            try
            {

                endereco.end_cobranca = true;
                endereco.end_entrega = true;
                endereco.end_cid_id = (int)EnderecoDao.InserirCidade(endereco.cidade);
                endereco.end_est_id = (int)EnderecoDao.InserirEstado(endereco.estado);
                endereco.end_pais_id = (int)EnderecoDao.InserirPais(endereco.pais);

                idEnd = EnderecoDao.InserirEndereco(endereco);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(idEnd);
        }

        [HttpGet]
        public IActionResult SelecionarEnderecoPoriD(int clienteId)
        {
            try
            {
                var aqui = EnderecoDao.SelecionarEnderecoIdCliente(clienteId);

                return Json(aqui);
            }
            catch
            {
                return BadRequest("Erro");
            }
        }

        [HttpGet]
        public IActionResult ConsultarSomenteEnderecoPoriD(int enderecoId)
        {
            try
            {
                var cartao = CartaoDao.ConsultarSomenteCartaoPoriD(enderecoId);

                return Json(cartao);
            }
            catch
            {
                return BadRequest("Erro");
            }
        }

        [HttpGet]
        public IActionResult SelecionarUmEnderecoIdCliente(int clienteId)
        {
            try
            {
                var id = EnderecoDao.SelecionarUmEnderecoIdCliente(clienteId);

                return Json(id);
            }
            catch
            {
                return BadRequest("Erro");
            }
        }

        [HttpDelete]
        public IActionResult DeleteEndereco(int enderecoId)
        {
            try
            {
                EnderecoDao.DeleteEndereco(enderecoId);
                return Ok();
            }
            catch
            {
                return BadRequest("Erro");
            }
        }

    }
}
