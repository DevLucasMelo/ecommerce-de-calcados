Este projeto foi realizado para o desenvolvimento de um e-commerce que fosse capaz de:

• Gerenciar calçados em estoque 

• Gerenciar pedidos na visão do cliente e do administrador, 

• Gerenciar clientes 

• Realizar devolução de produtos na visão do cliente e gerenciar tais devoluções na visão do administrador.

• Gerenciar cupons promocionais e de devolução

• Cadastro de usuários e Login

Os requisitos funcionais, não-funcionais e regras de negócio foram especificados e fornecidos pelo professor da disciplina, é possível acessar todos os requisitos e 
regras na pasta "Documentação do projeto", acessando o documento "Documentação de requisitos.docx" que consta neste repositório.

Tecnologias do projeto:

• Linguagens: C#, HTML, CSS, JavaScript

• Frameworks:  Bootstrap, dapper (micro ORM) e Razor. 

• Banco de Dados: PostgreSQL e pgAdmin 4

• Modelagem do banco de dados: Oracle SQL Developer DataModeler

• Gerenciamento de tarefas: Trello

• Criação dos diagramas: Astah

⭢ Como executar o projeto?

Passo 1: Instalar o postgreSQL 15.4

Passo 2: Instalar o pgAdmin 4

Passo 3: Instalar o VS Code (Visual Studio Code) ou outro editor de códigos de sua preferência

Passo 4: Realizar um clone deste repositório

Passo 5: Abrir o projeto ecommerce-de-calcados no VS Code e pelo terminal acessar a pasta ecommerce no terminal 

Passo 6: Após acessar a pasta, execute o comando: dotnet run

Passo 7: Abra o pgAdmin 4

Passo 8: Clique com o botão direito em Databases -> Selecione a opção: Create -> Selecione a opção: Database

Passo 9: No campo Database, coloque o nome ecommerce1

Passo 10: Clique em save

Passo 11: Clique com o botão direito em ecommerce1 -> Selecione a opção: Restore

Passo 12: Em Filename escolha o arquivo init.sql que está na pasta "Criar banco de dados" que está nesse repositório

Passo 13: Clique em Restore

Passo 14: Banco de dados deve ter sido criado com sucesso

Passo 15: Acessar a URL no navegador: http://localhost:7247


⭢ Para executar os testes automatizados:

Passo 1: Para executar os testes, entre na pasta testes pelo terminal

Passo 2: Baixe o chromium driver especificado na pasta executar-testes

Passo 3: Execute o comando dotnet run no terminal (Deve estar dentro da pasta testes)
