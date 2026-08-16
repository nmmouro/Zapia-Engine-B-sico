// ============================================================================
// ENGINE FRAMEWORK
// LANÇAMENTOS FIELDS
// Arquivo: js/pages/lancamentos/lancamentos.fields.js
// ============================================================================

import { preencher, valor } from "../../utils/formulario.js";

// ============================================================================
// OBTER DADOS DO FORMULÁRIO
// ============================================================================

export function obterDadosFormulario() {

    const empregadoSelect = document.getElementById("empregado");
    const veiculoSelect = document.getElementById("veiculo");

    let empregadoOption = null;
    let veiculoOption = null;

    if (empregadoSelect) {
        empregadoOption = empregadoSelect.options[
            empregadoSelect.selectedIndex
        ];
    }

    if (veiculoSelect) {
        veiculoOption = veiculoSelect.options[
            veiculoSelect.selectedIndex
        ];
    }

    const dados = {
        ID: valor("id"),
        Data: valor("data"),
        Hora: valor("hora"),

        "ID Empregado":
            empregadoOption
                ? empregadoOption.dataset.id || ""
                : "",

        "Empregado / Matrícula":
            empregadoOption
                ? empregadoOption.textContent.trim()
                : "",

        "ID Veículo":
            veiculoOption
                ? veiculoOption.dataset.id || ""
                : "",

        "Veículo":
            veiculoOption
                ? veiculoOption.textContent.trim()
                : "",

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

    // ========================================================================
    // VALIDAÇÕES
    // ========================================================================

    if (!dados["Empregado / Matrícula"]) {
        throw new Error("Informe o empregado.");
    }

    if (!dados["Veículo"]) {
        throw new Error("Informe o veículo.");
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

// ============================================================================
// PREENCHER FORMULÁRIO
// ============================================================================

export function preencherFormulario(registro = {}) {

    console.log(
        "ENGINE → PREENCHER LANÇAMENTO:",
        registro
    );

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

    // ------------------------------------------------------------------------
    // EMPREGADO
    // ------------------------------------------------------------------------

    const empregadoSelect =
        document.getElementById("empregado");

    if (empregadoSelect) {

        const idEmpregado =
            registro["ID Empregado"] || "";

        const textoEmpregado =
            registro["Empregado / Matrícula"] ||
            registro.Empregado ||
            "";

        let encontrado = false;

        for (
            let i = 0;
            i < empregadoSelect.options.length;
            i++
        ) {

            const option =
                empregadoSelect.options[i];

            if (
                idEmpregado &&
                option.dataset.id === idEmpregado
            ) {

                empregadoSelect.selectedIndex = i;
                encontrado = true;
                break;
            }
        }

        if (!encontrado && textoEmpregado) {

            for (
                let i = 0;
                i < empregadoSelect.options.length;
                i++
            ) {

                const option =
                    empregadoSelect.options[i];

                if (
                    option.textContent.trim() ===
                    textoEmpregado.trim()
                ) {

                    empregadoSelect.selectedIndex = i;
                    break;
                }
            }
        }
    }

    // ------------------------------------------------------------------------
    // VEÍCULO
    // ------------------------------------------------------------------------

    const veiculoSelect =
        document.getElementById("veiculo");

    if (veiculoSelect) {

        const idVeiculo =
            registro["ID Veículo"] || "";

        const textoVeiculo =
            registro["Veículo"] ||
            registro.Veiculo ||
            "";

        let encontrado = false;

        for (
            let i = 0;
            i < veiculoSelect.options.length;
            i++
        ) {

            const option =
                veiculoSelect.options[i];

            if (
                idVeiculo &&
                option.dataset.id === idVeiculo
            ) {

                veiculoSelect.selectedIndex = i;
                encontrado = true;
                break;
            }
        }

        if (!encontrado && textoVeiculo) {

            for (
                let i = 0;
                i < veiculoSelect.options.length;
                i++
            ) {

                const option =
                    veiculoSelect.options[i];

                if (
                    option.textContent.trim() ===
                    textoVeiculo.trim()
                ) {

                    veiculoSelect.selectedIndex = i;
                    break;
                }
            }
        }
    }

    // ------------------------------------------------------------------------
    // PASSAGEIRO
    // ------------------------------------------------------------------------

    preencher(
        "passageiro",
        registro["Passageiro / Setor / Motivo"] ||
        registro.Passageiro ||
        ""
    );

    // ------------------------------------------------------------------------
    // ITINERÁRIO
    // ------------------------------------------------------------------------

    preencher(
        "itinerario",
        registro["Itinerário"] ||
        registro.Itinerario ||
        ""
    );

    // ------------------------------------------------------------------------
    // STATUS
    // ------------------------------------------------------------------------

    preencher(
        "status",
        registro.Status || "ATIVO"
    );
}

// ============================================================================
// LIMPAR FORMULÁRIO
// ============================================================================

export function limparFormulario() {

    console.log(
        "ENGINE → NOVO LANÇAMENTO → limparFormulario"
    );

    const formulario =
        document.getElementById("formLancamento");

    if (!formulario) {

        console.error(
            "ENGINE → #formLancamento não encontrado."
        );

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

// ============================================================================
// MOSTRAR ERRO
// ============================================================================

export function mostrarErro(mensagem) {

    const box =
        document.getElementById("formErro");

    if (!box) {

        console.error(
            "ENGINE → #formErro não encontrado."
        );

        return;
    }

    box.textContent =
        mensagem;

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

        const dia = partes[0];
        const mes = partes[1];
        const ano = partes[2];

        return ano + "-" + mes + "-" + dia;
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

    const encontrada =
        text.match(/\d{2}:\d{2}/);

    if (encontrada) {
        return encontrada[0];
    }

    return "";
}
