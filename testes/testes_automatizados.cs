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
        driver.Url = "http://localhost:7247/PainelAdministrador/PainelAdministrador";

        System.Threading.Thread.Sleep(6000);

        driver.FindElement(By.Id("gerencia-clientes")).Click();

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

        driver.FindElement(By.Id("senha")).SendKeys("Usu@rio34564");

        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("confirmarSenha")).SendKeys("Usu@rio34564");

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

        IWebElement modal = driver.FindElement(By.Id("popup-cartao"));

        IJavaScriptExecutor js = (IJavaScriptExecutor)driver;

        js.ExecuteScript("arguments[0].scrollIntoView(false);", modal);

        int scrollAmount = 20;
        int scrollTotal = 320;

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"arguments[0].scrollTop += {scrollAmount};", modal);
            System.Threading.Thread.Sleep(50);
        }

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("fechar-cartao")).Click();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("gerenciar-enderecos")).Click();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("logradouro1")).SendKeys("Rua Armando Maritan");
        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("cidadeCliente1")).SendKeys("Mogi das Cruzes");
        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("bairroCliente1")).SendKeys("Vila Oliveira");
        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("numeroEndereco1")).SendKeys("234");
        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("cep1")).SendKeys("08790-340");
        System.Threading.Thread.Sleep(1000);

        IWebElement tipoResidenciaSelect1 = driver.FindElement(By.Id("tipoResidencia1"));

        tipoResidenciaSelect1.Click(); 

        optionResidencia = driver.FindElement(By.CssSelector("#tipoResidencia1 option[value='2']"));

        optionResidencia.Click();
        
        System.Threading.Thread.Sleep(1000);

        IWebElement tipoLogradouroSelect1 = driver.FindElement(By.Id("tipoLogradouro1"));

        tipoLogradouroSelect1.Click(); 

        optionLogradouro = driver.FindElement(By.CssSelector("#tipoLogradouro1 option[value='2']"));

        optionLogradouro.Click();

        System.Threading.Thread.Sleep(1000);  

        IWebElement modal2 = driver.FindElement(By.Id("popup-endereco"));

        IJavaScriptExecutor js2 = (IJavaScriptExecutor)driver;

        js2.ExecuteScript("arguments[0].scrollIntoView(false);", modal2);

        scrollAmount = 20;
        scrollTotal = 400;

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js2.ExecuteScript($"arguments[0].scrollTop += {scrollAmount};", modal2);
            System.Threading.Thread.Sleep(50);
        }

        driver.FindElement(By.Id("estadoCliente1")).SendKeys("São Paulo");

        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("paisCliente1")).SendKeys("Brasil");

        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("enderecoCobranca")).Click();
        
        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("confirmar-endereco")).Click();

        System.Threading.Thread.Sleep(1000);

        driver.FindElement(By.Id("gerenciar-enderecos")).Click();

        System.Threading.Thread.Sleep(1000);

        scrollAmount = 20;
        scrollTotal = 500;

        IWebElement modal3 = driver.FindElement(By.Id("popup-endereco"));

        IJavaScriptExecutor js3 = (IJavaScriptExecutor)driver;

        js3.ExecuteScript("arguments[0].scrollIntoView(false);", modal3);

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js3.ExecuteScript($"arguments[0].scrollTop += {scrollAmount};", modal3);
            System.Threading.Thread.Sleep(50);
        }
        
        System.Threading.Thread.Sleep(5000);

        driver.FindElement(By.Id("fechar-endereco")).Click();

    }

    void AlteracaoCliente(IWebDriver driver)
    { 
        driver.Url = "http://localhost:7247/Cliente/Cliente";

        System.Threading.Thread.Sleep(3000);

        int scrollAmount = 10;
        int scrollTotal = 250;  

        IJavaScriptExecutor js = (IJavaScriptExecutor)driver;

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("editar-cliente")).Click();

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("emailCliente")).Clear();

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("emailCliente")).SendKeys("outroemail@gmail.com");
        
        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("telefone")).Clear();

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("telefone")).SendKeys("11958324313");
        
        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("confirmar-cliente")).Click();

        System.Threading.Thread.Sleep(5000);

        driver.FindElement(By.Id("gerenciar-cartoes")).Click();

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("editar-cartao")).Click();

        System.Threading.Thread.Sleep(4000);

        var bandeira = driver.FindElement(By.Id("bandeira1"));

        bandeira.Clear();

        System.Threading.Thread.Sleep(4000);

        bandeira.SendKeys("Visa");

        System.Threading.Thread.Sleep(4000);

        var cvv = driver.FindElement(By.Id("cvv1"));

        cvv.Clear();

        System.Threading.Thread.Sleep(4000);

        cvv.SendKeys("321");

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("confirmar-cartao")).Click();

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("fechar-cartao")).Click();

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("gerenciar-enderecos")).Click();

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("editar-endereco")).Click();

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("numeroEndereco1")).Clear();

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("numeroEndereco1")).SendKeys("788");

         System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("cep1")).Clear();

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("cep1")).SendKeys("08420-210");

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("confirmar-endereco")).Click();

        System.Threading.Thread.Sleep(4000);

    }

    void ExclusaoCliente(IWebDriver driver)
    {
        driver.Url = "http://localhost:7247/Cliente/Cliente";

        System.Threading.Thread.Sleep(2000);

        driver.FindElement(By.Id("gerenciar-cartoes")).Click();

        System.Threading.Thread.Sleep(3000);

        IWebElement modal = driver.FindElement(By.Id("popup-cartao"));

        IJavaScriptExecutor js = (IJavaScriptExecutor)driver;

        js.ExecuteScript("arguments[0].scrollIntoView(false);", modal);

        int scrollAmount = 20;
        int scrollTotal = 300;

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"arguments[0].scrollTop += {scrollAmount};", modal);
            System.Threading.Thread.Sleep(50);
        }

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("excluir-cartao")).Click();

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("fechar-cartao")).Click();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("gerenciar-enderecos")).Click();

        System.Threading.Thread.Sleep(3000);

        modal = driver.FindElement(By.Id("popup-endereco"));

        js = (IJavaScriptExecutor)driver;

        js.ExecuteScript("arguments[0].scrollIntoView(false);", modal);

        scrollAmount = 20;
        scrollTotal = 400;

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"arguments[0].scrollTop += {scrollAmount};", modal);
            System.Threading.Thread.Sleep(50);
        }

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("excluir-endereco")).Click();
        
        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("fechar-endereco")).Click();

        System.Threading.Thread.Sleep(5000);

        scrollAmount = 10;
        scrollTotal = 200;  

        js = (IJavaScriptExecutor)driver;

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("excluir-cliente")).Click();

        System.Threading.Thread.Sleep(3000);
    }

    void ConsultaCliente(IWebDriver driver)
    {
        driver.Url = "http://localhost:7247/Cliente/Cliente";

        System.Threading.Thread.Sleep(5000);

        int scrollAmount = 10;
        int scrollTotal = 100;  

        IJavaScriptExecutor js = (IJavaScriptExecutor)driver;

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(5000);

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

        termoPesquisaInput.SendKeys("joao.silva@email.com");

        driver.FindElement(By.Id("consultarClientes")).Click();

        System.Threading.Thread.Sleep(5000);

        driver.FindElement(By.Id("consult-transacoes")).Click();

        System.Threading.Thread.Sleep(5000);

         driver.FindElement(By.Id("fechar-transacao")).Click();

        System.Threading.Thread.Sleep(7000);

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
        
        driver.Url = "http://localhost:7247/PaginaInicial/PaginaInicial";

        System.Threading.Thread.Sleep(3000); 

        int scrollAmount = 20;
        int scrollTotal = 500;  

        IJavaScriptExecutor js = (IJavaScriptExecutor)driver;

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(1000); 

        driver.FindElement(By.Id("1")).Click();

        scrollAmount = 10;
        scrollTotal = 200;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("cor")).Click();

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("tam_34")).Click();

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("btn-comprar")).Click();

        System.Threading.Thread.Sleep(2000); 
        
        IWebElement quantidadeSelect = driver.FindElement(By.Id("select-quantidade1"));

        quantidadeSelect.Click(); 

        IWebElement optionQuantidade = driver.FindElement(By.CssSelector("#select-quantidade1 option[value='2']"));

        optionQuantidade.Click();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("meuBotao")).Click();

        scrollAmount = 10;
        scrollTotal = 500;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(2000); 
        
        driver.FindElement(By.Id("2")).Click();

        scrollAmount = 10;
        scrollTotal = 200;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("cor")).Click();

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("tam_37")).Click();

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("btn-comprar")).Click();

        System.Threading.Thread.Sleep(2000); 

        IWebElement quantidadeSelect2 = driver.FindElement(By.Id("select-quantidade2"));

        quantidadeSelect2.Click(); 

        IWebElement optionQuantidade2 = driver.FindElement(By.CssSelector("#select-quantidade2 option[value='3']"));

        optionQuantidade2.Click();

        System.Threading.Thread.Sleep(2000);

        driver.FindElement(By.Id("meuBotao")).Click();

        scrollAmount = 10;
        scrollTotal = 500;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("6")).Click();

        scrollAmount = 10;
        scrollTotal = 200;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("cor")).Click();

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("tam_36")).Click();

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("btn-comprar")).Click();

        System.Threading.Thread.Sleep(2000); 

        scrollAmount = 10;
        scrollTotal = 320;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        IWebElement quantidadeSelect3 = driver.FindElement(By.Id("select-quantidade3"));

        quantidadeSelect3.Click(); 

        IWebElement optionQuantidade3 = driver.FindElement(By.CssSelector("#select-quantidade3 option[value='4']"));

        optionQuantidade3.Click();
        
        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("meuBotao")).Click();

        scrollAmount = 10;
        scrollTotal = 500;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("7")).Click();

        scrollAmount = 10;
        scrollTotal = 200;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("cor")).Click();

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("tam_40")).Click();

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("btn-comprar")).Click();

        System.Threading.Thread.Sleep(2000); 

        scrollAmount = 10;
        scrollTotal = 320;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        IWebElement quantidadeSelect4 = driver.FindElement(By.Id("select-quantidade4"));

        quantidadeSelect4.Click(); 

        IWebElement optionQuantidade4 = driver.FindElement(By.CssSelector("#select-quantidade4 option[value='4']"));

        optionQuantidade4.Click();

        System.Threading.Thread.Sleep(3000);  

        driver.FindElement(By.Id("remover5")).Click();

        scrollAmount = 10;
        scrollTotal = 420;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(4000);  

        driver.FindElement(By.Id("btn-endereco")).Click();

        System.Threading.Thread.Sleep(3000); 
        
        WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
        IAlert alert = wait.Until(ExpectedConditions.AlertIsPresent());

        alert.Accept();

        System.Threading.Thread.Sleep(5000); 

        driver.FindElement(By.Id("pagamento")).Click();

        System.Threading.Thread.Sleep(5000); 

        alert.Accept();

        scrollAmount = 10;
        scrollTotal = 220;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(5000); 
        
        driver.FindElement(By.Id("meuBotaoCartao")).Click();

        driver.FindElement(By.Id("numero")).SendKeys("4521.2314.6573.1253");
        System.Threading.Thread.Sleep(2000);
        driver.FindElement(By.Id("cvv")).SendKeys("367");
        System.Threading.Thread.Sleep(2000);
        driver.FindElement(By.Id("titular")).SendKeys("Paulo S de Oliveira");
        System.Threading.Thread.Sleep(2000);
        driver.FindElement(By.Id("bandeira")).SendKeys("MasterCard");
        System.Threading.Thread.Sleep(2000);

        driver.FindElement(By.Id("confirmar")).Click();

        System.Threading.Thread.Sleep(2000);

        driver.FindElement(By.Id("fechar")).Click(); 

        scrollAmount = 10;
        scrollTotal = 150;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }       

        System.Threading.Thread.Sleep(3000); 

        driver.FindElement(By.Id("meuBotaoCupom")).Click();

        System.Threading.Thread.Sleep(3000); 

        driver.FindElement(By.Id("cupom")).SendKeys("CUPOME442C501B7C046959C00079D29ECD5AF");

        System.Threading.Thread.Sleep(3000); 

        driver.FindElement(By.Id("confirmar-cupom")).Click(); 

        System.Threading.Thread.Sleep(1000); 

        driver.FindElement(By.Id("fechar")).Click();  

        scrollAmount = 10;
        scrollTotal = 250;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }             

        System.Threading.Thread.Sleep(3000); 

        driver.FindElement(By.Id("input-pedido")).SendKeys("CASUAL10");

        System.Threading.Thread.Sleep(3000); 

        driver.FindElement(By.Id("botaoPromocional")).Click();

        System.Threading.Thread.Sleep(1000); 

        driver.FindElement(By.Id("fechar")).Click();   

        scrollAmount = 10;
        scrollTotal = 350;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }                  
        
        System.Threading.Thread.Sleep(8000); 

        driver.FindElement(By.Id("finaliza-pedido")).Click();

        System.Threading.Thread.Sleep(3000);

        alert.Accept();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("fechar")).Click();

        System.Threading.Thread.Sleep(3000);
        
        driver.Url = "http://localhost:7247/PedidosCliente/PedidosCliente";

        System.Threading.Thread.Sleep(2000);

        scrollAmount = 20;
        scrollTotal = 350;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        //driver.FindElement(By.Id("telaPedidos")).Click();

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("acompanhaPedido")).Click();

        System.Threading.Thread.Sleep(2000);

        scrollAmount = 20;
        scrollTotal = 650;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(9000);

        driver.Url = "http://localhost:7247/PainelAdministrador/PainelAdministrador";

        System.Threading.Thread.Sleep(6000);

        driver.FindElement(By.Id("gerencia-pedidos")).Click();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("termoPesquisa")).SendKeys("9");

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("consultarPedidos")).Click();

        System.Threading.Thread.Sleep(4000);
        
        driver.FindElement(By.Id("consultar-pedido")).Click();

        System.Threading.Thread.Sleep(6000);

        IWebElement modal = driver.FindElement(By.Id("popup-pedidoadmin"));

        js.ExecuteScript("arguments[0].scrollIntoView(false);", modal);

        scrollAmount = 20;
        scrollTotal = 300;

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"arguments[0].scrollTop += {scrollAmount};", modal);
            System.Threading.Thread.Sleep(50);
        }

        System.Threading.Thread.Sleep(6000);

        IWebElement faseCompraSelect = driver.FindElement(By.Id("faseCompra"));

        faseCompraSelect.Click(); 

        IWebElement optionFase = driver.FindElement(By.CssSelector("#faseCompra option[value='5']"));

        optionFase.Click();

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("confirmar")).Click();

        System.Threading.Thread.Sleep(4000);

        driver.Url = "http://localhost:7247/PedidosCliente/PedidosCliente";

        System.Threading.Thread.Sleep(4000);

        scrollAmount = 20;
        scrollTotal = 350;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(2000);

        driver.FindElement(By.Id("acompanhaPedido")).Click();

        scrollAmount = 20;
        scrollTotal = 750;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(5000);

        scrollAmount = -20;
        scrollTotal = 550;  

        for (int i = 0; i > -scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50);
        }

        System.Threading.Thread.Sleep(5000);

        IWebElement selectQuanti = driver.FindElement(By.Id("select-quantidade-6"));

        selectQuanti.Click(); 

        IWebElement optionQuant= driver.FindElement(By.CssSelector("#select-quantidade-6 option[value='3']"));

        optionQuant.Click();

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("ped-6")).Click();

        System.Threading.Thread.Sleep(5000);
        
        driver.FindElement(By.Id("motivo")).SendKeys("Calçado com defeito");

        System.Threading.Thread.Sleep(5000);

        driver.FindElement(By.Id("calcado-devolucao")).Click();

        System.Threading.Thread.Sleep(2000);

        alert.Accept();

        System.Threading.Thread.Sleep(3000);

        driver.Url = "http://localhost:7247/PainelAdministrador/PainelAdministrador";

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("gerencia-pedidos")).Click();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("termoPesquisa")).SendKeys("9");

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("consultarPedidos")).Click();

        System.Threading.Thread.Sleep(4000);
        
        driver.FindElement(By.Id("consultar-pedido")).Click();

        modal = driver.FindElement(By.Id("popup-pedidoadmin"));

        js.ExecuteScript("arguments[0].scrollIntoView(false);", modal);

        scrollAmount = 20;
        scrollTotal = 300;

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"arguments[0].scrollTop += {scrollAmount};", modal);
            System.Threading.Thread.Sleep(50);
        }

        System.Threading.Thread.Sleep(3000);

        faseCompraSelect = driver.FindElement(By.Id("faseCompra"));

        faseCompraSelect.Click(); 

        optionFase = driver.FindElement(By.CssSelector("#faseCompra option[value='7']"));

        optionFase.Click();

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("confirmar")).Click();

        System.Threading.Thread.Sleep(5000);

        alert.Accept();

        System.Threading.Thread.Sleep(6000);

        driver.FindElement(By.Id("copiar")).Click();

        System.Threading.Thread.Sleep(6000);

        alert.Accept();

        System.Threading.Thread.Sleep(8000);

        driver.Url = "http://localhost:7247/ConsultarCupom/ConsultarCupom";
        
        System.Threading.Thread.Sleep(8000);

        driver.Url = "http://localhost:7247/PedidosCliente/PedidosCliente";

        System.Threading.Thread.Sleep(7000);

        scrollAmount = 20;
        scrollTotal = 350;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("acompanhaPedido")).Click();

        System.Threading.Thread.Sleep(4000);

        scrollAmount = 20;
        scrollTotal = 800;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(5000); 

        driver.Url = "http://localhost:7247/PaginaInicial/PaginaInicial";

        System.Threading.Thread.Sleep(3000); 

        scrollAmount = 20;
        scrollTotal = 500;  

        js = (IJavaScriptExecutor)driver;

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(1000); 

        driver.FindElement(By.Id("3")).Click();

        scrollAmount = 10;
        scrollTotal = 200;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("cor")).Click();

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("tam_34")).Click();

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("btn-comprar")).Click();

        System.Threading.Thread.Sleep(3000);

        driver.FindElement(By.Id("meuBotao")).Click();

        scrollAmount = 10;
        scrollTotal = 500;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(2000); 
        
        driver.FindElement(By.Id("6")).Click();

        scrollAmount = 10;
        scrollTotal = 200;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("cor")).Click();

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("tam_37")).Click();

        System.Threading.Thread.Sleep(2000); 

        driver.FindElement(By.Id("btn-comprar")).Click();

        System.Threading.Thread.Sleep(2000); 

        scrollAmount = 10;
        scrollTotal = 420;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(4000);  

        driver.FindElement(By.Id("btn-endereco")).Click();

        System.Threading.Thread.Sleep(3000); 

        alert.Accept();

        System.Threading.Thread.Sleep(5000); 

        driver.FindElement(By.Id("pagamento")).Click();

        System.Threading.Thread.Sleep(5000); 

        alert.Accept();

        scrollAmount = 10;
        scrollTotal = 220;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(5000); 

        scrollAmount = 10;
        scrollTotal = 150;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }       

        System.Threading.Thread.Sleep(5000); 

        driver.FindElement(By.Id("meuBotaoCupom")).Click();

        System.Threading.Thread.Sleep(5000); 

        driver.FindElement(By.Id("cupom")).SendKeys(Keys.Control + "v");

        System.Threading.Thread.Sleep(5000); 

        driver.FindElement(By.Id("confirmar-cupom")).Click(); 

        System.Threading.Thread.Sleep(4000); 

        driver.FindElement(By.Id("fechar")).Click();  

        scrollAmount = 10;
        scrollTotal = 800;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }                  
        
        System.Threading.Thread.Sleep(8000); 

        driver.FindElement(By.Id("finaliza-pedido")).Click();

        System.Threading.Thread.Sleep(8000);

        alert.Accept();

        System.Threading.Thread.Sleep(5000);

        alert.Accept();

        System.Threading.Thread.Sleep(5000);

        driver.FindElement(By.Id("fechar")).Click();

        System.Threading.Thread.Sleep(5000);

        driver.Url = "http://localhost:7247/ConsultarCupom/ConsultarCupom";

        System.Threading.Thread.Sleep(10000);

        driver.Url = "http://localhost:7247/PedidosCliente/PedidosCliente";

        System.Threading.Thread.Sleep(4000);

        scrollAmount = 20;
        scrollTotal = 250;  

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        System.Threading.Thread.Sleep(10000);

    }

    void AnalisaVendas(IWebDriver driver){
        
        driver.Url = "http://localhost:7247/PainelAdministrador/PainelAdministrador";

        System.Threading.Thread.Sleep(4000);

        driver.FindElement(By.Id("analisa-vendas")).Click();

        System.Threading.Thread.Sleep(4000);

        IWebElement campoData = driver.FindElement(By.Id("data-inicio"));

        campoData.Clear();

        campoData.SendKeys("01112023");

        System.Threading.Thread.Sleep(4000);

        IWebElement campoDataFim = driver.FindElement(By.Id("data-fim"));

        campoDataFim.Clear();

        campoDataFim.SendKeys("31122023");

        System.Threading.Thread.Sleep(4000);

        int scrollAmount = 10;
        int scrollTotal = 300;  

        IJavaScriptExecutor js = (IJavaScriptExecutor)driver;

        for (int i = 0; i < scrollTotal; i += scrollAmount)
        {
            js.ExecuteScript($"window.scrollBy(0, {scrollAmount});");
            System.Threading.Thread.Sleep(50); 
        }

        driver.FindElement(By.Id("analise-vendas")).Click();

    }


    static void Main(string[] args)
    {
        string chromedriverPath = @"C:\Users\lucas\OneDrive\Área de Trabalho\ecommerce full\testes\chromedriver-win64\chromedriver.exe";

        var chromeOptions = new ChromeOptions();
        chromeOptions.AddArgument("--start-maximized");

        IWebDriver driver = new ChromeDriver(chromedriverPath, chromeOptions);

        string paginaHTMLPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..", "..", "..", "..", "EcommerceBack","Views", "Cliente", "Cliente.cshtml");

        var testes = new TestesAutomatizados(); 

        testes.InsercaoCliente(driver); 
        testes.AlteracaoCliente(driver);
        testes.ConsultaCliente(driver);
        testes.ExclusaoCliente(driver);
        
        testes.conducaoPedido(driver);

        testes.AnalisaVendas(driver);

    }
}