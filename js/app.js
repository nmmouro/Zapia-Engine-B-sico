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


// ============================================================================
// HANDLERS
// ============================================================================

const handlers = {

    veiculos:
        initVeiculos,

    empregados:
        initEmpregados

};


// ============================================================================
// BOOT
// ============================================================================

function boot() {

    console.log(
        "ENGINE → Boot"
    );


    startRouter(
        handlers,
        {
            container:
                "#app",

            viewsPath:
                "./pages"
        }
    );

}


// ============================================================================
// DOM READY
// ============================================================================

document.addEventListener(
    "DOMContentLoaded",
    boot
);
