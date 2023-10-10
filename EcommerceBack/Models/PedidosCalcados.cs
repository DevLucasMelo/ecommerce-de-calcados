using Dapper.Contrib.Extensions;

namespace EcommerceBack.Models
{
    [Table("pedidos_calcados")]
    public class PedidosCalcados
    {
        public int ped_cal_id { get; set; }
        public int ped_cal_ped_id { get; set; }
        public int ped_cal_cal_id { get; set; }
        public int ped_cal_quant { get; set; }
        public int ped_cal_tamanho { get; set; }
    }
}
