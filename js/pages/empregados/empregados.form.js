// ============================================================================
// EMPREGADOS FORM
// Arquivo: js/pages/empregados/empregados.form.js
// ============================================================================

import {
    obterEmpregado,
    salvarEmpregado,
    atualizarEmpregado,
    excluirEmpregado
} from "../../services/empregados.service.js";

import {
    mostrarLoading,
    esconderLoading
} from "../../ui/loading.js";

import { abrirModal, fecharModal } from "../../ui/modal.js";

import {
    obterDadosFormulario,
    preencherFormulario,
    limparFormulario
} from "./empregados.fields.js";

import { carregarTabela } from "./empregados.helpers.js";

import { definirRegistroEditando, registroEditando } from "./empregados.state.js";

import {
    tratarErro
} from "../../utils/erros.js";

// ============================================================================
// EDITAR
// ============================================================================

export function novoEmpregado() {
  definirRegistroEditando(null);
  limparFormulario();
  document.getElementById("tituloModal").textContent = "Novo empregado";
  abrirModal();
}


export async function editarEmpregado(id) {

    try {

        mostrarLoading();

        const registro = await obterEmpregado(id);
        const dados = registro?.dados ?? registro;

        if (!dados || Array.isArray(dados)) {

            throw new Error(
                "Empregado não encontrado."
            );
        }
        definirRegistroEditando(dados.ID ?? id);
    preencherFormulario(dados);
    limparErro();
    document.getElementById("tituloModal").textContent = "Editar empregado";
    abrirModal();
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

            await atualizarEmpregado(
                registroEditando,
                dados
            );

        } else {

            await salvarEmpregado(
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

    if (!confirm("Excluir este empregado?")) return;

    try {

        mostrarLoading();

        await excluirEmpregado(id);

        await carregarTabela();

    } catch (erro) {

        tratarErro(erro);

    } finally {

        esconderLoading();

    }

}
