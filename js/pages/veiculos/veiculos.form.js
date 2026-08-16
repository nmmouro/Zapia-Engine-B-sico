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

        limparErro();


        if (!id) {

            throw new Error(
                "ID do veículo não informado."
            );

        }


        console.log(
            "ENGINE → EDITAR VEÍCULO:",
            id
        );


        const resposta =
            await obterVeiculo(id);


        const dados =
            resposta?.dados ??
            resposta?.data ??
            resposta;


        console.log(
            "ENGINE → VEÍCULO PARA EDIÇÃO:",
            dados
        );


        if (
            !dados ||
            Array.isArray(dados)
        ) {

            throw new Error(
                "Veículo não encontrado."
            );

        }


        definirRegistroEditando(
            dados.ID || id
        );


        preencherFormulario(
            dados
        );


        const titulo =
            document.getElementById(
                "tituloModal"
            );


        if (titulo) {

            titulo.textContent =
                "Editar veículo";

        }


        abrirModal();


    } catch (erro) {

        console.error(
            "ENGINE → Erro ao editar veículo:",
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
// SALVAR VEÍCULO
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
                registroEditando,
                dados
            }
        );

        if (registroEditando) {

            console.log(
                "ENGINE → ATUALIZAR VEÍCULO:",
                registroEditando
            );

            await atualizarVeiculo(
                registroEditando,
                dados
            );

        } else {

            console.log(
                "ENGINE → NOVO VEÍCULO"
            );

            await salvarVeiculo(
                dados
            );

        }

        definirRegistroEditando(null);

        fecharModal();

        await carregarTabela();

    } catch (erro) {

        console.error(
            "ENGINE → Erro ao salvar veículo:",
            erro
        );

        mostrarErro(
            erro?.message ||
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
