using Dapper.Contrib.Extensions;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceBack.Models
{
    [Dapper.Contrib.Extensions.Table("calcados")]
    public class Calcados
    {
        [Key]
        public int cal_id { get; set; }

        [Column("cal_marca")]
        public string Marca { get; set; }

        [Column("cal_modelo")]
        public string Modelo { get; set; }

        [Column("cal_valor", TypeName = "decimal(10, 2)")]
        public decimal Valor { get; set; }

        [Column("cal_dt_fabric")]
        public DateTime DataFabricacao { get; set; }

        [Column("cal_titulo")]
        public string Titulo { get; set; }

        [Column("cal_cor")]
        public string Cor { get; set; }

        [Column("cal_tamanho")]
        public string Tamanho { get; set; }

        [Column("cal_peso")]
        public string Peso { get; set; }

        [Column("cal_comprimento")]
        public string Comprimento { get; set; }

        [Column("cal_largura")]
        public string Largura { get; set; }

        [Column("cal_grup_precifi")]
        public string GrupoPrecificacao { get; set; }

        [Column("cal_cod_barras")]
        public string CodigoBarras { get; set; }

        [Column("cal_status_motivo")]
        public string StatusMotivo { get; set; }

        [Column("cal_gru_pre_id")]
        public int GrupoPrecificacaoId { get; set; }

        [Column("cal_sta_pro_id")]
        public int StatusProdutoId { get; set; }

        [Column("cal_autorizacao_margem")]
        public bool AutorizacaoMargem { get; set; }

        [Column("cal_gen_id")]
        public int GeneroId { get; set; }
    }
}
