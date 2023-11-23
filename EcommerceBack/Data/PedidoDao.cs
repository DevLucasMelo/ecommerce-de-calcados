using EcommerceBack.Models;
using Npgsql;
using Dapper;
using Dapper.Contrib.Extensions;
using System.Data.Common;
using System.Data;
using System.Globalization;

namespace EcommerceBack.Data
{
    public class PedidoDao : BaseDao
    {
        public static long InserirPedido(Pedido pedido)
        {
            string conn = config().GetConnectionString("Conn");
            pedido.ped_end_id = 1;
            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    sqlCon.Open();

                    string sql = @"INSERT INTO public.pedidos
                            (ped_sta_comp_id, ped_cli_id, ped_valor_total, ped_valor_frete, ped_valor_produtos, ped_valor_cod_promo, ped_end_id)
                            VALUES
                            (@ped_sta_comp_id, @ped_cli_id, @ped_valor_total, @ped_valor_frete, @ped_valor_produtos, @ped_valor_cod_promo, @ped_end_id)
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

        public static void InserirCupom(Cupom cupom)
        {
            string conn = config().GetConnectionString("Conn");

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    sqlCon.Open();

                    string sql = $@"INSERT INTO cupons_pedidos (cup_ped_ped_id, cup_ped_cup_id) VALUES ({cupom.pedidoId}, {cupom.cup_id});";


                    int novoIdPedido = sqlCon.Execute(sql);
                }
            }
            catch (Exception ex)
            {
            }
        }

