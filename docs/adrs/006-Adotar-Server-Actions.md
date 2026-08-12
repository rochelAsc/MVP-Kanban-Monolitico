# ADR - 006: Adoção de Server Actions do Next.js

## Status

Aceito

## Contexto

O sistema precisa executar operações de criação, atualização, listagem e remoção de tarefas. Como o projeto usa Next.js e possui escopo de MVP, foi avaliada a possibilidade de criar uma API REST própria para essas operações. Porém, para este momento, as Server Actions do Next.js atendem às necessidades da aplicação com menos código e menor complexidade.

## Decisão

Adotar Server Actions do Next.js para executar as operações de negócio relacionadas às tarefas.

## Consequências

- Redução da necessidade de criar endpoints REST próprios
- Integração direta entre formulários, servidor e revalidação de páginas
- Menor complexidade para o desenvolvimento do MVP
- Boa aderência ao modelo de aplicação monolítica adotado
- Maior acoplamento aos recursos específicos do Next.js
- Caso sejam necessários clientes externos no futuro, pode ser preciso criar uma API dedicada
