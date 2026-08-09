// ============================================================================
// EMPREGADOS
// Arquivo: js/pages/lancamentos/lancamentos.js
// ============================================================================

import {

    iniciarRelogio

} from "../../utils/relogio.js";

import {

    iniciarFullscreen

} from "../../utils/fullscreen.js";

import {
    mostrarLoading,
    esconderLoading
} from "../../ui/loading.js";

import { configurarModal } from "../../ui/modal.js";

import {
    registrarEventos
} from "./lancamentos.events.js";

import {
    carregarTabela
} from "./lancamentos.helpers.js";

import { tratarErro } from "../../utils/erros.js";

// ============================================================================
// INIT
// ============================================================================

export async function initLancamentos() {


    try {

        mostrarLoading();

                    iniciarRelogio();

                    iniciarFullscreen();

        configurarModal();
        
        registrarEventos();

        await carregarTabela();

    } catch (erro) {

    tratarErro(erro);

} finally {

        esconderLoading();

    }
}
