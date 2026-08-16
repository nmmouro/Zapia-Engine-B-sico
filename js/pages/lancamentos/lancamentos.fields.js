// ============================================================================
// LANÇAMENTOS FIELDS - TESTE
// ============================================================================

import {
    preencher,
    valor
} from "../../utils/formulario.js";

export function obterDadosFormulario() {

    const dados = {
        ID: valor("id"),
        Data: valor("data"),
        Hora: valor("hora"),

        "Empregado / Matrícula":
            valor("empregado"),

        "Veículo":
            valor("veiculo"),

        "Passageiro / Setor / Motivo":
            valor("passageiro"),

        "Itinerário":
            valor("itinerario"),

        Status:
            valor("status") || "ATIVO"
    };

    console.log(
        "ENGINE → DADOS LANÇAMENTO:",
        dados
    );

    if (!dados["Empregado / Matrícula"]) {
        throw new Error("Informe o empregado.");
    }

    if (!dados["Veículo"]) {
        throw new Error("Informe o veículo.");
    }

    if (!dados["Itinerário"]) {
        throw new Error("Informe o itinerário.");
    }

    return dados;
}

export function preencherFormulario(registro = {}) {

    preencher(
        "id",
        registro.ID || ""
    );

    preencher(
        "data",
        normalizarData(registro.Data)
    );

    preencher(
        "hora",
        normalizarHora(registro.Hora)
    );

    preencher(
        "passageiro",
        registro["Passageiro / Setor / Motivo"] || ""
    );

    preencher(
        "itinerario",
        registro["Itinerário"] || ""
    );

    preencher(
        "status",
        registro.Status || "ATIVO"
    );

    selecionarEmpregado(
        registro["ID Empregado"],
        registro["Empregado / Matrícula"]
    );

    selecionarVeiculo(
        registro["ID Veículo"],
        registro["Veículo"]
    );
}

export function limparFormulario() {

    const formulario =
        document.getElementById("formLancamento");

    if (!formulario) {
        return;
    }

    formulario.reset();

    preencher(
        "id",
        ""
    );

    preencher(
        "status",
        "ATIVO"
    );

    limparErro();
}

export function mostrarErro(mensagem) {

    const box =
        document.getElementById("formErro");

    if (!box) {
        return;
    }

    box.textContent = mensagem;

    box.classList.remove("hidden");
}

export function limparErro() {

    const box =
        document.getElementById("formErro");

    if (box) {
        box.classList.add("hidden");
    }
}

function selecionarEmpregado(id, texto) {

    const select =
        document.getElementById("empregado");

    if (!select) {
        return;
    }

    for (
        let i = 0;
        i < select.options.length;
        i++
    ) {

        const option =
            select.options[i];

        if (
            id &&
            option.dataset.id === String(id)
        ) {

            select.selectedIndex = i;
            return;
        }

        if (
            texto &&
            option.textContent.trim() ===
            String(texto).trim()
        ) {

            select.selectedIndex = i;
            return;
        }
    }
}

function selecionarVeiculo(id, texto) {

    const select =
        document.getElementById("veiculo");

    if (!select) {
        return;
    }

    for (
        let i = 0;
        i < select.options.length;
        i++
    ) {

        const option =
            select.options[i];

        if (
            id &&
            option.dataset.id === String(id)
        ) {

            select.selectedIndex = i;
            return;
        }

        if (
            texto &&
            option.textContent.trim() ===
            String(texto).trim()
        ) {

            select.selectedIndex = i;
            return;
        }
    }
}

function normalizarData(value) {

    if (!value) {
        return "";
    }

    const text =
        String(value).trim();

    if (
        /^\d{2}\/\d{2}\/\d{4}$/.test(text)
    ) {

        const partes =
            text.split("/");

        return (
            partes[2] +
            "-" +
            partes[1] +
            "-" +
            partes[0]
        );
    }

    if (
        /^\d{4}-\d{2}-\d{2}/.test(text)
    ) {

        return text.substring(0, 10);
    }

    return "";
}

function normalizarHora(value) {

    if (!value) {
        return "";
    }

    const text =
        String(value).trim();

    if (
        /^\d{2}:\d{2}:\d{2}$/.test(text)
    ) {

        return text.substring(0, 5);
    }

    if (
        /^\d{2}:\d{2}$/.test(text)
    ) {

        return text;
    }

    const posicao =
        text.indexOf(":");

    if (posicao >= 2) {

        return text.substring(
            posicao - 2,
            posicao + 3
        );
    }

    return "";
}
