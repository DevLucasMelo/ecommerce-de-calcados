using Dapper.Contrib.Extensions;

namespace EcommerceBack.Models
{
    [Table("paises")]
    public class Pais
    {
        [Key]
        public int pais_id { get; set; }
        public string pais_nome { get; set; }
    }
}
