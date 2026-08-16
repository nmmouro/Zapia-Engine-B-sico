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
    fecharModal
} from "../../ui/modal.js";

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
        document.getElementById("btnNovo");

    const btnAtualizar =
        document.getElementById("btnAtualizar");

    const btnCancelar =
        document.getElementById("btnCancelar");

    const btnFecharModal =
        document.getElementById("btnFecharModal");

    const formulario =
        document.getElementById("formLancamento");

    const tabela =
        document.getElementById("tabelaLancamentos");


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
    // NOVO
    // =========================================================================

    btnNovo.onclick = () => {

        console.log(
            "ENGINE → NOVO LANÇAMENTO"
        );

        try {

            novoLancamento();

        } catch (erro) {

            console.error(
                "ENGINE → ERRO NOVO LANÇAMENTO:",
                erro
            );

            tratarErro(erro);
        }
    };


    // =========================================================================
    // ATUALIZAR
    // =========================================================================

    btnAtualizar.onclick = async () => {

        try {

            console.log(
                "ENGINE → ATUALIZANDO LANÇAMENTOS"
            );

            await carregarTabela();

        } catch (erro) {

            console.error(
                "ENGINE → ERRO ATUALIZAR:",
                erro
            );

            tratarErro(erro);
        }
    };


    // =========================================================================
    // CANCELAR
    // =========================================================================

    if (btnCancelar) {

        btnCancelar.onclick = () => {

            console.log(
                "ENGINE → CANCELAR LANÇAMENTO"
            );

            fecharModal();
        };
    }


    // =========================================================================
    // FECHAR MODAL
    // =========================================================================

    if (btnFecharModal) {

        btnFecharModal.onclick = () => {

            console.log(
                "ENGINE → FECHAR MODAL"
            );

            fecharModal();
        };
    }


    // =========================================================================
    // SUBMIT
    // =========================================================================
    //
    // IMPORTANTE:
    // Usamos "onsubmit", nunca addEventListener aqui.
    //
    // Isso impede o Router de acumular vários eventos.
    // =========================================================================

    formulario.onsubmit = async evento => {

        evento.preventDefault();
        evento.stopPropagation();

        console.log(
            "ENGINE → SUBMIT LANÇAMENTO"
        );

        try {

            await salvar(evento);

        } catch (erro) {

            console.error(
                "ENGINE → ERRO SUBMIT LANÇAMENTO:",
                erro
            );

            tratarErro(erro);
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

            if (acao === "edit") {

                console.log(
                    "ENGINE → EDITAR LANÇAMENTO:",
                    id
                );

                await editarLancamento(id);

                return;
            }


            if (acao === "remove") {

                console.log(
                    "ENGINE → EXCLUIR LANÇAMENTO:",
                    id
                );

                await remover(id);

                return;
            }

        } catch (erro) {

            console.error(
                "ENGINE → ERRO AÇÃO:",
                erro
            );

            tratarErro(erro);
        }
    };


    // =========================================================================
    // FINAL
    // =========================================================================

    console.log(
        "ENGINE → EVENTOS LANÇAMENTOS REGISTRADOS"
    );
}
