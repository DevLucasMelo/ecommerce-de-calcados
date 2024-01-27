using Dapper.Contrib.Extensions;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceBack.Models
{
    [Dapper.Contrib.Extensions.Table("estoque")]
    public class Estoque
    {
        [Key]
        [Column(name: "estq_id")]
        public int estq_id { get; set; }

        [Column(name: "estq_quantidade")]
        public int estq_quantidade { get; set; }

        [Column(name: "estq_valor_custo")]
        public decimal estq_valor_custo { get; set; }

        [Column(name: "estq_dt_entrada")]
        public DateTime estq_dt_entrada { get; set; }

        [Column(name: "estq_cal_id")]
        public int estq_cal_id { get; set; }

        [Column(name: "estq_tamanho")]
        public string estq_tamanho { get; set; }

        [Column(name: "estq_for_id")]
        public int estq_for_id { get; set; }

        [Computed]
        public List<Estoque> estoque { get; set; }
    }
}