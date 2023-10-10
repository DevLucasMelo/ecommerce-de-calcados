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

        public static List<Endereco> SelecionarEnderecoIdCliente(int ClienteId)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $@"SELECT e.end_logradouro, e.end_cep, e.end_bairro, e.end_id
                                FROM enderecos e
                                INNER JOIN clientes_enderecos ce ON e.end_id = ce.cri_end_end_id
                                WHERE ce.cri_end_end_id = {ClienteId} ;";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    return sqlCon.Query<Endereco>(query).ToList();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static int SelecionarUmEnderecoIdCliente(int ClienteId)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $@"SELECT e.end_id
                                FROM enderecos e
                                INNER JOIN clientes_enderecos ce ON e.end_id = ce.cri_end_end_id
                                WHERE ce.cri_end_cli_id = {ClienteId} ;";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    return sqlCon.Query<int>(query).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static Cartao ConsultarSomenteEnderecoPoriD(int cartao)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $@"SELECT c.car_id, c.car_num, c.car_nome, c.car_cod_seguranca
                                FROM cartoes c
                                WHERE c.car_id = {cartao} ;";

            string query2 = $@"SELECT b.ban_id, b.ban_nome
                                FROM cartoes c
                                JOIN bandeiras b ON c.car_ban_id = b.ban_id
                                WHERE c.car_id = {cartao} ;";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var cartao1 = sqlCon.Query<Cartao>(query).FirstOrDefault();
                    var bandeira = sqlCon.Query<Bandeira>(query2).FirstOrDefault();
                    cartao1.Bandeira = bandeira;

                    return cartao1;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
