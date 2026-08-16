// ============================================================================
// ENGINE
// VEÍCULOS STATE
// Arquivo: js/pages/veiculos/veiculos.state.js
// ============================================================================

export let registros = [];

export let registroEditando = null;


// ============================================================================
// DEFINIR REGISTROS
// ============================================================================

export function definirRegistros(lista) {

    registros =
        Array.isArray(lista)
            ? lista
            : [];

}


// ============================================================================
// DEFINIR REGISTRO EM EDIÇÃO
// ============================================================================

export function definirRegistroEditando(id) {

    registroEditando =
        id || null;

}


// ============================================================================
// LIMPAR REGISTRO EM EDIÇÃO
// ============================================================================

export function limparRegistroEditando() {

    registroEditando = null;

}
