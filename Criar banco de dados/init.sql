PGDMP         )                |         
   ecommerce1    15.4    15.4 �    -           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            .           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            /           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            0           1262    19375 
   ecommerce1    DATABASE     �   CREATE DATABASE ecommerce1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE ecommerce1;
                postgres    false                       1255    20158    calcados_log_trigger()    FUNCTION     �  CREATE FUNCTION public.calcados_log_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  log_json_insercao JSON;
BEGIN
  IF (TG_OP = 'INSERT') THEN
    log_json_insercao = to_json(NEW);
  END IF;

  INSERT INTO logs (log_data_hora, log_usuario, log_tipo_alteracao, log_tabela_alterada, log_json_insercao)
  VALUES (NOW(), CURRENT_USER, TG_OP, 'calcados', log_json_insercao);

  RETURN NEW;
END;
$$;
 -   DROP FUNCTION public.calcados_log_trigger();
       public          postgres    false                       1255    20153    clientes_log_trigger()    FUNCTION     �  CREATE FUNCTION public.clientes_log_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  log_json_insercao JSON;
BEGIN
  IF (TG_OP = 'INSERT') THEN
    log_json_insercao = to_json(NEW);
  END IF;

  INSERT INTO logs (log_data_hora, log_usuario, log_tipo_alteracao, log_tabela_alterada, log_json_insercao)
  VALUES (NOW(), CURRENT_USER, TG_OP, 'clientes', log_json_insercao);

  RETURN NEW;
END;
$$;
 -   DROP FUNCTION public.clientes_log_trigger();
       public          postgres    false                       1255    20163    estoque_log_trigger()    FUNCTION     �  CREATE FUNCTION public.estoque_log_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  log_json_insercao JSON;
BEGIN
  IF (TG_OP = 'INSERT') THEN
    log_json_insercao = to_json(NEW);
  END IF;

  INSERT INTO logs (log_data_hora, log_usuario, log_tipo_alteracao, log_tabela_alterada, log_json_insercao)
  VALUES (NOW(), CURRENT_USER, TG_OP, 'estoque', log_json_insercao);

  RETURN NEW;
END;
$$;
 ,   DROP FUNCTION public.estoque_log_trigger();
       public          postgres    false                       1255    20156    insere_log_calcados()    FUNCTION     j  CREATE FUNCTION public.insere_log_calcados() RETURNS trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
  coluna_antiga text;
  coluna_nova text;
  coluna_name text;
BEGIN
  FOR coluna_name IN (SELECT column_name FROM information_schema.columns WHERE table_name = 'calcados') 
  LOOP
    -- Construa dinamicamente as consultas usando EXECUTE
    EXECUTE 'SELECT $1.' || coluna_name || ', $2.' || coluna_name INTO coluna_antiga, coluna_nova
    USING OLD, NEW;

    IF coluna_antiga IS DISTINCT FROM coluna_nova THEN
      EXECUTE 'INSERT INTO Logs (log_data_hora, log_usuario, log_tipo_alteracao, log_tabela_alterada, log_id_alterado, log_coluna_alterada, log_valor_antigo, log_valor_novo) VALUES (NOW(), CURRENT_USER, ''UPDATE'', ''calcados'', $1, $2, $3, $4)' 
      USING NEW.cal_id, coluna_name, coluna_antiga, coluna_nova;
    END IF;
  END LOOP;

  RETURN NEW;
END;
$_$;
 ,   DROP FUNCTION public.insere_log_calcados();
       public          postgres    false                       1255    20150    insere_log_clientes()    FUNCTION     j  CREATE FUNCTION public.insere_log_clientes() RETURNS trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
  coluna_antiga text;
  coluna_nova text;
  coluna_name text;
BEGIN
  FOR coluna_name IN (SELECT column_name FROM information_schema.columns WHERE table_name = 'clientes') 
  LOOP
    -- Construa dinamicamente as consultas usando EXECUTE
    EXECUTE 'SELECT $1.' || coluna_name || ', $2.' || coluna_name INTO coluna_antiga, coluna_nova
    USING OLD, NEW;

    IF coluna_antiga IS DISTINCT FROM coluna_nova THEN
      EXECUTE 'INSERT INTO Logs (log_data_hora, log_usuario, log_tipo_alteracao, log_tabela_alterada, log_id_alterado, log_coluna_alterada, log_valor_antigo, log_valor_novo) VALUES (NOW(), CURRENT_USER, ''UPDATE'', ''clientes'', $1, $2, $3, $4)' 
      USING NEW.cli_id, coluna_name, coluna_antiga, coluna_nova;
    END IF;
  END LOOP;

  RETURN NEW;
END;
$_$;
 ,   DROP FUNCTION public.insere_log_clientes();
       public          postgres    false                       1255    20160    insere_log_estoque()    FUNCTION     h  CREATE FUNCTION public.insere_log_estoque() RETURNS trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
  coluna_antiga text;
  coluna_nova text;
  coluna_name text;
BEGIN
  FOR coluna_name IN (SELECT column_name FROM information_schema.columns WHERE table_name = 'estoque') 
  LOOP
    -- Construa dinamicamente as consultas usando EXECUTE
    EXECUTE 'SELECT $1.' || coluna_name || ', $2.' || coluna_name INTO coluna_antiga, coluna_nova
    USING OLD, NEW;

    IF coluna_antiga IS DISTINCT FROM coluna_nova THEN
      EXECUTE 'INSERT INTO Logs (log_data_hora, log_usuario, log_tipo_alteracao, log_tabela_alterada, log_id_alterado, log_coluna_alterada, log_valor_antigo, log_valor_novo) VALUES (NOW(), CURRENT_USER, ''UPDATE'', ''estoque'', $1, $2, $3, $4)' 
      USING NEW.estq_id, coluna_name, coluna_antiga, coluna_nova;
    END IF;
  END LOOP;

  RETURN NEW;
END;
$_$;
 +   DROP FUNCTION public.insere_log_estoque();
       public          postgres    false                       1255    20161    insere_log_pedidos()    FUNCTION     g  CREATE FUNCTION public.insere_log_pedidos() RETURNS trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
  coluna_antiga text;
  coluna_nova text;
  coluna_name text;
BEGIN
  FOR coluna_name IN (SELECT column_name FROM information_schema.columns WHERE table_name = 'pedidos') 
  LOOP
    -- Construa dinamicamente as consultas usando EXECUTE
    EXECUTE 'SELECT $1.' || coluna_name || ', $2.' || coluna_name INTO coluna_antiga, coluna_nova
    USING OLD, NEW;

    IF coluna_antiga IS DISTINCT FROM coluna_nova THEN
      EXECUTE 'INSERT INTO Logs (log_data_hora, log_usuario, log_tipo_alteracao, log_tabela_alterada, log_id_alterado, log_coluna_alterada, log_valor_antigo, log_valor_novo) VALUES (NOW(), CURRENT_USER, ''UPDATE'', ''pedidos'', $1, $2, $3, $4)' 
      USING NEW.ped_id, coluna_name, coluna_antiga, coluna_nova;
    END IF;
  END LOOP;

  RETURN NEW;
END;
$_$;
 +   DROP FUNCTION public.insere_log_pedidos();
       public          postgres    false                       1255    20166    pedidos_log_trigger()    FUNCTION     �  CREATE FUNCTION public.pedidos_log_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  log_json_insercao JSON;
BEGIN
  IF (TG_OP = 'INSERT') THEN
    log_json_insercao = to_json(NEW);
  END IF;

  INSERT INTO logs (log_data_hora, log_usuario, log_tipo_alteracao, log_tabela_alterada, log_json_insercao)
  VALUES (NOW(), CURRENT_USER, TG_OP, 'pedidos', log_json_insercao);

  RETURN NEW;
