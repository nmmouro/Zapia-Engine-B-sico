// ============================================================================
// EMPREGADOS
// Arquivo: js/pages/empregados/empregados.js
// ============================================================================

import {
    mostrarLoading,
    esconderLoading
} from "../../ui/loading.js";

import {
    registrarEventos
} from "./empregados.events.js";

import {
    carregarTabela
} from "./empregados.helpers.js";

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

document.addEventListener(
    "DOMContentLoaded",
    init
);

// ============================================================================
// INIT
// ============================================================================

async function init() {

    try {

        mostrarLoading();

        registrarEventos();

        await carregarTabela();

    } catch (erro) {

        console.error(
            "ENGINE → ERRO EMPREGADOS:",
            erro
        );

        alert(
            erro.message ||
            "Erro ao carregar empregados."
        );

    } finally {

        esconderLoading();

    }

}
