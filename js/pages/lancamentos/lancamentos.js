// ============================================================================
// LANÇAMENTOS
// Arquivo: js/pages/lancamentos/lancamentos.js
// ============================================================================

import { iniciarRelogio } from "../../utils/relogio.js";
import { iniciarFullscreen } from "../../utils/fullscreen.js";

import {
    mostrarLoading,
    esconderLoading
} from "../../ui/loading.js";

import { configurarModal } from "../../ui/modal.js";

import { registrarEventos } from "./lancamentos.events.js";
import { carregarTabela } from "./lancamentos.helpers.js";

import { tratarErro } from "../../utils/erros.js";

import {
    obterEmpregados,
    obterVeiculos
} from "../../services/lancamentos.service.js";

// ============================================================================
// INIT
// ============================================================================

export async function initLancamentos() {

    console.log("ENGINE → INIT LANÇAMENTOS");

    try {

        mostrarLoading();

        iniciarRelogio();

        iniciarFullscreen();

        configurarModal();

        registrarEventos();

        await carregarTabela();

    } catch (erro) {

        console.error(
            "ENGINE → Erro em Lançamentos:",
            erro
        );

        tratarErro(erro);

    } finally {

        esconderLoading();

    }

}
