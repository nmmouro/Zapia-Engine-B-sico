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

    const selectEmpregado =
        document.getElementById("empregado");

    const selectVeiculo =
        document.getElementById("veiculo");

    // ------------------------------------------------------------------------
    // VALORES SELECIONADOS
    // ------------------------------------------------------------------------

    const idEmpregado =
        selectEmpregado?.value || "";

    const idVeiculo =
        selectVeiculo?.value || "";

    // ------------------------------------------------------------------------
    // TEXTOS EXIBIDOS NOS SELECTS
    // ------------------------------------------------------------------------

    const textoEmpregado =
        selectEmpregado?.selectedOptions?.[0]?.textContent?.trim() || "";

    const textoVeiculo =
        selectVeiculo?.selectedOptions?.[0]?.textContent?.trim() || "";

    // ------------------------------------------------------------------------
    // DADOS DO LANÇAMENTO
    // ------------------------------------------------------------------------

    const dados = {

        ID:
            valor("id"),

        "ID Empregado":
            idEmpregado,

        "ID Veículo":
            idVeiculo,

        Data:
            valor("data"),

        Hora:
            valor("hora"),

        "Empregado / Matrícula":
            textoEmpregado,

        "Veículo":
            textoVeiculo,

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

    if (!dados["ID Empregado"]) {

        throw new Error(
            "Selecione o empregado."
        );

    }

    if (!dados["ID Veículo"]) {

        throw new Error(
            "Selecione o veículo."
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

    // ------------------------------------------------------------------------
    // SELECIONAR EMPREGADO
    // ------------------------------------------------------------------------

    selecionarEmpregado(
        registro["ID Empregado"],
        
    );

    // ------------------------------------------------------------------------
    // SELECIONAR VEÍCULO
    // ------------------------------------------------------------------------

    selecionarVeiculo(
        registro["ID Veículo"],
        
    );
}

// ============================================================================
// LIMPAR FORMULÁRIO
// ============================================================================

export function limparFormulario() {

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

    selecionarEmpregado("");
    selecionarVeiculo("");

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

    const box =
        document.getElementById(
            "formErro"
        );

    if (box) {

        box.classList.add(
            "hidden"
        );

    }
}

// ============================================================================
// SELECIONAR EMPREGADO
// ============================================================================

export function carregarEmpregados(lista = []) {

    console.log(
        "ENGINE → LISTA EMPREGADOS:",
        JSON.stringify(lista, null, 2)
    );

    const select =
        document.getElementById("empregado");

    if (!select) return;

    select.innerHTML = `
        <option value="">
            Selecione o empregado...
        </option>
    `;

    lista.forEach(empregado => {

        console.log(
            "EMPREGADO → ID:",
            empregado.ID,
            "| Nome:",
            empregado.Empregado,
            "| Matrícula:",
            empregado.Matrícula
        );

        const option =
            document.createElement("option");

        option.value =
            empregado.ID || "";

        option.textContent =
            `${empregado.Empregado || ""} / ${
                empregado.Matrícula || ""
            }`;

        select.appendChild(option);
    });
}

// ============================================================================
// SELECIONAR EMPREGADO
// ============================================================================

export function selecionarEmpregado(id) {

    const select =
        document.getElementById("empregado");

    if (select) {
        select.value = id || "";
    }
}

// ============================================================================
// SELECIONAR VEÍCULO
// ============================================================================

export function carregarVeiculos(lista = []) {

    console.log(
        "ENGINE → LISTA VEÍCULOS:",
        JSON.stringify(lista, null, 2)
    );

    const select =
        document.getElementById("veiculo");

    if (!select) return;

    select.innerHTML = `
        <option value="">
            Selecione o veículo...
        </option>
    `;

    lista.forEach(veiculo => {

        console.log(
            "VEÍCULO → ID:",
            veiculo.ID,
            "| Placa:",
            veiculo.Placa,
            "| Modelo:",
            veiculo.Modelo
        );

        const option =
            document.createElement("option");

        option.value =
            veiculo.ID || "";

        option.textContent =
            `${veiculo.Placa || ""} - ${
                veiculo.Modelo || ""
            }`;

        select.appendChild(option);
    });
}

// ============================================================================
// SELECIONAR VEÍCULO
// ============================================================================

export function selecionarVeiculo(id) {

    const select =
        document.getElementById("veiculo");

    if (select) {
        select.value = id || "";
    }
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

    // ------------------------------------------------------------------------
    // DD/MM/AAAA
    // ------------------------------------------------------------------------

    if (
        /^\d{2}\/\d{2}\/\d{4}$/.test(
            text
        )
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

    // ------------------------------------------------------------------------
    // AAAA-MM-DD
    // AAAA-MM-DD HH...
    // ------------------------------------------------------------------------

    if (
        /^\d{4}-\d{2}-\d{2}/.test(
            text
        )
    ) {

        return text.substring(
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

    // ------------------------------------------------------------------------
    // HH:MM:SS
    // ------------------------------------------------------------------------

    if (
        /^\d{2}:\d{2}:\d{2}$/.test(
            text
        )
    ) {

        return text.substring(
            0,
            5
        );
    }

    // ------------------------------------------------------------------------
    // HH:MM
    // ------------------------------------------------------------------------

    if (
        /^\d{2}:\d{2}$/.test(
            text
        )
    ) {

        return text;
    }

    // ------------------------------------------------------------------------
    // Data + hora
    // Exemplo: 16/08/2026 16:15:00
    // ------------------------------------------------------------------------

    const match =
        text.match(
            /(\d{2}):(\d{2})(?::\d{2})?$/
        );

    if (match) {

        return (
            match[1] +
            ":" +
            match[2]
        );
    }

    return "";
}
