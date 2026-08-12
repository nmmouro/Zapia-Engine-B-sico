// ============================================================================
// ENGINE
// EMPREGADOS HELPERS
// Arquivo: js/pages/empregados/empregados.helpers.js
// ============================================================================

import { obterEmpregados } from "../../services/empregados.service.js";

import { renderTable } from "../../ui/table.js";

import { definirRegistros } from "./empregados.state.js";

// ============================================================================
// COLUNAS DA TABELA
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

    const lista = await obterEmpregados();

    if (!Array.isArray(lista)) {

        throw new Error(
            "A API não retornou uma lista de empregados."
        );

    }

    console.log(
        "ENGINE → EMPREGADOS:",
        lista
    );

    // Atualiza o estado
    definirRegistros(lista);

    // Localiza a tabela
    const tabela = document.getElementById(
        "tabelaEmpregados"
    );

    if (!tabela) {

        throw new Error(
            "Tabela #tabelaEmpregados não encontrada."
        );

    }

    // Renderiza a tabela
    renderTable(
        tabela,
        COLUNAS_EMPREGADOS,
        lista,
        {
            edit: true,
            remove: true
        }
    );

    // Atualiza contador
    atualizarContador(lista.length);

    // Atualiza estado vazio
    atualizarVazio(lista.length);

    return lista;
}

// ============================================================================
// CONTADOR
// ============================================================================

function atualizarContador(total) {

    const contador = document.getElementById(
        "contador"
    );

    if (!contador) {
        return;
    }

    contador.textContent =
        `${total} ${
            total === 1
                ? "registro"
                : "registros"
        }`;
}

// ============================================================================
// ESTADO VAZIO
// ============================================================================

function atualizarVazio(total) {

    const vazio = document.getElementById(
        "vazio"
    );

    if (!vazio) {
        return;
    }

    vazio.classList.toggle(
        "hidden",
        total > 0
    );
}
