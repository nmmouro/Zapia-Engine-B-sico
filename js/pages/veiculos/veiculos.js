// ============================================================================
// VEÍCULOS
// Arquivo: js/pages/veiculos/veiculos.js
// ============================================================================

import { iniciarRelogio } from "../../utils/relogio.js";
import { iniciarFullscreen } from "../../utils/fullscreen.js";

import {
    mostrarLoading,
    esconderLoading
} from "../../ui/loading.js";

import { configurarModal } from "../../ui/modal.js";

import { registrarEventos } from "./veiculos.events.js";
import { carregarTabela } from "./veiculos.helpers.js";

import { tratarErro } from "../../utils/erros.js";

// ============================================================================
// INIT
// ============================================================================

export async function initVeiculos() {

    console.log("ENGINE → INIT VEÍCULOS");

    try {

        mostrarLoading();

        iniciarRelogio();

        iniciarFullscreen();

        configurarModal();

        registrarEventos();

        await carregarTabela();

    } catch (erro) {

        console.error(
            "ENGINE → Erro em Veículos:",
            erro
        );

        tratarErro(erro);

    } finally {

        esconderLoading();

    }

}
