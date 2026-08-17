// ============================================================================
// DASHBOARD
// Painel Frota
// Arquivo: js/pages/dashboard/dashboard.js
// Responsável pela inicialização da página Dashboard.
// ============================================================================

import {

    iniciarRelogio

} from "../../utils/relogio.js";


import {

    iniciarFullscreen

} from "../../utils/fullscreen.js";


import {

    carregarDashboard

} from "./dashboard.helpers.js";


import {

    registrarEventos

} from "../../controllers/dashboard.events.js";


import {

    mostrarLoading,
    esconderLoading

} from "../../ui/loading.js";


import {

    tratarErro

} from "../../utils/erros.js";


// ============================================================================
// CONFIGURAÇÕES
// ============================================================================

const INTERVALO_ATUALIZACAO = 5000;

let timerAtualizacao = null;


// ============================================================================
// INIT DASHBOARD
// ============================================================================

export async function initDashboard() {

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

        console.error(

            "ENGINE DASHBOARD → Erro ao atualizar:",

            erro

        );

    }

}


// ============================================================================
// ATUALIZAÇÃO AUTOMÁTICA
// ============================================================================

function iniciarAtualizacaoAutomatica() {

    if (timerAtualizacao) {

        clearInterval(

            timerAtualizacao

        );

    }


    timerAtualizacao = setInterval(

        atualizarDashboard,

        INTERVALO_ATUALIZACAO

    );

}


// ============================================================================
// VISIBILIDADE
// ============================================================================

function registrarEventoVisibilidade() {

    document.addEventListener(

        "visibilitychange",

        tratarVisibilidade

    );

}


function tratarVisibilidade() {

    if (!document.hidden) {

        atualizarDashboard();

    }

}


// ============================================================================
// ENCERRAMENTO
// ============================================================================

function destruirDashboard() {

    if (timerAtualizacao) {

        clearInterval(

            timerAtualizacao

        );

        timerAtualizacao = null;

    }


    document.removeEventListener(

        "visibilitychange",

        tratarVisibilidade

    );

}


// ============================================================================
// INICIALIZAÇÃO DE EVENTOS DO DASHBOARD
// ============================================================================

registrarEventoVisibilidade();


// ============================================================================
// EXPORTA DESTRUIÇÃO
// ============================================================================

export {

    destruirDashboard

};
