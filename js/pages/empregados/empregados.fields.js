// ============================================================================
// EMPREGADOS FIELDS
// Arquivo: js/pages/empregados/empregados.fields.js
// ============================================================================

import {
    dataInput
} from "../../utils/datas.js";

// ============================================================================
// ELEMENTOS
// ============================================================================

export function obterElementos() {

    return {
        formulario: document.querySelector("#formEmpregado"),

        campoData: document.querySelector("#data"),
        campoFoto: document.querySelector("#foto"),
        campoEmpregado: document.querySelector("#empregado"),
        campoMatricula: document.querySelector("#matricula"),
        campoDiretoria: document.querySelector("#diretoria"),
        campoSetor: document.querySelector("#setor"),
        campoUsuario: document.querySelector("#usuario"),
        campoCondicao: document.querySelector("#condicao"),
        campoStatus: document.querySelector("#status")
    };

}

// ============================================================================
// OBTER DADOS
// ============================================================================

export function obterDadosFormulario() {

    const elementos = obterElementos();

    return {

        Data:
            elementos.campoData?.value || "",

        Foto:
            elementos.campoFoto?.value || "",

        Empregado:
            elementos.campoEmpregado?.value || "",

        Matrícula:
            elementos.campoMatricula?.value || "",

        Diretoria:
            elementos.campoDiretoria?.value || "",

        Setor:
            elementos.campoSetor?.value || "",

        Usuário:
            elementos.campoUsuario?.value || "",

        Condição:
            elementos.campoCondicao?.value || "",

        Status:
            elementos.campoStatus?.value || ""

    };

}

// ============================================================================
// PREENCHER FORMULÁRIO
// ============================================================================

export function preencherFormulario(registro) {

    if (!registro) {
        return;
    }

    const elementos = obterElementos();

    if (elementos.campoData) {
        elementos.campoData.value =
            registro.Data || "";
    }

    if (elementos.campoFoto) {
        elementos.campoFoto.value =
            registro.Foto || "";
    }

    if (elementos.campoEmpregado) {
        elementos.campoEmpregado.value =
            registro.Empregado || "";
    }

    if (elementos.campoMatricula) {
        elementos.campoMatricula.value =
            registro["Matrícula"] || "";
    }

    if (elementos.campoDiretoria) {
        elementos.campoDiretoria.value =
            registro.Diretoria || "";
    }

    if (elementos.campoSetor) {
        elementos.campoSetor.value =
            registro.Setor || "";
    }

    if (elementos.campoUsuario) {
        elementos.campoUsuario.value =
            registro.Usuário || "";
    }

    if (elementos.campoCondicao) {
        elementos.campoCondicao.value =
            registro["Condição"] || "";
    }

    if (elementos.campoStatus) {
        elementos.campoStatus.value =
            registro.Status || "";
    }

}

// ============================================================================
// LIMPAR FORMULÁRIO
// ============================================================================

export function limparFormulario() {

    const elementos = obterElementos();

    if (!elementos.formulario) {
        return;
    }

    elementos.formulario.reset();

    if (elementos.campoData) {
        elementos.campoData.value =
            dataInput();
    }

}
