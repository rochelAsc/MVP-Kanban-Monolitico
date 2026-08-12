# ADR - 004: Adoção do SQLite como banco de dados

## Status

Aceito

## Contexto

O sistema está sendo desenvolvido como um produto mínimo viável (MVP), com escopo simples e necessidade de persistir tarefas. A aplicação não exige, neste momento, uma infraestrutura de banco de dados mais complexa, nem suporte a grande volume de usuários simultâneos. Foram consideradas alternativas como PostgreSQL, MySQL e MongoDB, mas elas exigiriam mais configuração e infraestrutura para um projeto pequeno.

## Decisão

Adotar o SQLite como banco de dados local do sistema.

## Consequências

- Simplicidade de configuração e uso durante o desenvolvimento
- Não exige servidor de banco de dados separado
- Facilita a execução local do projeto
- Boa adequação para um MVP com poucos dados e baixa complexidade
- Limitação para cenários de maior concorrência e escalabilidade
- Pode exigir migração futura para outro banco caso o sistema cresça
