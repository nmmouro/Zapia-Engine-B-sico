// ============================================================================
// LANCAMENTOS STATE
// Arquivo: js/pages/lancametnos/lancamentos.state.js
// ============================================================================

export let registros = [];

export let registroEditando = null;

export function definirRegistros(lista) {

    registros = Array.isArray(lista)
        ? lista
        : [];

}

export function definirRegistroEditando(id) {

    registroEditando = id || null;

}

export function limparRegistroEditando() {

    registroEditando = null;

}
