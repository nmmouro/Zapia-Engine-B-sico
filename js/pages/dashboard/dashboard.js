// ============================================================================
// DASHBOARD
// Painel Frota
// Arquivo: js/pages/dashboard.js
// Responsável pela inicialização da página.
// ============================================================================

import {

    iniciarRelogio

} from "../utils/relogio.js";

import {

    iniciarFullscreen

} from "../utils/fullscreen.js";


import {

    carregarDashboard

} from "../controllers/dashboard.helpers.js";

import {

    registrarEventos

} from "../controllers/dashboard.events.js";

import {

    mostrarLoading,
    esconderLoading

} from "../ui/loading.js";

import {

    tratarErro

} from "../utils/errors.js";

// ============================================================================
// CONFIGURAÇÕES
// ============================================================================

const INTERVALO_ATUALIZACAO = 5000;

let timerAtualizacao = null;

// ============================================================================
// INIT
// ============================================================================

document.addEventListener(

    "DOMContentLoaded",

    inicializar

);

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

async function inicializar() {

    try {

        mostrarLoading();

        iniciarRelogio();

        iniciarFullscreen();

        await carregarDashboard();

        registrarEventos();

        iniciarAtualizacaoAutomatica();

    }

    catch (erro) {

        tratarErro(

            erro

        );

    }

    finally {

        esconderLoading();

    }

}

// ============================================================================
// ATUALIZAR DASHBOARD
// ============================================================================

async function atualizarDashboard() {

    if (document.hidden) {

        return;

    }

    try {

        await carregarDashboard();

    }

    catch (erro) {

        console.error(erro);

    }

}

// ============================================================================
// ATUALIZAÇÃO AUTOMÁTICA
// ============================================================================

function iniciarAtualizacaoAutomatica() {

    if (timerAtualizacao) {

        clearInterval(timerAtualizacao);

    }

    timerAtualizacao = setInterval(

        atualizarDashboard,

        INTERVALO_ATUALIZACAO

    );

}

// ============================================================================
// VISIBILIDADE DA PÁGINA
// ============================================================================

document.addEventListener(

    "visibilitychange",

    () => {

        if (!document.hidden) {

            atualizarDashboard();

        }

    }

);

// ============================================================================
// ENCERRAMENTO
// ============================================================================

window.addEventListener(

    "beforeunload",

    () => {

        if (timerAtualizacao) {

            clearInterval(

                timerAtualizacao

            );

            timerAtualizacao = null;

        }

    }

);
