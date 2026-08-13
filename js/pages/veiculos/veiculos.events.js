// ============================================================================
// VEÍCULOS EVENTS
// Arquivo: js/pages/veiculos/veiculos.events.js
// ============================================================================

import {
    novoVeiculo,
    editarVeiculo,
    salvar,
    remover
} from "./veiculos.form.js";

import { carregarTabela } from "./veiculos.helpers.js";

import { tratarErro } from "../../utils/erros.js";

// ============================================================================
// REGISTRAR EVENTOS
// ============================================================================

export function registrarEventos() {

    const btnNovo =
        document.getElementById("btnNovo");

    const btnAtualizar =
        document.getElementById("btnAtualizar");

    const form =
        document.getElementById("formVeiculo");

    const tabela =
        document.getElementById("tabelaVeiculos");

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

    if (!form) {
        throw new Error(
            "Elemento #formVeiculo não encontrado."
        );
    }

    if (!tabela) {
        throw new Error(
            "Elemento #tabelaVeiculos não encontrado."
        );
    }


    // ========================================================================
    // NOVO
    // ========================================================================

    btnNovo.addEventListener(
        "click",
        novoVeiculo
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

    form.addEventListener(
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

                    await editarVeiculo(id);

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
