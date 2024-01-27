using Dapper.Contrib.Extensions;

namespace EcommerceBack.Models
{
    [Table("cupons")]
    public class Cupom
    {
        public int cup_id { get; set; }
        public string cup_nome { get; set; }
        public decimal cup_valor { get; set; }
        public bool cup_ativo { get; set; }
        public int cup_cli_id { get; set; }
        public int cup_tip_id { get; set; }

        [Computed]
        public int pedidoId { get; set; }

        [Computed]
        public List<Cupom> cupomList { get; set; }
    }
}