END;
$$;
 ,   DROP FUNCTION public.pedidos_log_trigger();
       public          postgres    false            �            1259    19377 	   bandeiras    TABLE     m   CREATE TABLE public.bandeiras (
    ban_id integer NOT NULL,
    ban_nome character varying(100) NOT NULL
);
    DROP TABLE public.bandeiras;
       public         heap    postgres    false            �            1259    19376    bandeiras_ban_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bandeiras_ban_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.bandeiras_ban_id_seq;
       public          postgres    false    215            1           0    0    bandeiras_ban_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.bandeiras_ban_id_seq OWNED BY public.bandeiras.ban_id;
          public          postgres    false    214            �            1259    19384    calcados    TABLE     �  CREATE TABLE public.calcados (
    cal_id integer NOT NULL,
    cal_marca character varying(100) NOT NULL,
    cal_modelo character varying(100) NOT NULL,
    cal_valor numeric(10,2) NOT NULL,
    cal_dt_fabric date NOT NULL,
    cal_titulo character varying(255) NOT NULL,
    cal_cor character varying(100) NOT NULL,
    cal_tamanho character varying(100) NOT NULL,
    cal_peso character varying(100) NOT NULL,
    cal_comprimento character varying(100) NOT NULL,
    cal_largura character varying(100) NOT NULL,
    cal_grup_precifi character varying(100),
    cal_cod_barras character varying(100),
    cal_status_motivo text,
    cal_gru_pre_id integer,
    cal_cat_id integer
);
    DROP TABLE public.calcados;
       public         heap    postgres    false            �            1259    19383    calcados_cal_id_seq    SEQUENCE     �   CREATE SEQUENCE public.calcados_cal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.calcados_cal_id_seq;
       public          postgres    false    217            2           0    0    calcados_cal_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.calcados_cal_id_seq OWNED BY public.calcados.cal_id;
          public          postgres    false    216            �            1259    19393    cartoes    TABLE     �   CREATE TABLE public.cartoes (
    car_id integer NOT NULL,
    car_num character varying(100) NOT NULL,
    car_nome character varying(100) NOT NULL,
    car_cod_seguranca character varying(10) NOT NULL,
    car_ban_id integer NOT NULL
);
    DROP TABLE public.cartoes;
       public         heap    postgres    false            �            1259    19392    cartoes_car_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cartoes_car_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.cartoes_car_id_seq;
       public          postgres    false    219            3           0    0    cartoes_car_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.cartoes_car_id_seq OWNED BY public.cartoes.car_id;
          public          postgres    false    218            �            1259    19400 
   categorias    TABLE     n   CREATE TABLE public.categorias (
    cat_id integer NOT NULL,
    cat_nome character varying(100) NOT NULL
);
    DROP TABLE public.categorias;
       public         heap    postgres    false            �            1259    19399    categorias_cat_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categorias_cat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.categorias_cat_id_seq;
       public          postgres    false    221            4           0    0    categorias_cat_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.categorias_cat_id_seq OWNED BY public.categorias.cat_id;
          public          postgres    false    220            �            1259    19407    cidades    TABLE     k   CREATE TABLE public.cidades (
    cid_id integer NOT NULL,
    cid_nome character varying(255) NOT NULL
);
    DROP TABLE public.cidades;
       public         heap    postgres    false            �            1259    19406    cidades_cid_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cidades_cid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.cidades_cid_id_seq;
       public          postgres    false    223            5           0    0    cidades_cid_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.cidades_cid_id_seq OWNED BY public.cidades.cid_id;
          public          postgres    false    222            �            1259    19414    clientes    TABLE     �  CREATE TABLE public.clientes (
    cli_id integer NOT NULL,
    cli_nome character varying(255) NOT NULL,
    cli_dt_nascimento date NOT NULL,
    cli_cpf character varying(14) NOT NULL,
    cli_telefone character varying(11) NOT NULL,
    cli_email character varying(255) NOT NULL,
    cli_senha character varying(255),
    cli_ranking integer,
    cli_status boolean,
    cli_tip_tel_id integer,
    cli_gen_id integer
);
    DROP TABLE public.clientes;
       public         heap    postgres    false            �            1259    19423    clientes_cartoes    TABLE     �   CREATE TABLE public.clientes_cartoes (
    cli_car_id integer NOT NULL,
    cli_car_cli_id integer NOT NULL,
    cli_car_car_id integer NOT NULL
);
 $   DROP TABLE public.clientes_cartoes;
       public         heap    postgres    false            �            1259    19422    clientes_cartoes_cli_car_id_seq    SEQUENCE     �   CREATE SEQUENCE public.clientes_cartoes_cli_car_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.clientes_cartoes_cli_car_id_seq;
       public          postgres    false    227            6           0    0    clientes_cartoes_cli_car_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.clientes_cartoes_cli_car_id_seq OWNED BY public.clientes_cartoes.cli_car_id;
          public          postgres    false    226            �            1259    19413    clientes_cli_id_seq    SEQUENCE     �   CREATE SEQUENCE public.clientes_cli_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.clientes_cli_id_seq;
       public          postgres    false    225            7           0    0    clientes_cli_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.clientes_cli_id_seq OWNED BY public.clientes.cli_id;
          public          postgres    false    224            �            1259    19430    clientes_cupons    TABLE     �   CREATE TABLE public.clientes_cupons (
    cli_cup_id integer NOT NULL,
    cli_cup_cli_id integer NOT NULL,
    cli_cup_cup_id integer NOT NULL
);
 #   DROP TABLE public.clientes_cupons;
       public         heap    postgres    false            �            1259    19429    clientes_cupons_cli_cup_id_seq    SEQUENCE     �   CREATE SEQUENCE public.clientes_cupons_cli_cup_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.clientes_cupons_cli_cup_id_seq;
       public          postgres    false    229            8           0    0    clientes_cupons_cli_cup_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.clientes_cupons_cli_cup_id_seq OWNED BY public.clientes_cupons.cli_cup_id;
          public          postgres    false    228            �            1259    19437    clientes_enderecos    TABLE     �   CREATE TABLE public.clientes_enderecos (
    cli_end_id integer NOT NULL,
    cri_end_cli_id integer NOT NULL,
    cri_end_end_id integer NOT NULL
);
 &   DROP TABLE public.clientes_enderecos;
       public         heap    postgres    false            �            1259    19436 !   clientes_enderecos_cli_end_id_seq    SEQUENCE     �   CREATE SEQUENCE public.clientes_enderecos_cli_end_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.clientes_enderecos_cli_end_id_seq;
       public          postgres    false    231            9           0    0 !   clientes_enderecos_cli_end_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.clientes_enderecos_cli_end_id_seq OWNED BY public.clientes_enderecos.cli_end_id;
          public          postgres    false    230            �            1259    19444    cupons    TABLE     �   CREATE TABLE public.cupons (
    cup_id integer NOT NULL,
    cup_nome character varying(100) NOT NULL,
    cup_valor numeric,
    cup_ativo boolean,
    cup_tip_id integer,
    cup_cli_id integer
);
    DROP TABLE public.cupons;
       public         heap    postgres    false            �            1259    19443    cupons_cup_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cupons_cup_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.cupons_cup_id_seq;
       public          postgres    false    233            :           0    0    cupons_cup_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.cupons_cup_id_seq OWNED BY public.cupons.cup_id;
          public          postgres    false    232            �            1259    19451    cupons_pedidos    TABLE     �   CREATE TABLE public.cupons_pedidos (
    cup_ped_id integer NOT NULL,
    cup_ped_ped_id integer NOT NULL,
    cup_ped_cup_id integer NOT NULL
);
 "   DROP TABLE public.cupons_pedidos;
       public         heap    postgres    false            �            1259    19450    cupons_pedidos_cup_ped_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cupons_pedidos_cup_ped_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.cupons_pedidos_cup_ped_id_seq;
       public          postgres    false    235            ;           0    0    cupons_pedidos_cup_ped_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.cupons_pedidos_cup_ped_id_seq OWNED BY public.cupons_pedidos.cup_ped_id;
          public          postgres    false    234            �            1259    19458 	   enderecos    TABLE     �  CREATE TABLE public.enderecos (
    end_id integer NOT NULL,
    end_logradouro character varying(100) NOT NULL,
    end_numero integer NOT NULL,
    end_bairro character varying(150) NOT NULL,
    end_cep character varying(10) NOT NULL,
    end_observacoes text,
    end_cid_id integer NOT NULL,
    end_pais_id integer NOT NULL,
    end_est_id integer NOT NULL,
    end_tip_res_id integer NOT NULL,
    end_tip_log_id integer NOT NULL,
    end_cobranca boolean,
    end_entrega boolean
);
    DROP TABLE public.enderecos;
       public         heap    postgres    false            �            1259    19457    enderecos_end_id_seq    SEQUENCE     �   CREATE SEQUENCE public.enderecos_end_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.enderecos_end_id_seq;
       public          postgres    false    237            <           0    0    enderecos_end_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.enderecos_end_id_seq OWNED BY public.enderecos.end_id;
          public          postgres    false    236            �            1259    19467    estados    TABLE     k   CREATE TABLE public.estados (
    est_id integer NOT NULL,
    est_nome character varying(100) NOT NULL
);
    DROP TABLE public.estados;
       public         heap    postgres    false            �            1259    19466    estados_est_id_seq    SEQUENCE     �   CREATE SEQUENCE public.estados_est_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.estados_est_id_seq;
       public          postgres    false    239            =           0    0    estados_est_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.estados_est_id_seq OWNED BY public.estados.est_id;
          public          postgres    false    238            �            1259    19474    estoque    TABLE       CREATE TABLE public.estoque (
    estq_id integer NOT NULL,
    estq_quantidade integer NOT NULL,
    estq_valor_custo numeric(10,2) NOT NULL,
    estq_dt_entrada date NOT NULL,
    estq_cal_id integer NOT NULL,
    estq_tamanho character varying(10),
    estq_for_id integer
);
    DROP TABLE public.estoque;
       public         heap    postgres    false            �            1259    19473    estoque_est_id_seq    SEQUENCE     �   CREATE SEQUENCE public.estoque_est_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.estoque_est_id_seq;
       public          postgres    false    241            >           0    0    estoque_est_id_seq    SEQUENCE OWNED BY     J   ALTER SEQUENCE public.estoque_est_id_seq OWNED BY public.estoque.estq_id;
          public          postgres    false    240                       1259    20074    fornecedores    TABLE     p   CREATE TABLE public.fornecedores (
    for_id integer NOT NULL,
    for_nome character varying(255) NOT NULL
);
     DROP TABLE public.fornecedores;
       public         heap    postgres    false                       1259    20073    fornecedores_for_id_seq    SEQUENCE     �   CREATE SEQUENCE public.fornecedores_for_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.fornecedores_for_id_seq;
       public          postgres    false    263            ?           0    0    fornecedores_for_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.fornecedores_for_id_seq OWNED BY public.fornecedores.for_id;
          public          postgres    false    262            �            1259    19481    generos    TABLE     j   CREATE TABLE public.generos (
    gen_id integer NOT NULL,
    gen_nome character varying(12) NOT NULL
);
    DROP TABLE public.generos;
       public         heap    postgres    false            �            1259    19480    generos_gen_id_seq    SEQUENCE     �   CREATE SEQUENCE public.generos_gen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.generos_gen_id_seq;
       public          postgres    false    243            @           0    0    generos_gen_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.generos_gen_id_seq OWNED BY public.generos.gen_id;
          public          postgres    false    242            �            1259    19488    grupos_precificacoes    TABLE     �   CREATE TABLE public.grupos_precificacoes (
    gru_pre_id integer NOT NULL,
    gru_pre_grupo character varying(255) NOT NULL,
    gru_pre_margem_lucro numeric(10,2) NOT NULL,
    gru_pre_autorizacao boolean NOT NULL
);
 (   DROP TABLE public.grupos_precificacoes;
       public         heap    postgres    false            �            1259    19487 #   grupos_precificacoes_gru_pre_id_seq    SEQUENCE     �   CREATE SEQUENCE public.grupos_precificacoes_gru_pre_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.grupos_precificacoes_gru_pre_id_seq;
       public          postgres    false    245            A           0    0 #   grupos_precificacoes_gru_pre_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.grupos_precificacoes_gru_pre_id_seq OWNED BY public.grupos_precificacoes.gru_pre_id;
          public          postgres    false    244            
           1259    20141    logs    TABLE     @  CREATE TABLE public.logs (
    log_id integer NOT NULL,
    log_data_hora character varying(100),
    log_usuario text,
    log_tipo_alteracao text,
    log_tabela_alterada text,
    log_id_alterado integer,
    log_coluna_alterada text,
    log_valor_antigo text,
    log_valor_novo text,
    log_json_insercao json
);
    DROP TABLE public.logs;
       public         heap    postgres    false            	           1259    20140    logs_log_id_seq    SEQUENCE     �   CREATE SEQUENCE public.logs_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.logs_log_id_seq;
       public          postgres    false    266            B           0    0    logs_log_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.logs_log_id_seq OWNED BY public.logs.log_id;
          public          postgres    false    265            �            1259    19504    paises    TABLE     l   CREATE TABLE public.paises (
    pais_id integer NOT NULL,
    pais_nome character varying(255) NOT NULL
);
    DROP TABLE public.paises;
       public         heap    postgres    false            �            1259    19503    paises_pais_id_seq    SEQUENCE     �   CREATE SEQUENCE public.paises_pais_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.paises_pais_id_seq;
       public          postgres    false    247            C           0    0    paises_pais_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.paises_pais_id_seq OWNED BY public.paises.pais_id;
          public          postgres    false    246            �            1259    19511    pedidos    TABLE       CREATE TABLE public.pedidos (
    ped_id integer NOT NULL,
    ped_sta_comp_id integer,
    ped_cli_id integer NOT NULL,
    ped_valor_total numeric,
    ped_valor_frete numeric,
    ped_valor_produtos numeric,
    ped_valor_cod_promo integer,
    ped_end_id integer
);
    DROP TABLE public.pedidos;
       public         heap    postgres    false            �            1259    19518    pedidos_calcados    TABLE     *  CREATE TABLE public.pedidos_calcados (
    ped_cal_id integer NOT NULL,
    ped_cal_ped_id integer NOT NULL,
    ped_cal_cal_id integer NOT NULL,
    ped_cal_quant integer,
    ped_cal_tamanho integer,
    motivo_devolucao text,
    troca_solicitada boolean,
    ped_cal_quant_devolucao integer
);
 $   DROP TABLE public.pedidos_calcados;
       public         heap    postgres    false            �            1259    19517    pedidos_calcados_ped_cal_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pedidos_calcados_ped_cal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.pedidos_calcados_ped_cal_id_seq;
       public          postgres    false    251            D           0    0    pedidos_calcados_ped_cal_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.pedidos_calcados_ped_cal_id_seq OWNED BY public.pedidos_calcados.ped_cal_id;
          public          postgres    false    250                       1259    20202    pedidos_cartoes    TABLE     �   CREATE TABLE public.pedidos_cartoes (
    ped_car_id integer,
    ped_car_car_id integer,
    ped_car_ped_id integer,
    ped_car_valor_utilizado numeric DEFAULT 0.00
);
 #   DROP TABLE public.pedidos_cartoes;
       public         heap    postgres    false            �            1259    19510    pedidos_ped_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pedidos_ped_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.pedidos_ped_id_seq;
       public          postgres    false    249            E           0    0    pedidos_ped_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.pedidos_ped_id_seq OWNED BY public.pedidos.ped_id;
          public          postgres    false    248            �            1259    19525    status_compra    TABLE     z   CREATE TABLE public.status_compra (
    sta_comp_id integer NOT NULL,
    sta_comp_fase character varying(50) NOT NULL
);
 !   DROP TABLE public.status_compra;
       public         heap    postgres    false            �            1259    19524    status_compra_sta_comp_id_seq    SEQUENCE     �   CREATE SEQUENCE public.status_compra_sta_comp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.status_compra_sta_comp_id_seq;
       public          postgres    false    253            F           0    0    status_compra_sta_comp_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.status_compra_sta_comp_id_seq OWNED BY public.status_compra.sta_comp_id;
          public          postgres    false    252                       1259    20134 
   tipo_cupom    TABLE     e   CREATE TABLE public.tipo_cupom (
    id integer NOT NULL,
    nome character varying(50) NOT NULL
);
    DROP TABLE public.tipo_cupom;
       public         heap    postgres    false            �            1259    19539    tipos_logradouros    TABLE     }   CREATE TABLE public.tipos_logradouros (
    tip_log_id integer NOT NULL,
    tip_log_nome character varying(100) NOT NULL
);
 %   DROP TABLE public.tipos_logradouros;
       public         heap    postgres    false            �            1259    19538     tipos_logradouros_tip_log_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tipos_logradouros_tip_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.tipos_logradouros_tip_log_id_seq;
       public          postgres    false    255            G           0    0     tipos_logradouros_tip_log_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.tipos_logradouros_tip_log_id_seq OWNED BY public.tipos_logradouros.tip_log_id;
          public          postgres    false    254                       1259    19546    tipos_residencias    TABLE     }   CREATE TABLE public.tipos_residencias (
    tip_res_id integer NOT NULL,
    tip_res_nome character varying(100) NOT NULL
);
 %   DROP TABLE public.tipos_residencias;
       public         heap    postgres    false                        1259    19545     tipos_residencias_tip_res_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tipos_residencias_tip_res_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.tipos_residencias_tip_res_id_seq;
       public          postgres    false    257            H           0    0     tipos_residencias_tip_res_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.tipos_residencias_tip_res_id_seq OWNED BY public.tipos_residencias.tip_res_id;
          public          postgres    false    256                       1259    19553    tipos_telefones    TABLE     {   CREATE TABLE public.tipos_telefones (
    tip_tel_id integer NOT NULL,
    tip_tel_nome character varying(100) NOT NULL
);
 #   DROP TABLE public.tipos_telefones;
       public         heap    postgres    false                       1259    19552    tipos_telefones_tip_tel_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tipos_telefones_tip_tel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.tipos_telefones_tip_tel_id_seq;
       public          postgres    false    259            I           0    0    tipos_telefones_tip_tel_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.tipos_telefones_tip_tel_id_seq OWNED BY public.tipos_telefones.tip_tel_id;
          public          postgres    false    258                       1259    19560 
   transacoes    TABLE     �   CREATE TABLE public.transacoes (
    tra_id integer NOT NULL,
    tra_data_hora date NOT NULL,
    tra_cli_id integer NOT NULL,
    tra_ped_id integer
);
    DROP TABLE public.transacoes;
       public         heap    postgres    false                       1259    19559    transacoes_tra_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transacoes_tra_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.transacoes_tra_id_seq;
       public          postgres    false    261            J           0    0    transacoes_tra_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.transacoes_tra_id_seq OWNED BY public.transacoes.tra_id;
          public          postgres    false    260            �           2604    19380    bandeiras ban_id    DEFAULT     t   ALTER TABLE ONLY public.bandeiras ALTER COLUMN ban_id SET DEFAULT nextval('public.bandeiras_ban_id_seq'::regclass);
 ?   ALTER TABLE public.bandeiras ALTER COLUMN ban_id DROP DEFAULT;
       public          postgres    false    214    215    215            �           2604    19387    calcados cal_id    DEFAULT     r   ALTER TABLE ONLY public.calcados ALTER COLUMN cal_id SET DEFAULT nextval('public.calcados_cal_id_seq'::regclass);
 >   ALTER TABLE public.calcados ALTER COLUMN cal_id DROP DEFAULT;
       public          postgres    false    216    217    217            �           2604    19396    cartoes car_id    DEFAULT     p   ALTER TABLE ONLY public.cartoes ALTER COLUMN car_id SET DEFAULT nextval('public.cartoes_car_id_seq'::regclass);
 =   ALTER TABLE public.cartoes ALTER COLUMN car_id DROP DEFAULT;
       public          postgres    false    219    218    219            �           2604    19403    categorias cat_id    DEFAULT     v   ALTER TABLE ONLY public.categorias ALTER COLUMN cat_id SET DEFAULT nextval('public.categorias_cat_id_seq'::regclass);
 @   ALTER TABLE public.categorias ALTER COLUMN cat_id DROP DEFAULT;
       public          postgres    false    220    221    221            �           2604    19410    cidades cid_id    DEFAULT     p   ALTER TABLE ONLY public.cidades ALTER COLUMN cid_id SET DEFAULT nextval('public.cidades_cid_id_seq'::regclass);
 =   ALTER TABLE public.cidades ALTER COLUMN cid_id DROP DEFAULT;
       public          postgres    false    223    222    223            �           2604    19417    clientes cli_id    DEFAULT     r   ALTER TABLE ONLY public.clientes ALTER COLUMN cli_id SET DEFAULT nextval('public.clientes_cli_id_seq'::regclass);
 >   ALTER TABLE public.clientes ALTER COLUMN cli_id DROP DEFAULT;
       public          postgres    false    225    224    225            �           2604    19426    clientes_cartoes cli_car_id    DEFAULT     �   ALTER TABLE ONLY public.clientes_cartoes ALTER COLUMN cli_car_id SET DEFAULT nextval('public.clientes_cartoes_cli_car_id_seq'::regclass);
 J   ALTER TABLE public.clientes_cartoes ALTER COLUMN cli_car_id DROP DEFAULT;
       public          postgres    false    226    227    227            �           2604    19433    clientes_cupons cli_cup_id    DEFAULT     �   ALTER TABLE ONLY public.clientes_cupons ALTER COLUMN cli_cup_id SET DEFAULT nextval('public.clientes_cupons_cli_cup_id_seq'::regclass);
 I   ALTER TABLE public.clientes_cupons ALTER COLUMN cli_cup_id DROP DEFAULT;
       public          postgres    false    228    229    229            �           2604    19440    clientes_enderecos cli_end_id    DEFAULT     �   ALTER TABLE ONLY public.clientes_enderecos ALTER COLUMN cli_end_id SET DEFAULT nextval('public.clientes_enderecos_cli_end_id_seq'::regclass);
 L   ALTER TABLE public.clientes_enderecos ALTER COLUMN cli_end_id DROP DEFAULT;
       public          postgres    false    231    230    231            �           2604    19447    cupons cup_id    DEFAULT     n   ALTER TABLE ONLY public.cupons ALTER COLUMN cup_id SET DEFAULT nextval('public.cupons_cup_id_seq'::regclass);
 <   ALTER TABLE public.cupons ALTER COLUMN cup_id DROP DEFAULT;
       public          postgres    false    232    233    233            �           2604    19454    cupons_pedidos cup_ped_id    DEFAULT     �   ALTER TABLE ONLY public.cupons_pedidos ALTER COLUMN cup_ped_id SET DEFAULT nextval('public.cupons_pedidos_cup_ped_id_seq'::regclass);
 H   ALTER TABLE public.cupons_pedidos ALTER COLUMN cup_ped_id DROP DEFAULT;
       public          postgres    false    235    234    235            �           2604    19461    enderecos end_id    DEFAULT     t   ALTER TABLE ONLY public.enderecos ALTER COLUMN end_id SET DEFAULT nextval('public.enderecos_end_id_seq'::regclass);
 ?   ALTER TABLE public.enderecos ALTER COLUMN end_id DROP DEFAULT;
       public          postgres    false    236    237    237            �           2604    19470    estados est_id    DEFAULT     p   ALTER TABLE ONLY public.estados ALTER COLUMN est_id SET DEFAULT nextval('public.estados_est_id_seq'::regclass);
 =   ALTER TABLE public.estados ALTER COLUMN est_id DROP DEFAULT;
       public          postgres    false    238    239    239            �           2604    19477    estoque estq_id    DEFAULT     q   ALTER TABLE ONLY public.estoque ALTER COLUMN estq_id SET DEFAULT nextval('public.estoque_est_id_seq'::regclass);
 >   ALTER TABLE public.estoque ALTER COLUMN estq_id DROP DEFAULT;
       public          postgres    false    240    241    241            
           2604    20077    fornecedores for_id    DEFAULT     z   ALTER TABLE ONLY public.fornecedores ALTER COLUMN for_id SET DEFAULT nextval('public.fornecedores_for_id_seq'::regclass);
 B   ALTER TABLE public.fornecedores ALTER COLUMN for_id DROP DEFAULT;
       public          postgres    false    263    262    263                        2604    19484    generos gen_id    DEFAULT     p   ALTER TABLE ONLY public.generos ALTER COLUMN gen_id SET DEFAULT nextval('public.generos_gen_id_seq'::regclass);
 =   ALTER TABLE public.generos ALTER COLUMN gen_id DROP DEFAULT;
       public          postgres    false    243    242    243                       2604    19491    grupos_precificacoes gru_pre_id    DEFAULT     �   ALTER TABLE ONLY public.grupos_precificacoes ALTER COLUMN gru_pre_id SET DEFAULT nextval('public.grupos_precificacoes_gru_pre_id_seq'::regclass);
 N   ALTER TABLE public.grupos_precificacoes ALTER COLUMN gru_pre_id DROP DEFAULT;
       public          postgres    false    245    244    245                       2604    20144    logs log_id    DEFAULT     j   ALTER TABLE ONLY public.logs ALTER COLUMN log_id SET DEFAULT nextval('public.logs_log_id_seq'::regclass);
 :   ALTER TABLE public.logs ALTER COLUMN log_id DROP DEFAULT;
       public          postgres    false    266    265    266                       2604    19507    paises pais_id    DEFAULT     p   ALTER TABLE ONLY public.paises ALTER COLUMN pais_id SET DEFAULT nextval('public.paises_pais_id_seq'::regclass);
 =   ALTER TABLE public.paises ALTER COLUMN pais_id DROP DEFAULT;
       public          postgres    false    247    246    247                       2604    19514    pedidos ped_id    DEFAULT     p   ALTER TABLE ONLY public.pedidos ALTER COLUMN ped_id SET DEFAULT nextval('public.pedidos_ped_id_seq'::regclass);
 =   ALTER TABLE public.pedidos ALTER COLUMN ped_id DROP DEFAULT;
       public          postgres    false    249    248    249                       2604    19521    pedidos_calcados ped_cal_id    DEFAULT     �   ALTER TABLE ONLY public.pedidos_calcados ALTER COLUMN ped_cal_id SET DEFAULT nextval('public.pedidos_calcados_ped_cal_id_seq'::regclass);
 J   ALTER TABLE public.pedidos_calcados ALTER COLUMN ped_cal_id DROP DEFAULT;
       public          postgres    false    250    251    251                       2604    19528    status_compra sta_comp_id    DEFAULT     �   ALTER TABLE ONLY public.status_compra ALTER COLUMN sta_comp_id SET DEFAULT nextval('public.status_compra_sta_comp_id_seq'::regclass);
 H   ALTER TABLE public.status_compra ALTER COLUMN sta_comp_id DROP DEFAULT;
       public          postgres    false    252    253    253                       2604    19542    tipos_logradouros tip_log_id    DEFAULT     �   ALTER TABLE ONLY public.tipos_logradouros ALTER COLUMN tip_log_id SET DEFAULT nextval('public.tipos_logradouros_tip_log_id_seq'::regclass);
 K   ALTER TABLE public.tipos_logradouros ALTER COLUMN tip_log_id DROP DEFAULT;
       public          postgres    false    254    255    255                       2604    19549    tipos_residencias tip_res_id    DEFAULT     �   ALTER TABLE ONLY public.tipos_residencias ALTER COLUMN tip_res_id SET DEFAULT nextval('public.tipos_residencias_tip_res_id_seq'::regclass);
 K   ALTER TABLE public.tipos_residencias ALTER COLUMN tip_res_id DROP DEFAULT;
       public          postgres    false    256    257    257                       2604    19556    tipos_telefones tip_tel_id    DEFAULT     �   ALTER TABLE ONLY public.tipos_telefones ALTER COLUMN tip_tel_id SET DEFAULT nextval('public.tipos_telefones_tip_tel_id_seq'::regclass);
 I   ALTER TABLE public.tipos_telefones ALTER COLUMN tip_tel_id DROP DEFAULT;
       public          postgres    false    259    258    259            	           2604    19563    transacoes tra_id    DEFAULT     v   ALTER TABLE ONLY public.transacoes ALTER COLUMN tra_id SET DEFAULT nextval('public.transacoes_tra_id_seq'::regclass);
 @   ALTER TABLE public.transacoes ALTER COLUMN tra_id DROP DEFAULT;
       public          postgres    false    261    260    261            �          0    19377 	   bandeiras 
   TABLE DATA           5   COPY public.bandeiras (ban_id, ban_nome) FROM stdin;
    public          postgres    false    215   �0      �          0    19384    calcados 
   TABLE DATA           �   COPY public.calcados (cal_id, cal_marca, cal_modelo, cal_valor, cal_dt_fabric, cal_titulo, cal_cor, cal_tamanho, cal_peso, cal_comprimento, cal_largura, cal_grup_precifi, cal_cod_barras, cal_status_motivo, cal_gru_pre_id, cal_cat_id) FROM stdin;
    public          postgres    false    217   %1      �          0    19393    cartoes 
   TABLE DATA           [   COPY public.cartoes (car_id, car_num, car_nome, car_cod_seguranca, car_ban_id) FROM stdin;
    public          postgres    false    219   4      �          0    19400 
   categorias 
   TABLE DATA           6   COPY public.categorias (cat_id, cat_nome) FROM stdin;
    public          postgres    false    221   s4      �          0    19407    cidades 
   TABLE DATA           3   COPY public.cidades (cid_id, cid_nome) FROM stdin;
    public          postgres    false    223   �4                 0    19414    clientes 
   TABLE DATA           �   COPY public.clientes (cli_id, cli_nome, cli_dt_nascimento, cli_cpf, cli_telefone, cli_email, cli_senha, cli_ranking, cli_status, cli_tip_tel_id, cli_gen_id) FROM stdin;
    public          postgres    false    225   ��                0    19423    clientes_cartoes 
   TABLE DATA           V   COPY public.clientes_cartoes (cli_car_id, cli_car_cli_id, cli_car_car_id) FROM stdin;
    public          postgres    false    227   ��                0    19430    clientes_cupons 
   TABLE DATA           U   COPY public.clientes_cupons (cli_cup_id, cli_cup_cli_id, cli_cup_cup_id) FROM stdin;
    public          postgres    false    229   ��                0    19437    clientes_enderecos 
   TABLE DATA           X   COPY public.clientes_enderecos (cli_end_id, cri_end_cli_id, cri_end_end_id) FROM stdin;
    public          postgres    false    231   *�                0    19444    cupons 
   TABLE DATA           `   COPY public.cupons (cup_id, cup_nome, cup_valor, cup_ativo, cup_tip_id, cup_cli_id) FROM stdin;
    public          postgres    false    233   Q�      
          0    19451    cupons_pedidos 
   TABLE DATA           T   COPY public.cupons_pedidos (cup_ped_id, cup_ped_ped_id, cup_ped_cup_id) FROM stdin;
    public          postgres    false    235   �                0    19458 	   enderecos 
   TABLE DATA           �   COPY public.enderecos (end_id, end_logradouro, end_numero, end_bairro, end_cep, end_observacoes, end_cid_id, end_pais_id, end_est_id, end_tip_res_id, end_tip_log_id, end_cobranca, end_entrega) FROM stdin;
    public          postgres    false    237   6�                0    19467    estados 
   TABLE DATA           3   COPY public.estados (est_id, est_nome) FROM stdin;
    public          postgres    false    239   ��                0    19474    estoque 
   TABLE DATA           �   COPY public.estoque (estq_id, estq_quantidade, estq_valor_custo, estq_dt_entrada, estq_cal_id, estq_tamanho, estq_for_id) FROM stdin;
    public          postgres    false    241   (�      &          0    20074    fornecedores 
   TABLE DATA           8   COPY public.fornecedores (for_id, for_nome) FROM stdin;
    public          postgres    false    263   P�                0    19481    generos 
   TABLE DATA           3   COPY public.generos (gen_id, gen_nome) FROM stdin;
    public          postgres    false    243   ��                0    19488    grupos_precificacoes 
   TABLE DATA           t   COPY public.grupos_precificacoes (gru_pre_id, gru_pre_grupo, gru_pre_margem_lucro, gru_pre_autorizacao) FROM stdin;
    public          postgres    false    245   	�      )          0    20141    logs 
   TABLE DATA           �   COPY public.logs (log_id, log_data_hora, log_usuario, log_tipo_alteracao, log_tabela_alterada, log_id_alterado, log_coluna_alterada, log_valor_antigo, log_valor_novo, log_json_insercao) FROM stdin;
    public          postgres    false    266   P�                0    19504    paises 
   TABLE DATA           4   COPY public.paises (pais_id, pais_nome) FROM stdin;
    public          postgres    false    247   1�                0    19511    pedidos 
   TABLE DATA           �   COPY public.pedidos (ped_id, ped_sta_comp_id, ped_cli_id, ped_valor_total, ped_valor_frete, ped_valor_produtos, ped_valor_cod_promo, ped_end_id) FROM stdin;
    public          postgres    false    249   ��                0    19518    pedidos_calcados 
   TABLE DATA           �   COPY public.pedidos_calcados (ped_cal_id, ped_cal_ped_id, ped_cal_cal_id, ped_cal_quant, ped_cal_tamanho, motivo_devolucao, troca_solicitada, ped_cal_quant_devolucao) FROM stdin;
    public          postgres    false    251   M�      *          0    20202    pedidos_cartoes 
   TABLE DATA           n   COPY public.pedidos_cartoes (ped_car_id, ped_car_car_id, ped_car_ped_id, ped_car_valor_utilizado) FROM stdin;
    public          postgres    false    267   ,�                0    19525    status_compra 
   TABLE DATA           C   COPY public.status_compra (sta_comp_id, sta_comp_fase) FROM stdin;
    public          postgres    false    253   ��      '          0    20134 
   tipo_cupom 
   TABLE DATA           .   COPY public.tipo_cupom (id, nome) FROM stdin;
    public          postgres    false    264   A�                0    19539    tipos_logradouros 
   TABLE DATA           E   COPY public.tipos_logradouros (tip_log_id, tip_log_nome) FROM stdin;
    public          postgres    false    255   t�                 0    19546    tipos_residencias 
   TABLE DATA           E   COPY public.tipos_residencias (tip_res_id, tip_res_nome) FROM stdin;
    public          postgres    false    257   ��      "          0    19553    tipos_telefones 
   TABLE DATA           C   COPY public.tipos_telefones (tip_tel_id, tip_tel_nome) FROM stdin;
    public          postgres    false    259   �      $          0    19560 
   transacoes 
   TABLE DATA           S   COPY public.transacoes (tra_id, tra_data_hora, tra_cli_id, tra_ped_id) FROM stdin;
    public          postgres    false    261   H�      K           0    0    bandeiras_ban_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.bandeiras_ban_id_seq', 17, true);
          public          postgres    false    214            L           0    0    calcados_cal_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.calcados_cal_id_seq', 20, true);
          public          postgres    false    216            M           0    0    cartoes_car_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.cartoes_car_id_seq', 4, true);
          public          postgres    false    218            N           0    0    categorias_cat_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.categorias_cat_id_seq', 5, true);
          public          postgres    false    220            O           0    0    cidades_cid_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.cidades_cid_id_seq', 11194, true);
          public          postgres    false    222            P           0    0    clientes_cartoes_cli_car_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.clientes_cartoes_cli_car_id_seq', 5, true);
          public          postgres    false    226            Q           0    0    clientes_cli_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.clientes_cli_id_seq', 8, true);
          public          postgres    false    224            R           0    0    clientes_cupons_cli_cup_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.clientes_cupons_cli_cup_id_seq', 3, true);
          public          postgres    false    228            S           0    0 !   clientes_enderecos_cli_end_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.clientes_enderecos_cli_end_id_seq', 10, true);
          public          postgres    false    230            T           0    0    cupons_cup_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.cupons_cup_id_seq', 10, true);
          public          postgres    false    232            U           0    0    cupons_pedidos_cup_ped_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.cupons_pedidos_cup_ped_id_seq', 18, true);
          public          postgres    false    234            V           0    0    enderecos_end_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.enderecos_end_id_seq', 9, true);
          public          postgres    false    236            W           0    0    estados_est_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.estados_est_id_seq', 76, true);
          public          postgres    false    238            X           0    0    estoque_est_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.estoque_est_id_seq', 135, true);
          public          postgres    false    240            Y           0    0    fornecedores_for_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.fornecedores_for_id_seq', 5, true);
          public          postgres    false    262            Z           0    0    generos_gen_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.generos_gen_id_seq', 2, true);
          public          postgres    false    242            [           0    0 #   grupos_precificacoes_gru_pre_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.grupos_precificacoes_gru_pre_id_seq', 3, true);
          public          postgres    false    244            \           0    0    logs_log_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.logs_log_id_seq', 173, true);
          public          postgres    false    265            ]           0    0    paises_pais_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.paises_pais_id_seq', 55, true);
          public          postgres    false    246            ^           0    0    pedidos_calcados_ped_cal_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.pedidos_calcados_ped_cal_id_seq', 63, true);
          public          postgres    false    250            _           0    0    pedidos_ped_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.pedidos_ped_id_seq', 10, true);
          public          postgres    false    248            `           0    0    status_compra_sta_comp_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.status_compra_sta_comp_id_seq', 9, true);
          public          postgres    false    252            a           0    0     tipos_logradouros_tip_log_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.tipos_logradouros_tip_log_id_seq', 8, true);
          public          postgres    false    254            b           0    0     tipos_residencias_tip_res_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.tipos_residencias_tip_res_id_seq', 3, true);
          public          postgres    false    256            c           0    0    tipos_telefones_tip_tel_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.tipos_telefones_tip_tel_id_seq', 2, true);
          public          postgres    false    258            d           0    0    transacoes_tra_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.transacoes_tra_id_seq', 10, true);
          public          postgres    false    260                       2606    19382    bandeiras bandeiras_pk 
   CONSTRAINT     X   ALTER TABLE ONLY public.bandeiras
    ADD CONSTRAINT bandeiras_pk PRIMARY KEY (ban_id);
 @   ALTER TABLE ONLY public.bandeiras DROP CONSTRAINT bandeiras_pk;
       public            postgres    false    215                       2606    19391    calcados calcados_pk 
   CONSTRAINT     V   ALTER TABLE ONLY public.calcados
    ADD CONSTRAINT calcados_pk PRIMARY KEY (cal_id);
 >   ALTER TABLE ONLY public.calcados DROP CONSTRAINT calcados_pk;
       public            postgres    false    217                       2606    19398    cartoes cartoes_pk 
   CONSTRAINT     T   ALTER TABLE ONLY public.cartoes
    ADD CONSTRAINT cartoes_pk PRIMARY KEY (car_id);
 <   ALTER TABLE ONLY public.cartoes DROP CONSTRAINT cartoes_pk;
       public            postgres    false    219                       2606    19405    categorias categorias_pk 
   CONSTRAINT     Z   ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pk PRIMARY KEY (cat_id);
 B   ALTER TABLE ONLY public.categorias DROP CONSTRAINT categorias_pk;
       public            postgres    false    221                       2606    19412    cidades cidades_pk 
   CONSTRAINT     T   ALTER TABLE ONLY public.cidades
    ADD CONSTRAINT cidades_pk PRIMARY KEY (cid_id);
 <   ALTER TABLE ONLY public.cidades DROP CONSTRAINT cidades_pk;
       public            postgres    false    223                       2606    19435 "   clientes_cupons clientes_cupons_pk 
   CONSTRAINT     h   ALTER TABLE ONLY public.clientes_cupons
    ADD CONSTRAINT clientes_cupons_pk PRIMARY KEY (cli_cup_id);
 L   ALTER TABLE ONLY public.clientes_cupons DROP CONSTRAINT clientes_cupons_pk;
       public            postgres    false    229                       2606    19428 %   clientes_cartoes clientes_cuponsv1_pk 
   CONSTRAINT     k   ALTER TABLE ONLY public.clientes_cartoes
    ADD CONSTRAINT clientes_cuponsv1_pk PRIMARY KEY (cli_car_id);
 O   ALTER TABLE ONLY public.clientes_cartoes DROP CONSTRAINT clientes_cuponsv1_pk;
       public            postgres    false    227                       2606    19442 (   clientes_enderecos clientes_enderecos_pk 
   CONSTRAINT     n   ALTER TABLE ONLY public.clientes_enderecos
    ADD CONSTRAINT clientes_enderecos_pk PRIMARY KEY (cli_end_id);
 R   ALTER TABLE ONLY public.clientes_enderecos DROP CONSTRAINT clientes_enderecos_pk;
       public            postgres    false    231                       2606    19421    clientes clientes_pk 
   CONSTRAINT     V   ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pk PRIMARY KEY (cli_id);
 >   ALTER TABLE ONLY public.clientes DROP CONSTRAINT clientes_pk;
       public            postgres    false    225            "           2606    19456     cupons_pedidos cupons_pedidos_pk 
   CONSTRAINT     f   ALTER TABLE ONLY public.cupons_pedidos
    ADD CONSTRAINT cupons_pedidos_pk PRIMARY KEY (cup_ped_id);
 J   ALTER TABLE ONLY public.cupons_pedidos DROP CONSTRAINT cupons_pedidos_pk;
       public            postgres    false    235                        2606    19449    cupons cupons_pk 
   CONSTRAINT     R   ALTER TABLE ONLY public.cupons
    ADD CONSTRAINT cupons_pk PRIMARY KEY (cup_id);
 :   ALTER TABLE ONLY public.cupons DROP CONSTRAINT cupons_pk;
       public            postgres    false    233            $           2606    19465    enderecos enderecos_pk 
   CONSTRAINT     X   ALTER TABLE ONLY public.enderecos
    ADD CONSTRAINT enderecos_pk PRIMARY KEY (end_id);
 @   ALTER TABLE ONLY public.enderecos DROP CONSTRAINT enderecos_pk;
       public            postgres    false    237            &           2606    19472    estados estados_pk 
   CONSTRAINT     T   ALTER TABLE ONLY public.estados
    ADD CONSTRAINT estados_pk PRIMARY KEY (est_id);
 <   ALTER TABLE ONLY public.estados DROP CONSTRAINT estados_pk;
       public            postgres    false    239            (           2606    19479    estoque estoques_pk 
   CONSTRAINT     V   ALTER TABLE ONLY public.estoque
    ADD CONSTRAINT estoques_pk PRIMARY KEY (estq_id);
 =   ALTER TABLE ONLY public.estoque DROP CONSTRAINT estoques_pk;
       public            postgres    false    241            >           2606    20079    fornecedores fornecedores_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.fornecedores
    ADD CONSTRAINT fornecedores_pkey PRIMARY KEY (for_id);
 H   ALTER TABLE ONLY public.fornecedores DROP CONSTRAINT fornecedores_pkey;
       public            postgres    false    263            *           2606    19486    generos generos_pk 
   CONSTRAINT     T   ALTER TABLE ONLY public.generos
    ADD CONSTRAINT generos_pk PRIMARY KEY (gen_id);
 <   ALTER TABLE ONLY public.generos DROP CONSTRAINT generos_pk;
       public            postgres    false    243            ,           2606    19493 ,   grupos_precificacoes grupos_precificacoes_pk 
   CONSTRAINT     r   ALTER TABLE ONLY public.grupos_precificacoes
    ADD CONSTRAINT grupos_precificacoes_pk PRIMARY KEY (gru_pre_id);
 V   ALTER TABLE ONLY public.grupos_precificacoes DROP CONSTRAINT grupos_precificacoes_pk;
       public            postgres    false    245            B           2606    20148    logs logs_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_pkey PRIMARY KEY (log_id);
 8   ALTER TABLE ONLY public.logs DROP CONSTRAINT logs_pkey;
       public            postgres    false    266            .           2606    19509    paises paises_pk 
   CONSTRAINT     S   ALTER TABLE ONLY public.paises
    ADD CONSTRAINT paises_pk PRIMARY KEY (pais_id);
 :   ALTER TABLE ONLY public.paises DROP CONSTRAINT paises_pk;
       public            postgres    false    247            2           2606    19523 $   pedidos_calcados pedidos_calcados_pk 
   CONSTRAINT     j   ALTER TABLE ONLY public.pedidos_calcados
    ADD CONSTRAINT pedidos_calcados_pk PRIMARY KEY (ped_cal_id);
 N   ALTER TABLE ONLY public.pedidos_calcados DROP CONSTRAINT pedidos_calcados_pk;
       public            postgres    false    251            0           2606    19516    pedidos pedidos_pk 
   CONSTRAINT     T   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pk PRIMARY KEY (ped_id);
 <   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT pedidos_pk;
       public            postgres    false    249            4           2606    19530    status_compra status_pedido_pk 
   CONSTRAINT     e   ALTER TABLE ONLY public.status_compra
    ADD CONSTRAINT status_pedido_pk PRIMARY KEY (sta_comp_id);
 H   ALTER TABLE ONLY public.status_compra DROP CONSTRAINT status_pedido_pk;
       public            postgres    false    253            @           2606    20138    tipo_cupom tipocupom_pk 
   CONSTRAINT     U   ALTER TABLE ONLY public.tipo_cupom
    ADD CONSTRAINT tipocupom_pk PRIMARY KEY (id);
 A   ALTER TABLE ONLY public.tipo_cupom DROP CONSTRAINT tipocupom_pk;
       public            postgres    false    264            6           2606    19544 &   tipos_logradouros tipos_logradouros_pk 
   CONSTRAINT     l   ALTER TABLE ONLY public.tipos_logradouros
    ADD CONSTRAINT tipos_logradouros_pk PRIMARY KEY (tip_log_id);
 P   ALTER TABLE ONLY public.tipos_logradouros DROP CONSTRAINT tipos_logradouros_pk;
       public            postgres    false    255            8           2606    19551 &   tipos_residencias tipos_residencias_pk 
   CONSTRAINT     l   ALTER TABLE ONLY public.tipos_residencias
    ADD CONSTRAINT tipos_residencias_pk PRIMARY KEY (tip_res_id);
 P   ALTER TABLE ONLY public.tipos_residencias DROP CONSTRAINT tipos_residencias_pk;
       public            postgres    false    257            :           2606    19558 "   tipos_telefones tipos_telefones_pk 
   CONSTRAINT     h   ALTER TABLE ONLY public.tipos_telefones
    ADD CONSTRAINT tipos_telefones_pk PRIMARY KEY (tip_tel_id);
 L   ALTER TABLE ONLY public.tipos_telefones DROP CONSTRAINT tipos_telefones_pk;
       public            postgres    false    259            <           2606    19565    transacoes transacoes_pk 
   CONSTRAINT     Z   ALTER TABLE ONLY public.transacoes
    ADD CONSTRAINT transacoes_pk PRIMARY KEY (tra_id);
 B   ALTER TABLE ONLY public.transacoes DROP CONSTRAINT transacoes_pk;
       public            postgres    false    261            _           2620    20159    calcados calcados_log_trigger    TRIGGER     �   CREATE TRIGGER calcados_log_trigger AFTER INSERT ON public.calcados FOR EACH ROW EXECUTE FUNCTION public.calcados_log_trigger();
 6   DROP TRIGGER calcados_log_trigger ON public.calcados;
       public          postgres    false    217    269            c           2620    20164    estoque calcados_log_trigger    TRIGGER        CREATE TRIGGER calcados_log_trigger AFTER INSERT ON public.estoque FOR EACH ROW EXECUTE FUNCTION public.estoque_log_trigger();
 5   DROP TRIGGER calcados_log_trigger ON public.estoque;
       public          postgres    false    285    241            a           2620    20154    clientes clientes_log_trigger    TRIGGER     �   CREATE TRIGGER clientes_log_trigger AFTER INSERT ON public.clientes FOR EACH ROW EXECUTE FUNCTION public.clientes_log_trigger();
 6   DROP TRIGGER clientes_log_trigger ON public.clientes;
       public          postgres    false    268    225            e           2620    20167    pedidos pedidos_log_trigger    TRIGGER     ~   CREATE TRIGGER pedidos_log_trigger AFTER INSERT ON public.pedidos FOR EACH ROW EXECUTE FUNCTION public.pedidos_log_trigger();
 4   DROP TRIGGER pedidos_log_trigger ON public.pedidos;
       public          postgres    false    249    286            `           2620    20157    calcados trigger_logs_calcados    TRIGGER     �   CREATE TRIGGER trigger_logs_calcados AFTER UPDATE ON public.calcados FOR EACH ROW EXECUTE FUNCTION public.insere_log_calcados();
 7   DROP TRIGGER trigger_logs_calcados ON public.calcados;
       public          postgres    false    217    281            b           2620    20151    clientes trigger_logs_clientes    TRIGGER     �   CREATE TRIGGER trigger_logs_clientes AFTER UPDATE ON public.clientes FOR EACH ROW EXECUTE FUNCTION public.insere_log_clientes();
 7   DROP TRIGGER trigger_logs_clientes ON public.clientes;
       public          postgres    false    225    282            d           2620    20162    estoque trigger_logs_estoque    TRIGGER     ~   CREATE TRIGGER trigger_logs_estoque AFTER UPDATE ON public.estoque FOR EACH ROW EXECUTE FUNCTION public.insere_log_estoque();
 5   DROP TRIGGER trigger_logs_estoque ON public.estoque;
       public          postgres    false    284    241            f           2620    20165    pedidos trigger_logs_pedidos    TRIGGER     ~   CREATE TRIGGER trigger_logs_pedidos AFTER UPDATE ON public.pedidos FOR EACH ROW EXECUTE FUNCTION public.insere_log_pedidos();
 5   DROP TRIGGER trigger_logs_pedidos ON public.pedidos;
       public          postgres    false    283    249            C           2606    20020    calcados calcados_categorias_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.calcados
    ADD CONSTRAINT calcados_categorias_fk FOREIGN KEY (cal_cat_id) REFERENCES public.categorias(cat_id);
 I   ALTER TABLE ONLY public.calcados DROP CONSTRAINT calcados_categorias_fk;
       public          postgres    false    221    217    3348            D           2606    19566     calcados calcados_grp_precifi_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.calcados
    ADD CONSTRAINT calcados_grp_precifi_fk FOREIGN KEY (cal_gru_pre_id) REFERENCES public.grupos_precificacoes(gru_pre_id);
 J   ALTER TABLE ONLY public.calcados DROP CONSTRAINT calcados_grp_precifi_fk;
       public          postgres    false    217    245    3372            E           2606    19576    cartoes cartoes_bandeiras_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cartoes
    ADD CONSTRAINT cartoes_bandeiras_fk FOREIGN KEY (car_ban_id) REFERENCES public.bandeiras(ban_id);
 F   ALTER TABLE ONLY public.cartoes DROP CONSTRAINT cartoes_bandeiras_fk;
       public          postgres    false    215    3342    219            H           2606    19586 $   clientes_cartoes clientes_car_car_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.clientes_cartoes
    ADD CONSTRAINT clientes_car_car_fk FOREIGN KEY (cli_car_car_id) REFERENCES public.cartoes(car_id);
 N   ALTER TABLE ONLY public.clientes_cartoes DROP CONSTRAINT clientes_car_car_fk;
       public          postgres    false    219    227    3346            I           2606    19591 %   clientes_cartoes clientes_car_clis_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.clientes_cartoes
    ADD CONSTRAINT clientes_car_clis_fk FOREIGN KEY (cli_car_cli_id) REFERENCES public.clientes(cli_id);
 O   ALTER TABLE ONLY public.clientes_cartoes DROP CONSTRAINT clientes_car_clis_fk;
       public          postgres    false    227    225    3352            J           2606    19596 #   clientes_cupons clientes_cup_cli_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.clientes_cupons
    ADD CONSTRAINT clientes_cup_cli_fk FOREIGN KEY (cli_cup_cli_id) REFERENCES public.clientes(cli_id);
 M   ALTER TABLE ONLY public.clientes_cupons DROP CONSTRAINT clientes_cup_cli_fk;
       public          postgres    false    229    225    3352            K           2606    19601 #   clientes_cupons clientes_cup_cup_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.clientes_cupons
    ADD CONSTRAINT clientes_cup_cup_fk FOREIGN KEY (cli_cup_cup_id) REFERENCES public.cupons(cup_id);
 M   ALTER TABLE ONLY public.clientes_cupons DROP CONSTRAINT clientes_cup_cup_fk;
       public          postgres    false    233    3360    229            L           2606    19606 &   clientes_enderecos clientes_end_end_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.clientes_enderecos
    ADD CONSTRAINT clientes_end_end_fk FOREIGN KEY (cri_end_end_id) REFERENCES public.enderecos(end_id);
 P   ALTER TABLE ONLY public.clientes_enderecos DROP CONSTRAINT clientes_end_end_fk;
       public          postgres    false    231    237    3364            M           2606    19611 1   clientes_enderecos clientes_enderecos_clientes_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.clientes_enderecos
    ADD CONSTRAINT clientes_enderecos_clientes_fk FOREIGN KEY (cri_end_cli_id) REFERENCES public.clientes(cli_id);
 [   ALTER TABLE ONLY public.clientes_enderecos DROP CONSTRAINT clientes_enderecos_clientes_fk;
       public          postgres    false    3352    225    231            F           2606    19616    clientes clientes_generos_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_generos_fk FOREIGN KEY (cli_gen_id) REFERENCES public.generos(gen_id);
 F   ALTER TABLE ONLY public.clientes DROP CONSTRAINT clientes_generos_fk;
       public          postgres    false    3370    243    225            G           2606    19621 $   clientes clientes_tipos_telefones_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_tipos_telefones_fk FOREIGN KEY (cli_tip_tel_id) REFERENCES public.tipos_telefones(tip_tel_id);
 N   ALTER TABLE ONLY public.clientes DROP CONSTRAINT clientes_tipos_telefones_fk;
       public          postgres    false    225    259    3386            P           2606    19626     cupons_pedidos cupons_ped_cup_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cupons_pedidos
    ADD CONSTRAINT cupons_ped_cup_fk FOREIGN KEY (cup_ped_cup_id) REFERENCES public.cupons(cup_id);
 J   ALTER TABLE ONLY public.cupons_pedidos DROP CONSTRAINT cupons_ped_cup_fk;
       public          postgres    false    3360    233    235            Q           2606    20178     cupons_pedidos cupons_ped_ped_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.cupons_pedidos
    ADD CONSTRAINT cupons_ped_ped_fk FOREIGN KEY (cup_ped_ped_id) REFERENCES public.pedidos(ped_id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.cupons_pedidos DROP CONSTRAINT cupons_ped_ped_fk;
       public          postgres    false    3376    249    235            R           2606    19636    enderecos enderecos_cidades_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.enderecos
    ADD CONSTRAINT enderecos_cidades_fk FOREIGN KEY (end_cid_id) REFERENCES public.cidades(cid_id);
 H   ALTER TABLE ONLY public.enderecos DROP CONSTRAINT enderecos_cidades_fk;
       public          postgres    false    3350    223    237            S           2606    19641    enderecos enderecos_estados_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.enderecos
    ADD CONSTRAINT enderecos_estados_fk FOREIGN KEY (end_est_id) REFERENCES public.estados(est_id);
 H   ALTER TABLE ONLY public.enderecos DROP CONSTRAINT enderecos_estados_fk;
       public          postgres    false    3366    239    237            T           2606    19646    enderecos enderecos_paises_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.enderecos
    ADD CONSTRAINT enderecos_paises_fk FOREIGN KEY (end_pais_id) REFERENCES public.paises(pais_id);
 G   ALTER TABLE ONLY public.enderecos DROP CONSTRAINT enderecos_paises_fk;
       public          postgres    false    3374    247    237            U           2606    19651    enderecos enderecos_tip_log_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.enderecos
    ADD CONSTRAINT enderecos_tip_log_fk FOREIGN KEY (end_tip_log_id) REFERENCES public.tipos_logradouros(tip_log_id);
 H   ALTER TABLE ONLY public.enderecos DROP CONSTRAINT enderecos_tip_log_fk;
       public          postgres    false    237    3382    255            V           2606    19656    enderecos enderecos_tip_res_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.enderecos
    ADD CONSTRAINT enderecos_tip_res_fk FOREIGN KEY (end_tip_res_id) REFERENCES public.tipos_residencias(tip_res_id);
 H   ALTER TABLE ONLY public.enderecos DROP CONSTRAINT enderecos_tip_res_fk;
       public          postgres    false    3384    237    257            W           2606    20080     estoque estoque_estq_for_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.estoque
    ADD CONSTRAINT estoque_estq_for_id_fkey FOREIGN KEY (estq_for_id) REFERENCES public.fornecedores(for_id);
 J   ALTER TABLE ONLY public.estoque DROP CONSTRAINT estoque_estq_for_id_fkey;
       public          postgres    false    263    241    3390            X           2606    19661    estoque estoques_calcados_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.estoque
    ADD CONSTRAINT estoques_calcados_fk FOREIGN KEY (estq_cal_id) REFERENCES public.calcados(cal_id);
 F   ALTER TABLE ONLY public.estoque DROP CONSTRAINT estoques_calcados_fk;
       public          postgres    false    217    3344    241            N           2606    20194    cupons fk_cup_cli_id    FK CONSTRAINT     }   ALTER TABLE ONLY public.cupons
    ADD CONSTRAINT fk_cup_cli_id FOREIGN KEY (cup_cli_id) REFERENCES public.clientes(cli_id);
 >   ALTER TABLE ONLY public.cupons DROP CONSTRAINT fk_cup_cli_id;
       public          postgres    false    3352    233    225            O           2606    20189    cupons fk_cup_tip_id    FK CONSTRAINT     {   ALTER TABLE ONLY public.cupons
    ADD CONSTRAINT fk_cup_tip_id FOREIGN KEY (cup_tip_id) REFERENCES public.tipo_cupom(id);
 >   ALTER TABLE ONLY public.cupons DROP CONSTRAINT fk_cup_tip_id;
       public          postgres    false    264    3392    233            [           2606    19666 -   pedidos_calcados pedidos_calcados_calcados_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedidos_calcados
    ADD CONSTRAINT pedidos_calcados_calcados_fk FOREIGN KEY (ped_cal_cal_id) REFERENCES public.calcados(cal_id);
 W   ALTER TABLE ONLY public.pedidos_calcados DROP CONSTRAINT pedidos_calcados_calcados_fk;
       public          postgres    false    217    3344    251            \           2606    20183 ,   pedidos_calcados pedidos_calcados_pedidos_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedidos_calcados
    ADD CONSTRAINT pedidos_calcados_pedidos_fk FOREIGN KEY (ped_cal_ped_id) REFERENCES public.pedidos(ped_id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.pedidos_calcados DROP CONSTRAINT pedidos_calcados_pedidos_fk;
       public          postgres    false    251    249    3376            Y           2606    20168    pedidos pedidos_clientes_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_clientes_fk FOREIGN KEY (ped_cli_id) REFERENCES public.clientes(cli_id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT pedidos_clientes_fk;
       public          postgres    false    225    3352    249            Z           2606    19681     pedidos pedidos_status_compra_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_status_compra_fk FOREIGN KEY (ped_sta_comp_id) REFERENCES public.status_compra(sta_comp_id);
 J   ALTER TABLE ONLY public.pedidos DROP CONSTRAINT pedidos_status_compra_fk;
       public          postgres    false    249    3380    253            ]           2606    20127    transacoes tra_ped_fk    FK CONSTRAINT     }   ALTER TABLE ONLY public.transacoes
    ADD CONSTRAINT tra_ped_fk FOREIGN KEY (tra_ped_id) REFERENCES public.pedidos(ped_id);
 ?   ALTER TABLE ONLY public.transacoes DROP CONSTRAINT tra_ped_fk;
       public          postgres    false    3376    261    249            ^           2606    20173 !   transacoes transacoes_clientes_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.transacoes
    ADD CONSTRAINT transacoes_clientes_fk FOREIGN KEY (tra_cli_id) REFERENCES public.clientes(cli_id) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.transacoes DROP CONSTRAINT transacoes_clientes_fk;
       public          postgres    false    3352    261    225            �   N   x�3��M,.I-rN,J�2F�q�e'r� ��"s̐9��d�%2�� �g��C��j�!�Q,54��A�=F��� �B:      �   �  x����n�0�?�<�y�/	��)�Ӥr��4��Gܑ5`d���#�5�b��$a�&!'�����.0Q�&�Q�q.^ �a�0>�t�l~�<�'L$N��F+-s>2��p��=P�~��Qa�q?�'!1o�P?��J
����£�H�eMŐ���	)�$РF[%��x��a��z�{���[�K0�<.�?�3�N�D�GMz�J�����l��y�	p��X8\���f��ո8J}ʅ���kd��F�	�O�S��8X�ר��״�9'��2,sXe�Ν�eD�	a.s��*Ksq��t��M�4�p@GG�h���N��%�g��r�����ū�W��fYsyť�z�GJ`U��y�%~:n3C��\�Z�b-��c�w�����m�ȸ3vXZ�>��}�røQ���-��/�8Mo��V*s�Yq�Z)kJ�8��>�wF��n�4R[���r�I��"��S����o1��8k���$�-|l:�>�^��/^ǃϦ-������NW�����s���z{-�6�Y&��c ��f���+����-�P����2�q�6�>��v�Q�#7F��\�\�m�S���){��e��6�����t������_�.k��Me���4�D��LG-�s{Ԅv�6�
���\Ú�p[�濛��í�__1�)y�Y��C���>��h���u��S��)x����&�|yR:�x7E�ɞ�A�Vmq��H��==����      �   U   x�mʻ	�0 ��n�Lpx�B��&`�� :�������F9�4���,�>β�����O�W�0��(������H�č��N5      �   )   x�3�tN,.M��2��O�2L9]��J2��b���� �	�      �      x�|�Ms�Ɩ�;�����$�21T�>�:%[�JU���@���$h�P�5������=�(Gx�O���zߵHP�7찙�$� 2s}�ZO�+f��cu�z�v�A>���������ܹ�e���������]U��k�ϥ|^��F>����ꇺ�*|�/fW�\�Z��o��O���˦�*�S)��T���2��:���?ۨ>��髇�;���M�5[���U�㓛�m~��k�N���g7��K�nv_&W)g?�����d�9��n���Z�g?�]{q���I������;�苾޵�Jf�m'_�To��"����Z�V_ܜ����R���7�ŕ����|���4ۋ�|����b������O��٧f���[~�O妹���'�d�v�oh�[���ZS���R�
�+�^u{q���Z.r���V��mē<�qhQ��^�]s������횧�9>�b�c8T�=W�R�ݷ�����v�>��N�4��uSp��ն��c�ɐ�}��T�e�}����Ӆ���_b���M�Xw;j��۶��/���+~��dv}����q_���5�����ݺ���'~;�zE����C��5����'yfx(�B��]#/n6>Ņ������R�H�������H��v_כf_Go,YX��K������"If�Q<����tfO���^���ݗ�]v�-�}��=fK��OՆ��r�/!qCU4?�\u����rvy84�PR��g6����B�σ^4��_훯Ւ-2���I:�����2��ͱZ5��W�|��nN����[�SO��F�%_�x��RL�]+��c��v�R)U�j�T���/U���}w��l>�ݜ~[5kN�:��laS�_�ͱ�P�p���7R����� 3�W�e6�߷��O��z6��tx��y���ke®��k�fw��j����?d���e�u
o@�9g������eZ����\��ڞ��ϩ|ny�<�]�L������|BO�+�"�c���t�U��7-K%tT�T�5/g/��C�mvW�3�(Յ���>�����S�^��{Y�p�"����n
Yeڎ��d��0�g}�2����/����'� k���R�P���t��{��Y>Z�����]W������j�~W�9�\2{�{����k�x�?�� }P�g?�0j�Z*f�2����f���u�[a)k�Hȣ��B$�5n��)����4ܪͷx߼��ʷ2��s*��ߜ��w�ߖ�MĢ�wYu�W=�˿��W�"�����fe��紨8DD��T���&��/ն��	Y�W��7�n=+"︬_�*��X�puaߋ �s������x�B��,���by����U�y%��fb��x��{	����P-U��[�&;wh�vĚ�U���_�7�5�M���������s"��,��p-��}�w��bc��ꥬX�q�2�8�����Nd��,or���i!�}�kdrן��ȸ�vW�cq"�>�)�cq"�da^�Ps"�P� �r"�d���D�E��8�P̥��1��8��^��FFM�!��9m��5J�U���D(�Hg�{"���o+]���[^���bQ��n:N��ۖOM��j�<�˹���'��Gy���G*��rY������<%�'<';���1��9��h
�O�&�.�rS�D��P³�֪J:�;P��:D��򩫄�#����g�Cy��t����
D��N��]�%JdW��d�D�\>�:�D����}�\yQ�
�D���v2����q��ˊ	�B��7tU�|>�j�Db�*\?�4BgEb�h�o�CO��N��0�D��hh��c9��}eC\��Jmjj����6/����}տ��i�y�D�H�N�,��x@9�M3>y�|��6��9�s��m��4�}����.0b핈�E���)���	ܞ�*��D�:q"^��T�?ȗv#O�.�nU7�N輎n�FOv�f�6!vD t}<� ~d��������=m`�H�ǖt'�u}��R��+�]�'���f=�Oѽ�(z]q��i�E$�Y]}�{
]���m�;LoH՛��A!u/P�����Bw �B�E�Yu-OWֹ=�I���uEn]c�b�Dp���H��c?�>Gc^�c55&���/��#�X9}�������u�*"���(I����ŅE�A�-y]c7\)��1epq](!_��W��M�n�M�H��zs_��u#3���."�}��y�M�t��F��DT/̮�Atӫ�穊^���35�B^m1��A��"|Xs�l�푫��*�o�V��j�Aĺ���ꎴTX�g��g)�0�V�~�{�^d�ϝ����iy{�˒�$��zu^��ă�$��F�l3)~AE��o�ڰa��`��9����Ջ]t�a��`���mP�Xfq�e�'P���	�y������N+�|�7���jM��	5�KH�/�V>m(���"�U��"���k�
\�}��F�]�`䵻�fEZ��G�̋���E"�IP�X�2�EZ���B��e5.>��h5�"�Lcz
���!nq��[�͙әm�E�M���~�;[�|��Ye#%[�E�7>K���ݩ��3S��D#����Z��;����C�=����y3�{R�e}��i���0���cs����F�fݞ���L�����|>i�1�+��b�4�^�|��eG��h��E��Cc/�^j4D߶��7�Z���G��ҋ����\�r���"�E*�a ^@GB��2ߣT�@�k����"��dM�i����c)���E߉NK�ً8F��Y�E�@B3A��h�������'��TXz��D��i�1�C���H�ˋ��;�+S��[vT�)��H\.����6�H6�F�xQ�P�A$_���׵N��7-��V�!��Ed�;8&�����0�V��=쯧�^�H֟�jߊ��R�3�&�8������>���̭^�ޓ�^Dk�|�:�hq�k{y/������K��>�>�Kx �|�bp5�D�Î��/�~�o�d��?�M��dd�y�����/�V'�Z"�tV�&�֊��E�j�b���E�k	��H���*�攡�X��U%>ZK���t)2��k���۳Q�e6K�Z��A����s����K�~gT���_���]��GV��!R.���_.��Ľ}�L����qY�~�qG�@	ۑ��g��]]%b�0���❘E-�D�R���״-��A���ƪ�2�J�9WK��W�
���T���}O���Rf������ɱ3��)*�J��I��o��A�s`�e���?B�5�rK��D�K��gOd�K����%��e�ƕ"�_J�CͳK�bH�u'Kf��9����/Q$���P�P!���#-�RD�Y����R���"?�VD��#�=�	�R��]�lW:�����"�Q�.��~ӛw��25.|��ԥ�_��T5,3����|���
z������3���:���z!F<+��w��p��;���ND�Z�ُ3��u���|W=�dF�D�Κ7�����n���W�c��� 'OA�[�?MY��ؔ�B��)��
{"Yo¶g�2�S��л�y>UD��H�"s�<�g"���(c_�T�f��5�������u�U�T:s-��ZCQ+E��#���8������+B��27g��q~�"�u�BCdrla�"��H�>��kjs������yR�Nɝ��V�=JʷX���;����;J���M�@�5kP-�a�G�?k�\q��z�f����Uv�JJ�hB+��~���_�nW�E�h����2�uDW;D�9�3�k�"�!�u��e�N�e�{��RC�C�c;�����徘�+w=��1���dY���� �]Z����9n�x�c3iƓ������"n�`|��!^���4�s�c�Z���q��	Z�P����sXO�a6�'���:>s���ŒT����؄�۳k����3J�t��}�2M����"bK��{��/��ӵBK#_��oVԀ�˱S�
��n���Jvu����E����T"�[2R�Rt�&jŒ��⪇z#5�<�/�'<B�/���x%�>V�qx�7����    �N����|��49�}����XD��Jc6���d-[��f�<�R���>k�����OK�^��ت���ݾ�L-�b��#�Z�ԣ��P����j[�c:S��|�LE��\��UKH
�j2p]W���go��W�UW�'|��社*VЃzT/F���� ��$ޤ�Sz��;@)C)ڑ��b߭E!�xW7G�Vg���[���q�Z�U�OR����HC���
�b���Qq�1�9���ҿíC�����/~P}�.(����]��G�����x�"����J�����fWJ-��Q�NJ	�j�g�������|̊��\��ح90D�_�&�R�Ҵ���vd�:��t���ۋ�Ws|8�_>��:�0Bؑ,��^+���v��"$8�qt�Eh+��g��ht�C���kb���a> �G�#\KwnM@�sId�Զ:rjxn`������/t"��%@E��_��B�a�ͣ��T���d�DA��lȗt^� k/^W���:� �!�f:�Hmi�GE�A.�N������b!B�M�n?c�NfF����L�~��K���<�#xD��׆�4�~�n���]�d'"������;܆��y�<n�6�H��v���~���(�ua��Ic��~�ƊR���d��r��ȋ��aMZ�d�a���)/)��͹l��Of�+Y��1�VtI�4^��j�]�Ľ��}��	e�O"d��Fݠ%����_h��T�t>��o�c��b!B�m��k�UY����]�4V���lq�"�ߊ$��"A��nu>�IF��P�bT�V%Z>~��B�>�oW�`���į�������Ҿ:nW�_d�Yr�o��v���`~�v����z��g�"��$,Ű2 uin[H2ͷ�Ջ�`̓
f�\Q�fC��5'u���n����-2X�����?�-B!Z@̿6������e�`amq���媌R;Q�u)9����	e�۲�%��'l��� 7coX��v�Z�v��Y0I�c�?ca]��j_�P�N���h�g�Y�9�����o���|����l&E�"ϩM.rh��Cu_o��J�Ry��s!�q"�2���^$3�'�Por�;"�Ւ�ӳ=�[K���26D@Az[w�0_Eh�|l;�E�gA�a�
��'���ľ����(,hd�k��/�	�aL����k�ɗ��j�7��1���F|�9�ar��o��ȧ��׹��J���?��EuW��{vf��/�v�P�����?�5@��"���ە%��5��ww"����a�m��C/|0�^7�v[-6�~�7:�}��ޝ~g�x7M*��w��z��e0e��7GX_��`�D6+�i��6�f��䆟��2��v	��-��<U���
�����eU�QU~g���f(�ߊd>��/	AY��n�:�&�oЂ��w�'����5�aR��m���	��̋��!�U��Yۇa�����b�̇M@l�!�W�4-�&�+���Ǧ���N�r�/Dwz��I�da�.���c^س�������-p�"��#@��䟷��j�rQ�A���ֶd�ο�7��?P?q�Z�b��}KU5�|>5+�����a��L�l;�b��}��4&C�;Ȣ�L"Zu�ݳQ�L�}�`LD����%I��88�dD���paOC4)�;�(Zǝ(j�$xT�z1��?��$�Gcw���,	4�4c)�j.�ӟZ��(�zv��S�mw_AiLR�R�NR�n�����ߊ���6����]P�Q<���^�g�RD���$���;c�E�8r�M���mSa�W�L��zZ������cM�rf�I�Gyj{��t�J�bp����V��õ -��Q{�������%���];�Ρ����v7(xD���� �l��@��$'�T��X��uC�{R���PI�>�>�
B�����+��֋�/#V'YQ�yEƟ9�;����(����"\&��<w�æ�Q��L��4 �ǖ=wN�?q��A1cQ�nu�c�L�����Z��7���ED�D����b.��K�:��D���VubT�%��W�5�	b�=}�^��>D����j�������v3���^3�_�0�������]�[�;Y,�^	6�TL���3�GW.��Q�l.��L����M�t�Sw���0��V��i$r��R�T!�az�%=C�s��;Fy֛�=���#Y)�D	��+L�t>׏��]�������R�4���J���a����γIS�B:Wz�bX�)Ңڮ��S��"#J,���U:?�e�^��F���R�L�B�L�b�ѧp
��G����H�bp���e���%��ߒ����Vu$�.���[��7��ΚT��A�C��]���׻vu�i;�+g�6�aIm �&�-@Ca)���OE����"A$�憐FĿ��Nk�I��X�A���T����;-�?����v�?�c�M�BD�ԖQmʩ���ֲ�P^����l�o���l�L��w�e�{<ߔ�']��_"���xҹZ��h�2����p���àME�_[���E�>�z��L�˘�߹H~�1�TME俕�����Z"��V���'����M���m��`��/��ۺ����Lٯ���w���-rY���s���eH-R��%�	�`R���ˆ?)*���_8
�(ȯ�i��|^�:��Ւ4�Ϳd[�RS��)�����+1o'�
�����X�:�T�[���`���%@-.\�D���ԭA �Z������j{�c����*��Ң��������p����'=-��~��"�E,����*�**�ռ���ư��c�*��2��`�viT�c�?���+;u�$\z�+��w�RZY�jCh+����T��o��9�	ǰ`�"7D7L�_��<;��<'�����b"�uq�
�e��/����������M���[�ԊGCf�������ep���&��]��&k#�����C��3��!�bR�P���0���J���v�k1�E��i��{צ����N�mM���i�S/܁��R�}<��k�P����l�8�U=F7�S�ܼ���%���Ie"��,^Td��]��5���(���#7BJN�h�蟅f�[���wUS�����,���<��ZD!�gH&��}}/�8�%8��E�1,;+���<��"���bܔA��p<W��;�4[��Eľ9��X��ؤ.�<d(.b�p�$9��[�gέzؚȒ�{���KI��]��N�\c]5��ĝGm�M��KJ*&GO�V~/�<�������e����㏓��s��ˮ�Jӳ�A%A�y��&�KC~���ZΔ��a6ؼYz�/�觾��=b���Y��YY6?o�Bм�:��,C�ζ��C������m�4��
���p����BA�S�{N��D0��ǿ��|f?�;�J�ư����!w`�~W�9#k���u��V&|�"C�@��}�)�v/��<l�g�hW�ޒ!A K(���sD�l��o�߃���Z�	���h4�G(��I�����_ؘ�d�MƲ�OQ&�L�^��4� P�F�ر]���k��нXa�)�X����	�՞�lRn�f��\�ڽ}O�˦�@>'Q���c�N����,J��ʈ�AȚ��%�th�7f`��xO ����c`�
	�E���j�g4�u��I1�ޏg@���d�/\v�b�K�� �*(�/,���O�9�~���g`�R=FY9�L(�g
�*��J�w�Mx�����Y�bР�e��'����¢h�"���K&�m�j�Z� tS��9]fe�sMۘvV�ޜ(���_�,x]��9I&��8�J��N�9�H�êz�YB��a,%t��#���a�W�y#��WЏ�My1�_t�/!��ak8Gؽ��9"��m��%�w\/r�ׇ����|��Hח��?b��ZFx_�.ƭ��tW�͋�}��ںlؒ¨�v���֝�r�n�W��` (,�䴔�՗�( 5^    L]�&��!�3OJ���"��07�����X����Y��qä)�]\�0�����6l-�Tj�ُ�zL��7 6(����YD�6^6�VB	V�Y��6�0��[���g�������3�#yr-+��n���]�^!�}_�[������o� /�1��EH�(AN�)�ZL4�ֺ)�>B@���<�P�=��y�k���1gIg��#G��\V���N^ZE��ژ�ϲXX��V��,ľ�X�rY��6$��ok�����'�{x�����WH)�ϰ��]���(��Ib��c�U�+ݽ�a�jƯ�-إ�#��)	r��1��L�Ul���\�yW03��G�r�6A͒�l����X1��=�~5��y�8i<���?��c���F�F�,T��B� hY�x��P("�Q����#W ���!뽨��|b��f1�y�/K���;z~��B*G�BƂJ���ݪ�C�A���^ц����Ln��6���Ԁ���,+�m�9��Bq�d[����<>�d�������[܉XyZf܅.:�RiܾxШnGp�N�.|q�0��?�[0�^g7�Tt#�4��=ֻ{t�����/Ⱥ�H�:�Am�گ%;xS(՛��䴄{� qJk0�A��R������E�����.�Q2��hSm�#<\E��٠f9Y��MT�a�c�F�n{tER����R�H]`��::�q�����k֍���a�K��3��ݴôbJ�V�9[9��

0J�3u�g>���^	�X�9�A��k���5[h�+S���N�-2��1��I6�HZ^�G�D����"��c��� QAS^J@�>��0���fmAX�J��D����q���=�Q�T�U��(ۆ����f�MK�)@���H�!:�(Me��V?�Q��v�^Pl�&��t[ۀ�l����?ĨհUTa�#v�RPVZ$4aO��bWS�|A���"A�
)�(A�$i V<@���5�E�tj���
�����@����H��{a(:UBQ�+�%�[���r�`tt�I,
E3v����'�Q��^=!��l�hFەR��p�3�)��8̰[��J�8i�Y�2�����R
��ca$��y�[�&ի_z�N���a�@��p���WY��0Y@�2.ޛ�ƦȞ!v��ku��[�(fю������9���] M�f���ٍ��H�l�������+�Ҷ�� Q!C_�+�����V�A�M�\��)��P��F���|ƪ��[hL� J�-�9���YԐ!Ф��3���YA�V�-H-�Ra����$�Rc5|��@�Ը�� �HS�Ys��-W0Ц�J�3A�2��~� A�z�l(��N�k���.���U� |j�E	!�`P�Do�2�v�:��E����v�fs�۹~�EÜu��]��WF� �q��ߐ(j�l��P�=��&0��
�k��O�m�԰ҁ=uS}�tN�nd���	sO�0T��o"-���(*K��߽����4��n0iZI��=�H���2�^Qi�p5A��⎻e�T�j����]-���5=�*|6s�*�-m�^2o進d߳�Bo/��ÊDU�.@	M>��CE�=����8 �̴� #����7�gE��|�xUP��J��pT����B�ۨo*�ƇQ��W�Tx�J�J�Oݩѱ��ྣA"�{Q0�M,�����7�m�Ben����
?�i�/�0��X���q �Jds��<��@R݉]��,��}�+��jp H5��QΦ1����*�WW���� ���G�$��,o��?����K��ǡ������eЪ��N���\5�߼i��P����!3
��Y����O�
����"̜7�'<Bp��| �jt*K��W2�*�	dA9�zj�%j�A5~�9��p��=�"���n�E�
Q�}mk���h7�,���/���\D�d��n�66f֠N��-�� N�`���:�YH>��1���^_����"
�_�?T����s��8'�2�j4�sT�,���;����u'F��3�^��U�sh�G���dhiN�'��>��Y�.o�բz=
N��X�Q�gі@c)�E>'s��WF�J�'�XCt&��p3]N��o���! e]_k�|��|��8�r�ʮ 4k àH���X�xв��FC�o&���e��c���rU���3�zt<͇hM��(.eg&���Xo�zu��ߕ�]���F���g�TѐD�b�	����s`�����!d�FI��ǀ����]Fr�ǖE�(N�p�P�Яȇ+@�R.�x��� E5X�l�k�_QȈ�mՏ��y�LkU�!<��T�ȗ�V�y����:�	~�������i�'r����zr �ڗ�Eu���l0�Pʣ�M���lIŞ���hC$�gR���P��Eb6ǉƔZ��
O#r0�<���Aے�4�Z�#j��:�7*�O��~S[����v��U�a(@���5�@�P��a$�;�b^�CM�
�6_��n� ��3���2\���Uo}@�*\��Ke��<���>e�� m8�| h��3Ov�ۊ�N������S������H:1F�*z� �^���-�f �S���E~��E���uu߫�����{��9���,e6�S܉X�u�9�����uJ����Ե��P 0u��V���!�R����5\x�z��p��t���,� G��OlI�/�������	�PS�((`s꧋��o�����v�0�B���4�c�Z(�������e&e9Xvj��F���Ġk��X��]{���^�s�o���P5_P�P6�늒v�8�JZr;�`%��n"iJ��|���<ڒF�Q�]�L=rk�<�r�ۈ�#ŭ�"[2�vFv�4��U����)�Kj��(�~P��n4z�Fhp胼�Sx�"H�V�������i� 
+B����DM�<��
��h�-s����Idŕ4Վ��l��B)?�ڗf�U��a��<��~�v#@K�2!t$�:[qkL%�Ԡ�4m &i��|=�&�6B���k�wHjW�w3��/	D$��24X<ף �[9|�h/���(��!��Q)��6;u� ����gDp?�t��lO�Ð"�V��ӷ{MWD)����F�����Qܤ�� ��n�"�V�l���2EŻkt�z"L���S+�cT,è�6L�R�p�>�X�吧�0�!1��r�˴4��GH��,p�!As�zp�-3;@Fb��զ��4{ʳ��2$d^X��V�!gk���F���2ʸB#$YN餺�R���Ј��𱿹�|~�h��|~��k��p�y2�S�]x��C���{�R����Y�� ]���g�����|̯��.F7�+C�M��G������cSu���-�u�@��M d���8��	�K�|H�4K��P���CjeLZ�/�������!���Y`��O���d|t���H�:ГԪ�uҁ�d�w�p2�8B+Ye���'~�[����ч��3�<�$%n��Yȱ_v��]�/���I��O� 2���=��A���Vy��;�ۨF�#/�19 ��d�6��h8��x$v9qa�Щ9��@+́h?Kd<����y�hpD���%��;
��^�z��#��s�e���|�)�&�qkF�d�bHrT����E8Ι��j7gN��UQbB�=|�4�M��ъݺ�}���5�5́o�1_�d-�9�H�`p�2�$p�E�����4��ܪ�L���|�����̀�s$Y�JbBr���y/�v�!\h������3!I�@#�:��,�ۑc6�(F6�y����M�����wH�jtlaO4�;-c�&�kx�4Ɩ]�dwi�E�S�0#��o�l�d`�'��68�f��[���#�H����#��_Piv��؆.1�po�G`�X��+�-@���v�#���ll0�(e�\�<4�3Y�X�b�Ū92����    i�|��D尺 %�lJNQHbÕ�����;����ϰ�:������?���<�m�Kx��V*�D���*?]h���w�����/lH�CP!�~�y�	C)7����>x��¾
�+ț�w������oZ��jU^�$?�`���k� �Zvd -�(ud�`��G��,�lpd�i��%�zq�Б�3.V��\���'8P}��=F%0>`��Iƫ'Ӂ~s���1E+^:��v�����lRh(��n�K�H�%��9 {��T�47�z��[<�{�������GzEPZ\">�j1��;�*��~ɾb,ו>�랟����@�����@�d���֞�QJ��H�P���!�-&�!�$�`d/�tIC)S�w��� �����&�n�TQ���!����`v8���r��r,��0����-fD�t������.W��
∜åC�9;c͑~2T�)5g��w�9�+UXκ�J89��8���#���@ �8�l:����fuQ,,���#,����M��,���r@⼯W�g�0��[i���F]H��?�r�7GF�6�;�n"k�q�ro�Wb&������|~�9nᓨ<�"(�-|:iֳ� ��5$ڸ�`G����H��W��y?X��������Έ[���a��#;v�Ć������sD�36���Ⱦ�X*$�S�<ߎ{�`���nܫ{]��!�S�<S�EDM�eн��ȹ6��K�n�C�
D�����9 m0i�DMG��h���5X�~��h�	[U͖s4�;z�=JBÉ\7q ���Cę5����n���=�4��8�if��BQt�w�e)���YPߩ L̠�s��>� ��� ѽ	�8 _8��u`�H���wJ�u������h�+�v`�����k��l����,)�dT��]�/%��PL���$J!=���"\��n�8 ^lÁ�b�;|*�6؁w�s�h���t
��n\���K`J�T��N)f�	 5�i��yb����r"�<>Suܙ���>�n@p�jՏ/#�Dz�@CxW�bq��\�r�G0f!�p�I��Vq`�\uTC��r��7[ML�k^<O���5��*�r�[>��d}f��p�y��'1$9�[^oꯦR��F>jbp�1�㷘p��h�(c+<�gb��1L�BO��d���2�?b1Ɵa<<��k��S3���u�!�zH��*KX)5<��"�p,R�%
7(-L	lq	���������.�J��w�6]�u�����[�Q����F��+ƓV_�m�	�f�PG�!϶j�%<
��-�ƥ�D
��B��] `#�@�O�w|0��X�o|�5��]�W,�v0�����B��DK�I���e��S�-J�%L���A¬�!�z��t��ܚO�R���d@��W�J�Ďش B�0����gӰ�W��:�Rn!���sl�/��7Z�z� )��dH�#�w�����kp�ٹ�p�~���EE>�e}4#�
f���m"���z�@�+4n��q���8�OΘ{&�@B��-���1!q���Ӑ����.�g��^7?��Sv�K7m�TGT|��.���\�8?�;JZvi���~D��4�����o�=XJ��D.=�RSh���rW�����P���px;AGьN�� RB8�E�:��7"���jy��5�i#(0�1�.���%����R	�[|�'�V�&@��!���R����gF	�Y���u��2U�bJ����(���@ʕf��UL�!�`=�߆/��y	:
Ӡ��v8�z���g[��&��Q��|F��_� QB��M�+�CPI��+�a�����~����r��Ӈ��c���RMcQ�Ts��YH5s�6�1��5�⃔�A��==R"�侢P&ޤ�@.�Q�UUX�&T�/��$�2NP�b�R��pMZ�@"���"5����B�6�aJq��8�z|���1F,��=�|�<P�Z�g����a'g�&km͞�C.,s���g��9�-�$�8pMP6U4���tLab��D����-�*3<��2�Z
��'��{H� %�7m��P2�:0I̪�H��gU	{��n{�Q(ϗ�k�F�*M�ͼ�3x �*D"���r8tP驌�i������=���O�<;kU����|����|e�cr~��w���L��Œ90K��e_�� ������Xc��W�q�ـ,�\j,��D
�
�+��"{l�{��rݛ�Z�*0�9Z�,9���ZT�e�*�@���@�j5cсH��������S8�Dr���;fG;�HP-�n���w���bz�;X�D[�Ɋ��֭y��1���}^v��:����Cpc�� (��=f`!��^3d� ����8ݏ�����-3�Fft�L�ܑ&e�b�hF ��}g Ț�@Q�::&L
4ǋj�Ta0�F|tAL���c���褹�/�+�i(c��e`��ƈ�S�2�g�59�(Ɩdp�U0�+m��[��h>�LO�֨i�Jw�.x�3�TT1�1P1�R�Yֳ|z���c{|=_L��b�2�-���g�Als)�Ms�o��>���2VdԈ��z���B�3[Y,���E�o�h|�Cц��� -���lV2(1�>���]� �pb�����7�Q�K!ch"�IE_�X��2�$~�N��pĆ������N����v(0�s�CZ�ت-���(#	�����ӌ;c�2�qglg�h�ʈ8�f�[���V؎�DŁ��"�l�qlw�,��e���t�g���7:zMN�5CĖ�H��I�]��к���nMF��RB-�D,S�R�y8��q3l���<F�PL.5��v���ROAA��!s�,w�1N��näc ���ذ�t�"�E�##�V�H��FB��9���u�wX���8�3�M���$F�:b4�Q�9X/vk�Īԥ�T��PW�n5c!�:�	٘$6~�+ea���Jy�Re���8��n4�aMV��������q$��^%J��K�sn��&8���/��xl6�J��Xp�d�QФ�P�6
.��޷�W�Yv ��X�W;���^@9^��b�\�^��M���h�!Xd�W�8GA���9�9^��f�T���:��B�8��|��M�)�:��М�O�I �c8�&��;�:� �a�<�N���vܭ�c��sP�S�hQ>g��p9O���"�o@���>�ܼ4ahǏ"���x�.�$w@};�+Hh�;����;��2/�K\t$w,�z������ܱ�@W�Nq��0n��}����8�C��F�j1�w�A�^�A2�q-*;>1���"���]`�8�:�y
/>Ez��@:��� �D���v�z[�� ���"�����z(��:샃�q���ND�\w�)��pHɮ ���]�a^�v����Şw��z)�e 8��K��9G�O�#w�A�`ɶ=����Ke ��v��B~�k�wZ���C��1�ݗV��-���;��{�{�y��iP������(*�Ef���e��uԔj�7�m8�8X��,uO�(�b��Eq��~Fo�N�� qHI��i͈M� *��l� R���
�u߰^#��bi�Z�F��agB��L�}�/�R�g�Ƙ���P'�7Ȥ����e��m�������"�@ڰ�g-�P2~J�w�[ŉI=c�QH��.&M�2C�s� ���uS�Ht�=u��'$=�^#�<IJ�3;�h�!�8��HLS�op ������^=Y��� �xG�ȟ���f�{����c�5'r`�!��պ�Qz��ʮH5�Zg}�j�5Bh��#�U��Hx���`k�Ł�qS�q^0��s�0�`�m&2_��itU��a0�p"*�Ap�m\ 7n4p���~	_l�4�{ n ٠�b�R0�    78���9r�Sy������V�GO�s�m��A�zG� �]ɀm�h��1L����`T�6������S�.j�:��D�T6|���1[A����q��@��) rC���H�q o�����CD" 7�����w�ȍ��u�m��l����~Y�W�:K���ʆfN�=�jI�W���+]�oY���ގ�����S-�s 6�=5"�\���M���V�N�,�����p�Z�$�4��z�_x٬(�5h��A}͔���N����4ҒJ�B��A*l_*����;S�����raP�q�lܚ�]m��;Rk[���p��ߜ㶔:��\3;֭��:�NqqG!�V\��X�A|OD{E.�|�RqPaL�q�yC��h��(-ԉ�G�F�9⟰��v�p�և���*hdB)9��q���ggn9p4�3��|��^V��}r�֝L2B��2�Ƙ[����{�<0��%��pc�%D��m����{Yd�1����ßN���x4��x�.p oD�b�v p�HcM�q�q![эB@9ޫ��aɻN����8@�i�72jT���]�� GIp�q���d���I�Г��[�q�C��؂�9�9��Cb�űa ������Σ�B��B����8 :X�A�q����,@,�����"����1	nG|��<_|�4�?��#�bp�GgMMv@{h#6�~W'<��� �� �=�<� |L����8�7@��PP��+a�
�?+!o�$��9hb��d�O=�"=R��Dq&>���%��R���8�B>�*i�^���v�	� d�^�wx�����j4>/&��xc�U��RB�=����B]���Db����*/"$0"� �%��S*����+��a ����dQ�imb�-��~�e���C��ØX�ٍ��;��h}��mq��F��Q��w�-����A�/e�;�ȩ(��s@yHMT�&A} v܉5S��z� ��D�%������1l��!���@��(l���,)X��;��t(�3�z���6�6��bK1�h�� ����/�b��&ݪ Kc�i�,�P���ƧJ*�lN#f�S���A~/��S�F���Z���	���&_�����k�Ĵ�h5�9�������jX����ԞC��MlH-ͷ@�Ʋ��fI �a
�Q�`kX�b�b�a�j�{�1j�v�Z>�aL<��2TZ�k�9�l[§M��AG�����G��l�ݚSu �|�uP ����a����c����7H�����)���8@6D�5Zp:�R o����~ٮ�����AZ�8�jm'ͣC���>�`�1xEuR�4�ө�`�B�C�����_�Cv k0sk�XL� �q��Ƥ.�>�v%��}d��a8y"]�
�g�am�VnO����'���"][}D�\Kt�y�E��9���-�q�U[�nV�B -�K�3�@͸�j���e\v���I��q	�n�s���� 9B���H0�i� e  �i������?�q��q˸I�Wm�IF�� �,p<w���n(�c��:�Z��`+��jc��R�m����������N��_�g0�]�V��M��h�.�x`��ɒ�u�l���H�q��^+w���Bx@�x��2��j03^4��0�E���,�܎��Γ��3��;������KύYQ���9�)���藠hL�p-�4��~4�՘4�Q��Կ��m`E6��8�6���?�b�%�p�J�R��v@ �x�I�@��v����o�s/%BM�{���  1�"�r�l# �'�0���P́!54�E?B�$w<���i�'a��<��q;��r0�Ң���G�,��$�t���Q��ء��cGoY����WI��X߀�P.>��5E�{ײ����
H,X$@i!�ء�qQ��*8Sٗ�H�	Oa���vV9Dݿ`Tɘ{�I���'� ��itkV'6���ﰚ75`r�w'��z���ح2�:�9�����3��D*��1����P��q��,1��w�&z��n�3P�)�Dޓվڝ�i�J���۟%�O�����0v^(�*����*����/)ᆭz�d�5�&�v�������L%C' ����d�D�=�c���[i\��Q*�i%��w�NV�S����^JFUX�m|c���9W]����βe�� �q���N�v��#��;b��8�kq��;�-+��xT!��L~p<�����-�_p���E�!Gn��.�� ��k�1�`{�ŗ^�@�g�������U8qgе��x��7��Z�D�x\}9�F���C^�F_���6o!�����̌�*�Ѩ�Ď�f���A���� ��I���C@����[����q�V��둣ط�s�^lk�^w��猺؊F���sw�V��U?�؋��6<�\1&m!����5�Cd��3c�A���������[�.��"=o�p�%���q(n��;�,Dc��GԲW�r��p�8�%�~�"[˱8�b��hz�4]�䙰M��d҂3P��9��[ d:!�D�@kX0;;�����yP6��T�� mhE�.<�ph����`��AA�ߐ�5�J:��_Ç��N �P�w��4��S0�P�juX$9� <Ű��{�:7��]���44���ʱ�^h�]4�	���L� yhxΦ�߄���[-_����\�g�Ȅ�<���+� �W��|!_��)��<����@���<`W�xDj��y���@��y�xp=^ҵ��xYop�5�E9��L�y����*ޫ[ѭW풹m<���#�g����z�mV��y(Oo^$�˦���c�݃��[�.ME��*=�v���C?s����m{�{0?��ý�hF�a8����aU�P<��%�qT큃V�2� V�]²�ҡB���ne��tw��2_�����-;����h4���c�D��n{@@^�É�e�n��,j�dL�/��֍��q�$i���eO��J�Ly�����x����ܧӍ=H Q�O��pD��"���oƱc�;��y�x'�������J�C�	5<�f>�/���Ɍ��X�4$dy��
��1�3~�e�ä�������h0�'���j�oT�_�-rd��'^��O=��]��W�����L�"@�b������VpG��uX`@x� 	�v�������=`#!zNn�8��{\O�p����+V�&A}����'��֤x�H��zDu���Ͻƫ �$TO��-���8��0�щ��V"�E�9�R��x`��d(�%|b���';h�G�@.�^�:<�^���5����%|I�������T� �t��u'��»�fc��D�O�N0�lfPI�(��#���7t6����>�D}�YL��$ZO�.�"b�<�%�hR��C�C93"iX��)ъ�TT�٭�D��Hȯ��%FB��J%��}��+y����N&d�q,s#�Y��I�n���b��� �`n��4���8Hu~�1����!����~����n2�-�'H�Xr����	��1�!���/
;�M�,�"���0.�f���{�+#4r�t�0�	�1e>x`L��7.[@����G�B������_�
�$w�V{�`�\��#��S�)��A��^O?�@�\�{�� �\�?���j����X~��|	��4R��B�&�T�Cؤ�22��gB$�c������$)�w/�KV9��Էpf�,4�r��`���IMU��D���E#(eA���(��������?Y�jb��P�k�D�'E�l������-$s�2�$�$�F/�~�K4�{�>�8J;��'����'�k�O�
��    5J��_M$ğWZ�Z	�)�쓅���f!�Ro����`��m�d{@A�Vz~J~8����2D��	�iw�����g�w��z�O?/�R��nP�4�������������L�Y @`�����VO�� �H!��`�h��M����Y
��!���>!�J)A_@-�U�:�%��?������b����u�CՉ� AAf��z A����Ay�+I�5�[@A�����A��bw2ħ\�v� �D0����[��,�������x,�z@A�2�w=p Z�����L ZH�p��HPA�U֗�[��P@7��yfĐL�~�}X��
;7��W5B��1���!j��j��(�����!��7_�!7���A�������xp?޵�3�t��@0?P@?�ɼ���}�y��>x���*}�<ג�0)�X�(�5G<�r#��ϒ�Y���:����}�m>�!Ű�����~׍�^F�ʄ��5��a��8C�+ܣ��ޓ�!�
�';�ʬ(�<*��w�	!�4zʠ�Cʢ������f����L!�����Zs0��!�_GI	(�*���ܥ�2	u!�ԃށ:�\y@;(x��)���ڃ�qCo&�K9F���Q���;YjHH�aR�Mݭ����J�n�:��h%�9EŚ����2C�ρ�Y s�A�������-p8nZ�Rx08�#�J8dU|h�) uc<�TI���7å鳌|{��nX�Q<xZ�>�eC�W|��
�����F�<��r��a�	��$��?�j
�+�z�b����K�_p��Q���x�:`*H��^�>Z�05��@��%�T���^��U��?���	䌟*���Y_a���!2WVZPx�h����޷[���\�~R��h1`�+����B����`��k,�V5*2�̳Qu)��$�z�14H�r�if�����br0m�*�a?l���{f
���z�t?��2�g���=Rr�O��h��bm{�����{ ��/�cZ�("��b~-�r�F�ȡ�A�`�k�� �`� f__֎�>IZ\3�H7mP��:�� v��3l<((�#b�;Lʃ�!Eh�@g0(���VWp2n��Vz{��K{����:=���=�<�wtn�����o���ԁG��H�.���
���<�I�`ŧF_:x�d��]�|��T����ˁ��tT$q�ҁ�4�<onC���Q7�f�롻����̐i���PF�-iއ�t҃s�5��*自������������A3�e�p���� Sx��2��7��=�A�N���=���us��'L�+P��-p+��ؒ#�����_C�(���'D�4�������?�p�1GpƠ}kR\�)3����]t��@g�S����!.�70<*0.�:�0.n�׃qqk9d-�����ue�a/݃m�
j�@[0G�v��2��m�o��s�\��?J��vT �`����K��m�����$�pm���A��<��[��8z�-��޷vS�#����څ&; ��Ly6f8������\���!x�����\�cu� \�vz�
Je��`gd�{�|�7���N�,���/��A��CS7�,}���1�P�-�/A����� �Zd�􆕰��۠
�zכ�I��ȭ���d��^��AU�}��j��gz�{�L��NK�@^H�~S�tJ�Hא��@��f[�(���L�I���*�D"��0��<��r���{�0���)������jm���<@Y�1n�h��x��``п>�Ix�0�.���dV��Q�J��]e���U���c��s�5��F��V���/�%lgtzP2���Lƈ9�ڤ*�{Q�) @�xO��H^�K6#Cx-�I«�����X?��6�N*������P��5\��7��l�L6 �������t�a�U��p\Kh�:_N�0"V�?#��t��Ț�w���l�=��x]��=?f����~��iVf�,ǐ%ci=H�I������㌬�ׁ����,-�;���2��& zGt�MA�A�(;���#�b���#�CW,�}`>�#��~r�k�! �#juN�=�]\P��ꃎ$�ĳ<"�R��u-�2_,���䬁{D�{A�F��zNz@A�-�}��@H�|!�/�(�z<h!�iMCЪ:�;���"�����Qn�̿����̓Cȑ��� ���<o��>�f�kmh���D��#<�F����{�A%�`�H��_�ys:3 *9;+i��y�J��d��%���q���9��dr��U�}�Ke�iT֐��y�X �xpNt����SnRCW���h�g�-Q�X~�\cu�`�<k��*0Q��I=��,y��hd�&�"5�/NO!��y��_	�M��8k��7���z� ��2i �pP�̕�Q������`�L�������,up��2˴5�{pZ�M��I��ٳ�aY�'���cœ}�����i�~�<��E�e�����	Yr��򬁘4����g���X��|�Y�|g9��Ξ?�`@yq���94߼8g��:Pd�-7D�����ݏ�sh��̌͠ge�~�	�3q�xt��f�/A���tv�4T�;�,�;'�ё�^��|�+*�ǧ��%z��3ԧ�7<��:��ۖ��3���p��O���y8b��7L?��)�wMu�_����"�&�γ�5j�>�i���Շc��gMTW�nt�"��)=*�����P���k(���=����<�c�L��+�����ƳB�xx���6jyn���Z�LLp�>���u�;�<G}@�ҔF��j8���>�3)���B�0���Gm�~��!�=�1rp`^>!�'iY���g��ҎL��zl�)��}�R��Ѷ�%K��G�;Bm����yO��AMޏQUok���G�ڰq��~-dԟp�]�3�dQ-��ja���UM�4�)�?8$��'y�4�W>'s����ck�5^��.l��klE�������XT*X@wroktH4�;��X�@w�M�]�s�w,�,��jB7�.�c�pϸPJ�쒿�!|��w�X�tP���f
k2��U���7XZ�Uc�����V�=�>p�'@��H�	�>�C��>�Í=�>���Aa��� ��LP�����.42�Ǘ ��Ǯ�&F �>R�
�L�	{D�8[�A�����Ǫ��8,��)�3
T`~��p�5���g����ü��s�P?��A��b5���l��+��dF��#V��0g
�?���w�Pp0����	�����lv�k�H����|jx냞���Agѳ�/@�AU4D.��=��K�ϧv3�����:҈���1���rG��H3�ዊ���^�sC
sp
h�6�g�����po$��}ã�< @Hϥ��ˣ>5���V���q�_[
#���Y2���Y�h�n�+���h��˭y+�uX�h��?&E�Ԉ��mՂG�m8�29O(1��(�eoD�����"%���v�]z�c`t�u �jՎ�Ng�5���V�kd��d����<�͠ιpD��a$@��!@1��V��ڍ��A���7<�A���G7" Q�80{�NOh�M���5��z}-N�f�q�5����Ǵ�Ts�� u��� :���`=H�a��QO�?���C. �16#�M`�n����6�uo� �|!� CxA"ר��b��D�Iz�m��ǆs�<X@�~_�$LP���W�1�1���p#h\ h?�/�������W��y�A����>�pS�����~@�9s�����Pt4���s�mN���Wz���|������٢��^�QP���m��yҁl8�^o[;z�4�#+r��5�3����^Apd�O��S�AOu[, V|B~������Z�Rs��9=�vPX9�>�U�����Y��    v��������m5�|�8��Dmבw�c�	,ё܍�[Sɀ��Jl&����m��G��>�A�T�ɪʳ/��>��.�4���ؑ	��2PX�1g�����%�aQ�	|���_-8�A��+\H��ve�+"gu�2?5��z����<��\�P�G�r6�p�=Fur�Çn/ٔDe�d���4NQ$��f�^U_�,����k�B+���o�XcY���Pwfm��i��"f��`cno;4n�����`bL��0cDٲ���=7�A�s�����ό��y��1�Ռ�i8%D��k��@�@y�, y�11�&��������$}l����ff���(2�O����wBJ�����GC2d\O����=����ψ_8��~��5� >8ss�离F�nf >b��5���$��\')/@���{@ײ��8w8T[,_ ��@��p�Vf��g����pq<����~>�� ����v:����,�7�"��;������ۺgk�'�N�xm �G�@�>��,;US?�E�3qd^�ЄG��9V_���w&8�s�4��\�a�@��~��{���{�_�3��-�. A"j�=�+V�4ϫa(�؈VF��!�o��u��8�]W=T�6l���n��i��)D�'�P�Ç
O)�mv8 ,�q���o���Y��������%���1�<�PYS���d���|�x��ux�L�}�SRr��2���V��~��3=7~|����Q�L�M���&0�N�A8��FG4TQŀimk8gF^�J�~HfЖ)|���.�!@�zw�_A(�D9��	�QB�*�xa&}_@
�Z�f�B�,�Z�B���s�	
ŋ����T��f&�t%NCMD!��?�r-әm�0�3_����%�s�
�T�_ w)��= B,��4W�����]�D��G~1�3��@��ߺG��X>�Гc߉Zw�zЂ.����Nd��a���1��.^F��%��E�]������ 2��Q���8���&� $�`�	�� c�E�G� ��Y���I:����op����4��d��-���`k��*����V�0��g�(�ؓ�j-Ö  =\递���BD������Z��\5����
�O�O�y��� �i[$�h0�Y�a��3$���A��4���"�#���$�L���'�G�LR ݧ�LR�>ms��+��?�0=�}"f���N_3X?/x*��G>V+͢�G���QF��#E��=0>�"i�(@>$^�����P#���3��ϋ�]��~�7\�%�]`��GՇ#�]0}�g�q�DsO��g}Mp�W���m�A�\�@+�~E�Wg`|}q��i�T+�'xҔ��P*��A�k����4u��<�|z$�<�x��wh��P���;y��k�ߨ�y:LL�q�xV�4>L~��s�ś˕?Ŀ���wnZ�����~0_q�J���)y�����A�D�#%c �0S�� ��� ��gC:��~���%�\L���
�E��N�?G�y���`H�a�->�1�)���������!�Z�?�E����/���/�K�Ϧ���4�,�vc����%}����4!��܄���>��P� �'�>x�����E��9{��6�F��V}a���G��E$iN	=���G�`e�Fq=CT?1==��,I{]��=�� 0�y^6b/�p6ݪ6��<�� ^Xj�4�<<K:`F+�y�nV�&U���%�</;%�� �0���cƵ�@�� �,�W$:�5��H۫�0D�G͡Q/W	�Ϋp�_	Ď�z�p�Zu?��T4�hC�E'?��`,���w6����4��,���
�:�`�D�uq�@�<;Sh%X;�+�'( �_�c���u4_z�H��Z��`��WO猒�(���Z�/��H�M&8nN���K"����.��y�E	��h��"�K�Z�*������\�%p;ot��@�XvP	��Yft[{�ܳ���c�.�)��+�C]É�%�:o�c��A Ͽ�@R ��|��h����(��M�o9W
���s� (n��@��r���-��<�U��,�ht��b82@�{�P@=�g8_��AA%�8���sE4����
m	K$�� ⼁h�[�q�{�4,%08?��j�ُ-L/޷�����Qx�,$(t�q� ��� �`A������(��,�n&إ)��Sbs�B�K	z�u���r�"�^2)��ޠTOJ�k�Q�?���{���o�h�_	`���%p5�� v2ͅ�EP��`�(� x�P��r;Y��ɜ��n/+��
�=�X�*A���u��q#Y��ٿB�X�GH$��*���T�K�g�:I2EA����L�Zޮ�����1�t�S֬5g=����7�TZ̸ ���f �6�4ɬ��\(�U 8s!�Y�Pg.<�U 9��ȵ,��R
���d�ZM����Y����k{�ݯ�߃�=����)�?�I�E��,�?z
��TU�Hn�xb�B�s���"�2e���*T�-���N�z�����1s_�� e��P���}S�#����<��]��,N�U������Q��E\��/�7�w�i���,N�R���p�b�o����Z�	�\�R6� �œ8Y����Z���K�M`���ɞ5���p����kq�:����	�\^+$I_���bJ��/{���C�`~��ą��o��@�����[e�s-p���ڽ>D��>�9㱤Ucq5��IJ��`]K���N5@uI�eOZ �d��P)���SA�.
fp]rR�ٿ�R;��,��t�7Xg`�7菐��9?H�7B��߉�?�(�/��R�Z��b	�r&� ��͡�ڛ?F ����h���ã����)v �B�`l��Q�[K�ຼ]������?��)�V�A�R^q���__��|L��e{�7�2�����8T
�'9vj���G�+���H��9(L|��X�O�8}�`]07H�L�! ����6 wy;�Tx3A"D�-gT1��{y��:��g��C≢����5QK�3��P��0�.�e.�y ���Fc-����]���6:k´��#�[��0��8EP �;1�/o�q���eln�� �� {�/^�����FG5E@z���n�(LZ&?� Ǝ�� �Xx����a��`i�h��Җ�[��,�!�7l�w{ ü�x� f2+��φU4^�b�f����'�޵g�����5F6�sm<�Pc<k����1E���U�j|���Xp�a�u�;	`d�`ʘDk�4-�1�W�S0�B������@f,Z�h;U �H��-�q���[�̻�t�8�G�EX3���v���Iȣ�u���g���@�$�� `&⋒�)���9��3??���w���,$�L��8��� E��2?.�����q[�����)�hq��@��c.�Em+<FNg�#Q����=(�=l� I�2�?RP2S�wy���{��@e��q�*3@`ʸD�p2�S���x�Ȑ�L�Q�xn/�Q8z�a�{�]�T���m�`�2�}��*����4g�y[�}����v3z�} 2���<�˨<���em���,��fN�2��������c��ݣ3����d�w�3��g��F�$��G�e�N��{�aͤX� hF�i�i�[��^Pi�j+K��]�U*�O��W?����h�lFE����ee�f�P� k�"����o�\3P������9h6����t3��p����`vga�y9h�í�#�?�|Pf.�).@����<����x�x2V�f9*	���ȏ����gJ�� lb��B��}�?�r�'Lߢ���d�`L��P�������y�	@�\򼵦�!CDn�`d.�In��B��{�$S�\Yj� Q�d v .S���ݖϠf��IM�,�݇��I��ÎH J�����Z��%��g����B����^    �);�6�`fHx7��{�Q�'^fJ�X̩@f~����^n���r��DY���.�������.�2�юB]DW�Z<@�)��j��KROi��Z�B��í�L������+r �9՞�ҋΙ���R*�P���A��d/n�t!9�}��)�r�����QJ��ԥKG�A��7D �L ������S'L�3u�8=���D��DTu�e*�#�ʙ�}�����Y;�,ok?W�s
����m��v�y�]�	Y[�ok	|C��x;j%�ۚ}0�Bݤ����-�X��,��x~�{* 3.�	�����4sC�I�M�	t�#��G��C��-+9�������/9@���><���4�(��[>@��(�8���^Mܝ��*5�Ul<�N����Ij��o���a�:�Ğ��*�mƸy��"�C���n�pSa�G'X7eHq~��q�p ������7㵪R{�|v�UvXB��Ci;!�JT��;S[ϣ�>������N����<��N��(�ݩ��d{����������;'� "�̍"�N&��խ�`�2b5@��:�>�3(@�Q�%�)F�.�
%�
 x�� �#��!E�P<G���Y��������h����C�8�Z!B陇�&�� ��(t�7`{�>bZJe�g^W~���+yr*P~f�9�e �3w�/>0@V):���N|�P�o���.H�2ēl��Ϻ�?���@�oU 4��tk(��{��w.pQX�\{~�
d�
=C���("�W���]�. �Zj=�@~�"H�{ ��)R�r
�ӕ;�|�\	�ȗ���I��Z����}O1�#�G������q���!����[�����Y`A�;�+z�*�� �λ@AWxFj��Rz�����瓺�hq)�k��޿:����TK��6��ZvS
J��f�(���@V2M*8 ��/S�^��E���$x�3.�%�Ҹز��>5u�-=ڋ_rG7A���|>ܫ��q�� ���x�2|�q��4t�}�z�ݸb\\���8�ъ�2[�C����׳u��t��D>�T�a꼱����:|�U�Q�'���/���{�H-.c5�)�/����z�6�������_1�}�V	dϯ7��lS�^y�|���WL<�y�{��2�����+��:[���K�Y� ���*2�w�{����������b�JiW�P{>�3�H
��C&lx=�p�F��xONP��������u�cy�L��gl)��c��EO��c9X%���	�oQ��۱T���1���q�H�µ�'���AI8��I0{�8�Yյ�pu�ZԻ�*� ٦��L�9�۳�]�7��9gW=2�<>ן��� &��g���Ƶ	0��O@��UH\���ߜ�l�>�&��|���"�t�󤄂i���/ywn�m��$�L��ظ��<.�����/qW|��q��pKE�t��N�T"̵���mJ~@Фl���и��3s�@�!0�1�}"�'��)�T���[�2eM
0e~HD���op�h�.x쨘"B����b�L��>=7r),nj��͢�6�;L����;.�,�p���1���0	C#�C�7t5y��.� ���Qn��04J.�q����?p���������b��_����K-(�Th�����*�����'�gD|4�5)�`�44)ӠVL���f��*��	<	�����4J�%A�Ce�>��64�~�"��f
�etpc�-E��߬%B�]��Ҙ���Z��F��d�j��p��	�QBS�4J>�}:2(�f�|�PT�$[��Iy���\���i�O��^Q^`��3�f�I)���۸���"��D�S���{��7��dn�lR�3#���5�< 7R#�2y1�׮&h�5�)��H��z�i'G����� �$U~�5	YSz	NO�])��ϻmg�	OR��$A���� �I���;��r�8��Z�h,��˪���EJ�]�k&�ikPD�z�sx"�
��Ǜ���]}$ARˢo�i�Ë���)��>���ȶ4=&�C�XU+����s��8FӞ8��\�q�0E^��*�����"/��}�wW�������("r���!B!����"�rQ�S)��C������� 8���u�D�!��k��9��"�'H��Hr�󬘒���v�[���D^��I��T���{����d?:�!�؉��ey���9���xEs��C�3�w���/<S��A^5pCT��,��k���=w�bs��a/5��^2���e�'4��<�|i7ĳ�2Ώ9�G ��7�� ���\�B�o�)�B.��B�X� +�b�����y~� (�"{��	�HwTw��u���Ԗ8^x�s b���0��(����.��Ì�4x!	� ��m��L
3��K�A,���e��q���Đ�3?Tr=��L��55��C�{�P>� �˓&?ʫ�/��(�
^z�]4J��OO�Qz��+�V9ha�3p{�@ ⢟�	�5�.�VKK��;HRE]}��i��LNӍ�Ze���W�vx8��k�oy>-�M����DiqV��N'��,ȭ��՛~޵Z1n� ��������Ͱ�ܪ�`H� �xs��j��]�	�M��U��Yo��G~��rE:s$Z��L+L0�l�4��IϰR<��c��R\��"mo�Rt�~ t�_�e(H�YE��B�V����H&٪7��D>LOX�+������ە�V���S�
�y<�{]J�A!x�}�qh��~��-����8 ��[�x�q(���x�*�Hp9Ț�h_�۳I���r]���)��x�9�
��Z%�0#��Z����n�ڳ9X�.��V�,(�3�+��Wr�ֿ4sיb_�&����~�6���F}f����_È�&�r��&����=���y���G������L�R�ٙ>��?�_2��( 6 �(*�j �&)�v6��P����.�5��a���&xʌ�y��?����?�"qB�;�~\�7��� �CN/\⸛�(�
��|e[��r��p��l��+7�c�'�r��lF�vY%�eM	�{����� �(�9���y�L�����U4���!%�̎�8bڈ��j�2��=����4�A���"�������L6ZV�bް�.���[9) �)0:��-ts�P!�]@�p��~?�/�\2�rȑ"~n�<� s�k�ѿ�NGJ-e�r����n�Ui�l�Mv�5��g�y9�N(���H���O���Q�2����zq��}�H�^�:q���
�CL��Y�qE�l��\�:3�b6@�pQ2I���asks��Ɖ0�Gs�+{z�ܽ&�V����3�{#� ��5�4�ǙQ9�3�ꘉ����$Y�;~�\F;|1⫺��@�u�F�Ļ�
�ք�s�]@y�\%�U������0ŎB	�8��94���A��VG�-�nx�d���/�K��8�[r� �#��P>&�|�J'����gk�ؠ3�쥹Zv�|�}d���v��+]"|kJ��3�}s#of��D
��c���gl�Y�/u��N��.S��&�~�i�f�/�Y�_S�w�.ü����� Nű3���E��s������O.�D�Y|��y��VuܓP���<Άɫ�;�����Н�uOZ��$�{�������Ui�.�tf�d:ٴ��l٬)�#v����Ɯ�_����������lL�6�,���L^�kyTQ��	]��'�}WY�g>+]�ۻ���%��/����Kh/�%���.c�2�8�#��E\T-����	Н+�[X�d���K�n�w)�;�k������x:�9R���0D����y��clyh#m���V��yv�s�O���U ��{A�:����*�xЊ�ɕo�)%;0�C��f-'<������n�2iن�41;����d���`U�̴ L��FWT &W���M�Sb��u!��Ǽ�jY%���������?���c�y/�>��2��ϐM��    ����R%�4�u��K��m2%��b �D�ǭf�j�u��R8o�&oD�@M����N�Qv�b�$S��W�nM����oz1X9�q7`�roo���l��ڳ��8/&="����~ȠD:��l�\�;�������w�������S� �����[A��$n�&j2��/����(릱
�1�f"��(��«oȼ���+��n����S2� %��k	:�����F9��u �(����cи'W��3�N�CY;ǡאy<�<��Q�(����ASL*��J��j��l�[��)e���[|����(=�E�Q��l��g��*_����.=3�"h簘�Eԙ�A̔���J��B0���"�l��S3lG�O���)��.�gTZ&�t�2x*�#]Ř)�=X̬FO�~��ج�Vpæg�B����De-���7�J^��P��2m��XT��� Sl�ISTʑֵ��AUxD�6fz2a�'�E��~�7f�szL��.�I�yXfb��$H����Z�e����f�mn���"�
Jz��2���e-�B�����?u]���
��]��8@�o}��f}��^��<t��{ö8w#nGv5*��2�߲כֿ�XqC\�����j_e��H|�U�f����*`Z�OB����բ� ��i�U�ڶW���&Y�d�ф���W� (T`4�}���]&�<�E�
�W,�i�'����O���mJ�H�-��^L�`�R�tX�$���Nݸ�ٛ�ѷX����������
O;��w�V�����P����<��
t%�d�b0O~�%�xޑ:�J�d�$-��+§�u���� 5�]�M�"��3<��J�"L�ύ�����'�?m�l�Z���u��A�cw��"z��!��Δ��rߌ�&Q�q!&w7X+f���ر��PV�*�U�:�vZPZ�H�k��LcR�6�R�A�Wn&�{D�"���ݹ���ؓ�}�D����秂���R��|�4��5�e
�Gu��B�?�E�Suk��^ݝyZ�l�F�̃3M,+D~��0�Q��Q`;2�7� E����S����-�9^����/��~���,`����*Ω������鶂@��ܴ�5��}Iq!A%Al��oc�lq�fs�j�|���]�ƈ3������z��΋v���t�+Yi�&�@����TR`��[*b��h��X>Ǐ��f��]V.���e����������\e�F�7,�CȨ�{K%�_��f�$CD���D@L�-��Xh�|�]���|�^�8�;FV$�~y ���6)���"��6w�3�`��;o�bT_U�bk�����$��(m/����(�d��8�aE��&N*-�~~\�??��bYu�ղ]E���=��8~�V�j����]y+jIL���:�F����	_�Y��bm��-�r�ay�b��mpkSP��ޏY���9 !zy�Z��͑�b�D���iwCT��qڵ ��%�0?�Et�K$u&���>B�R��ݴlLK2�J
�{�]J�	��L+Kj��h{����P��RnX�˄h�	`��j�z|�h��}Ҡs�,����QD��"�mpGCL�aϞ��]xo�XCRQ'nq�BxI�j�J��,�4� D�$J��qE���2gC���1�K��ۅ����GĠ������G�t���P�6SG��jU���F�vu��Z&�B��^V�թI,�j��E�4�)�I��f��su����)M���ֳ�sm*����MJ����ŋ���82�����sLx�)����Z���t�7��5�b�}���"��n�!@�p"�����4����4i?�8N^g,�Ȩ=�_�.�U�rꐨT�Jp��M�X5�AFl��G�뾋*�R@����N6�<s�L:Ѥ/-u�T/�թ�G�Q-����W�2i4�.Ѕ�|�U&'ڦ؜�_5�,(�l���>���4��mr�GP)z�?�{!"��� r��;�9P^&M�JJu=�?"[����za.���E�� O�}7h?�7���Fd�ˮ�m�Ѐ��@�QS1䜫õ��*.QM&���Ր��22/g��Lפ��\L�Ʈ,����Ѐs��WkS&&Gi�����6nvlÅ��/��H���-�J��������1�;q{������U���U��qq�����}.q���8d��j�Su���bqv~�����=B���_�wsv���*� �g��/�z�"{��==��R8�Qtt�۸`yԤ_)ƣ\T�5�@P�wDe�(��6��s:�t1y��Ű�H���F?e7�3-98B�V�/�aZZK�`��\K����3i����4��y҄&���Vm^H#�҇�sl���b4�gjgi��YC��/�9�;��qzl J�����
t�;k�\[�&i�3�UX����殿��M��dIC�*b@(�RW|��&������EȈY�u���R��r��IΤ�.�׭0Q�X!���8��r����c@��\$LD��"B�L�T��E�xȽD�Ԣ�E�-ݼ�b3�]�y�ߙǎ�j����:��������e
��IY[�=���\������e�LtI�����acJU�w~x���BJW�YW5|���L��8h�o����7,5�*�Z*��!�-ґ��æ0��x������*JI,�yJ!��u̵F�I-NE�2�M��y(�T�(���)�E
|MR-����N%�5��~��tQb�_
`A�t<��`���7�{.�Ʋ"��Bp���	u!��>��(i=Gb����Mu:��M��M�mIW�4w�U����e�'���I�k���h)��io�P^�8:�_bn	֏�N�Wq�FQBD�~s�ަ�-5k�a#J.T�)1#���p6-3� �^>����h���LT�����M�0����w%�[7m���x��xϟz����b:��	��!����{�=Q��?���v�J��ÝR=�QĈ���P8m=(��ʁ����Ʉ`c��a�e��JP�%Y%��y�S殿�zL������`(Ƞ�VjRi��@2��"�U$߇!g?���[��i	�8��_g\��ۂ�c\�>�N'�n��7q�n/�~췛q'�4{�F��UmAA#uv��Lt<R��IMFl�NK����o�B�NoL@�Z�စdWI�D�x��+oׇ؉n�|k;w`C^���xk�E���q<�D�k?jI9>o^���<�����4�Vf����.�9N������O��:�����lR<���/���B��ۆ�b�D�7�Yk`�;B~n��ٱ�����a��V��%�S���ޏf&F�ڪ�P"dR�2='՟w]y�E RQ��D�NPQܸ�S(�k��;Z6�������0Z�Y�RE����/���';�^��Kd�Yώ�y�lf{qu������M��, aL3�k;�6S@d?�ɣ8����}q�}9��&	�_�[��D ��Vg����x�������A�(Ja
���o;�fV
�z�^QR *��q�}Տ��6��}���j>�B^R����
�P��M�a�~�Q̐,x�*�6����i�G(cԏF�8���l~������`~i��gI��_L�Z�t��m�$�(٭{3u���^�'�*̢�(3��k� ��k�������pm��;�q?�����M|�|.��zzυ���:��NRnώH���������w��8l�9V|�0�}�R���1�o�T6���Q#��Z�6���n1��H���tK:�g�\K ���O_) �����6�`/��`�287�SU{�Zhf~w�=��L������]/2��5~٪�����0KT.�ҳG�U��*-�UP�.�!ú@].�@ܼ�1*)���w3�n����Qh�����Z�,Q�?�o�%?-���G�9/�����]3-�)"�y� �+�y�}J�|>��np3�"	��;��Zd��cb勰�g��p�z ������,�ɬ��i���٤58L�
Sh��    蟔��Mkg&ݤo��6 dAO�֡l����zU���3ى�൥�N�/��|/����iE���n���d���>�u���q��[�����@�eW�S!�����5�yl������fO3�{��x����Qg�wq1v�<��y7���G�H1[Y�|�dc4a�HD�3���C�j�e2�������:�o.�����e�̮qbxdb_�<�˓U"��.�%���R��D\�Xx[��[�Wޔ_�]y�y`W��ޚ��|Zk�D�&a<�lo�G�����DW�m�6�Gҿ�D��	rx����=�����y��f�O�߮
��|҅�c��4�`����Nst�K핋�%��ˤ1��SF��%;�77}R> ���b�Pg�e��v�&��Y�]�.Ə�Q���u�n��s�&���.$�4�+52<w�p���n>����e���`R�YK��n9�P0�6�l ��tzX�]�8�.� 0~�ٺ��k�1�|;�� ��{ �I _S�EF7�m��`�������+�Ģ�R}��J��y
{s�1�g�S��?J�d�QH�</!a���,��l=]��>�!��#����2/5`M:]�@	6mma���ic�V�@�z����07b�rO��(���E�΄�g����Yf�wb�"m
«f���j#p퐖O�}~nRT.�d�N�(SvӒ���d�Lh>Re#@�z�c��_8��E@�W�57��~'^���.Y����g�ɪEA�v�u7EY���P�$���A��T�����;;���9�N��G���.�I9�u���}w�O�Y��$��Q\Uު7˂�z�Vڭ�T�D��SdӘ�����i�MW�;Ӛ�*$X��&Jm�$5�w�U�̮*�P(�a��4U���y�i��j׊3:�¸iN�V�/����:<+ǪUf���H�1&͙���C���x����nk��{��6'2[[jXjW'j��Z��{�3�RPX��p�~�+�:E{��p9l����m���xg������ٶ��'��%��q#;[M�a�U�OG�����h^�nlP�����#�j��i���"6ý��}�T�g�J��-{�]���76�v���* !�d���$�nv��?���e�D)׸%I8��p��<_)qvS����q@\�m5�8 ΟJ���S���/䐸{�b�D�M8I�VsYy�6W�9���'��D�[�)jJ�	��� ��~�P�R���E���T�݌V�M���l'�.{� J��l��2J%X�}LlYtH��1]Y���G�m�|���"B��m�N)9�SZ�RaO��$.-�������D��~�
d)�js��آ��#�	��"-��?C[zO��Z�	hK�g��a-��@���^X��K,��j����R㥃g��� QY�Uj��Glţ�w.Y� %0CB�ʌeP��C���	�Ҵ*�,w�{�T�8X]Z�h���Z(�'Y>쩃͕�Ǽ��6[�M�\��?�D�E��T&G�zP�
ZW�)��"K�(���8��$�ira �tu�9���&�G�wK�#�S��]�ռT���$���vM:+l�[�MDN`�r]DK��zS�bʲn��q�^��	z�����
Y�]��6Ipk,$�$��?<��mj`7őEf��:���ǅ@�����aS$�A�������>��S^���=���S,��c��{�~<<Z���e���}��d�n�Ⱥ�o-$o�ޭ��ᲅ,- a;I =����5r%Z~��M���)i�Ed���{4� ����r�"��k7��jVe^YZ#�p��)�.`A��P;����5A���E�6��B�:'Jz��X��ܝ^�**TƜʋg}=��
>�y��n��\����C�L�(
ϕ�� �u�PI�d�U�"�U喍�](���+PP%U"��������O���y�
��y�P8g�5������<�|��l�i�8����@�F���z���ُ��vr\5��+�t�`�&&d,W�S�h�/��S�g��3,����c흃�z��ފ[Mq:X���b��z��ʷ�����n��L���K�e&� @�� k��[��,�G+�-��p*���?�D�hHt�4Z�!:��#E�.E�T�YP��^�V�@vz�~ʷ��w=���v�xµk1q:�o�n�bS�X
�8`XL�jZ5��.��QW�'�>����O�]���L������� %�[r�K:PPƋa"5�0�	C�'θb&V����Ap����	�'~N:�.�Ͷo�sn+�C|HFB"����T�z����2Dl��aoj!�QW2���R�`E�m��clҢD�&����_�+�oxw��E�(�����E) %�H�%�Vue�ŕ���zxQZ�n]~U@��g�[>-	F���0%���� ��\`*&HQ��?��L���)<�!E���}��������&��Ͳ*�`��f��,�;���<��|(q�dL���P��&�3v�[W�d(<�W�YKu]
�NQ�f��:��@�����Ήi[1�
�|B���������}�k��ކ{2U���>�Y[G#Q�,;}��g�N��9����}/����N�Td�-b���>���.�`��	�qLh $��H�3�a|*�r�A���kI��.!�m	
 �	@Bɱ�ٻ��U�Jӊ�W����1������x���s4Sb��YV6ݻ�4�(�^�l��U���[(�(���-A��\e������KLI�VbN�����C:
&���V��5p�^n����}��Лi�N]��r�?/|1��ԭ���t��ԟ67:�v�r~��Ϗ
ܧ��t�9P1��k�;���I�c����[�d���a3I��a%�
��`��^����եY�hIإ)س��o�v���ã�����@Idn��dn-�0`,�-эa������ŗnQ<
w�2�ĭ�r�^.�_g�[�4��3Y��(�3���_eUQE;�\;I�J���`.	�&~a1PCW2��pCT�����Ap,�U�� �Qu+5.h��d2<���	s)ɓ����>L���R�dt4��MW�%�Nꦨ���T��^���?6ʭJj���i Ք��^ӄߓ �>���寒������5���&�V�
�)�!��Z�d��V������u�_�����'T�l�ʣB�'��5�rmA�{�(��K�80�9hm�C�*�)�\���Ż=�Z.vBtzw�L���~ɶ��qoVv������Dy�+>r��ad����Mʪq�68QJ4�+mPQ)�n�uu(���	?�Ժ*.i�ѡ�{L�8�*"S�K�)�Ͷ��L��,�"��TJ���@�>��z�&ߗ��J��=&r���R� ;*���|x4'�<O@u����嫡���`R�-����7GQ����b�%e��w�r
1��vp��X�uH�8^�l_�K�6��l�]bě*�a�S�*6��
E�05�.�Q���@��9:X�R���X�B�:�r�`o�����9쭺-�7v{��q�1S�0l8� �y�:u>���L^�C�BP�xQ��~�U��'�V,kK�	�S�3����'�����E�8Sk�B1�@S1�|��V��E��ՠp��݁�f)���[� ��O~�ς�(�j&�!T*��/\\^B�Rכ���6@U
�r��0��*OZL�#����Z���>)��V��#���&J�p�;5�dHqO~~���f.4	��V�7	�ŧ{�M5��ǟ��I���dJ���W�����T�ذغ"X2��+x���k���=�%��B���?��x�'9a�,���7r���"����f�,�I���L�:|�q4n*�Vݠ$=�Y<:I��㸢ȕ���F��/U���􋟆h�q�Y�F�@�v�k o��zw���b� ܊���A-�.wn�#X����O��|�q^��VY�)L�����J��9��-��^��nvqvN��V�ХR�%=o@Wk�p������~j���Яˡ;T&�� �  �"�+;���Π�/y(�s�����Yq�����֫�P��a��/}80�W�z���j������tb�����!F]_$��?��m��\�Q����ȕ�X �g��[s?B�(��p�_�d[���ʛ��6ٖߛgD%N�ø��0X>�v߆�r]r�,��T���g?�%\!!�.q�̔@4����Ŝ�j�~��8^f�#���:�6ΔO�Ð&[d2����Rq�(ֆ�C��89�I��z�"r����:ai9�	��^�a������CH����٧*A�_�S����~xTT�/�3�wV�G=9E�A���x-�Ѱ�N�d�H<�rP	�����_4~�i^����S��5���s�t������(=ծTK��ޮ��bЩ�J��*�4a~Za����N�@$��]�E�ai&�J �����D���nר�*�� ZD��MI;<��d�,�����z�\�]�&�+c�<od���;[�z�����Ӿ���l�Wk����'4��g?{JJ�,���B��/
o��[��&'ޖo����Y�-�8���fkg�\}�V�ֽ_���+���w��Z���~�r�V�����h����8s�z$5c�P�KvKi>� �˥w�ĭM�J�i-$X��'��g���ϡ3'�d/���U��*�l����$�>�<�u���z���L������\YIR��L�cR����T�Vg��u��/�8���)Hp�ݔ�XH\��E�x����3Ƭ*9|�D�2�I����<����8@���c�B�U�k�Qv�I3�PVŵ�Rir\�kT���My�+�O�V����!���1��Y�*���,�:OC�O)]��Y��Y�y� f��qo�@�C%X�T,�t�������T��b$Le���=���p���"��Ai�5a=��K���Y�����veد�{= �V$ms^��35ϯ���0S��+��K�
��YD�Ag��l�%T��fZ[e-�R�o\�f6�
�ׯZMi�����-T/J�:k��|���ȣ=�ϥ�L��)/q�=��"�qKi��A�[�",�[��.���]�+h\������Q�5�
`��NJ�)i\L�����C'��I��9)]���lRs�I��&�����l��d�V'۶:ٶ�ɶ�N�mu�m��m[�l[{�m�ɶ�'�֞l[{�m�ɶ�'�֞l[{�m�ɶu'�֝l[w�m�ɶu'�֝l[w�m�ɶu'�֝l[8ٶp��d���V��[��������'�_          �   x�]��j�0��y˶b�V�m�ص�y�GR����({�)k%����?�r�����^J�3�$6�1H�8p@��X�Zr>��d���]�r��&8��G<@�38p���<���?�y�%�f���P,�A��Ƒ�:�e����1	xxS�� ����/u�����~D�Q�,3�vk�Hx�)j�����������q9W�n���J��K���]|���ߎ���c�u��d�            x�3�4�4�2�4��@҄+F��� !��            x�3�4��2��\�@�Ѐ+F��� %��            x�3�4�4�2�4�1z\\\ 5         �   x�]���0Dg�c���u2&v*!�(eb��J�����.���p,D^]E�"GED��cQ�ԃ�w�p�S�A�4��c�� ���
��
	�4���:l���-B��w0��K�n�ݧ�{[`|��L�D|od䣑J U����S_��U|�sB�hɄ�eM,��*���m�4��WCh      
      x������ � �         R   x�3�t�+����Wp��;�<1�,�X!,35�(���Ș�7?=3'��61�53�����444�0�41�4��4�4�4�=... ��W         �  x�]�=n�@��<�N�����.�dc @��r���c$7{ckw��.������(����z_{��>�G��[Z��<]��ş����A>�p��^�~�������4����r�%������I�hS�t�,�U����oac4�̦�a�h���?_�lZzMz����u���υL�wa�u�ۑ��f9�_��sI]��tc��mҭ}�"�O��]�;�O�z��Q�o�k�
ki[�a���v�jP�IKG��y�Q�:�z���N.G�h�׏tֽ�~���<�]Үc��>�. Hv�o[�9Hp��"�%$080808	,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,�G�E�A��3���YL           x�u�I�d9D��w�4�������8�6]�&,,=A�)�6�m���{Ӯ���m�y�|�7�����hS C]�K�4=\u�O���X���6:9��v�M�Ώ,n��:l�u��U�*S��/ō�g-P�n�x*Pv<�d���A��2��u{*��~n�;��=l.��`ƚ����	S��Ԥ����ĩ��4yz�*�y�*�< �f^d�B�P9������*� ���e�GQ� 2��D<�
D<
Q�'�>X1ά�թ�<�r`3�-�L`kr`3��Ł����X������<׭T�yj��Ȓ��1�x��<7ފ���I�8� 7���[�n��M���t� �)pS�mGn[�
$���&v*�DRΒ5��v�>�R�l��;�����9<?w�ň�ٚ�+��}M��UI�i���oF��U	Y7����l(�G��	�=�$4\�F�1˺����7��s���ҧt��N�L}�d�V��u�����hs#��1�id�����O�Z�шꠡE��Vf�7ɝ5}���Y�7�*�Vw���y��C|g��ŉ����|��|�˗ˎ �W��F��Vd�2�k�eϐ^�E�MC�DנzTv狓�]D��do��:���I�ho]Ī��\{U�]�����-��R9�����<�b�yFw�|;�\>��C�E�M����>L�@�|��[>�����靇�o�v�5V_����@𒼿��.��7~�2�U/�^nafP�Q���.d���"���ަ���Y%V�<{����ZG�O�������?��xN      &   x   x�3�9�*/�8$�@��(�83�ˈӵ� ��$�X�7?%Q�91���Ĕ�b.cN����2�RR \s2KR�L8]2�K�2�J3S���p}
�2ˀF�r����+������qqq 2x         !   x�3��M,N.�����2�tK���1c���� ~�         7   x�3�t-.�/*�,��4�31�L�2�tN,.M��MA|c����L0�ď���� ���      )   �  x��\�n��]�|�@눨��G�$^$@#�w�Q�D�F-K-oM>%?�[$����"a�Ă k��!���G]
6�./�E�m�5�#�p�hswx8~��?l���߿��7��7��ۣ�������}���]_]l�w폷�O���ş�����߯o~�]t\����_R�����.�w���>��H�oBLO�7����b�rɄ����v�7��?�C�o�E{�y�������;����z������_׷/����qw||�����}���[����qۉ���i�#�ew�{�כ�����:�r��d�C�Q�UҥK�U���M\��S�is�oZף��c\�G����z������9<��z_�c���Kr#=K�Cl����5���j�K�A�'=�oo��u7��Q��#���aw��"��R���РP ^�H���W��9��7*�sSu$��D�݃����G[���77��.-l)������-=��������������_{Ɲ��?�n��N��λ�?���|�q��w������!�����/|R�����W'1�)fdǙ{�������7_n������r���w�?�n��W�+��*��`c&�j��'��������D -̓9`S�]�HLS@j3�\(��M�}@�U�U��[�7A�+���S�Mh˄��%hT�1�r��u~m95�;5,tj(�I'$���L�����0k���[�[Jʬ!p�q�AJD�"4^�/�嶠u�@F6́<k��������jhb�h�e�)*�&��aC�:큃�v�h˩^R�^4(����[�B'%Y�;Y�y-���p��ЙbP'1�s�M6)���$T�yo�<���[���,7�_ga��@�@R�)��3͒5���a��2N���Dl���S� n�@�,S5��AY'ϙ�`�MN𴆰�J�ec���,��[1�sU�F�U b��	v����V��J��`\�jf�n�&��NQnu&���4W(Єrb�0#�yq�7�`ӻO�28	�UW��� �,�$�05)U��0XF��Q�2��(���#GVΣ��Gs�,#�ۯ�%����گ�������j�ź�h�[���ί����%�i�i�=J�����َ��^08&e+�����&�!�5ȉ��di{lv�݊vdek0�a���	�� \r_/�V Tg���;Ĭ�� {T'g��a��dAE�d#$g�E_�E�j��pa��r��L)R�`ب}.��&L؂���֔�RWk�5��-j3�!��M'{��=�+���������.�Î�1��"�lP��f��"�E�84��*&��k�M�)��&i.��ie��f��d���T+�~P&d��z�W�
���'z"�y��*������|���"��$��<h��W�*���H�;L�Jgb���2��v��^�_5�	��-a@��a�١����߲k��Iu<���	�(b��W�1_���IT����3ó͝�DtРn�ę����Η�.����S���������1�/	8��)0x�4�"e�\��3�ڟ#!S��䏅�hU���9<����.�[���ڬk��#�|�rVƎ�f��u^z�Z^''�U�7i��"՗��ڭ�$9����$���Op�	!Au\4�KC�y
��_�_?2�}�%���y�VM���OKÈ�2G�C����b1����2bJ`���5)%��-���A���O��NB�����J�6�In'"��1NE]�Ϥ��GL%`P�N��:5FW �ЎCX��J<�#������#��q����8��Rې1H����W�Y��5F��1-#E6��<���o����!盄,����6��G_B����V���N�����G�34�`5�0c���mm��+r~Z{j�\����9��I��J�*�B#+˴�������3g�6�ؠɧ������屄���Æ�b����J"����r>��W�N���4���1mK9����0��ϰr>�n'hiL:��@Z�b3󁓙���^(%o&�5/���DS�|�T_�0ǟ��LLf���by����Q%�K���i5�A	��]l��b��{�u�a	�Ε�u�m��}��z(+�}��X�6�V��v`����AK�3�m�r֩~�S��ހ��+/�y�k�J`��<�+\��~Sh�i�ij���2�;T��Bu69}�Ӻ0�#��Y�[*zp��A���.�}x������|?c��`Lp��g�����g]��LN��\�9���@S�<��P?;5���C�K�=�������T
D��='K_�7�zj�Q��D�N��g��LP-R=/���½?FUVtO�>�ZΨ�]���o��s�xC8C�����`�E���V�|�ù;^��XFx�굄Y��X��@{���bRsr�ű��[��%�t��N�^����j���xz�3�V����7��k�����R~'SHM6�ev����S�x7Cb�۹�̪�9����2�l����8�ƫ�R�l��c�_}r��jtuƝ���8 �5�'��,�X^~�������/&�!9��3�o_�<
^��+��v�z+o���'�Dx�M�xH�M��C%���q�I���{r�bܲ69�����i�T�q��ɰ�ӫ���P�Y��w���w&/�B�3�&pH������b0^�:��#թx��o�ix���w���d��7��=Y���'�n3I��͓&7Y����t�R��S�&��>�A�x{�U����x�H��������������o0^�}ň��j>o�fԔߍ�6�[$��t������q�${��|>���]6u*{uLQM�R�B*	�e�|:��0��4!D?c����TJ����/+�߼��)�{= %�t�I{0�����пBRx�B�c��q H��x/6�L̃�v��ݹ8��b{L�Ӊ��_���F@��ع�ѣ��c5l�{I��1��3%J��D��~p�i>Mm�E��I�N��K�����)Q�k����%a�Ϭ��;gQ�k�k�^�~���w�@=�������}��&��;�>`�ЛQS.�EBp[�S51ޝ� ���\_]��&ƛ�9뻜	0-��U�CI�=**Q,�L�ʉPr�`�]$$����ZN���:1�E�O�Ԫ	���P�NJ�l�_PM�����y���� �A�         �   x�E�)@EA���˰X΁A����	��ԯ�;����z���������u�6'�xX�a? AD0���d$#�HF2���b��Gb��(F1�ьf4���`4��hF36c3��Mۖ7�q\k� ��         z   x�}��C!г�%_�zI�u�E�S.�'��H�ٹ��I��$K(m�����7NJ��)Pn`x2��]��a�ť���54:��8�@O��7�?L`�wL�~M�3�lQ��	�g��֏,\         �   x�e�;�0D��)r����sD�����B$c6�Av�vggvm�������ol"
]3��UgG�WPZJ��\@K j(�&�
R����@TXD� }RE��
/�b�����=��v�y>t��)p�cݾ�G��Fl������0]�a<����;���������%Q1е\&s%�����������1β�\����c>؅\�      *      x����	1��b���三Tp���烄<�>�2��t\HH9^L$T�h�*����䀛����M��JMg�z�+��x������90�웘��F�N���.|���]��7�����G�~po��'a�M�         v   x�=�K
�0Eѱ�
���;|�"��HN��_G��t�#��#���(�Xd��OT$i��_H��T0���$n��J�6�6��V@�<kԊ��c�	f}wy��[_��jX]یρ�wh�&�      '   #   x�3�(���O���K��2�)�ON����� x]�         O   x�3�*M�2�t,K��LI�2�(J<�<���0�t-.)JLI���2�t�I�M�3��L��)J,K-.N����� �=          0   x�3�tN,N�2�t,H,*I�M�+��2�t��K��=�6/3�+F��� ���      "   %   x�3�J-�LI�K�L��2�tN�)�I,����� �)]      $   P   x�U͹� ����v���_���N2L2y&���Dh�,@���Q~P6(�P����~`-ㆁy�����J�     