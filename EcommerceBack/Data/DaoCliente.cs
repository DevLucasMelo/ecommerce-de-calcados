using Dapper;
using Dapper.Contrib.Extensions;
using EcommerceBack.Models;
using Npgsql;
using System.Data;

namespace EcommerceBack.Data
{
    public class DaoCliente
    {
        private static IConfiguration config()
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                        .AddJsonFile("appsettings.json", optional: true)
                        .Build();

            return configuration;
        }

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
            string query = $"delete from clientes where cli_id = {id}";
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
            string query = "select * from clientes order by cli_id asc";
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
            string query = $@"SELECT * FROM clientes WHERE cli_nome ILIKE '%{termoPesquisa}%'";

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
                // Lide com exceções aqui, se necessário.
                throw;
            }
        }
    }
}
