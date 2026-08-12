# ADR - 003: Adoção dos frameworks React e Next.js

## Status

Aceito

## Contexto

A linguagem de programação Javascript foi adotada como principal para o desenvolvimento do projeto, e isso foi aceito no ADR 002. Pela necessidade de se fazer interfaces e desenvolver no ambiente web, foi necessário a adoção de frameworks. Com a decisão da linguagem, foi buscado os melhores frameworks disponíveis para ela, e foi encontrado o React e o Next.js como frameworks de alto nível e de amplo uso.

## Decisão

Adotar os frameworks React e Next.js para o desenvolvimento do sistema.

## Consequências

- Uso de tecnologias robustas, bem estabelecidas e amplamente usadas
- Aproveitamento da validação e evolução coletiva pela comunidade
- Certa curva de aprendizado para entendimento da sintaxe das tecnologias e de seus novos conceitos introduzidos (como componentes do React ou roteamento baseado em arquivos do Next.js)
- Grau de acoplamento da arquitetura de frontend atrelado aos padrões dessas tecnologias
- Maior atrito para migração futura para outras tecnologias
- Dependência de ferramentas externas e da manutenção feita pelos criadores do framework
- A infraestrutura de deploy exigirá um ambiente capaz de executar Node.js para suportar os recursos de servidor do Next.js, diferentemente de uma aplicação estática simples.