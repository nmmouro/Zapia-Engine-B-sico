// ============================================================================
// ENGINE
// VEÍCULOS HELPERS
// Arquivo: js/pages/veiculos/veiculos.helpers.js
// ============================================================================

import {
  obterVeiculos
} from "../../services/veiculos.service.js";

import {
  renderTable
} from "../../ui/table.js";

import {
  definirRegistros
} from "./veiculos.state.js";


// ============================================================================
// COLUNAS
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

  const lista =
    await obterVeiculos();


  if (
    !Array.isArray(lista)
  ) {

    throw new Error(
      "A API não retornou uma lista de veículos."
    );

  }


  console.log(
    "ENGINE → VEÍCULOS:",
    lista
  );


  definirRegistros(
    lista
  );


  const tabela =
    document.getElementById(
      "tabelaVeiculos"
    );


  if (!tabela) {

    throw new Error(
      "Tabela #tabelaVeiculos não encontrada."
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
    document.getElementById(
      "contador"
    );


  if (contador) {

    contador.textContent =
      `${lista.length} ${
        lista.length === 1
          ? "registro"
          : "registros"
      }`;

  }


  const vazio =
    document.getElementById(
      "vazio"
    );


  if (vazio) {

    vazio.classList.toggle(
      "hidden",
      lista.length > 0
    );

  }


  return lista;

}
