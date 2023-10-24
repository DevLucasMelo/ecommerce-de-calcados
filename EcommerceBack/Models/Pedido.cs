using Dapper.Contrib.Extensions;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceBack.Models
{
    [Dapper.Contrib.Extensions.Table("pedidos")]
    public class Pedido
    {

        [Key]
        public long ped_id { get; set; }

        [Column("ped_sta_comp_id")]
        public int ped_sta_comp_id { get; set; }

        [Column("ped_cli_id")]
        public int ped_cli_id { get; set; }

        [Column("ped_valor_total", TypeName = "decimal(10, 2)")]
        public decimal ped_valor_total { get; set; }

        [Column("ped_valor_frete")]
        public decimal ped_valor_frete { get; set; }

        [Column("ped_valor_cod_promo")]
        public decimal ped_valor_cod_promo { get; set; }

        [Column("ped_valor_produtos")]
        public decimal ped_valor_produtos { get; set; }
        public int ped_end_id { get; set; }

        [Computed]
        public List<Pedido> pedidos { get; set; }

        [Computed]
        public List<Cartao> CartaoList { get; set; }

        [Computed]
        public Cliente Cliente { get; set; }

        [Computed]
        public Endereco Endereco { get; set; }

        [Computed]
        public List<PedidosCalcados> PedidosCalcados { get; set; }
    }
}
