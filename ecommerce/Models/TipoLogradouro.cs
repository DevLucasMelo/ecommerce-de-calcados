using Dapper.Contrib.Extensions;
namespace EcommerceBack.Models
{
    [Table("tipos_logradouros")]
    public class TipoLogradouro
    {
        [Key]
        public int tip_log_id { get; set; }
        public string tip_log_nome { get; set; }
    }
}
