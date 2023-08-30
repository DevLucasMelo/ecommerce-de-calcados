using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;
using System.IO;

class TestesAutomatizados
{
    void Insercao(IWebDriver driver)
    {
        
        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("meuBotaocliente")).Click();

        System.Threading.Thread.Sleep(3000);


        driver.FindElement(By.Id("nomeCliente")).SendKeys("Paulo Silva de Oliveira");
        driver.FindElement(By.Id("dataNascimento")).SendKeys("01/01/1990");
        driver.FindElement(By.Id("cpfCliente")).SendKeys("123.456.789-00");
        driver.FindElement(By.Id("emailCliente")).SendKeys("cliente123@gmail.com");
        driver.FindElement(By.Id("genero")).SendKeys("masculino");

        driver.FindElement(By.Id("telefone")).SendKeys("11956475179");

        
        driver.FindElement(By.Id("confirmar-cliente")).Click();
    }

    void Alteracao(IWebDriver driver)
    { 
        System.Threading.Thread.Sleep(3000);


        driver.FindElement(By.Id("editar-cliente")).Click();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("nomeCliente")).SendKeys("Paulo Silva de Oliveira");
        driver.FindElement(By.Id("dataNascimento")).SendKeys("01/01/1990");
        driver.FindElement(By.Id("cpfCliente")).SendKeys("123.456.789-00");
        driver.FindElement(By.Id("emailCliente")).SendKeys("outroemail@gmail.com");
        driver.FindElement(By.Id("genero")).SendKeys("masculino");
        driver.FindElement(By.Id("telefone")).SendKeys("11956475179");

        

        // Submetendo o formulário
        driver.FindElement(By.Id("confirmar-cliente")).Click();

        driver.FindElement(By.Id("fechar")).Click();
    }

    void Exclusao(IWebDriver driver)
    {
        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("excluir-cliente")).Click();
    }

    static void Consulta()
    {
        Console.WriteLine("Função 1");
    }

    static void Main(string[] args)
    {
       // Defina o caminho para o executável do ChromeDriver
        string chromedriverPath = @"C:\EcommerceBack2\EcommerceBack\testes\chromedriver-win64\chromedriver.exe"; // Coloque o caminho até a pasta que contém o arquivo chrome.exe
        // Configuração do ChromeDriver
        var chromeOptions = new ChromeOptions();
        chromeOptions.AddArgument("--start-maximized"); // Opcional: Iniciar maximizado

        IWebDriver driver = new ChromeDriver(chromedriverPath, chromeOptions);

        // Obtenha o caminho absoluto para a página HTML dentro da pasta Views
        string paginaHTMLPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..", "..", "..", "..", "EcommerceBack","Views", "Cliente", "Cliente.html");

        // Navegue para a página HTML local
        driver.Url = "https://localhost:7247/Cliente/Cliente";
        

        var testes = new TestesAutomatizados(); // Crie uma instância da classe

        testes.Insercao(driver); 
        testes.Alteracao(driver);
        testes.Exclusao(driver);

    }
}