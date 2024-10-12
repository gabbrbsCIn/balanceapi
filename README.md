# Balance API 🏢💰

A Balance API é uma solução RESTful desenvolvida para simplificar e agilizar a gestão financeira de condomínios. Observando os desafios e a complexidade de manter o controle financeiro de maneira manual, criei esta API para otimizar vários aspectos da função administrativa, proporcionando uma maior eficiência e controle.

## Principais Funcionalidades
A Balance API oferece diversas funcionalidades que facilitam o dia a dia da administração condominial:

- **Gerenciamento de Transações** 📋: A API permite registrar e visualizar receitas e despesas, organizando-as em categorias específicas, o que facilita a criação de relatórios detalhados e categorizados. Esses relatórios proporcionam uma visão clara do fluxo financeiro, permitindo uma gestão mais eficiente.

- **Sistema de Pagamento** 💳: Integração com a API do PagSeguro para a geração de QR Codes para pagamentos via Pix. Isso simplifica o processo de pagamento de taxas condominiais, fornecendo uma maneira rápida e segura de realizar transações.

- **Autenticação JWT** 🔒: A segurança da API é garantida por um sistema de autenticação robusto que utiliza **JSON Web Tokens (JWT)** para gerenciar o acesso de usuários autenticados, garantindo a proteção dos dados financeiros sensíveis.

- **Banco de Dados MySQL** 🗄️: A persistência de dados é gerenciada através do **MySQL**, que organiza todas as transações, usuários e dados relevantes de forma segura e escalável.

- **Gerenciamento de Tokens com Redis** 🔁: Utilizamos um banco Redis para armazenar e validar tokens de maneira rápida e eficiente. Isso assegura que somente tokens válidos possam acessar a API, proporcionando uma camada extra de segurança e agilidade na autenticação.
- **Boas Práticas de Desenvolvimento** 🛠️: O código da Balance API promoveu estudo e prática dos princípios do **Clean Code**, garantindo legibilidade, manutenibilidade e escalabilidade. Com essa abordagem, o sistema é projetado para ser facilmente extensível, permitindo futuras melhorias e adaptações conformen necessário.

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Sequelize** (ORM para gerenciamento de banco de dados)
- **MySQL** (Banco de dados relacional)
- **JavaScript**
- **Redis**
- **Railway**
  
## Instalação ⚙️🔧

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/balance-api.git
   cd balance-api
2. Instale as dependências:
   ```bash
   npm install
3. Configure as variáveis de ambiente criando um arquivo .env com base no arquivo .env.example.

## Execução 🚀

Para rodar a aplicação:

```bash
  npm start
``` 

## Migrações

Para rodar as migrações do banco de dados:
```bash
npx sequelize-cli db:migrate
``` 
Para reverter:
```bash
npx sequelize-cli db:migrate:undo
```

## Documentação da API (Postman)
https://documenter.getpostman.com/view/29686411/2sAXxS8XNq


