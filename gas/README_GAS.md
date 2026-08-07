# Backend Google Apps Script

## 1. Planilha

Crie uma planilha Google com a aba:

`VEÍCULOS`

Na primeira linha:

`ID | Data | Placa | Modelo | Marca | Ano | Cor | Status`

## 2. Apps Script

Abra **Extensões → Apps Script**.

Crie um arquivo `Api.gs` e cole o conteúdo de `gas/Api.gs`.

O projeto usa a planilha ativa, portanto o Apps Script deve estar vinculado à planilha.

## 3. Publicação

Implante como:

**Implantar → Nova implantação → Aplicativo da Web**

Execute como: **você**

Quem tem acesso: escolha a configuração compatível com o seu uso.

Copie a URL `/exec`.

## 4. Frontend

Abra:

`js/config/api.js`

e coloque:

```js
export const API_URL = "URL_DO_SEU_WEB_APP";
```

Depois publique o diretório do frontend em GitHub Pages ou outro servidor HTTPS.

## Observação sobre CORS

O frontend usa `fetch`. Se o navegador bloquear a chamada por política de origem, o backend deverá ser publicado/configurado de modo compatível com o ambiente utilizado. O código do Engine mantém a API isolada em `js/services/veiculos.service.js`, facilitando a troca do backend.
