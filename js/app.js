// ============================================================================
// ENGINE FRAMEWORK
// APP
// Arquivo: js/app.js
// ============================================================================

import {
    startRouter
} from "./core/router.js";


/*
function atualizarRelogio() {

    const agora = new Date();

    const clock =
        document.getElementById("clock");

    if (!clock) return;

    clock.textContent =
        agora.toLocaleString(
            "pt-BR",
            {
                dateStyle: "short",
                timeStyle: "medium"
            }
        );
}

*/


function boot() {

    console.log(
        "ENGINE → Boot"
    );


    /*
    atualizarRelogio();

    setInterval(
        atualizarRelogio,
        1000
    );
    */


    startRouter({

        container: "#app"

    });

}


document.addEventListener(
    "DOMContentLoaded",
    boot
);
