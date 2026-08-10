// ============================================================================
// LANCAMENTOS HELPERS
// Arquivo: js/pages/lancamentos/lancamentos.helpers.js
// ============================================================================

import {
    obterLancamentos
} from "../../services/lancamentos.service.js";

import {
    renderTable
} from "../../ui/table.js";

import {
    definirRegistros
} from "./lancamentos.state.js";

// ============================================================================
// COLUNAS
// ============================================================================

export const COLUNAS_LANCAMENTOS = [

    {
        key: "Data",
        label: "Data"
    },

    {
        key: "Hora",
        label: "Hora"
    },

    {
        key: "Empregado / Matrícula",
        label: "Empregado"
    },

    {
        key: "Veículo",
        label: "Veiculo"
    },

    {
        key: "Passageiro / Setor / Motivo",
        label: "Passageiro / Setor / Motivo"
    },

    {
        key: "Itinerário",
        label: "Itinerário"
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
        await obterLancamentos();

    if (!Array.isArray(lista)) {

        throw new Error(
            "A API não retornou uma lista de lançamentos."
        );

    }

                                                    console.log(
                                                                "ENGINE → LANCAMENTOS:",
                                                                                            lista
    );

    definirRegistros(lista);

    const tabela =
        document.querySelector("#tabelaLancamentos");

    if (!tabela) {

        console.error(
            "Tabela #tabelaLançamentos não encontrada."
        );

        return;
    }

    renderTable(
        tabela,
        COLUNAS_LANCAMENTOS,
        lista,
        {

      edit: true,

      remove: true

    }

    );

}
