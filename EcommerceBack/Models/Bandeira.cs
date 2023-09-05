using Dapper.Contrib.Extensions;
namespace EcommerceBack.Models
{
    [Table("bandeiras")]
    public class Bandeira
    {
        [Key]
        public int ban_id { get; set; }
        public string ban_nome { get; set; }
    }
}
