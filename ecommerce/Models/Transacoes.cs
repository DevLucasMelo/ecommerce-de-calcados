using Dapper.Contrib.Extensions;

namespace EcommerceBack.Models
{
    [Table("transacoes")]
    public class Transacoes
    {

        public string cal_marca { get; set; }
        public decimal valor_total { get; set; }
        public int ped_cal_quant { get; set; }
        public DateTime tra_data_hora { get; set; }

    }
}
