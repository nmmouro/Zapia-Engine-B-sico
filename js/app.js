// ============================================================================
// ENGINE FRAMEWORK
// APP
// Arquivo: js/app.js
// ============================================================================

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
