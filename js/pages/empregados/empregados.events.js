// ============================================================================
// EMPREGADOS EVENTS
// Arquivo: js/pages/empregados/empregados.events.js
// ============================================================================

import {
    salvar,
    novo
} from "./empregados.form.js";

// ============================================================================
// REGISTRAR EVENTOS
// ============================================================================

export function registrarEventos() {

    const formulario =
        document.querySelector(
            "#formEmpregado"
        );

    const btnNovo =
        document.querySelector(
            "#btnNovo"
        );

    if (formulario) {

        formulario.addEventListener(
            "submit",
            salvar
        );

    }

    if (btnNovo) {

        btnNovo.addEventListener(
            "click",
            novo
        );

    }

}
