// ============================================================================
// ENGINE FRAMEWORK
// APP
// Arquivo: js/app.js
// ============================================================================

import {

    iniciarRelogio

} from "./utils/relogio.js";

import {

    iniciarFullscreen

} from "./utils/fullscreen.js";

import {
    startRouter
} from "./core/router.js";

function boot() {

    console.log(
        "ENGINE → Boot"
    );

    startRouter({

        container: "#app"

    });

}

document.addEventListener(
    "DOMContentLoaded",
    boot
);

// ================= APLICAÇÃO =================

function iniciarAplicacao(){


    iniciarRelogio();


    iniciarFullscreen();

}
