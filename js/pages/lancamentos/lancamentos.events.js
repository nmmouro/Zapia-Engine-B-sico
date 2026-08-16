// ============================================================================
// ENGINE FRAMEWORK
// LANÇAMENTOS EVENTS
// Arquivo: js/pages/lancamentos/lancamentos.events.js
// ============================================================================

import {
    novoLancamento,
    editarLancamento,
    salvar,
    remover
} from "./lancamentos.form.js";

import {
    carregarTabela
} from "./lancamentos.helpers.js";

import {
    tratarErro
} from "../../utils/erros.js";


// ============================================================================
// REGISTRAR EVENTOS
// ============================================================================

export function registrarEventos() {

    console.log(
        "ENGINE → REGISTRANDO EVENTOS LANÇAMENTOS"
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
            "formLancamento"
        );

    const tabela =
        document.getElementById(
            "tabelaLancamentos"
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
            "ENGINE → #formLancamento não encontrado."
        );

        return;
    }


    if (!tabela) {

        console.error(
            "ENGINE → #tabelaLancamentos não encontrada."
        );

        return;
    }


    // =========================================================================
    // NOVO LANÇAMENTO
    // =========================================================================

    btnNovo.onclick = () => {

        console.log(
            "ENGINE → NOVO LANÇAMENTO"
        );

        try {

            novoLancamento();

        } catch (erro) {

            console.error(
                "ENGINE → ERRO AO ABRIR NOVO LANÇAMENTO:",
                erro
            );

            tratarErro(
                erro
            );

        }

    };


    // =========================================================================
    // ATUALIZAR TABELA
    // =========================================================================

    btnAtualizar.onclick = async () => {

        try {

            console.log(
                "ENGINE → ATUALIZAR LANÇAMENTOS"
            );

            await carregarTabela();

        } catch (erro) {

            console.error(
                "ENGINE → ERRO AO ATUALIZAR LANÇAMENTOS:",
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
    // IMPORTANTE:
    //
    // Usamos "onsubmit" em vez de addEventListener("submit").
    //
    // O Router/Engine pode inicializar o módulo novamente. O uso de onsubmit
    // substitui o handler anterior e evita múltiplos salvamentos ou a
    // necessidade de clicar várias vezes no botão Salvar.
    // =========================================================================

    formulario.onsubmit = async evento => {

        evento.preventDefault();
        evento.stopPropagation();

        console.log(
            "ENGINE → SUBMIT LANÇAMENTO"
        );

        try {

            await salvar(
                evento
            );

        } catch (erro) {

            console.error(
                "ENGINE → ERRO AO SALVAR LANÇAMENTO:",
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
                "ENGINE → ID DO LANÇAMENTO NÃO INFORMADO."
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
                    "ENGINE → EDITAR LANÇAMENTO:",
                    id
                );

                await editarLancamento(
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
                    "ENGINE → EXCLUIR LANÇAMENTO:",
                    id
                );

                await remover(
                    id
                );

                return;
            }

        } catch (erro) {

            console.error(
                "ENGINE → ERRO AÇÃO LANÇAMENTO:",
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
        "ENGINE → EVENTOS LANÇAMENTOS REGISTRADOS"
    );

}
