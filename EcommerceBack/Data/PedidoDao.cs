using EcommerceBack.Models;
using Npgsql;
using Dapper;
using Dapper.Contrib.Extensions;
using System.Data.Common;
using System.Data;

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
                    sqlCon.Open();

                    string sql = @"INSERT INTO public.pedidos
                            (ped_sta_comp_id, ped_cli_id, ped_valor_total, ped_valor_frete, ped_valor_produtos, ped_valor_cod_promo)
                            VALUES
                            (@ped_sta_comp_id, @ped_cli_id, @ped_valor_total, @ped_valor_frete, @ped_valor_produtos, @ped_valor_cod_promo)
                            RETURNING ped_id";

                    
                    int novoIdPedido = sqlCon.ExecuteScalar<int>(sql, pedido);

                    return pedido.ped_id = novoIdPedido;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public static void InserirPedidoCalcado(PedidosCalcados pedidoCalcado)
        {
            string conn = config().GetConnectionString("Conn");
            try
            {
                using (var dbConnection = new NpgsqlConnection(conn))
                {
                    dbConnection.Open();

                    string sql = "INSERT INTO public.pedidos_calcados (ped_cal_ped_id, ped_cal_cal_id, ped_cal_quant, ped_cal_tamanho) " +
                                 "VALUES (@ped_cal_ped_id, @ped_cal_cal_id, @ped_cal_quant, @ped_cal_tamanho)";

                    dbConnection.Execute(sql, pedidoCalcado);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erro ao inserir pedido de calçado: " + ex.Message);
                throw;
            }
        }
    }
}
