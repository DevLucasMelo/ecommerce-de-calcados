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

    }
}
