# ADR - 002: Adoção da linguagem Javascript

## Status

Aceito

## Context

Construção de um produto mínimo viável em menos de uma semana. É preciso escolher uma linguagem para escrever o sistema. Os membros da equipe tem conhecimento razoável em Javascript e desenvolvimento web. O Typescript foi cogitado por sua maior precisão mas exigiria uma curva de aprendizado inicial e a equipe tem preferência pelo Javascript.

## Decision

Adotar JavaScript como a linguagem de programação principal do sistema.

## Consequences

- Utilização de uma linguagem amplamente utilizada, bastante robusta no seu escopo e com bastante documentação. 
- A equipe atual conhece a linguagem e sabe trabalhar com ela. Membros futuros podem precisar se adaptar e aprender a linguagem, existindo uma carga cognitiva. 
- Nesse projeto pequeno, a tipagem dinâmica é interessante pois permite a escrita mais fluida do código, mas caso o projeto escale pode surgir a necessidade de tipagem estática (o que leva ao Typescript, provavelmente).

