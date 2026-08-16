// ============================================================================
// ENGINE FRAMEWORK
// VEÍCULOS EVENTS
// Arquivo: js/pages/veiculos/veiculos.events.js
// ============================================================================

import {
    novoVeiculo,
    editarVeiculo,
    salvar,
    remover
} from "./veiculos.form.js";

import {
    carregarTabela
} from "./veiculos.helpers.js";

import {
    tratarErro
} from "../../utils/erros.js";


// ============================================================================
// REGISTRAR EVENTOS
// ============================================================================

export function registrarEventos() {

    console.log(
        "ENGINE → REGISTRANDO EVENTOS VEÍCULOS"
    );


    // =========================================================================
    // ELEMENTOS
    // =========================================================================

    const btnNovo =
        document.getElementById(
            "btnNovo"
        );

    const btnAtualizar =
        document.getElementById(
            "btnAtualizar"
        );

    const formulario =
        document.getElementById(
            "formVeiculo"
        );

    const tabela =
        document.getElementById(
            "tabelaVeiculos"
        );


    // =========================================================================
    // VALIDAÇÃO DOS ELEMENTOS
    // =========================================================================

    if (!btnNovo) {

        console.error(
            "ENGINE → #btnNovo não encontrado."
        );

        return;
    }


    if (!btnAtualizar) {

        console.error(
            "ENGINE → #btnAtualizar não encontrado."
        );

        return;
    }


    if (!formulario) {

        console.error(
            "ENGINE → #formVeiculo não encontrado."
        );

        return;
    }


    if (!tabela) {

        console.error(
            "ENGINE → #tabelaVeiculos não encontrado."
        );

        return;
    }


    // =========================================================================
    // NOVO VEÍCULO
    // =========================================================================

    btnNovo.onclick = () => {

        console.log(
            "ENGINE → NOVO VEÍCULO"
        );

        novoVeiculo();

    };


    // =========================================================================
    // ATUALIZAR TABELA
    // =========================================================================

    btnAtualizar.onclick = async () => {

        try {

            console.log(
                "ENGINE → ATUALIZAR VEÍCULOS"
            );

            await carregarTabela();

        } catch (erro) {

            console.error(
                "ENGINE → ERRO AO ATUALIZAR VEÍCULOS:",
                erro
            );

            tratarErro(
                erro
            );

        }

    };


    // =========================================================================
    // SUBMIT DO FORMULÁRIO
    // =========================================================================
    //
    // Usamos "onsubmit" para evitar que o Router/Engine registre múltiplos
    // listeners caso a página seja inicializada novamente.
    // =========================================================================

    formulario.onsubmit = async evento => {

        evento.preventDefault();
        evento.stopPropagation();

        console.log(
            "ENGINE → SUBMIT VEÍCULO"
        );

        try {

            await salvar(
                evento
            );

        } catch (erro) {

            console.error(
                "ENGINE → ERRO AO SALVAR VEÍCULO:",
                erro
            );

            tratarErro(
                erro
            );

        }

    };


    // =========================================================================
    // AÇÕES DA TABELA
    // =========================================================================

    tabela.onclick = async evento => {

        const botao =
            evento.target.closest(
                "[data-action]"
            );


        if (!botao) {
            return;
        }


        const acao =
            botao.dataset.action;

        const id =
            botao.dataset.id;


        // ---------------------------------------------------------------------
        // VALIDAR ID
        // ---------------------------------------------------------------------

        if (!id) {

            console.error(
                "ENGINE → ID DO VEÍCULO NÃO INFORMADO."
            );

            return;
        }


        try {

            // -----------------------------------------------------------------
            // EDITAR
            // -----------------------------------------------------------------

            if (
                acao === "edit"
            ) {

                console.log(
                    "ENGINE → EDITAR VEÍCULO:",
                    id
                );

                await editarVeiculo(
                    id
                );

                return;
            }


            // -----------------------------------------------------------------
            // EXCLUIR
            // -----------------------------------------------------------------

            if (
                acao === "remove"
            ) {

                console.log(
                    "ENGINE → EXCLUIR VEÍCULO:",
                    id
                );

                await remover(
                    id
                );

                return;
            }

        } catch (erro) {

            console.error(
                "ENGINE → ERRO AÇÃO VEÍCULO:",
                erro
            );

            tratarErro(
                erro
            );

        }

    };


    // =========================================================================
    // FINAL
    // =========================================================================

    console.log(
        "ENGINE → EVENTOS VEÍCULOS REGISTRADOS"
    );

}
