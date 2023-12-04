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
        public string cal_titulo { get; set; }
        public string cal_marca { get; set; }
        public string cal_modelo { get; set; }
        public decimal cal_valor { get; set; }
        public string cal_cor { get; set; }
        public string sta_comp_fase { get; set; }
        public bool troca_solicitada { get; set; }

    }
}
