// ============================================================================
// EMPREGADOS
// Arquivo: js/pages/empregados/empregados.js
// ============================================================================

import { iniciarRelogio } from "../../utils/relogio.js";
import { iniciarFullscreen } from "../../utils/fullscreen.js";

import {
    mostrarLoading,
    esconderLoading
} from "../../ui/loading.js";

import { configurarModal } from "../../ui/modal.js";

import { registrarEventos } from "./empregados.events.js";
import { carregarTabela } from "./empregados.helpers.js";

import { tratarErro } from "../../utils/erros.js";

// ============================================================================
// INIT
// ============================================================================

export async function initEmpregados() {

    console.log("ENGINE → INIT EMPREGADOS");

    try {

        mostrarLoading();

        iniciarRelogio();

        iniciarFullscreen();

        configurarModal();

        registrarEventos();

        await carregarTabela();

    } catch (erro) {

        console.error(
            "ENGINE → Erro em Empregados:",
            erro
        );

        tratarErro(erro);

    } finally {

        esconderLoading();

    }

}
