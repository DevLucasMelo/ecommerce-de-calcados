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

        public static bool UpdateEndereco(Endereco endereco)
        {
            string conn = config().GetConnectionString("Conn");

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var id = sqlCon.Update(endereco);
                    return id;
                }
            }
            catch (Exception ex)
            {
                return false;
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

        public static bool UpdateCidade(Cidade cidade)
        {
            string conn = config().GetConnectionString("Conn");

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var id = sqlCon.Update(cidade);
                    return id;
                }
            }
            catch (Exception ex)
            {
                return false;
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

        public static bool UpdateEstado(Estado estado)
        {
            string conn = config().GetConnectionString("Conn");

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var id = sqlCon.Update(estado);
                    return id;
                }
            }
            catch (Exception ex)
            {
                return false;
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

        public static bool UpdatePais(Pais pais)
        {
            string conn = config().GetConnectionString("Conn");

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var id = sqlCon.Update(pais);
                    return id;
                }
            }
            catch (Exception ex)
            {
                return false;
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

        public static Endereco SelecionarEnderecoById(int enderecoId)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $@"SELECT e.end_logradouro, e.end_cep, e.end_bairro, e.end_id, 
                                e.end_numero, e.end_cid_id, e.end_pais_id, e.end_est_id, e.end_entrega, e.end_cobranca, e.end_tip_res_id, e.end_tip_log_id
                                FROM enderecos e
                                WHERE e.end_id = {enderecoId} ;";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    return sqlCon.Query<Endereco>(query).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static Pais SelecionarPaisById(int paisId)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $@"SELECT pais_nome, pais_id
                                FROM paises p
                                WHERE p.pais_id = {paisId} ;";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    return sqlCon.Query<Pais>(query).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static Estado SelecionarEstadoById(int estadoId)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $@"SELECT e.est_nome, e.est_id
                                FROM estados e
                                WHERE e.est_id = {estadoId} ;";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    return sqlCon.Query<Estado>(query).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static Cidade SelecionarCidadeById(int cidadeId)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $@"SELECT e.cid_nome, e.cid_id
                                FROM cidades e
                                WHERE e.cid_id = {cidadeId} ;";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    return sqlCon.Query<Cidade>(query).FirstOrDefault();
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
                                WHERE ce.cri_end_cli_id = {ClienteId} ;";

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

        public static void DeleteEndereco(int enderecoId)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $@"delete from clientes_enderecos where cri_end_end_id = {enderecoId}";
            string query2 = $@"delete from enderecos where end_id = {enderecoId}";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var delete = sqlCon.Execute(query);
                    var delete2 = sqlCon.Execute(query2);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
