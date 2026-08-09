// ============================================================================
// ENGINE FRAMEWORK
// CORE STATE
// Arquivo: js/core/state.js
// ============================================================================

const states =
    new Map();


// ============================================================================
// CRIAR / OBTER ESTADO
// ============================================================================

function garantirState(
    namespace
) {

    if (
        !states.has(namespace)
    ) {

        states.set(
            namespace,
            {
                registros: [],
                registroEditando: null,
                carregando: false
            }
        );

    }


    return states.get(
        namespace
    );

}


// ============================================================================
// GET STATE
// ============================================================================

export function getState(
    namespace = "app"
) {

    const state =
        garantirState(
            namespace
        );


    return {
        ...state
    };

}


// ============================================================================
// SET STATE
// ============================================================================

export function setState(
    namespace,
    patch
) {

    if (
        !patch ||
        typeof patch !==
        "object"
    ) {

        throw new TypeError(
            "ENGINE STATE: patch deve ser um objeto."
        );

    }


    const atual =
        garantirState(
            namespace
        );


    const novoState = {

        ...atual,

        ...patch

    };


    states.set(
        namespace,
        novoState
    );


    return {
        ...novoState
    };

}


// ============================================================================
// RESET
// ============================================================================

export function resetState(
    namespace = "app"
) {

    states.set(
        namespace,
        {
            registros: [],
            registroEditando: null,
            carregando: false
        }
    );


    return getState(
        namespace
    );

}


// ============================================================================
// DELETE
// ============================================================================

export function deleteState(
    namespace
) {

    states.delete(
        namespace
    );

}
