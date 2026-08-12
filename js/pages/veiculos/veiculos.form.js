// ============================================================================
// VEÍCULOS FORM
// Arquivo: js/pages/veiculos/veiculos.form.js
// ============================================================================

import {
    obterVeiculo,
    salvarVeiculo,
    atualizarVeiculo,
    excluirVeiculo
} from "../../services/veiculos.service.js";

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
} from "./veiculos.fields.js";

import {
    carregarTabela
} from "./veiculos.helpers.js";

import {
    definirRegistroEditando,
    registroEditando
} from "./veiculos.state.js";

import {
    tratarErro
} from "../../utils/erros.js";

// ============================================================================
// NOVO VEÍCULO
// ============================================================================

export function novoVeiculo() {

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
            "Novo veículo";

    }


    abrirModal({
        focus: "placa"
    });

}


// ============================================================================
// EDITAR VEÍCULO
// ============================================================================

export async function editarVeiculo(
    id
) {

    try {

        mostrarLoading();


        const registro =
            await obterVeiculo(id);


        const dados =
            registro?.dados ??
            registro;


        if (
            !dados ||
            Array.isArray(dados)
        ) {

            throw new Error(
                "Veículo não encontrado."
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
                "Editar veículo";

        }


        abrirModal({
            focus: "placa"
        });


    } catch (error) {

        tratarErro(error);

    } finally {

        esconderLoading();

    }

}


// ============================================================================
// SALVAR VEÍCULO
// ============================================================================

export async function salvar() {

    try {

        mostrarLoading();

        limparErro();


        const dados =
            obterDadosFormulario();


        if (registroEditando) {

            await atualizarVeiculo(
                registroEditando,
                dados
            );

        } else {

            await salvarVeiculo(
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
            "Não foi possível salvar o veículo."
        );

    } finally {

        esconderLoading();

    }

}


// ============================================================================
// EXCLUIR VEÍCULO
// ============================================================================

export async function remover(
    id
) {

    if (
        !confirm(
            "Excluir este veículo?"
        )
    ) {

        return;

    }


    try {

        mostrarLoading();


        await excluirVeiculo(
            id
        );


        await carregarTabela();


    } catch (error) {

        tratarErro(error);

    } finally {

        esconderLoading();

    }

}
