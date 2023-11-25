using EcommerceBack.Models;
using Npgsql;
using Dapper;
using Dapper.Contrib.Extensions;
using System.Data.Common;
using System.Data;

namespace EcommerceBack.Data
{
    public class TransacoesDao : BaseDao
    {

        public static List<Transacoes> consultarTransacoes(string dataInicio, string dataFim)
        {
            string conn = config().GetConnectionString("Conn");

            string query = $"select cal_marca, SUM(cal_valor * ped_cal_quant) AS valor_total," +
                $" tra_data_hora from pedidos join pedidos_calcados on ped_cal_ped_id = ped_id \r\njoin calcados on ped_cal_cal_id = cal_id join" +
                $" transacoes on tra_ped_id = ped_id \r\nwhere ped_sta_comp_id in (5, 8) \r\nAND tra_data_hora BETWEEN '{dataInicio}' " +
                $"AND '{dataFim}'\r\nGROUP BY cal_marca, tra_data_hora\r\norder by tra_data_hora;";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var transacoes = sqlCon.Query<Transacoes>(query).ToList();
                    return transacoes;
                }
            }
            catch (Exception ex)
            {
                return new List<Transacoes>();
            }
        }
    }
}
