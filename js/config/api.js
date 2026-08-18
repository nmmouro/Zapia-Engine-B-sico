```javascript
// ============================================================================
// API CLIENT
// Painel Frota
// Engine Framework
// Arquivo: js/api.js
// ============================================================================

export const API_URL =
    "https://script.google.com/macros/s/AKfycbyTWT1EILDhv9q9x8QbbRJh-mfrtT3iKLxbNi2bLPLkD-zy6aX_M5mtPqp8KXoPBa0Mjw/exec";


export const API_TIMEOUT = 30000;


// ============================================================================
// CONTROLE JSONP
// ============================================================================

let jsonpSequence = 0;


// ============================================================================
// UTILITÁRIOS
// ============================================================================

function gerarCallback() {

    jsonpSequence++;

    return `painelFrotaCallback_${Date.now()}_${jsonpSequence}`;

}


function montarQuery(params = {}) {

    const searchParams =
        new URLSearchParams();


    Object.entries(params).forEach(
        ([chave, valor]) => {

            if (
                valor !== undefined &&
                valor !== null
            ) {

                searchParams.set(
                    chave,
                    valor
                );

            }

        }
    );


    return searchParams.toString();

}


// ============================================================================
// JSONP
// ============================================================================

function jsonp(
    params = {},
    timeout = API_TIMEOUT
) {

    return new Promise(
        (resolve, reject) => {

            const callback =
                gerarCallback();


            const script =
                document.createElement("script");


            let finalizado = false;


            const timer =
                setTimeout(
                    () => {

                        finalizar();

                        reject(
                            new Error(
                                "Tempo limite excedido na requisição JSONP."
                            )
                        );

                    },
                    timeout
                );


            function finalizar() {

                if (finalizado) {

                    return;

                }


                finalizado = true;


                clearTimeout(
                    timer
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
                (resposta) => {

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
                            "Falha ao acessar a API Google Apps Script."
                        )
                    );

                };


            const query =
                montarQuery({

                    ...params,

                    prefix: callback

                });


            script.src =
                `${API_URL}?${query}`;


            script.async = true;


            document.head.appendChild(
                script
            );

        }
    );

}


// ============================================================================
// GET
// ============================================================================

export async function get(
    params = {}
) {

    return jsonp(
        params
    );

}


// ============================================================================
// POST
// ============================================================================

export async function post(
    body = {}
) {

    const controller =
        new AbortController();


    const timeout =
        setTimeout(
            () => controller.abort(),
            API_TIMEOUT
        );


    try {

        const resposta =
            await fetch(
                API_URL,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body:
                        JSON.stringify(body),

                    signal:
                        controller.signal

                }
            );


        if (
            !resposta.ok
        ) {

            throw new Error(
                `HTTP ${resposta.status}`
            );

        }


        return await resposta.json();

    } catch (erro) {

        if (
            erro.name === "AbortError"
        ) {

            throw new Error(
                "Tempo limite excedido na requisição."
            );

        }


        throw erro;

    } finally {

        clearTimeout(
            timeout
        );

    }

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


    if (
        method === "POST"
    ) {

        return post(
            params
        );

    }


    throw new Error(
        `Método HTTP não suportado: ${method}`
    );

}


// ============================================================================
// EXPORTAÇÃO PADRÃO
// ============================================================================

export default {

    get,

    post,

    request

};
```
