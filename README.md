# Balance API

Balance API é uma aplicação desenvolvida para facilitar a gestão financeira de condomínios, fornecendo funcionalidades para o gerenciamento de balanços e relatórios que ajudam na tomada de decisões em relação aos serviços do condomínio.

## Tabela de Conteúdos

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Execução](#execução)
- [Migrações](#migrações)

## Visão Geral

A Balance API oferece um conjunto de serviços que auxiliam na gestão do balanço financeiro do condomínio, permitindo o acompanhamento de receitas, despesas e a visualização de relatórios personalizados.

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Sequelize** (ORM para gerenciamento de banco de dados)
- **MySQL** (Banco de dados relacional)
- **JavaScript**
- **Redis**
- **Railway**
  
## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/balance-api.git
   cd balance-api
2. Instale as dependências:
   ```bash
   npm install
3. Configure as variáveis de ambiente criando um arquivo .env com base no arquivo .env.example.

## Execução

### Desenvolvimento

Para rodar a aplicação:

```bash
  npm start
``` 

### Migrações

Para rodar as migrações do banco de dados:
```bash
npx sequelize-cli db:migrate
``` 
Para reverter:
```bash
npx sequelize-cli db:migrate:undo
```


