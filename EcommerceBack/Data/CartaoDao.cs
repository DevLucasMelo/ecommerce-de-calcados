using Dapper;
using Dapper.Contrib.Extensions;
using EcommerceBack.Models;
using Npgsql;

namespace EcommerceBack.Data
{
    public class CartaoDao : BaseDao
    {
        public static long InserirBandeira(Bandeira bandeira)
        {
            string conn = config().GetConnectionString("Conn");

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var id = sqlCon.Insert(bandeira);
                    return id;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public static long InserirCartao(Cartao cartao)
        {
            string conn = config().GetConnectionString("Conn");

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var id = sqlCon.Insert(cartao);
                    return id;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public static void UpdateCartao(Cartao cartao)
        {
            string conn = config().GetConnectionString("Conn");

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var id = sqlCon.Update(cartao);
                    var band = sqlCon.Update(cartao.Bandeira);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static void InserirCartaoCliente(long CartaoId, int ClienteId)
        {
            string conn = config().GetConnectionString("Conn");
            string query =
                $"insert into clientes_cartoes(cli_car_cli_id, cli_car_car_id) " +
                $"values ({ClienteId}, {CartaoId})";
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

        public static List<Cartao> SelecionarCartaoIdCliente(int ClienteId)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $@"SELECT c.car_id, c.car_num, c.car_nome, c.car_cod_seguranca
                                FROM cartoes c
                                INNER JOIN clientes_cartoes cc ON c.car_id = cc.cli_car_car_id
                                WHERE cc.cli_car_cli_id = {ClienteId} ;";
                
            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    return sqlCon.Query<Cartao>(query).ToList();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static Cartao ConsultarSomenteCartaoPoriD(int cartao)
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

        public static void DeleteCartao(int cartaoId)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $@"delete from clientes_cartoes where cli_car_car_id = {cartaoId}";
            string query2 = $@"delete from cartoes where car_id = {cartaoId}";

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
