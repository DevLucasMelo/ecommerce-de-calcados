using Dapper;
using Dapper.Contrib.Extensions;
using EcommerceBack.Models;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace EcommerceBack.Data
{
    public class CalcadosDao : BaseDao
    {
     
        public static List<Cliente> SelecionarClientes()
        {
            string conn = config().GetConnectionString("Conn");
            string query = "SELECT cli_id, cli_nome, cli_dt_nascimento, cli_email, cli_cpf, cli_gen_id, cli_tip_tel_id, cli_status FROM clientes LEFT JOIN generos ON gen_id = cli_gen_id order by cli_id asc";
            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var clientes = sqlCon.Query<Cliente>(query).ToList();
                    return clientes;
                }
            }
            catch (Exception ex)
            {
                return new List<Cliente>();
            }
        }

        public static Cliente SelecionarClienteId(int id)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $"select * from clientes where cli_id = {id}";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var cliente = sqlCon.Query<Cliente>(query).FirstOrDefault();
                    return cliente;
                }
            }
            catch (Exception ex)
            {
                return new Cliente();
            }
        }



        public List<Calcados> ConsultarCalcados(string termoPesquisa)
        {
            string conn = config().GetConnectionString("Conn");

            if (string.IsNullOrWhiteSpace(termoPesquisa))
            {
                return new List<Calcados>();
            }

            string query = $@"SELECT * FROM calcados
                          WHERE cal_marca ILIKE '%{termoPesquisa}%' OR 
                                cal_modelo ILIKE '%{termoPesquisa}%' OR 
                                cal_titulo ILIKE '%{termoPesquisa}%' OR 
                                cal_cor ILIKE '%{termoPesquisa}%' OR 
                                cal_tamanho ILIKE '%{termoPesquisa}%' OR 
                                cal_comprimento ILIKE '%{termoPesquisa}%' OR 
                                cal_largura ILIKE '%{termoPesquisa}%' OR 
                                cal_grup_precifi ILIKE '%{termoPesquisa}%' OR 
                                cal_cod_barras ILIKE '%{termoPesquisa}%' OR 
                                (cal_autorizacao_margem = true AND '{termoPesquisa}' ILIKE 'True') OR 
                                (cal_autorizacao_margem = false AND '{termoPesquisa}' ILIKE 'False')";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var calcados = sqlCon.Query<Calcados>(query).ToList();

                    return calcados;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
