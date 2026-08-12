// ============================================================================
// LANÇAMENTOS EVENTS
// Arquivo: js/pages/lancamentos/lancamentos.events.js
// ============================================================================

import {
    novoLancamento,
    editarLancamento,
    salvar,
    remover
} from "./lancamentos.form.js";

import { carregarTabela } from "./lancamentos.helpers.js";

import { tratarErro } from "../../utils/erros.js";

// ============================================================================
// REGISTRAR EVENTOS
// ============================================================================

export function registrarEventos() {

    const btnNovo =
        document.getElementById("btnNovo");

    const btnAtualizar =
        document.getElementById("btnAtualizar");

    const formulario =
        document.getElementById("formLancamento");

    const tabela =
        document.getElementById("tabelaLancamentos");


    // ========================================================================
    // VALIDAÇÃO DOS ELEMENTOS
    // ========================================================================

    if (!btnNovo) {
        throw new Error(
            "Elemento #btnNovo não encontrado."
        );
    }

    if (!btnAtualizar) {
        throw new Error(
            "Elemento #btnAtualizar não encontrado."
        );
    }

    if (!formulario) {
        throw new Error(
            "Elemento #formLancamento não encontrado."
        );
    }

    if (!tabela) {
        throw new Error(
            "Elemento #tabelaLancamentos não encontrado."
        );
    }


    // ========================================================================
    // NOVO
    // ========================================================================

    btnNovo.addEventListener(
        "click",
        novoLancamento
    );


    // ========================================================================
    // ATUALIZAR
    // ========================================================================

    btnAtualizar.addEventListener(
        "click",
        async () => {

            try {

                await carregarTabela();

            } catch (erro) {

                tratarErro(erro);

            }

        }
    );


    // ========================================================================
    // FORMULÁRIO
    // ========================================================================

    formulario.addEventListener(
        "submit",
        async evento => {

            evento.preventDefault();

            try {

                await salvar();

            } catch (erro) {

                tratarErro(erro);

            }

        }
    );


    // ========================================================================
    // AÇÕES DA TABELA
    // ========================================================================

    tabela.addEventListener(
        "click",
        async evento => {

            const botao =
                evento.target.closest(
                    "[data-action]"
                );


            if (!botao) {
                return;
            }


            const id =
                botao.dataset.id;

            const acao =
                botao.dataset.action;


            try {

                if (acao === "edit") {

                    await editarLancamento(id);

                }


                if (acao === "remove") {

                    await remover(id);

                }

            } catch (erro) {

                tratarErro(erro);

            }

        }
    );

}
