using Dapper;
using Dapper.Contrib.Extensions;
using EcommerceBack.Models;
using Npgsql;

namespace EcommerceBack.Data
{
    public class EnderecoDao : BaseDao
    {
        public static long InserirEndereco(Endereco endereco)
        {
            string conn = config().GetConnectionString("Conn");

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var id = sqlCon.Insert(endereco);
                    return id;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public static long InserirCidade(Cidade cidade)
        {
            string conn = config().GetConnectionString("Conn");

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var id = sqlCon.Insert(cidade);
                    return id;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public static long InserirEstado(Estado estado)
        {
            string conn = config().GetConnectionString("Conn");

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var id = sqlCon.Insert(estado);
                    return id;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public static long InserirPais(Pais pais)
        {
            string conn = config().GetConnectionString("Conn");

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var id = sqlCon.Insert(pais);
                    return id;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public static void InserirEnderecoCliente(long EnderecoId, int ClienteId)
        {
            string conn = config().GetConnectionString("Conn");
            string query = 
                $"insert into clientes_enderecos(cri_end_cli_id, cri_end_end_id) " +
                $"values ({ClienteId}, {EnderecoId})";
            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var id = sqlCon.Execute(query);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

    }
}
