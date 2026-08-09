// ============================================================================
// ENGINE FRAMEWORK
// APP
// Arquivo: js/app.js
// ============================================================================

import {
    startRouter
} from "./core/router.js";

import {
    initVeiculos
} from "./pages/veiculos/veiculos.js";

import {
    initEmpregados
} from "./pages/empregados/empregados.js";


function atualizarRelogio() {
  const agora = new Date();

  const clock = document.getElementById("clock");

  if (clock) {
    clock.textContent = agora.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "medium"
    });
  }
}

// ============================================================================
// HANDLERS DE ROTAS
// ============================================================================

const handlers = {

    veiculos:
        initVeiculos,

    empregados:
        initEmpregados

};


// ============================================================================
// EXECUTAR ROTA
// ============================================================================

async function onRoute(
    route
) {

    console.log(
        "ENGINE → Rota:",
        route
    );


    const handler =
        handlers[route];


    if (
        typeof handler !==
        "function"
    ) {

        console.warn(
            `ENGINE → Handler não encontrado: ${route}`
        );

        return;

    }


    try {

        await handler();

    } catch (erro) {

        console.error(
            `ENGINE → Erro na rota "${route}":`,
            erro
        );

    }

}


// ============================================================================
// BOOT
// ============================================================================

function boot() {

    console.log(
        "ENGINE → Boot"
    );


    startRouter(
        onRoute
    );

}


// ============================================================================
// DOM READY
// ============================================================================

document.addEventListener(
    "DOMContentLoaded",
    boot
);
