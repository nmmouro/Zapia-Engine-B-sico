# Engine — Framework básico

Projeto mínimo e modular para gerenciamento de veículos.

## Objetivo

Este projeto é a base do **Framework Engine**.

A primeira implementação contém apenas uma entidade:

- VEÍCULOS

O projeto separa:

- configuração
- estado
- roteamento
- serviços/API
- página
- formulário
- eventos
- helpers
- componentes de UI
- utilitários

## Estrutura

```text
index.html
css/
js/
  app.js
  config/
  core/
  services/
  pages/veiculos/
  ui/
  utils/
gas/
```

## Frontend

O frontend é HTML/CSS/JavaScript puro com módulos ES.

Não depende de:

- React
- Vue
- Angular
- jQuery
- Bootstrap

Isso mantém o Engine pequeno e fácil de evoluir.

## Backend

O diretório `gas/` contém uma API Google Apps Script para a aba `VEÍCULOS`.

## Campos

```text
ID
Data
Placa
Modelo
Marca
Ano
Cor
Status
```

## Operações

A API suporta:

```text
listar
buscar
criar
atualizar
excluir
```

## Configuração rápida

1. Crie a planilha.
2. Crie a aba `VEÍCULOS`.
3. Configure os cabeçalhos.
4. Publique `gas/Api.gs` como Web App.
5. Copie a URL da API para `js/config/api.js`.
6. Publique o frontend.
7. Abra `index.html`.

## Princípio do Engine

A página não deve conhecer detalhes da planilha.

O fluxo é:

```text
Página
  ↓
Service
  ↓
API
  ↓
Google Sheets
```

E a UI fica separada:

```text
Page
 ├── State
 ├── Fields
 ├── Form
 ├── Events
 └── Helpers
```

Esse padrão permite acrescentar novas tabelas posteriormente sem desmontar a estrutura.
