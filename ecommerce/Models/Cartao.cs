using Dapper.Contrib.Extensions;

namespace EcommerceBack.Models
{
    [Table("cartoes")]
    public class Cartao
    {
        [Computed]
        public int ClienteId { get; set; }

        [Key]
        public int car_id { get; set; }
        public string car_num { get; set; }
        public string car_nome { get; set; }
        public string car_cod_seguranca { get; set; }
        public int car_ban_id { get; set; }

        [Computed]
        public Bandeira Bandeira { get; set; }
    }
}
