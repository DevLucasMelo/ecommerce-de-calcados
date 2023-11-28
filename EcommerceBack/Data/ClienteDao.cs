using Dapper;
using Dapper.Contrib.Extensions;
using EcommerceBack.Models;
using Npgsql;
using System.Globalization;

namespace EcommerceBack.Data
{
    public class ClienteDao : BaseDao
    {
        
        public static long InserirCliente(Cliente cliente)
        {
            string conn = config().GetConnectionString("Conn");

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    cliente.cli_dt_nascimento = cliente.cli_dt_nascimento.ToUniversalTime();
                    var id = sqlCon.Insert(cliente);
                    return id;
                }
            }
            catch(Exception ex)
            {
                return 0;
            }
        }

        public static bool UpdateCliente(Cliente cliente)
        {
            string conn = config().GetConnectionString("Conn");

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    cliente.cli_dt_nascimento = cliente.cli_dt_nascimento.ToUniversalTime();

                    return sqlCon.Update(cliente);
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public static void DeleteCliente(int id)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $"DELETE FROM clientes_cartoes WHERE cli_car_cli_id = {id}; \r\n" +
                $"DELETE FROM clientes_enderecos WHERE cri_end_cli_id = {id}; \r\n" +
                $"DELETE FROM clientes_enderecos WHERE cri_end_cli_id = {id}; \r\n" +
                $"DELETE FROM cartoes WHERE car_id NOT IN (SELECT DISTINCT(cli_car_car_id) FROM clientes_cartoes); \r\n" +
                $"DELETE FROM enderecos WHERE end_id NOT IN (SELECT DISTINCT(cri_end_end_id) FROM clientes_enderecos);\r\n " +
                $"DELETE FROM clientes WHERE cli_id = {id}; \r\n ";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    sqlCon.Execute(query);
                }
            }
            catch (Exception ex)
            {
                
            }
        }

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



        public static List<Cliente> ConsultarClientes(string termoPesquisa)
        {
            string conn = config().GetConnectionString("Conn");

            if (string.IsNullOrWhiteSpace(termoPesquisa))
            {
                return new List<Cliente>();
            }
            string query = $@"SELECT cli_id, cli_nome, cli_dt_nascimento, cli_email, cli_cpf, cli_gen_id, tip_tel_id, cli_status 
                  FROM clientes 
                  LEFT JOIN generos ON gen_id = cli_gen_id
                  LEFT JOIN tipos_telefones ON tip_tel_id = cli_tip_tel_id
                  WHERE cli_nome ILIKE '%{termoPesquisa}%' OR 
                  TO_CHAR(cli_dt_nascimento, 'YYYY-MM-DD') ILIKE '%{termoPesquisa}%' OR 
                  cli_email ILIKE '%{termoPesquisa}%' OR 
                  cli_cpf ILIKE '%{termoPesquisa}%' OR 
                  gen_nome ILIKE '%{termoPesquisa}%' OR 
                  tip_tel_nome ILIKE '%{termoPesquisa}%' OR 
                  (cli_status = true AND '{termoPesquisa}' ILIKE 'Ativo') OR 
                  (cli_status = false AND '{termoPesquisa}' ILIKE 'Inativo')";

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
                throw;
            }
        }
        public static bool UpdateStatus(int cli_id)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $"update clientes set cli_status = false where cli_id = {cli_id}";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    sqlCon.Execute(query);
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public static List<Cupom> consultarCupomById(int clienteID)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $@"select * from cupons where cup_cli_id = {clienteID}";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var cupom = sqlCon.Query<Cupom>(query).ToList();
                    return cupom;
                }
            }
            catch (Exception ex)
            {
                return new List<Cupom>();
            }
        }
    }
}
