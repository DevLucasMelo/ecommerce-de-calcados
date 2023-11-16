using Dapper;
using Dapper.Contrib.Extensions;
using EcommerceBack.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Npgsql;

namespace EcommerceBack.Data
{
    public class CalcadosDao : BaseDao
    {
     
        public static List<Calcados> SelecionarCalcados()
        {
            string conn = config().GetConnectionString("Conn");
            string query = "SELECT calcados.*, cat_nome FROM calcados join categorias on cat_id = cal_cat_id\r\norder by cal_id";
            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var calcados = sqlCon.Query<Calcados>(query).ToList();
                    return calcados;
                }
            }
            catch (Exception ex)
            {
                return new List<Calcados>();
            }
        }

        public static List<Calcados> SelecionarCalcadosId(int id)
        {
            string conn = config().GetConnectionString("Conn");

            string query = $"SELECT * FROM calcados where cal_id = {id}";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var calcados = sqlCon.Query<Calcados>(query).ToList();
                    return calcados;
                }
            }
            catch (Exception ex)
            {
                return new List<Calcados>();
            }
        }

        public static string SelecionarCalcadosIdComoJson(int cal_id, string tamanhoSelecionado)
        {
            string conn = config().GetConnectionString("Conn");

            string query = $"SELECT calcados.*, estq_quantidade FROM calcados JOIN estoque ON estq_cal_id = cal_id where cal_id = {cal_id} and estq_tamanho = '{tamanhoSelecionado}'\r\n";
            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var calcados = sqlCon.Query<Calcados>(query).ToList();
                    Console.Write(calcados);

                    var dataObject = new { dados = calcados };

                    return JsonConvert.SerializeObject(dataObject);
                }
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new List<Calcados>());
            }
        }

        public List<Calcados> ConsultarCalcados(string termoPesquisa)
        {
            string conn = config().GetConnectionString("Conn");

            if (string.IsNullOrWhiteSpace(termoPesquisa))
            {
                return new List<Calcados>();
            }

            string query = $@"SELECT * FROM calcados
                          WHERE cal_marca ILIKE '%{termoPesquisa}%' OR 
                                cal_modelo ILIKE '%{termoPesquisa}%' OR 
                                cal_titulo ILIKE '%{termoPesquisa}%' OR 
                                cal_cor ILIKE '%{termoPesquisa}%' OR 
                                cal_tamanho ILIKE '%{termoPesquisa}%' OR 
                                cal_comprimento ILIKE '%{termoPesquisa}%' OR 
                                cal_largura ILIKE '%{termoPesquisa}%' OR 
                                cal_grup_precifi ILIKE '%{termoPesquisa}%' OR 
                                cal_cod_barras ILIKE '%{termoPesquisa}%' OR 
                                (cal_autorizacao_margem = true AND '{termoPesquisa}' ILIKE 'True') OR 
                                (cal_autorizacao_margem = false AND '{termoPesquisa}' ILIKE 'False')";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var calcados = sqlCon.Query<Calcados>(query).ToList();

                    return calcados;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
