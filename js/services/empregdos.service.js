// ============================================================================
// EMPREGADOS SERVICE
// Arquivo: js/services/empregados.service.js
// ============================================================================

import { apiGet, apiPost } from "../config/api.js";

// ============================================================================
// LISTAR
// ============================================================================

export async function obterEmpregados() {

    const resposta = await apiGet({
        acao: "listar",
        aba: "EMPREGADOS"
    });

    console.log("ENGINE → API EMPREGADOS:", resposta);

    if (resposta?.sucesso === false) {
        throw new Error(
            resposta.erro ||
            "Erro ao listar empregados."
        );
    }

    return resposta?.dados ?? resposta ?? [];
}

// ============================================================================
// BUSCAR POR ID
// ============================================================================

export async function obterEmpregado(id) {

    if (!id) {
        throw new Error(
            "ID do empregado não informado."
        );
    }

    const resposta = await apiGet({
        acao: "buscar",
        aba: "EMPREGADOS",
        id: id
    });

    console.log(
        "ENGINE → API EMPREGADO:",
        resposta
    );

    if (resposta?.sucesso === false) {
        throw new Error(
            resposta.erro ||
            "Empregado não encontrado."
        );
    }

    return resposta?.dados ?? resposta;
}

// ============================================================================
// CRIAR
// ============================================================================

export async function salvarEmpregado(dados) {

    const resposta = await apiPost({
        acao: "criar",
        aba: "EMPREGADOS",
        dados: dados
    });

    console.log(
        "ENGINE → CRIAR EMPREGADO:",
        resposta
    );

    if (resposta?.sucesso === false) {
        throw new Error(
            resposta.erro ||
            "Erro ao cadastrar empregado."
        );
    }

    return resposta;
}

// ============================================================================
// ATUALIZAR
// ============================================================================

export async function atualizarEmpregado(id, dados) {

    if (!id) {
        throw new Error(
            "ID do empregado não informado."
        );
    }

    const resposta = await apiPost({
        acao: "atualizar",
        aba: "EMPREGADOS",
        id: id,
        dados: dados
    });

    console.log(
        "ENGINE → ATUALIZAR EMPREGADO:",
        resposta
    );

    if (resposta?.sucesso === false) {
        throw new Error(
            resposta.erro ||
            "Erro ao atualizar empregado."
        );
    }

    return resposta;
}

// ============================================================================
// EXCLUIR
// ============================================================================

export async function excluirEmpregado(id) {

    if (!id) {
        throw new Error(
            "ID do empregado não informado."
        );
    }

    const resposta = await apiPost({
        acao: "excluir",
        aba: "EMPREGADOS",
        id: id
    });

    console.log(
        "ENGINE → EXCLUIR EMPREGADO:",
        resposta
    );

    if (resposta?.sucesso === false) {
        throw new Error(
            resposta.erro ||
            "Erro ao excluir empregado."
        );
    }

    return resposta;
}
