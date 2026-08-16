// ============================================================================
// ENGINE FRAMEWORK
// LANÇAMENTOS FIELDS
// Arquivo: js/pages/lancamentos/lancamentos.fields.js
// ============================================================================

import {
    preencher,
    valor
} from "../../utils/formulario.js";

// ============================================================================
// OBTER DADOS DO FORMULÁRIO
// ============================================================================

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

        throw new Error(
            "Informe o empregado."
        );

    }

    if (!dados["Veículo"]) {

        throw new Error(
            "Informe o veículo."
        );

    }

    if (!dados["Passageiro / Setor / Motivo"]) {

        throw new Error(
            "Informe o passageiro, setor ou motivo."
        );

    }

    if (!dados["Itinerário"]) {

        throw new Error(
            "Informe o itinerário."
        );

    }

    if (!dados.Status) {

        throw new Error(
            "Informe o status."
        );

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

// ============================================================================
// LIMPAR ERRO
// ============================================================================

export function limparErro() {

    const box =
        document.getElementById("formErro");

    if (box) {
        box.classList.add("hidden");
    }
}

// ============================================================================
// Selecionar Empregado
// ============================================================================

function selecionarEmpregado(id, texto) {

    const select =
        document.getElementById("empregado");

    const select = document.getElementById("empregado");

select.innerHTML = `
    <option value="">Selecione o empregado...</option>
`;

lista.forEach(empregado => {

    const option = document.createElement("option");

    // ID que será enviado para a planilha
    option.value = empregado.ID || "";

    // Texto que o usuário verá
    option.textContent =
        `${empregado.Empregado || ""} / ${empregado.Matrícula || ""}`;

    select.appendChild(option);
});
    
// ============================================================================
// Selecionar Veículo
// ============================================================================

function selecionarVeiculo(id, texto) {

    const select = document.getElementById("veiculo");

select.innerHTML = `
    <option value="">Selecione o veículo...</option>
`;

lista.forEach(veiculo => {

    const option = document.createElement("option");

    // ID que será enviado para a planilha
    option.value = veiculo.ID || "";

    // Texto que o usuário verá
    option.textContent =
        `${veiculo.Placa || ""} - ${veiculo.Modelo || ""}`;

    select.appendChild(option);
});

// ============================================================================
// NORMALIZAR DATA
// ============================================================================

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

// ============================================================================
// NORMALIZAR HORA
// ============================================================================

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
