using Dapper.Contrib.Extensions;

namespace EcommerceBack.Models
{
    [Table("estados")]
    public class Estado
    {
        [Key]
        public int est_id { get; set; }
        public string est_nome { get; set; }
    }
}
