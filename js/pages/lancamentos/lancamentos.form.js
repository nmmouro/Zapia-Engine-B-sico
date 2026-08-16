// ============================================================================
// ENGINE FRAMEWORK
// LANÇAMENTOS FORM
// Arquivo: js/pages/lancamentos/lancamentos.form.js
// ============================================================================

import {
    obterLancamento,
    salvarLancamento,
    atualizarLancamento,
    excluirLancamento
} from "../../services/lancamentos.service.js";

import {
    mostrarLoading,
    esconderLoading
} from "../../ui/loading.js";

import {
    abrirModal,
    fecharModal
} from "../../ui/modal.js";

import {
    obterDadosFormulario,
    preencherFormulario,
    limparFormulario,
    mostrarErro,
    limparErro
} from "./lancamentos.fields.js";

import {
    carregarTabela
} from "./lancamentos.helpers.js";

import {
    definirRegistroEditando,
    registroEditando
} from "./lancamentos.state.js";

import {
    tratarErro
} from "../../utils/erros.js";

// ============================================================================
// NOVO LANÇAMENTO
// ============================================================================

export function novoLancamento() {

    definirRegistroEditando(null);

    limparFormulario();

    const titulo =
        document.getElementById("tituloModal");

    if (titulo) {
        titulo.textContent =
            "Novo lançamento";
    }

    limparErro();

    abrirModal();
}


// ============================================================================
// EDITAR LANÇAMENTO
// ============================================================================

export async function editarLancamento(id) {

    try {

        mostrarLoading();

        const resposta =
            await obterLancamento(id);

        const registro =
            resposta?.dados ??
            resposta?.data ??
            resposta;

        if (
            !registro ||
            Array.isArray(registro)
        ) {

            throw new Error(
                "Lançamento não encontrado."
            );

        }

        console.log(
            "ENGINE → LANÇAMENTO PARA EDIÇÃO:",
            registro
        );

        definirRegistroEditando(
            registro.ID ?? id
        );

        preencherFormulario(
            registro
        );

        limparErro();

        const titulo =
            document.getElementById(
                "tituloModal"
            );

        if (titulo) {

            titulo.textContent =
                "Editar lançamento";

        }

        abrirModal();

    } catch (erro) {

        console.error(
            "ENGINE → Erro ao editar lançamento:",
            erro
        );

        tratarErro(erro);

    } finally {

        esconderLoading();

    }
}


// ============================================================================
// SALVAR LANÇAMENTO
// ============================================================================

export async function salvar() {

    try {

        mostrarLoading();

        limparErro();

        const dados =
            obterDadosFormulario();

        console.log(
            "ENGINE → SALVAR LANÇAMENTO:",
            dados
        );


        // --------------------------------------------------------------------
        // EDIÇÃO
        // --------------------------------------------------------------------

        if (registroEditando) {

            console.log(
                "ENGINE → ATUALIZAR LANÇAMENTO:",
                registroEditando
            );

            await atualizarLancamento(
                registroEditando,
                dados
            );

        }

        // --------------------------------------------------------------------
        // NOVO
        // --------------------------------------------------------------------

        else {

            console.log(
                "ENGINE → NOVO LANÇAMENTO"
            );

            await salvarLancamento(
                dados
            );

        }


        // --------------------------------------------------------------------
        // FINALIZAÇÃO
        // --------------------------------------------------------------------

        definirRegistroEditando(
            null
        );

        fecharModal();

        await carregarTabela();

    } catch (erro) {

        console.error(
            "ENGINE → Erro ao salvar lançamento:",
            erro
        );

        mostrarErro(
            erro?.message ||
            "Não foi possível salvar o lançamento."
        );

    } finally {

        esconderLoading();

    }
}


// ============================================================================
// EXCLUIR LANÇAMENTO
// ============================================================================

export async function remover(id) {

    if (!id) {

        tratarErro(
            new Error(
                "ID do lançamento não informado."
            )
        );

        return;
    }


    const confirmar =
        window.confirm(
            "Excluir este lançamento?"
        );

    if (!confirmar) {
        return;
    }


    try {

        mostrarLoading();

        await excluirLancamento(
            id
        );

        definirRegistroEditando(
            null
        );

        await carregarTabela();

    } catch (erro) {

        console.error(
            "ENGINE → Erro ao excluir lançamento:",
            erro
        );

        tratarErro(
            erro
        );

    } finally {

        esconderLoading();

    }
}
