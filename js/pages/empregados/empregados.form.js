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

import {
    tratarErro
} from "../../utils/erros.js";

import {
    obterDadosFormulario,
    preencherFormulario,
    limparFormulario
} from "./empregados.fields.js";

import {
    carregarTabela
} from "./empregados.helpers.js";

import {
    registroEditando,
    definirRegistroEditando,
    limparRegistroEditando
} from "./empregados.state.js";

// ============================================================================
// EDITAR
// ============================================================================

export async function editarEmpregado(id) {

    try {

        mostrarLoading();

        const registro =
            await obterEmpregado(id);

        if (!registro) {

            throw new Error(
                "Empregado não encontrado."
            );

        }

        preencherFormulario(registro);

        definirRegistroEditando(
            registro.ID
        );

        atualizarModoFormulario(true);

    } catch (erro) {

        tratarErro(erro);

    } finally {

        esconderLoading();

    }

}

// ============================================================================
// SALVAR
// ============================================================================

export async function salvar(evento) {

    evento.preventDefault();

    try {

        mostrarLoading();

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

        limparRegistroEditando();

        limparFormulario();

        atualizarModoFormulario(false);

        await carregarTabela();

    } catch (erro) {

        tratarErro(erro);

    } finally {

        esconderLoading();

    }

}

// ============================================================================
// EXCLUIR
// ============================================================================

export async function removerEmpregado(id) {

    const confirmar =
        confirm(
            "Excluir empregado?"
        );

    if (!confirmar) {
        return;
    }

    try {

        mostrarLoading();

        await excluirEmpregado(id);

        limparRegistroEditando();

        limparFormulario();

        atualizarModoFormulario(false);

        await carregarTabela();

    } catch (erro) {

        tratarErro(erro);

    } finally {

        esconderLoading();

    }

}

// ============================================================================
// NOVO
// ============================================================================

export function novo() {

    limparRegistroEditando();

    limparFormulario();

    atualizarModoFormulario(false);

}

// ============================================================================
// MODO DO FORMULÁRIO
// ============================================================================

function atualizarModoFormulario(editando) {

    const titulo =
        document.querySelector(
            "#tituloFormulario"
        );

    if (titulo) {

        titulo.textContent =
            editando
                ? "Editar empregado"
                : "Novo empregado";

    }

    const formulario =
        document.querySelector(
            "#formEmpregado"
        );

    if (formulario) {

        formulario.classList.toggle(
            "modo-edicao",
            editando
        );

    }

}
