using Dapper.Contrib.Extensions;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceBack.Models
{
    [Dapper.Contrib.Extensions.Table("bandeiras")]
    public class Bandeira
    {
        [Key]
        public int ban_id { get; set; }

        [Column("ban_nome")]
        public string ban_nome { get; set; }

        [Computed]
        public List<Bandeira> bandeiras { get; set; }
    }
}
