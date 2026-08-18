// ============================================================================
// API CLIENT
// Painel Frota
// Engine Framework
// ============================================================================

export const API_URL =
    "https://script.google.com/macros/s/AKfycbwI3GFO4arC-VqyTxan0NFcdhKKWPBRFQTg78-EER8I8rLO08dm1foYvRL3J2SnhtpGsQ/exec";

export const API_TIMEOUT = 30000;


// ============================================================================
// JSONP
// ============================================================================

let contadorCallback = 0;


function gerarCallback() {

    contadorCallback++;

    return (
        "painelFrota_" +
        Date.now() +
        "_" +
        contadorCallback
    );

}


// ============================================================================
// GET
// ============================================================================

export function get(params = {}) {

    return new Promise(
        (resolve, reject) => {

            const callback =
                gerarCallback();


            const script =
                document.createElement("script");


            let finalizado = false;


            const timeout =
                setTimeout(
                    () => {

                        finalizar();

                        reject(
                            new Error(
                                "Timeout na comunicação com a API."
                            )
                        );

                    },
                    API_TIMEOUT
                );


            function finalizar() {

                if (finalizado) {

                    return;

                }


                finalizado = true;


                clearTimeout(
                    timeout
                );


                delete window[callback];


                if (
                    script.parentNode
                ) {

                    script.parentNode.removeChild(
                        script
                    );

                }

            }


            window[callback] =
                resposta => {

                    finalizar();

                    resolve(
                        resposta
                    );

                };


            script.onerror =
                () => {

                    finalizar();

                    reject(
                        new Error(
                            "Erro ao acessar a API."
                        )
                    );

                };


            const query =
                new URLSearchParams();


            Object.entries(params)
                .forEach(
                    ([chave, valor]) => {

                        if (
                            valor !== undefined &&
                            valor !== null
                        ) {

                            query.set(
                                chave,
                                valor
                            );

                        }

                    }
                );


            query.set(
                "prefix",
                callback
            );


            script.src =
                `${API_URL}?${query.toString()}`;


            script.async = true;


            document.head.appendChild(
                script
            );

        }
    );

}


// ============================================================================
// REQUEST
// ============================================================================

export async function request(
    params = {},
    options = {}
) {

    const method =
        String(
            options.method || "GET"
        ).toUpperCase();


    if (
        method === "GET"
    ) {

        return get(
            params
        );

    }


    throw new Error(
        `Método ainda não implementado: ${method}`
    );

}


// ============================================================================
// EXPORT DEFAULT
// ============================================================================

export default {

    get,

    request

};
