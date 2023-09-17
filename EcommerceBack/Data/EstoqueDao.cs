using Dapper;
using Dapper.Contrib.Extensions;
using EcommerceBack.Models;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace EcommerceBack.Data
{
    public class EstoqueDao : BaseDao
    {
        public static List<Estoque> SelecionarEstoqueCalcadoId(int id)
        {
            string conn = config().GetConnectionString("Conn");
            Console.WriteLine(id);
            string query = $"SELECT * FROM estoque where estq_cal_id = {id}";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var estoque = sqlCon.Query<Estoque>(query).ToList();
                    return estoque;
                }
            }
            catch (Exception ex)
            {
                return new List<Estoque>();

            }
        }
    }
}
