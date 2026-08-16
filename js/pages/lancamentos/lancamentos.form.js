// ============================================================================
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

                                                                console.log(
        "ENGINE → NOVO VEÍCULO"
    );

    definirRegistroEditando(
        null
    );


    limparFormulario();

    limparErro();


    const titulo =
        document.getElementById(
            "tituloModal"
        );


    if (titulo) {

        titulo.textContent =
            "Novo lançamento";

    }


    abrirModal({
        focus: "data"
    });

}


// ============================================================================
// EDITAR LANÇAMENTO
// ============================================================================

export async function editarLancamento(
    id
) {

    try {

        mostrarLoading();

        limparErro();


        if (!id) {

            throw new Error(
                "ID do lancamento não informado."
            );

        }


                                                                console.log(
            "ENGINE → EDITAR lancamento:",
            id
        );


        const resposta =
            await obterLancamento(id);


        const dados =
            resposta?.dados ??
            resposta?.data ??
            resposta;


                                                                console.log(
            "ENGINE → lancametno PARA EDIÇÃO:",
            dados
        );


        const titulo =
            document.getElementById(
                "tituloModal"
            );


        if (titulo) {

            titulo.textContent =
                "Editar lançamento";

        }


       abrirModal();


    } catch (error) {

                                                                    console.error(
            "ENGINE → Erro ao editar veículo:",
            erro
        );

        tratarErro(error);

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
            "ENGINE → SALVAR VEÍCULO:",
            {


        if (registroEditando) {

                                                                    console.log(
                "ENGINE → ATUALIZAR VEÍCULO:",
                registroEditando
            );

            await atualizarLancamento(
                registroEditando,
                dados
            );

        } else {

            await salvarLancamento(
                dados
            );

        }


        definirRegistroEditando(
            null
        );


        fecharModal();


        await carregarTabela();


    } catch (error) {

        mostrarErro(
            error?.message ??
            "Não foi possível salvar o lançamento."
        );

    } finally {

        esconderLoading();

    }

}


// ============================================================================
// EXCLUIR LANÇAMENTO
// ============================================================================

export async function remover(
    id
) {

    if (
        !confirm(
            "Excluir este lançamento?"
        )
    ) {

        return;

    }


    try {

        mostrarLoading();


        await excluirLancamento(
            id
        );


        await carregarTabela();


    } catch (error) {

        tratarErro(error);

    } finally {

        esconderLoading();

    }

}
