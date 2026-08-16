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

    if (!id) {

        tratarErro(
            new Error(
                "ID do lançamento não informado."
            )
        );

        return;
    }

    try {

        mostrarLoading();

        console.log(
            "ENGINE → EDITAR LANÇAMENTO:",
            id
        );

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

        // --------------------------------------------------------------------
        // GUARDA O ID DO LANÇAMENTO
        // --------------------------------------------------------------------

        definirRegistroEditando(
            registro.ID || id
        );

        // --------------------------------------------------------------------
        // PREENCHE O FORMULÁRIO
        // --------------------------------------------------------------------

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

        tratarErro(
            erro
        );

    } finally {

        esconderLoading();

    }
}


// ============================================================================
// SALVAR LANÇAMENTO
// ============================================================================

let salvando = false;

export async function salvar(evento) {

    // Evita o submit padrão do navegador
    if (evento) {
        evento.preventDefault();
        evento.stopPropagation();
    }

    // Evita múltiplos cliques
    if (salvando) {
        console.warn(
            "ENGINE → SALVAMENTO JÁ EM ANDAMENTO."
        );
        return;
    }

    const botaoSalvar =
        document.querySelector(
            '#formLancamento button[type="submit"]'
        );

    try {

        salvando = true;

        mostrarLoading();
        limparErro();

        // --------------------------------------------------------------------
        // BLOQUEAR BOTÃO
        // --------------------------------------------------------------------

        if (botaoSalvar) {

            botaoSalvar.disabled = true;

            botaoSalvar.dataset.textoOriginal =
                botaoSalvar.textContent;

            botaoSalvar.textContent =
                "Salvando...";
        }

        // --------------------------------------------------------------------
        // OBTER DADOS
        // --------------------------------------------------------------------

        const dados =
            obterDadosFormulario();

        console.log(
            "ENGINE → DADOS PARA SALVAR:",
            dados
        );

        // --------------------------------------------------------------------
        // EDIÇÃO
        // --------------------------------------------------------------------

        if (registroEditando) {

            console.log(
                "ENGINE → ATUALIZANDO:",
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
                "ENGINE → CRIANDO NOVO LANÇAMENTO:",
                dados
            );

            await salvarLancamento(
                dados
            );
        }

        // --------------------------------------------------------------------
        // SUCESSO
        // --------------------------------------------------------------------

        console.log(
            "ENGINE → LANÇAMENTO SALVO COM SUCESSO."
        );

        definirRegistroEditando(null);

        fecharModal();

        await carregarTabela();

    } catch (erro) {

        console.error(
            "ENGINE → ERRO AO SALVAR:",
            erro
        );

        mostrarErro(
            erro?.message ||
            "Não foi possível salvar o lançamento."
        );

    } finally {

        // --------------------------------------------------------------------
        // LIBERAR NOVAMENTE
        // --------------------------------------------------------------------

        salvando = false;

        if (botaoSalvar) {

            botaoSalvar.disabled = false;

            botaoSalvar.textContent =
                botaoSalvar.dataset.textoOriginal ||
                "Salvar";
        }

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
