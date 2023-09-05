using Dapper.Contrib.Extensions;

namespace EcommerceBack.Models
{
    [Table("cidades")]
    public class Cidade
    {
        [Key]
        public int cid_id { get; set; }
        public string cid_nome { get; set; }
    }
}
