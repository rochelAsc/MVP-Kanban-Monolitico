# ADR - 005: Adoção do better-sqlite3 sem ORM

## Status

Aceito

## Contexto

Após a escolha do SQLite como banco de dados, foi necessário definir a forma de acesso aos dados pela aplicação. Como o domínio do sistema é simples, centrado em operações básicas de cadastro, listagem, edição e remoção de tarefas, o uso de um ORM completo foi considerado desnecessário para o momento.

## Decisão

Adotar a biblioteca better-sqlite3 para acesso direto ao banco SQLite, sem utilização de ORM.

## Consequências

- Código de persistência mais direto e simples
- Menor quantidade de dependências e configurações
- Maior controle sobre as consultas SQL executadas
- Boa adequação ao tamanho atual do projeto
- Necessidade de escrever e manter SQL manualmente
- Uma futura troca para ORM ou outro banco exigirá refatoração da camada de dados
