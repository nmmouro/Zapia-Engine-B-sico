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
    // VALIDAÇÃO
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

        novoLancamento();

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
                "ENGINE → ERRO AO ATUALIZAR:",
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
    // Usamos ONsubmit em vez de addEventListener.
    //
    // Isso impede que o mesmo formulário receba vários handlers caso
    // o Router/Engine inicialize a página novamente.
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
                "ENGINE → ERRO NO SUBMIT:",
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
                    "ENGINE → EDITAR:",
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
                    "ENGINE → EXCLUIR:",
                    id
                );

                await remover(
                    id
                );

                return;
            }

        } catch (erro) {

            console.error(
                "ENGINE → ERRO AÇÃO:",
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
