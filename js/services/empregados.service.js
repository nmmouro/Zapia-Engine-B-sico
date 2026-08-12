// ============================================================================
// EMPREGADOS SERVICE
// Arquivo: js/services/empregados.service.js
// ============================================================================

import {
    API_URL,
    API_TIMEOUT
} from "../config/api.js";

// ============================================================================
// JSONP
// ============================================================================

function jsonp(params = {}) {

    return new Promise((resolve, reject) => {

        const callbackName =
            "__engine_jsonp_" +
            Date.now() +
            "_" +
            Math.random()
                .toString(36)
                .substring(2);

        const script =
            document.createElement("script");

        let finalizado = false;

        // --------------------------------------------------------------------
        // FINALIZAR
        // --------------------------------------------------------------------

        function finalizar() {

            if (finalizado) {
                return;
            }

            finalizado = true;

            clearTimeout(timeout);

            delete window[callbackName];

            script.remove();
        }

        // --------------------------------------------------------------------
        // TIMEOUT
        // --------------------------------------------------------------------

        const timeout =
            setTimeout(() => {

                finalizar();

                reject(
                    new Error(
                        "Tempo limite da API excedido."
                    )
                );

            }, API_TIMEOUT);

        // --------------------------------------------------------------------
        // CALLBACK JSONP
        // --------------------------------------------------------------------

        window[callbackName] = (resposta) => {

            if (finalizado) {
                return;
            }

            console.log(
                "ENGINE ← JSONP:",
                resposta
            );

            finalizar();

            const sucesso =
                resposta?.success ??
                resposta?.sucesso;

            if (sucesso === false) {

                reject(
                    new Error(
                        resposta?.erro ||
                        resposta?.error ||
                        resposta?.message ||
                        "A API retornou um erro."
                    )
                );

                return;
            }

            resolve(resposta);
        };

        // --------------------------------------------------------------------
        // MONTAR URL
        // --------------------------------------------------------------------

        const url =
            new URL(API_URL);

        Object.entries(params).forEach(
            ([key, value]) => {

                if (
                    value !== undefined &&
                    value !== null &&
                    value !== ""
                ) {

                    url.searchParams.set(
                        key,
                        value
                    );
                }
            }
        );

        url.searchParams.set(
            "prefix",
            callbackName
        );

        console.log(
            "ENGINE → API JSONP:",
            url.toString()
        );

        // --------------------------------------------------------------------
        // SCRIPT
        // --------------------------------------------------------------------

        script.src =
            url.toString();

        script.async = true;

        script.onerror = (evento) => {

            console.error(
                "ENGINE → JSONP ERROR:",
                evento
            );

            console.error(
                "ENGINE → URL:",
                url.toString()
            );

            finalizar();

            reject(
                new Error(
                    "Não foi possível acessar a API JSONP."
                )
            );
        };

        document.head.appendChild(script);
    });
}

// ============================================================================
// EXTRAIR ARRAY
// ============================================================================

function extrairData(resposta) {

    let atual = resposta;

    for (let i = 0; i < 5; i++) {

        if (Array.isArray(atual)) {
            return atual;
        }

        if (
            atual &&
            typeof atual === "object" &&
            "data" in atual
        ) {

            atual = atual.data;
            continue;
        }

        if (
            atual &&
            typeof atual === "object" &&
            "dados" in atual
        ) {

            atual = atual.dados;
            continue;
        }

        break;
    }

    return Array.isArray(atual)
        ? atual
        : null;
}

// ============================================================================
// EXTRAIR REGISTRO
// ============================================================================

function extrairRegistro(resposta) {

    let atual = resposta;

    for (let i = 0; i < 5; i++) {

        if (
            !atual ||
            typeof atual !== "object" ||
            Array.isArray(atual)
        ) {

            return atual;
        }

        if ("data" in atual) {

            atual = atual.data;
            continue;
        }

        if ("dados" in atual) {

            atual = atual.dados;
            continue;
        }

        return atual;
    }

    return atual;
}

// ============================================================================
// LISTAR EMPREGADOS
// ============================================================================

export async function obterEmpregados() {

    const resposta =
        await jsonp({
            acao: "listar",
            aba: "EMPREGADOS"
        });

    const lista =
        extrairData(resposta);

    if (!Array.isArray(lista)) {

        console.error(
            "ENGINE → Resposta inesperada:",
            resposta
        );

        throw new Error(
            "A API não retornou uma lista de empregados."
        );
    }

    return lista;
}

// ============================================================================
// BUSCAR EMPREGADO
// ============================================================================

export async function obterEmpregado(id) {

    if (!id) {

        throw new Error(
            "ID do empregado não informado."
        );
    }

    const resposta =
        await jsonp({
            acao: "buscar",
            aba: "EMPREGADOS",
            id
        });

    return extrairRegistro(resposta);
}

// ============================================================================
// SALVAR EMPREGADO
// ============================================================================

export async function salvarEmpregado(dados) {

    return post({
        acao: "criar",
        aba: "EMPREGADOS",
        dados
    });
}

// ============================================================================
// ATUALIZAR EMPREGADO
// ============================================================================

export async function atualizarEmpregado(id, dados) {

    if (!id) {

        throw new Error(
            "ID do empregado não informado."
        );
    }

    return post({
        acao: "atualizar",
        aba: "EMPREGADOS",
        id,
        dados
    });
}

// ============================================================================
// EXCLUIR EMPREGADO
// ============================================================================

export async function excluirEmpregado(id) {

    if (!id) {

        throw new Error(
            "ID do empregado não informado."
        );
    }

    return post({
        acao: "excluir",
        aba: "EMPREGADOS",
        id
    });
}

// ============================================================================
// POST
// ============================================================================

async function post(body) {

    const response =
        await fetch(
            API_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "text/plain;charset=utf-8"
                },

                body:
                    JSON.stringify(body)
            }
        );

    if (!response.ok) {

        throw new Error(
            `Erro HTTP ${response.status}.`
        );
    }

    const text =
        await response.text();

    if (!text) {

        throw new Error(
            "A API retornou uma resposta vazia."
        );
    }

    let json;

    try {

        json =
            JSON.parse(text);

    } catch {

        console.error(
            "ENGINE → Resposta recebida:",
            text
        );

        throw new Error(
            "A API retornou uma resposta inválida."
        );
    }

    const sucesso =
        json?.success ??
        json?.sucesso;

    if (sucesso === false) {

        throw new Error(
            json?.erro ||
            json?.error ||
            json?.message ||
            "A API retornou um erro."
        );
    }

    return extrairRegistro(json);
}
