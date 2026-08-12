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

    const lista = await obterVeiculos();

    if (!Array.isArray(lista)) {

        throw new Error(
            "A API não retornou uma lista de veículos."
        );

    }

    console.log(
        "ENGINE → VEÍCULOS:",
        lista
    );

    // Atualiza o estado
    definirRegistros(lista);

    // Localiza a tabela
    const tabela = document.getElementById(
        "tabelaVeiculos"
    );

    if (!tabela) {

        throw new Error(
            "Tabela #tabelaVeiculos não encontrada."
        );

    }

    // Renderiza a tabela
    renderTable(
        tabela,
        COLUNAS_VEICULOS,
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
