using EcommerceBack.Models;
using Npgsql;
using Dapper;
using Dapper.Contrib.Extensions;

namespace EcommerceBack.Data
{
    public class PedidoDao : BaseDao
    {
        public static long InserirPedido(Pedido pedido)
        {
            string conn = config().GetConnectionString("Conn");

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var id = sqlCon.Insert(pedido);
                    return id;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public static List<PedidoCalcados> consultarPedidosClienteComCalcados()
        {
            string conn = config().GetConnectionString("Conn");
            string query = "SELECT ped_cal.ped_cal_ped_id, ped_cal.ped_cal_cal_id, cal.cal_titulo, cal.cal_marca, cal.cal_modelo, cal.cal_valor, ped_cal.ped_cal_quant, ped_cal.ped_cal_tamanho, cal.cal_cor " +
             "FROM pedidos ped " +
             "JOIN pedidos_calcados ped_cal ON ped.ped_id = ped_cal.ped_cal_ped_id " +
             "JOIN calcados cal ON cal.cal_id = ped_cal.ped_cal_cal_id " +
             "WHERE ped.ped_cli_id = 1";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var pedidos = sqlCon.Query<PedidoCalcados>(query).ToList();
                    return pedidos;
                }
            }
            catch (Exception ex)
            {
                return new List<PedidoCalcados>();
            }
        }

    }
}
