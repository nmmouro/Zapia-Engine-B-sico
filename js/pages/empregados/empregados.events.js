// ============================================================================
// EMPREGADOS EVENTS
// Arquivo: js/pages/empregados/empregados.events.js
// ============================================================================

import {
    novoEmpregado,
    editarEmpregado,
    salvar,
    remover
} from "./empregados.form.js";

import { carregarTabela } from "./empregados.helpers.js";

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
        document.getElementById("formEmpregado");

    const tabela =
        document.getElementById("tabelaEmpregados");


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
            "Elemento #formEmpregado não encontrado."
        );
    }

    if (!tabela) {
        throw new Error(
            "Elemento #tabelaEmpregados não encontrado."
        );
    }


    // ========================================================================
    // NOVO
    // ========================================================================

    btnNovo.addEventListener(
        "click",
        novoEmpregado
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

                    await editarEmpregado(id);

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
