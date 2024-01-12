# API do Projeto Lumia - Desenvolvedor Pleno Fullstack

Bem-vindo à API do Projeto Lumia, onde gerenciamos o armazenamento de PDFs de faturas no Supabase Storage e os dados associados no Supabase, utilizando um ORM baseado em PostgreSQL. Abaixo, você encontrará informações essenciais sobre as funcionalidades da API e as instruções para iniciar o desenvolvimento.

## Funcionalidades

### Armazenamento de Faturas

A API está integrada ao Supabase Storage para salvar PDFs de faturas de maneira eficiente. Cada fatura é associada aos dados correspondentes no PostgreSQL.

### Rotas Disponíveis

1. **Obter uma Fatura:**
   - Método: GET
   - Rota: `/bill/group?clientNumber=[clientNumber]`
   - Retorna os detalhes de todas faturas específicas com o ID fornecido.

2. **Obter Várias Faturas:**
   - Método: GET
   - Rota: `/bill/all`
   - Retorna uma lista de todas as faturas armazenadas.

3. **Enviar uma Nova Fatura:**
   - Método: POST
   - Rota: `/bill`
   - Permite adicionar uma nova fatura ao servidor, juntamente com o PDF correspondente.

4. **Excluir todas faturas:**
   - Método: DELETE
   - Rota: `/bill/all`
   - Permite adicionar uma nova fatura ao servidor, juntamente com o PDF correspondente.

### Configuração Inicial

Antes de iniciar o desenvolvimento, siga esses passos:

Abra o arquivo `.env`, crie uma conta no supabase, crie um projeto e preencha os dados de .env como no .env.example

## Iniciando o Projeto

Para iniciar o projeto no frontend, siga as instruções abaixo:


1. Instale as dependências:
  ```#!/bin/sh
  pnpm i
  ```
2. Inicie o projeto:
  ```#!/bin/sh
  pnpm start:dev 
  ```

### Informações adicionais

Caso queira executar os testes:
   ```bash
  pnpm test
  ```
