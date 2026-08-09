// ============================================================================
// ENGINE FRAMEWORK
// CORE EVENTS
// Arquivo: js/core/events.js
// ============================================================================

const handlers =
    new Map();


// ============================================================================
// ON
// ============================================================================

export function on(
    name,
    handler
) {

    if (
        typeof handler !==
        "function"
    ) {

        throw new TypeError(
            "ENGINE EVENTS: handler deve ser uma função."
        );

    }


    if (
        !handlers.has(name)
    ) {

        handlers.set(
            name,
            new Set()
        );

    }


    handlers
        .get(name)
        .add(handler);


    return () => {

        off(
            name,
            handler
        );

    };

}


// ============================================================================
// OFF
// ============================================================================

export function off(
    name,
    handler
) {

    const grupo =
        handlers.get(name);


    if (!grupo) {
        return;
    }


    grupo.delete(
        handler
    );


    if (
        grupo.size === 0
    ) {

        handlers.delete(
            name
        );

    }

}


// ============================================================================
// EMIT
// ============================================================================

export function emit(
    name,
    payload
) {

    const grupo =
        handlers.get(name);


    if (!grupo) {
        return;
    }


    grupo.forEach(
        handler => {

            try {

                handler(
                    payload
                );

            } catch (erro) {

                console.error(
                    `ENGINE EVENTS → Erro em "${name}":`,
                    erro
                );

            }

        }
    );

}


// ============================================================================
// CLEAR
// ============================================================================

export function clear(
    name
) {

    if (name) {

        handlers.delete(
            name
        );

        return;

    }


    handlers.clear();

}
