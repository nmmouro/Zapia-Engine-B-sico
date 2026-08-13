// ============================================================================
// ENGINE UI
// MODAL
// Arquivo: js/ui/modal.js
// ============================================================================
//
// Modal global reutilizável pelo Engine Framework.
//
// O modal NÃO conhece:
//   - veículos
//   - empregados
//   - lançamentos
//   - campos específicos
//
// Cada módulo decide qual elemento deve receber foco.
// ============================================================================


// ============================================================================
// OBTER MODAL
// ============================================================================

function obterModal() {

    const modal =
        document.getElementById(
            "modal"
        );


    if (!modal) {

        throw new Error(
            "ENGINE MODAL: elemento #modal não encontrado no DOM."
        );

    }


    return modal;

}


// ============================================================================
// ABRIR MODAL
// ============================================================================

export function abrirModal(opcoes = {}) {

    const modal =
        document.getElementById("modal");

    if (!modal) {
        return;
    }


    modal.hidden = false;

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    // ------------------------------------------------------------------------
    // FOCO
    // ------------------------------------------------------------------------

    if (opcoes.focus) {

        const campo =
            document.getElementById(
                opcoes.focus
            );

        if (campo) {

            campo.focus();

            return;

        }

    }

    const primeiroCampo =
        modal.querySelector(
            "input, select, textarea, button"
        );

    if (primeiroCampo) {

        primeiroCampo.focus();

    }

}


// ============================================================================
// FECHAR MODAL
// ============================================================================

export function fecharModal() {

    const modal =
        document.getElementById("modal");

    if (!modal) {
        return;
    }


    // ------------------------------------------------------------------------
    // REMOVER FOCO ANTES DE OCULTAR O MODAL
    // ------------------------------------------------------------------------

    if (
        document.activeElement &&
        modal.contains(document.activeElement)
    ) {

        document.activeElement.blur();

    }


    // ------------------------------------------------------------------------
    // OCULTAR MODAL
    // ------------------------------------------------------------------------

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    modal.hidden = true;


    // ------------------------------------------------------------------------
    // DEVOLVER FOCO AO BOTÃO NOVO
    // ------------------------------------------------------------------------

    const btnNovo =
        document.getElementById("btnNovo");

    if (btnNovo) {

        btnNovo.focus();

    }

}


// ============================================================================
// CONFIGURAR MODAL
// ============================================================================

export function configurarModal() {

    const modal =
        document.getElementById(
            "modal"
        );


    if (!modal) {

        console.warn(
            "ENGINE MODAL: #modal não encontrado."
        );

        return;

    }


    // ------------------------------------------------------------------------
    // ELEMENTOS COM data-close-modal
    // ------------------------------------------------------------------------

    document
        .querySelectorAll(
            "[data-close-modal]"
        )
        .forEach(
            elemento => {

                elemento.addEventListener(
                    "click",
                    fecharModal
                );

            }
        );


    // ------------------------------------------------------------------------
    // BOTÃO FECHAR
    // ------------------------------------------------------------------------

    document
        .getElementById(
            "btnFecharModal"
        )
        ?.addEventListener(
            "click",
            fecharModal
        );


    // ------------------------------------------------------------------------
    // BOTÃO CANCELAR
    // ------------------------------------------------------------------------

    document
        .getElementById(
            "btnCancelar"
        )
        ?.addEventListener(
            "click",
            fecharModal
        );


    // ------------------------------------------------------------------------
    // ESC
    // ------------------------------------------------------------------------

    document.addEventListener(
        "keydown",
        evento => {

            if (
                evento.key === "Escape" &&
                !modal.classList.contains(
                    "hidden"
                )
            ) {

                fecharModal();

            }

        }
    );

}
