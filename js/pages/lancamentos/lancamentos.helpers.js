// ============================================================================
// ENGINE
// LANÇAMENTOS HELPERS
// Arquivo: js/pages/lancamentos/lancamentos.helpers.js
// ============================================================================

import { obterLancamentos } from "../../services/lancamentos.service.js";

import { renderTable } from "../../ui/table.js";

import { definirRegistros } from "./lancamentos.state.js";

// ============================================================================
// COLUNAS DA TABELA
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
        label: "Veículo"
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

    const lista = await obterLancamentos();

    if (!Array.isArray(lista)) {

        throw new Error(
            "A API não retornou uma lista de lançamentos."
        );

    }

                                                            console.log(
        "ENGINE → LANÇAMENTOS:",
        lista
    );

    // Atualiza o estado
    definirRegistros(lista);

    // Localiza a tabela
    const tabela = document.getElementById(
        "tabelaLancamentos"
    );

    if (!tabela) {

        throw new Error(
            "Tabela #tabelaLancamentos não encontrada."
        );

    }

    // Renderiza a tabela
    renderTable(
        tabela,
        COLUNAS_LANCAMENTOS,
        lista,
        {
            edit: true,
            remove: true
        }
    );
    
// ============================================================================
// CONTADOR
// ============================================================================

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


// ============================================================================
// ESTADO VAZIO
// ============================================================================

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
