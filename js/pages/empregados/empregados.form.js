// ============================================================================
// EMPREGADOS FORM
// Arquivo: js/pages/empregados/empregados.form.js
// ============================================================================

import {
    obterEmpregado,
    salvarEmpregado,
    atualizarEmpregado,
    excluirEmpregado
} from "../../services/empregados.service.js";

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
} from "./empregados.fields.js";

import {
    carregarTabela
} from "./empregados.helpers.js";

import {
    definirRegistroEditando,
    registroEditando
} from "./empregados.state.js";

import {
    tratarErro
} from "../../utils/erros.js";

// ============================================================================
// NOVO EMPREGADO
// ============================================================================

export function novoEmpregado() {

    definirRegistroEditando(null);

    limparFormulario();

    limparErro();


    const titulo =
        document.getElementById(
            "tituloModal"
        );


    if (titulo) {

        titulo.textContent =
            "Novo empregado";

    }


    abrirModal({
        focus: "empregado"
    });

}


// ============================================================================
// EDITAR EMPREGADO
// ============================================================================

export async function editarEmpregado(
    id
) {

    try {

        mostrarLoading();

        const registro =
            await obterEmpregado(id);


        const dados =
            registro?.dados ??
            registro;


        if (
            !dados ||
            Array.isArray(dados)
        ) {

            throw new Error(
                "Empregado não encontrado."
            );

        }


        definirRegistroEditando(
            dados.ID ?? id
        );


        preencherFormulario(
            dados
        );


        limparErro();


        const titulo =
            document.getElementById(
                "tituloModal"
            );


        if (titulo) {

            titulo.textContent =
                "Editar empregado";

        }


        abrirModal({
            focus: "empregado"
        });


    } catch (error) {

        tratarErro(error);

    } finally {

        esconderLoading();

    }

}


// ============================================================================
// SALVAR EMPREGADO
// ============================================================================

export async function salvar() {

    try {

        mostrarLoading();

        limparErro();


        const dados =
            obterDadosFormulario();


        if (registroEditando) {

            await atualizarEmpregado(
                registroEditando,
                dados
            );

        } else {

            await salvarEmpregado(
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
            "Não foi possível salvar o empregado."
        );

    } finally {

        esconderLoading();

    }

}


// ============================================================================
// EXCLUIR EMPREGADO
// ============================================================================

export async function remover(
    id
) {

    if (
        !confirm(
            "Excluir este empregado?"
        )
    ) {

        return;

    }


    try {

        mostrarLoading();


        await excluirEmpregado(
            id
        );


        await carregarTabela();


    } catch (error) {

        tratarErro(error);

    } finally {

        esconderLoading();

    }

}
