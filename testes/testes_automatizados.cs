using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;
using System;
using System.IO;

class TestesAutomatizados
{
    void InsercaoCliente(IWebDriver driver)
    {
        
        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("meuBotaocliente")).Click();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("nomeCliente")).SendKeys("Paulo Silva de Oliveira");
        System.Threading.Thread.Sleep(1000);
        IWebElement generoSelect = driver.FindElement(By.Id("genero"));

        generoSelect.Click();

        IWebElement optionMasculino = driver.FindElement(By.CssSelector("#genero option[value='1']"));
        optionMasculino.Click();

        System.Threading.Thread.Sleep(1000);
        driver.FindElement(By.Id("telefone")).SendKeys("11956475179");

        System.Threading.Thread.Sleep(1000);
        IWebElement tipoTelefoneSelect = driver.FindElement(By.Id("tipoTelefone"));

        tipoTelefoneSelect.Click(); 

        IWebElement optionCelular = driver.FindElement(By.CssSelector("#tipoTelefone option[value='2']"));
        optionCelular.Click();
        
        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("dataNascimento")).SendKeys("01/01/1990");

        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("emailCliente")).SendKeys("cliente123@gmail.com");

        System.Threading.Thread.Sleep(1000);
        
        driver.FindElement(By.Id("cpfCliente")).SendKeys("12345678900");

        System.Threading.Thread.Sleep(1000);

        IWebElement statusClienteCheckbox = driver.FindElement(By.Id("statusCliente"));

        statusClienteCheckbox.Click();
        
        System.Threading.Thread.Sleep(1000);

        IWebElement popupCliente = driver.FindElement(By.CssSelector(".popup-cliente"));

        IJavaScriptExecutor jsExecutor = (IJavaScriptExecutor)driver;
        jsExecutor.ExecuteScript("arguments[0].scrollTop += 400;", popupCliente);

        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("numeroCartao")).SendKeys("1234.5678.9012.3456");
        System.Threading.Thread.Sleep(1000);
        driver.FindElement(By.Id("titular")).SendKeys("Paulo S de Oliveira");
        System.Threading.Thread.Sleep(1000);
        driver.FindElement(By.Id("bandeira")).SendKeys("MasterCard");
        System.Threading.Thread.Sleep(1000);
        driver.FindElement(By.Id("cvv")).SendKeys("123");
        
        
        System.Threading.Thread.Sleep(1000);

        jsExecutor.ExecuteScript("arguments[0].scrollTop += 600;", popupCliente);

        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("logradouro")).SendKeys("Antonio Gonçalves Vieira");
        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("cidadeCliente")).SendKeys("Mogi das Cruzes");
        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("bairroCliente")).SendKeys("Mogilar");
        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("numeroEndereco")).SendKeys("123");
        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("cep")).SendKeys("12345-678");
        System.Threading.Thread.Sleep(1000);

        IWebElement tipoResidenciaSelect = driver.FindElement(By.Id("tipoResidencia"));

        tipoResidenciaSelect.Click(); 

        IWebElement optionResidencia = driver.FindElement(By.CssSelector("#tipoResidencia option[value='2']"));

        optionResidencia.Click();
        
        System.Threading.Thread.Sleep(1000);

        IWebElement tipoLogradouroSelect = driver.FindElement(By.Id("tipoLogradouro"));

        tipoLogradouroSelect.Click(); 

        IWebElement optionLogradouro = driver.FindElement(By.CssSelector("#tipoLogradouro option[value='2']"));

        optionLogradouro.Click();

        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("estadoCliente")).SendKeys("São Paulo");

        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("paisCliente")).SendKeys("Brasil");

        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("confirmar-cliente")).Click();

        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("gerenciar-cartoes")).Click();

        System.Threading.Thread.Sleep(5000);

        driver.FindElement(By.Id("numeroCartao1")).SendKeys("1234.5678.9012.3456");
        System.Threading.Thread.Sleep(1000);
        driver.FindElement(By.Id("titular1")).SendKeys("Paulo S de Oliveira2");
        System.Threading.Thread.Sleep(1000);
        driver.FindElement(By.Id("bandeira1")).SendKeys("MasterCard");
        System.Threading.Thread.Sleep(1000);
        driver.FindElement(By.Id("cvv1")).SendKeys("123");

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("confirmar-cartao")).Click();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("fechar-cartao")).Click();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("gerenciar-enderecos")).Click();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("logradouro")).SendKeys("Rua Armando Maritan");
        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("cidadeCliente")).SendKeys("Mogi das Cruzes");
        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("bairroCliente")).SendKeys("Vila Oliveira");
        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("numeroEndereco")).SendKeys("234");
        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("cep")).SendKeys("08790-340");
        System.Threading.Thread.Sleep(1000);

        tipoResidenciaSelect.Click(); 

        optionResidencia = driver.FindElement(By.CssSelector("#tipoResidencia option[value='2']"));

        optionResidencia.Click();
        
        System.Threading.Thread.Sleep(1000);

        tipoLogradouroSelect.Click(); 

        optionLogradouro = driver.FindElement(By.CssSelector("#tipoLogradouro option[value='2']"));

        optionLogradouro.Click();

        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("estadoCliente")).SendKeys("São Paulo");

        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("paisCliente")).SendKeys("Brasil");

        System.Threading.Thread.Sleep(1000);

    }

    void AlteracaoCliente(IWebDriver driver)
    { 
        System.Threading.Thread.Sleep(3000);


        driver.FindElement(By.Id("editar-cliente")).Click();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("emailCliente")).Clear();

        System.Threading.Thread.Sleep(2000);

        driver.FindElement(By.Id("emailCliente")).SendKeys("outroemail@gmail.com");
        
        System.Threading.Thread.Sleep(2000);

        driver.FindElement(By.Id("telefone")).Clear();

        System.Threading.Thread.Sleep(2000);

        driver.FindElement(By.Id("telefone")).SendKeys("11958324313");
        
        System.Threading.Thread.Sleep(2000);

        driver.FindElement(By.Id("confirmar-cliente")).Click();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("fechar-cliente")).Click();

        System.Threading.Thread.Sleep(5000);

        driver.FindElement(By.Id("gerenciar-cartoes")).Click();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("editar-cartao")).Click();

        System.Threading.Thread.Sleep(3000);

        var bandeira = driver.FindElement(By.Id("bandeira1"));

        bandeira.Clear();

        System.Threading.Thread.Sleep(3000);


        bandeira.SendKeys("Visa");

        System.Threading.Thread.Sleep(3000);

        var cvv = driver.FindElement(By.Id("cvv1"));

        cvv.Clear();

        System.Threading.Thread.Sleep(3000);

        cvv.SendKeys("321");

        System.Threading.Thread.Sleep(3000);

    }

    void ExclusaoCliente(IWebDriver driver)
    {

        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("gerenciar-cartoes")).Click();

        System.Threading.Thread.Sleep(2000);

        driver.FindElement(By.Id("excluir-cartao")).Click();

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("fechar-cartao")).Click();

        System.Threading.Thread.Sleep(3000);

        //driver.FindElement(By.Id("gerenciar-enderecos")).Click();

        //System.Threading.Thread.Sleep(3000);

        //driver.FindElement(By.Id("fechar-endereco")).Click();

        //System.Threading.Thread.Sleep(5000);

         int scrollAmount = 10;
        int scrollTotal = 1600;  

        IJavaScriptExecutor js = (IJavaScriptExecutor)driver;

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(2000);

        driver.FindElement(By.Id("excluir-cliente")).Click();

        System.Threading.Thread.Sleep(3000);
    }

    void ConsultaCliente(IWebDriver driver)
    {
        System.Threading.Thread.Sleep(8000);

        IWebElement termoPesquisaInput = driver.FindElement(By.Id("termoPesquisa"));

        termoPesquisaInput.SendKeys("Paulo");

        driver.FindElement(By.Id("consultarClientes")).Click();

        System.Threading.Thread.Sleep(5000);

        termoPesquisaInput.Clear();

        System.Threading.Thread.Sleep(5000);

        termoPesquisaInput.SendKeys("1990");

        driver.FindElement(By.Id("consultarClientes")).Click();

        System.Threading.Thread.Sleep(5000);

        termoPesquisaInput.Clear();

        termoPesquisaInput.SendKeys("Ativo");

        driver.FindElement(By.Id("consultarClientes")).Click();

        System.Threading.Thread.Sleep(5000);

        driver.FindElement(By.Id("consult-transacoes")).Click();

        System.Threading.Thread.Sleep(5000);

         driver.FindElement(By.Id("fechar-transacao")).Click();

        System.Threading.Thread.Sleep(5000);

        driver.FindElement(By.Id("inativar-cliente")).Click();

        System.Threading.Thread.Sleep(5000);
    }

    void ConsultarPedidos(IWebDriver driver)
    {
        System.Threading.Thread.Sleep(1000);

        IWebElement acompanhaPedido = driver.FindElement(By.Id("acompanhaPedido"));

        int scrollAmount = 10;
        int scrollTotal = 1600;  

        IJavaScriptExecutor js = (IJavaScriptExecutor)driver;

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(1000); 

        acompanhaPedido.Click(); 

        System.Threading.Thread.Sleep(1500); 

        scrollAmount = 10;
        scrollTotal = 800;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }


    }

    void conducaoPedido(IWebDriver driver)
    {
        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("1")).Click();

        System.Threading.Thread.Sleep(2000); 

        //driver.FindElement(By.Id("cor")).Click();

        //System.Threading.Thread.Sleep(2000); 

        //driver.FindElement(By.Id("tam_34")).Click();

        //System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("btn-comprar")).Click();

        System.Threading.Thread.Sleep(2000); 
        
        IWebElement quantidadeSelect = driver.FindElement(By.Id("select-quantidade1"));

        quantidadeSelect.Click(); 

        IWebElement optionQuantidade = driver.FindElement(By.CssSelector("#select-quantidade1 option[value='2']"));

        optionQuantidade.Click();

        System.Threading.Thread.Sleep(2000);

        driver.FindElement(By.Id("meuBotao")).Click();

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("2")).Click();

        System.Threading.Thread.Sleep(2000); 

        //driver.FindElement(By.Id("cor")).Click();

        //System.Threading.Thread.Sleep(2000); 

        //driver.FindElement(By.Id("tam_34")).Click();

        //System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("btn-comprar")).Click();

        System.Threading.Thread.Sleep(2000); 

        IWebElement quantidadeSelect2 = driver.FindElement(By.Id("select-quantidade2"));

        quantidadeSelect2.Click(); 

        IWebElement optionQuantidade2 = driver.FindElement(By.CssSelector("#select-quantidade2 option[value='2']"));

        optionQuantidade2.Click();

        System.Threading.Thread.Sleep(2000);

        driver.FindElement(By.Id("meuBotao")).Click();

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("6")).Click();

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("btn-comprar")).Click();

        System.Threading.Thread.Sleep(2000); 

        IWebElement quantidadeSelect3 = driver.FindElement(By.Id("select-quantidade3"));

        quantidadeSelect3.Click(); 

        IWebElement optionQuantidade3 = driver.FindElement(By.CssSelector("#select-quantidade3 option[value='4']"));

        optionQuantidade3.Click();

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("btn-endereco")).Click();

        System.Threading.Thread.Sleep(3000); 
        
        WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
        IAlert alert = wait.Until(ExpectedConditions.AlertIsPresent());

        alert.Accept();

        System.Threading.Thread.Sleep(3000); 

        driver.FindElement(By.Id("pagamento")).Click();

        System.Threading.Thread.Sleep(3000); 

        alert.Accept();
        
        System.Threading.Thread.Sleep(3000); 

        driver.FindElement(By.Id("finaliza-pedido")).Click();

        System.Threading.Thread.Sleep(3000);

        alert.Accept();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("fechar")).Click();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("telaPedidos")).Click();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("acompanhaPedido")).Click();

        System.Threading.Thread.Sleep(9000);

        driver.Url = "http://localhost:7247/PedidoAdmin/PedidoAdmin";

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("termoPesquisa")).SendKeys("1");

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("consultarPedidos")).Click();

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("consultar-pedido")).Click();

        System.Threading.Thread.Sleep(6000);

        IWebElement faseCompraSelect = driver.FindElement(By.Id("faseCompra"));

        faseCompraSelect.Click(); 

        IWebElement optionFase = driver.FindElement(By.CssSelector("#faseCompra option[value='3']"));

        optionFase.Click();

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("confirmar")).Click();

        System.Threading.Thread.Sleep(4000);

        driver.Url = "http://localhost:7247/PedidosCliente/PedidosCliente";

        System.Threading.Thread.Sleep(2000);

        driver.FindElement(By.Id("acompanhaPedido")).Click();

        System.Threading.Thread.Sleep(5000);

        IWebElement selectQuanti = driver.FindElement(By.Id("select-quantidade"));

        selectQuanti.Click(); 

        IWebElement optionQuant= driver.FindElement(By.CssSelector("#select-quantidade option[value='2']"));

        optionQuant.Click();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("ped-1")).Click();

        System.Threading.Thread.Sleep(5000);
        
        driver.FindElement(By.Id("motivo")).SendKeys("Calçado com defeito");

        System.Threading.Thread.Sleep(5000);

        driver.FindElement(By.Id("calcado-devolucao")).Click();

        System.Threading.Thread.Sleep(2000);

    }

    static void Main(string[] args)
    {
        string chromedriverPath = @"C:\Users\lucas\OneDrive\Área de Trabalho\ecommerce full\testes\chromedriver-win64\chromedriver.exe";

        var chromeOptions = new ChromeOptions();
        chromeOptions.AddArgument("--start-maximized");

        IWebDriver driver = new ChromeDriver(chromedriverPath, chromeOptions);


        string paginaHTMLPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..", "..", "..", "..", "EcommerceBack","Views", "Cliente", "Cliente.cshtml");

        driver.Url = "http://localhost:7247/Cliente/Cliente";

        var testes = new TestesAutomatizados(); 

        testes.InsercaoCliente(driver); 
        //testes.AlteracaoCliente(driver);
        //testes.ConsultaCliente(driver);
        //testes.ExclusaoCliente(driver);

        //testes.ConsultarPedidos(driver);
        
        driver.Url = "http://localhost:7247/PaginaInicial/PaginaInicial";

        //testes.conducaoPedido(driver);

    }
}