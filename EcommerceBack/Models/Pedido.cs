using Dapper.Contrib.Extensions;
using System;

namespace EcommerceBack.Models
{
    [Table("pedidos")]
    public class Pedido
    {
        public int ped_id { get; set; } 
        public int ped_sta_comp_id { get; set; }
        public int ped_cli_id { get; set; }
        public decimal ped_valor_total { get; set; }
        public decimal ped_valor_frete { get; set; }
        public decimal ped_valor_cod_promo { get; set; }
        public decimal ped_valor_produtos { get; set; }
        public int ped_end_id { get; set; }

        [Computed]
        public List<Cartao> CartaoList { get; set; }
    }
}
