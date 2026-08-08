// ============================================================================
// EMPREGADOS
// Arquivo: js/pages/empregados/empregados.js
// ============================================================================

import {
    mostrarLoading,
    esconderLoading
} from "../../ui/loading.js";

import { configurarModal } from "../../ui/modal.js";

import {
    registrarEventos
} from "./empregados.events.js";

import {
    carregarTabela
} from "./empregados.helpers.js";

import { tratarErro } from "../../utils/erros.js";

// ============================================================================
// INIT
// ============================================================================

export async function initEmpregados() {


    try {

        mostrarLoading();

        await carregarTabela();

    } catch (erro) {

       tratarErro(error);
 
    } finally {

        esconderLoading();

    }
}
