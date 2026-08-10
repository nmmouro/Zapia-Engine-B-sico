// ============================================================================
// LANCAMENTOS FORM
// Arquivo: js/pages/lancamentos/lancamentos.form.js
// ============================================================================

import {
    obterLancamento,
    salvarLancamento,
    atualizarLancamento,
    excluirLancamento
} from "../../services/lancamentos.service.js";

import {
    mostrarLoading,
    esconderLoading
} from "../../ui/loading.js";

import { abrirModal, fecharModal } from "../../ui/modal.js";

import {
    obterDadosFormulario,
    preencherFormulario,
    limparFormulario,
    mostrarErro,
    limparErro
    
} from "./lancamentos.fields.js";

import { carregarTabela } from "./lancamentos.helpers.js";

import { definirRegistroEditando, registroEditando } from "./lancamentos.state.js";

import {
    tratarErro
} from "../../utils/erros.js";

// ============================================================================
// NOVO LANÇAMENTO
// ============================================================================

export function novoLancamento() {
    definirRegistroEditando(null);
    limparFormulario(); const titulo =
        document.getElementById("tituloModal");
    
    if (titulo) {
        titulo.textContent =
            "Novo lançamento";
    }
    abrirModal();
}


/*
export function novoLancamento() {
  definirRegistroEditando(null);
  limparFormulario();
    
  document.getElementById("tituloModal").textContent = "Novo lancamento";
  abrirModal({
        focus: "lancamento"
    });
}
*/

// ============================================================================
// EDITAR LANÇAMENTO
// ============================================================================

export async function editarLancamento(id) {

    try {

        mostrarLoading();

        const registro = await obterLancamento(id);
        const dados = registro?.dados ?? registro;

        if (!dados || Array.isArray(dados)) {

            throw new Error(
                "Lancamento não encontrado."
            );
        }
        definirRegistroEditando(dados.ID ?? id);
    preencherFormulario(dados);
    limparErro();
    document.getElementById("tituloModal").textContent = "Editar lancamento";
    abrirModal({ focus: "lancamento" });
  } catch (error) {
    tratarErro(error);
  } finally {
    esconderLoading();
  }
}

// ============================================================================
// SALVAR
// ============================================================================

export async function salvar() {

    try {

        mostrarLoading();
        limparErro();


        const dados =
            obterDadosFormulario();

        if (registroEditando) {

            await atualizarLancamento(
                registroEditando,
                dados
            );

        } else {

            await salvarLancamento(
                dados
            );

        }

       definirRegistroEditando(null);
    fecharModal();
    await carregarTabela();
  } catch (error) {
    mostrarErro(error?.message || "Não foi possível salvar.");
  } finally {
    esconderLoading();
  }
}


// ============================================================================
// EXCLUIR
// ============================================================================

export async function remover(id) {

    if (!confirm("Excluir este lançamento?")) return;

    try {

        mostrarLoading();

        await excluirLancamento(id);

        await carregarTabela();

    } catch (erro) {

        tratarErro(erro);

    } finally {

        esconderLoading();

    }

}
