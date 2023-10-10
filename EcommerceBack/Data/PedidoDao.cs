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

        public static List<PedidoCalcados> consultarPedidoStatusCliente(int ped_cal_ped_id)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $"\r\nSELECT sta_comp_fase, ped_cal_ped_id ped_cal_cal_id, cal_titulo, cal_marca, cal_modelo, cal_valor, ped_cal_quant, \r\nped_cal_tamanho, cal_cor \r\nFROM pedidos\r\nJOIN pedidos_calcados ped_cal ON ped_id = ped_cal_ped_id\r\nJOIN calcados cal ON cal_id = ped_cal_cal_id\r\nJOIN status_compra ON ped_sta_comp_id = sta_comp_id\r\nWHERE ped_cli_id = 1 and ped_cal_ped_id = {ped_cal_ped_id}";

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