        public static List<PedidosCalcados> consultarPedidosClienteComCalcados()
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
                    var pedidos = sqlCon.Query<PedidosCalcados>(query).ToList();
                    return pedidos;
                }
            }
            catch (Exception ex)
            {
                return new List<PedidosCalcados>();
            }
        }

        public static Cupom consultarCupomByName(string nome)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $@"select * from cupons where cup_nome like '{nome}'";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var cupom = sqlCon.Query<Cupom>(query).FirstOrDefault();
                    return cupom;
                }
            }
            catch (Exception ex)
            {
                return new Cupom();
            }
        }

        public static void InserirMotivoDevolucao(int ped_cal_cal_id, int ped_cal_ped_id, string motivo)
        {
            string conn = config().GetConnectionString("Conn");
            string query_motivo = $"update pedidos_calcados set motivo_devolucao = '{motivo}'\r\nWHERE ped_cal_cal_id = {ped_cal_cal_id} and ped_cal_ped_id = {ped_cal_ped_id};";
            string query_troca_cal_ped = $"update pedidos_calcados set troca_solicitada = true \r\nWHERE ped_cal_cal_id = {ped_cal_cal_id} and ped_cal_ped_id = {ped_cal_ped_id};";
            string query_troca_ped = $"update pedidos set ped_sta_comp_id = 6 \r\nWHERE ped_id = {ped_cal_ped_id};";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    sqlCon.Execute(query_motivo);
                    sqlCon.Execute(query_troca_cal_ped);
                    sqlCon.Execute(query_troca_ped);
                }
            }
            catch (Exception ex)
            {
            }
        }

        public static void InserirMotivoDevolucaoPedidos(int ped_cal_ped_id, string motivo)
        {
            Console.WriteLine(motivo);
            Console.WriteLine(ped_cal_ped_id);
            string conn = config().GetConnectionString("Conn");
            string query_motivo = $"update pedidos_calcados set motivo_devolucao = '{motivo}'\r\nWHERE ped_cal_ped_id = {ped_cal_ped_id};";
            string query_troca = $"update pedidos_calcados set troca_solicitada = true \r\nWHERE ped_cal_ped_id = {ped_cal_ped_id};";
            string query_troca_ped = $"update pedidos set ped_sta_comp_id = 6 \r\nWHERE ped_id = {ped_cal_ped_id};";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    sqlCon.Execute(query_motivo);
                    sqlCon.Execute(query_troca);
                    sqlCon.Execute(query_troca_ped);
                }
            }
            catch (Exception ex)
            {
            }
        }

        public static List<PedidosCalcados> consultarPedidoStatusCliente(int ped_cal_ped_id)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $"\r\nSELECT sta_comp_fase, ped_cal_ped_id, ped_cal_cal_id, cal_titulo, cal_marca, cal_modelo, cal_valor, ped_cal_quant, \r\nped_cal_tamanho, cal_cor \r\nFROM pedidos\r\nJOIN pedidos_calcados ped_cal ON ped_id = ped_cal_ped_id\r\nJOIN calcados cal ON cal_id = ped_cal_cal_id\r\nJOIN status_compra ON ped_sta_comp_id = sta_comp_id\r\nWHERE ped_cli_id = 1 and ped_cal_ped_id = {ped_cal_ped_id}";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var pedidos = sqlCon.Query<PedidosCalcados>(query).ToList();
                    return pedidos;
                }
            }
            catch (Exception ex)
            {
                return new List<PedidosCalcados>();
            }
        }

        public static List<PedidosCalcados> consultarCalcadoDevolucao(int ped_cal_ped_id, int ped_cal_cal_id)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $"\r\nSELECT sta_comp_fase, ped_cal_ped_id, ped_cal_cal_id, cal_titulo, cal_marca, cal_modelo, cal_valor, ped_cal_quant, \r\nped_cal_tamanho, cal_cor \r\nFROM pedidos\r\nJOIN pedidos_calcados ped_cal ON ped_id = ped_cal_ped_id\r\nJOIN calcados cal ON cal_id = ped_cal_cal_id\r\nJOIN status_compra ON ped_sta_comp_id = sta_comp_id\r\nWHERE ped_cli_id = 1 and ped_cal_ped_id = {ped_cal_ped_id} and ped_cal_cal_id = {ped_cal_cal_id}";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var pedidos = sqlCon.Query<PedidosCalcados>(query).ToList();
                    Console.WriteLine(pedidos);
                    return pedidos;
                }
            }
            catch (Exception ex)
            {
                return new List<PedidosCalcados>();
            }
        }

        public static List<PedidosCalcados> consultarPedidoDevolucao(int ped_cal_ped_id)
        {
            string conn = config().GetConnectionString("Conn");
            string query = $"\r\nSELECT sta_comp_fase, ped_cal_ped_id, ped_cal_cal_id, cal_titulo, cal_marca, cal_modelo, cal_valor, ped_cal_quant, \r\nped_cal_tamanho, cal_cor \r\nFROM pedidos\r\nJOIN pedidos_calcados ped_cal ON ped_id = ped_cal_ped_id\r\nJOIN calcados cal ON cal_id = ped_cal_cal_id\r\nJOIN status_compra ON ped_sta_comp_id = sta_comp_id\r\nWHERE ped_cli_id = 1 and ped_cal_ped_id = {ped_cal_ped_id}";

            try
            {
                using (var sqlCon = new NpgsqlConnection(conn))
                {
                    var pedidos = sqlCon.Query<PedidosCalcados>(query).ToList();
                    return pedidos;
                }
            }
            catch (Exception ex)
            {
                return new List<PedidosCalcados>();
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

        public static List<Pedido> ConsultarPedidoByClienteId(int id)
        {
            string conn = config().GetConnectionString("Conn");
            try
            {
                using (var sqlConn = new NpgsqlConnection(conn))
                {
                    sqlConn.Open();

                    string sql = $"select ped_id, ped_valor_total, ped_valor_produtos, ped_valor_frete, ped_cli_id, ped_end_id, ped_sta_comp_id, tra_data_hora from pedidos JOIN transacoes ON tra_ped_id = ped_id where ped_cli_id = {id}";

                    var pedidos = sqlConn.Query<Pedido>(sql).ToList();

                    foreach (var pedido in pedidos)
                    {
                        if (DateTime.TryParseExact(pedido.tra_data_hora, "MM/dd/yyyy HH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime dataHora))
                        {
                            pedido.tra_data_hora = dataHora.ToString("dd/MM/yyyy");
                        }
                    }

                    return pedidos;
                }
            }
            catch (Exception ex)
            {
                return new List<Pedido>();
            }
        }

        public static Pedido ConsultarPedidoById(int id)
        {
            string conn = config().GetConnectionString("Conn");
            try
            {
                using (var sqlConn = new NpgsqlConnection(conn))
                {
                    sqlConn.Open();

                    string sql = $"select ped_id, ped_valor_total, ped_valor_produtos, ped_valor_frete, ped_cli_id, ped_end_id, ped_sta_comp_id from pedidos where ped_id = {id}";

                    var pedido = sqlConn.Query<Pedido>(sql).FirstOrDefault();
                    return pedido;
                }
            }
            catch (Exception ex)
            {
                return new Pedido();
            }
        }

        public static List<PedidosCalcados> ConsultarPedidosProdutosById(int pedidoId)
        {
            string conn = config().GetConnectionString("Conn");
            try
            {
                using (var sqlConn = new NpgsqlConnection(conn))
                {
                    sqlConn.Open();

                    string sql = $@"select ped_cal_quant, ped_cal_tamanho, c.cal_marca, c.cal_modelo, ped_cal_cal_id
                        from pedidos_calcados pc
						inner join calcados c on c.cal_id = pc.ped_cal_cal_id
                        where pc.ped_cal_ped_id = {pedidoId}";

                    var pedido = sqlConn.Query<PedidosCalcados>(sql).ToList();
                    return pedido;
                }
            }
            catch (Exception ex)
            {
                return new List<PedidosCalcados>();
            }
        }

        public static void atualizarStatusCompra(int statusId, int pedidoId)
        {
            string conn = config().GetConnectionString("Conn");

            try
            {
                using (var sqlConn = new NpgsqlConnection(conn))
                {
                    sqlConn.Open();

                    string sql = $@"update pedidos set ped_sta_comp_id = {statusId} where ped_id = {pedidoId}";

                    var pedido = sqlConn.Execute(sql);
                }
            }
            catch (Exception ex)
            {
                
            }
        }
    }
}
