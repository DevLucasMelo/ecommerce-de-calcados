using Dapper.Contrib.Extensions;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceBack.Models
{
    [Dapper.Contrib.Extensions.Table("categorias")]
    public class Categorias
    {
        [Key]
        public int cat_id { get; set; }

        [Column("cat_nome")]
        public string cat_nome { get; set; }

    }
}
