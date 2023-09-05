using Dapper.Contrib.Extensions;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceBack.Models
{
    [Dapper.Contrib.Extensions.Table("enderecos")]
    public class Endereco
    {
        [Computed]
        public int ClienteId { get; set; }

        [Key]
        public int end_id { get; set; }
        public string end_logradouro { get; set; }
        public int end_numero { get; set; }
        public string end_bairro { get; set; }
        public string end_cep { get; set; }
        public string end_observacoes { get; set; }
        public int end_cid_id { get; set; }
        public int end_pais_id { get; set; }
        public int end_est_id { get; set; }
        public int end_tip_res_id { get; set; }
        public int end_tip_log_id { get; set; }

        [Computed]
        public Cidade cidade { get; set; }

        [Computed]
        public Estado estado { get; set; }

        [Computed]
        public Pais pais { get; set; }
    }
}
