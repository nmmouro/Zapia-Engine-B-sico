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

    const empregadoSelect =
        document.getElementById("empregado");

    const veiculoSelect =
        document.getElementById("veiculo");

    const empregadoOption =
        empregadoSelect?.selectedOptions?.[0];

    const veiculoOption =
        veiculoSelect?.selectedOptions?.[0];

    const dados = {

        ID:
            valor("id"),

        Data:
            valor("data"),

        Hora:
            valor("hora"),

        // ID do empregado
        "ID Empregado":
            empregadoOption?.dataset?.id || "",

        // Texto exibido no select
        "Empregado / Matrícula":
            empregadoOption?.textContent?.trim() || "",

        // ID do veículo
        "ID Veículo":
            veiculoOption?.dataset?.id || "",

        // Texto exibido no select
        "Veículo":
            veiculoOption?.textContent?.trim() || "",

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

// ============================================================================
// PREENCHER FORMULÁRIO
// ============================================================================

export function preencherFormulario(
    registro = {}
) {

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
        normalizarData(
            registro.Data
        )
    );

    preencher(
        "hora",
        normalizarHora(
            registro.Hora
        )
    );

    // ------------------------------------------------------------------------
    // EMPREGADO
    // ------------------------------------------------------------------------

    const empregadoSelect =
        document.getElementById("empregado");

    if (empregadoSelect) {

        const idEmpregado =
            registro["ID Empregado"] ||
            "";

        const textoEmpregado =
            registro["Empregado / Matrícula"] ||
            registro.Empregado ||
            "";

        let encontrado = false;

        Array.from(
            empregadoSelect.options
        ).forEach(option => {

            if (
                idEmpregado &&
                option.dataset.id === idEmpregado
            ) {

                empregadoSelect.value =
                    option.value;

                encontrado = true;

            }

        });

        if (!encontrado && textoEmpregado) {

            Array.from(
                empregadoSelect.options
            ).forEach(option => {

                if (
                    option.textContent.trim() ===
                    textoEmpregado
                ) {

                    empregadoSelect.value =
                        option.value;

                }

            });

        }

    }

    // ------------------------------------------------------------------------
    // VEÍCULO
    // ------------------------------------------------------------------------

    const veiculoSelect =
        document.getElementById("veiculo");

    if (veiculoSelect) {

        const idVeiculo =
            registro["ID Veículo"] ||
            "";

        const textoVeiculo =
            registro["Veículo"] ||
            registro.Veiculo ||
            "";

        let encontrado = false;

        Array.from(
            veiculoSelect.options
        ).forEach(option => {

            if (
                idVeiculo &&
                option.dataset.id === idVeiculo
            ) {

                veiculoSelect.value =
                    option.value;

                encontrado = true;

            }

        });

        if (!encontrado && textoVeiculo) {

            Array.from(
                veiculoSelect.options
            ).forEach(option => {

                if (
                    option.textContent.trim() ===
                    textoVeiculo
                ) {

                    veiculoSelect.value =
                        option.value;

                }

            });

        }

    }

    // ------------------------------------------------------------------------
    // DEMAIS CAMPOS
    // ------------------------------------------------------------------------

    preencher(
        "passageiro",
        registro["Passageiro / Setor / Motivo"] ||
        registro.Passageiro ||
        ""
    );

    preencher(
        "itinerario",
        registro["Itinerário"] ||
        registro.Itinerario ||
        ""
    );

    preencher(
        "status",
        registro.Status ||
        "ATIVO"
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
        document.getElementById(
            "formLancamento"
        );

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

export function mostrarErro(
    mensagem
) {

    const box =
        document.getElementById(
            "formErro"
        );

    if (!box) {

        console.error(
            "ENGINE → #formErro não encontrado."
        );

        return;

    }

    box.textContent =
        mensagem;

    box.classList.remove(
        "hidden"
    );

}

// ============================================================================
// LIMPAR ERRO
// ============================================================================

export function limparErro() {

    document
        .getElementById("formErro")
        ?.classList.add(
            "hidden"
        );

}

// ============================================================================
// NORMALIZAR DATA
// ============================================================================

function normalizarData(
    value
) {

    if (!value) {
        return "";
    }

    const text =
        String(value).trim();

    // DD/MM/AAAA
    if (
        /^\d{2}\/\d{2}\/\d{4}$/.test(
            text
        )
    ) {

        const [
            dia,
            mes,
            ano
        ] = text.split("/");

        return `${ano}-${mes}-${dia}`;

    }

    // AAAA-MM-DD
    // AAAA-MM-DD HH...
    if (
        /^\d{4}-\d{2}-\d{2}/.test(
            text
        )
    ) {

        return text.slice(
            0,
            10
        );

    }

    return "";

}

// ============================================================================
// NORMALIZAR HORA
// ============================================================================

function normalizarHora(
    value
) {

    if (!value) {
        return "";
    }

    const text =
        String(value).trim();

    // HH:MM:SS
    if (
        /^\d{2}:\d{2}:\d{2}$/.test(
            text
        )
    ) {

        return text.slice(
            0,
            5
        );

    }

    // AAAA-MM-DD HH:MM:SS
    const dataHora =
        text.match(
            /\d{2}:\d{2}(?::\d{2})?/
        );

    if (dataHora) {

        return dataHora[0].slice(
            0,
            5
        );

    }

    // HH:MM
    if (
        /^\d{2}:\d{2}$/.test(
            text
        )
    ) {

        return text;

    }

    return "";

}
