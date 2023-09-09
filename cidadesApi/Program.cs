using Npgsql;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class Cidade
{
    public int id { get; set; }
    public string nome { get; set; }
    // Adicione outras propriedades conforme necessário
}

class Program
{
    static async Task Main(string[] args)
    {
        string connString = "Host=localhost;Port=5432;Database=ecommerce1;Username=postgres;Password=123fatec;";

        using (var conn = new NpgsqlConnection(connString))
        {
            try
            {
                conn.Open();

                // URL da API do IBGE para municípios
                string apiUrl = "https://servicodados.ibge.gov.br/api/v1/localidades/municipios";

                using (var httpClient = new HttpClient())
                {
                    // Faça uma chamada GET à API do IBGE
                    var response = await httpClient.GetAsync(apiUrl);

                    // Verifique se a chamada foi bem-sucedida
                    if (response.IsSuccessStatusCode)
                    {
                        // Leia o conteúdo da resposta
                        string content = await response.Content.ReadAsStringAsync();

                        // Desserialize os dados JSON em uma lista de objetos Cidade
                        List<Cidade> cidades = JsonConvert.DeserializeObject<List<Cidade>>(content);

                        // Itere sobre a lista de cidades e insira cada uma no banco de dados
                        foreach (var cidade in cidades)
                        {
                            string sql = "INSERT INTO cidades (cid_nome) VALUES (@nome)";
                            using (var cmd = new NpgsqlCommand(sql, conn))
                            {
                                cmd.Parameters.AddWithValue("@nome", cidade.nome);

                                cmd.ExecuteNonQuery();
                            }
                        }

                        Console.WriteLine("Cidades inseridas com sucesso no banco de dados.");
                    }
                    else
                    {
                        Console.WriteLine($"Erro na chamada à API: {response.StatusCode}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao inserir cidades: {ex.Message}");
            }
        }
    }
}
