using Dapper.Contrib.Extensions;
namespace EcommerceBack.Models
{
    [Table("tipos_telefones")]
    public class TipoTelefone
    {
        [Key]
        public int tip_tel_id { get; set; }
        public string tip_tel_nome { get; set; }
    }
}
