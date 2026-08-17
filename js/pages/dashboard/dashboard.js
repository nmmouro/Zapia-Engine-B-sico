// ============================================================================
// DASHBOARD
// Painel Frota
// Arquivo: js/pages/dashboard/dashboard.js
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

} from "./dashboard.events.js";


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
// INIT
// Função pública utilizada pelo ENGINE ROUTER.
// ============================================================================

export async function initDashboard() {

     console.log(
        "ENGINE DASHBOARD → Inicializando..."
    );

    console.log(
        "ENGINE DASHBOARD → View:",
        document.querySelector(".dashboard")
    );

    console.log(
        "ENGINE DASHBOARD → Veículos:",
        document.getElementById(
            "tabela-veiculos-body"
        )
    );

    try {

        mostrarLoading();


        iniciarRelogio();


        iniciarFullscreen();


        await carregarDashboard();


        registrarEventos();


        registrarEventoVisibilidade();


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
// ATUALIZAÇÃO
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
// TIMER
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
// DESTRUIR
// ============================================================================

export function destruirDashboard() {

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
