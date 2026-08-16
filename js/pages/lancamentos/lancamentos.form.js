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


let salvando = false;

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

export async function salvar(evento) {

    // ------------------------------------------------------------------------
    // PREVENIR SUBMIT PADRÃO
    // ------------------------------------------------------------------------

    if (evento) {

        evento.preventDefault();
        evento.stopPropagation();

    }


    // ------------------------------------------------------------------------
    // IMPEDIR DUPLO CLIQUE
    // ------------------------------------------------------------------------

    if (salvando) {

        console.warn(
            "ENGINE → SALVAMENTO JÁ EM ANDAMENTO."
        );

        return;
    }


    salvando = true;


    const formulario =
        document.getElementById(
            "formLancamento"
        );


    const botaoSalvar =
        formulario?.querySelector(
            'button[type="submit"]'
        );


    try {

        mostrarLoading();

        limparErro();


        // --------------------------------------------------------------------
        // DESABILITAR BOTÃO
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
            "ENGINE → DADOS PARA GRAVAÇÃO:",
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

            const resposta =
                await atualizarLancamento(
                    registroEditando,
                    dados
                );

            console.log(
                "ENGINE ← ATUALIZAÇÃO CONFIRMADA:",
                resposta
            );

        }


        // --------------------------------------------------------------------
        // NOVO
        // --------------------------------------------------------------------

        else {

            console.log(
                "ENGINE → CRIANDO NOVO LANÇAMENTO"
            );

            const resposta =
                await salvarLancamento(
                    dados
                );

            console.log(
                "ENGINE ← CRIAÇÃO CONFIRMADA:",
                resposta
            );
        }


        // --------------------------------------------------------------------
        // LIMPAR ESTADO
        // --------------------------------------------------------------------

        definirRegistroEditando(null);


        // --------------------------------------------------------------------
        // FECHAR MODAL
        // --------------------------------------------------------------------

        fecharModal();


        // --------------------------------------------------------------------
        // RECARREGAR TABELA
        // --------------------------------------------------------------------

        await carregarTabela();


        console.log(
            "ENGINE → LANÇAMENTO SALVO COM SUCESSO"
        );


    } catch (erro) {

        console.error(
            "ENGINE → ERRO AO SALVAR LANÇAMENTO:",
            erro
        );


        mostrarErro(
            erro?.message ||
            "Não foi possível salvar o lançamento."
        );


        // IMPORTANTE:
        // não fecha o modal em caso de erro.


    } finally {

        // --------------------------------------------------------------------
        // REATIVAR BOTÃO
        // --------------------------------------------------------------------

        if (botaoSalvar) {

            botaoSalvar.disabled = false;

            botaoSalvar.textContent =
                botaoSalvar.dataset.textoOriginal ||
                "Salvar";
        }


        salvando = false;

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
