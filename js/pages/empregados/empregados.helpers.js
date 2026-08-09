// ============================================================================
// EMPREGADOS HELPERS
// Arquivo: js/pages/empregados/empregados.helpers.js
// ============================================================================

import {
    obterEmpregados
} from "../../services/empregados.service.js";

import {
    renderTable
} from "../../ui/table.js";

import {
    definirRegistros
} from "./empregados.state.js";

// ============================================================================
// COLUNAS
// ============================================================================

export const COLUNAS_EMPREGADOS = [

    {
        key: "Empregado",
        label: "Empregado"
    },

    {
        key: "Matrícula",
        label: "Matrícula"
    },

    {
        key: "Diretoria",
        label: "Diretoria"
    },

    {
        key: "Setor",
        label: "Setor"
    },

    {
        key: "Usuário",
        label: "Usuário"
    },

    {
        key: "Condição",
        label: "Condição"
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
        await obterEmpregados();

    if (!Array.isArray(lista)) {

        throw new Error(
            "A API não retornou uma lista de empregados."
        );

    }

    console.log(
        "ENGINE → EMPREGADOS:",
        lista
    );

    definirRegistros(lista);

    const tabela =
        document.querySelector("#tabelaEmpregados");

    if (!tabela) {

        console.error(
            "Tabela #tabelaEmpregados não encontrada."
        );

        return;
    }

    renderTable(
        tabela,
        COLUNAS_EMPREGADOS,
        lista,
        {

      edit: true,

      remove: true

    }

    );

}
