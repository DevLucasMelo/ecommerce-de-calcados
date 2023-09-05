using Dapper.Contrib.Extensions;
namespace EcommerceBack.Models
{
    [Table("tipos_residencias")]
    public class TipoResidencia
    {
        [Key]
        public int tip_res_id { get; set; }
        public string tip_res_nome { get; set; }
    }
}
