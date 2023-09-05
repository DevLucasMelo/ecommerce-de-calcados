using Dapper.Contrib.Extensions;
using System.ComponentModel.DataAnnotations.Schema;


namespace EcommerceBack.Models
{
    [Dapper.Contrib.Extensions.Table("clientes")]
    public class Cliente
    {
        [Key]
        [Column(name:"cli_id")]
        public int cli_id { get; set; }

        [Column(name:"cli_nome")]
        public string cli_nome { get; set; }

        [Column(name:"cli_gen_id")]
        public int? cli_gen_id { get; set; } 

        [Column(name: "cli_status")]
        public bool cli_status { get; set; }

        [Column(name:"cli_dt_nascimento")]
        public DateTime cli_dt_nascimento { get; set; }

        [Column(name: "cli_cpf")]
        public string cli_cpf { get; set; }

        [Column(name:"cli_telefone")]
        public string cli_telefone { get; set; }

        [Column(name: "cli_tip_tel_id")]
        public int? cli_tip_tel_id { get; set; }

        [Column(name:"cli_email")]
        public string cli_email { get; set; }

        [Column(name:"cli_senha")]
        public string cli_senha { get; set; }

        [Computed]
        public List<Cliente> clientes { get; set; }

    }
}
