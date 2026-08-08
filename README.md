# Engine corrigido — VEÍCULOS

Este pacote foi alinhado à resposta real da API existente.

## Resposta suportada

O Engine normaliza automaticamente respostas como:

`data.data[]`

e também:

`data[]`, `dados[]`, `dados.data[]`.

Também aceita `success` e `sucesso`.

## Campos reais

ID, Data, Hora, Foto, Placa, Modelo, Marca, Ano, Cor, Combustivel, Status.

## Correções

- API_URL corrigida.
- Envelope duplo da API tratado.
- Listagem corrigida.
- Busca corrigida.
- CRUD preparado.
- Formulário alinhado à tabela real.
- Data `dd/MM/yyyy` convertida para `yyyy-MM-dd`.
- Hora `HH:mm:ss` convertida para `HH:mm`.
- Tabela alinhada ao schema real.
