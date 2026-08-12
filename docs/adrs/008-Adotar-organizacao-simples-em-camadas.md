# ADR - 008: Adoção de organização simples em camadas

## Status

Aceito

## Contexto

Por se tratar de um MVP monolítico, o projeto precisa de uma organização simples, compreensível e suficiente para separar responsabilidades sem criar uma arquitetura excessivamente complexa. A estrutura atual separa páginas, componentes visuais e código de apoio em diretórios distintos.

## Decisão

Adotar uma organização simples em camadas, separando o projeto em app, components e lib.

## Consequências

- Melhor organização do código sem excesso de complexidade
- Separação entre páginas, componentes de interface e lógica de apoio
- Facilidade de entendimento para membros da equipe
- Boa adequação ao tamanho atual do projeto
- A separação ainda é simples e pode não ser suficiente para um sistema maior
- Caso o domínio cresça, pode ser necessário criar novas camadas como services, repositories ou use cases
