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
// ESTADO
// ============================================================================

let elementoAnteriorAoModal = null;

let escapeRegistrado = false;


// ============================================================================
// OBTER MODAL
// ============================================================================

function obterModal() {

    const modal =
        document.getElementById("modal");


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

export function abrirModal(options = {}) {

    const modal =
        obterModal();


    // ------------------------------------------------------------------------
    // GUARDAR ELEMENTO QUE POSSUÍA FOCO
    // ------------------------------------------------------------------------

    elementoAnteriorAoModal =
        document.activeElement;


    // ------------------------------------------------------------------------
    // MOSTRAR MODAL
    // ------------------------------------------------------------------------

    modal.classList.remove("hidden");

    modal.hidden = false;

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";


    // ------------------------------------------------------------------------
    // FOCO OPCIONAL
    // ------------------------------------------------------------------------

    if (options.focus) {

        setTimeout(() => {

            const elemento =
                document.getElementById(
                    options.focus
                );


            if (elemento) {

                elemento.focus();

            }

        }, 0);

        return;

    }


    // ------------------------------------------------------------------------
    // FOCO NO PRIMEIRO ELEMENTO
    // ------------------------------------------------------------------------

    setTimeout(() => {

        const primeiroElemento =
            modal.querySelector(
                "input, select, textarea, button"
            );


        if (primeiroElemento) {

            primeiroElemento.focus();

        }

    }, 0);

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
    // REMOVER FOCO DO MODAL ANTES DE OCULTÁ-LO
    // ------------------------------------------------------------------------

    if (
        document.activeElement &&
        modal.contains(
            document.activeElement
        )
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

    modal.classList.add("hidden");

    modal.hidden = true;


    document.body.style.overflow =
        "";


    // ------------------------------------------------------------------------
    // DEVOLVER FOCO
    // ------------------------------------------------------------------------

    if (
        elementoAnteriorAoModal &&
        document.contains(
            elementoAnteriorAoModal
        )
    ) {

        elementoAnteriorAoModal.focus();

    }


    elementoAnteriorAoModal =
        null;

}


// ============================================================================
// CONFIGURAR MODAL
// ============================================================================

export function configurarModal() {

    const modal =
        document.getElementById("modal");


    if (!modal) {

        console.warn(
            "ENGINE MODAL: #modal não encontrado."
        );

        return;

    }


    // ------------------------------------------------------------------------
    // ESTADO INICIAL
    // ------------------------------------------------------------------------

    modal.hidden = true;

    modal.classList.add("hidden");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


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

    if (!escapeRegistrado) {

        document.addEventListener(
            "keydown",
            evento => {

                if (
                    evento.key === "Escape" &&
                    !modal.hidden
                ) {

                    fecharModal();

                }

            }
        );


        escapeRegistrado = true;

    }

}
