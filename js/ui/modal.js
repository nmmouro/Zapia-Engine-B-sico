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

export function abrirModal(
    options = {}
) {

    const modal =
        obterModal();


    modal.classList.remove(
        "hidden"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";


    // ------------------------------------------------------------------------
    // FOCO OPCIONAL
    // ------------------------------------------------------------------------

    if (
        options.focus
    ) {

        setTimeout(
            () => {

                document
                    .getElementById(
                        options.focus
                    )
                    ?.focus();

            },
            0
        );

    }

}


// ============================================================================
// FECHAR MODAL
// ============================================================================

export function fecharModal() {

    const modal =
        document.getElementById(
            "modal"
        );


    if (!modal) {

        return;

    }


    modal.classList.add(
        "hidden"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

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
