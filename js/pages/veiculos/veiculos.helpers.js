```javascript
// ============================================================================
// ENGINE
// VEÍCULOS HELPERS
// Arquivo: js/pages/veiculos/veiculos.helpers.js
// ============================================================================

import { obterVeiculos } from "../../services/veiculos.service.js";
import { renderTable } from "../../ui/table.js";
import { definirRegistros } from "./veiculos.state.js";


// ============================================================================
// COLUNAS DA TABELA
// ============================================================================

export const COLUNAS_VEICULOS = [
  {
    key: "Placa",
    label: "Placa"
  },
  {
    key: "Modelo",
    label: "Modelo"
  },
  {
    key: "Marca",
    label: "Marca"
  },
  {
    key: "Ano",
    label: "Ano"
  },
  {
    key: "Cor",
    label: "Cor"
  },
  {
    key: "Combustivel",
    label: "Combustível"
  },
  {
    key: "Status",
    label: "Status"
  }
];


// ============================================================================
// CARREGAR TABELA
// ============================================================================

export async function carregarTabela() {

  console.log(
    "ENGINE → carregando veículos..."
  );

  const lista = await obterVeiculos();

  if (!Array.isArray(lista)) {
    throw new Error(
      "A API não retornou uma lista de veículos."
    );
  }

  console.log(
    "ENGINE ← veículos recebidos:",
    lista
  );

  definirRegistros(lista);

  const tabela =
    document.getElementById("tabelaVeiculos");

  if (!tabela) {
    throw new Error(
      "Elemento #tabelaVeiculos não encontrado."
    );
  }

  renderTable(
    tabela,
    COLUNAS_VEICULOS,
    lista,
    {
      edit: true,
      remove: true
    }
  );

  const contador =
    document.getElementById("contador");

  if (contador) {

    const quantidade =
      lista.length;

    contador.textContent =
      quantidade === 1
        ? "1 registro"
        : quantidade + " registros";
  }

  const vazio =
    document.getElementById("vazio");

  if (vazio) {

    if (lista.length === 0) {
      vazio.classList.remove("hidden");
    } else {
      vazio.classList.add("hidden");
    }

  }

  return lista;
}
```
