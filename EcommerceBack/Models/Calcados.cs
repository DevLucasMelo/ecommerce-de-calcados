using Dapper.Contrib.Extensions;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceBack.Models
{
    [Dapper.Contrib.Extensions.Table("calcados")]
    public class Calcados
    {
        [Key]
        public int? cal_id { get; set; }

        [Column("cal_marca")]
        public string cal_marca { get; set; }

        [Column("cal_modelo")]
        public string cal_modelo { get; set; }

        [Column("cal_valor", TypeName = "decimal(10, 2)")]
        public decimal cal_valor { get; set; }

        [Column("cal_dt_fabric")]
        public DateTime cal_dt_fabric { get; set; }

        [Column("cal_titulo")]
        public string cal_titulo { get; set; }

        [Column("cal_cor")]
        public string cal_cor { get; set; }

        [Column("cal_tamanho")]
        public string cal_tamanho { get; set; }

        [Column("cal_peso")]
        public string cal_peso { get; set; }

        [Column("cal_comprimento")]
        public string cal_comprimento { get; set; }

        [Column("cal_largura")]
        public string cal_largura { get; set; }

        [Column("cal_grup_precifi")]
        public string cal_grup_precifi { get; set; }

        [Column("cal_cod_barras")]
        public string cal_cod_barras { get; set; }

        [Column("cal_status_motivo")]
        public string cal_status_motivo { get; set; }

        [Column("cal_gru_pre_id")]
        public int? cal_gru_pre_id { get; set; }

        [Column("cal_sta_pro_id")]
        public int? cal_sta_pro_id { get; set; }

        [Column("cal_autorizacao_margem")]
        public bool cal_autorizacao_margem { get; set; }

        [Column("cal_gen_id")]
        public int? cal_gen_id { get; set; }

        [Column("cal_cat_id")]
        public int? cal_cat_id { get; set; }

        [Column("cat_nome")]
        public string cat_nome { get; set; }

        [Computed]
        public List<Calcados> calcados { get; set; }

    }
}
