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

    const empregado =
        document.getElementById("empregado");

    const veiculo =
        document.getElementById("veiculo");

    const dados = {
        ID: valor("id"),
        Data: valor("data"),
        Hora: valor("hora"),

        Empregado:
            empregado
                ? empregado.options[empregado.selectedIndex]?.text || ""
                : "",

        "ID Empregado":
            empregado
                ? empregado.value || ""
                : "",

        Veículo:
            veiculo
                ? veiculo.options[veiculo.selectedIndex]?.text || ""
                : "",

        "ID Veículo":
            veiculo
                ? veiculo.value || ""
                : "",

        "Passageiro / Setor / Motivo":
            valor("passageiro"),

        Itinerário:
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
            "Informe o empregado."
        );

    }


    if (!dados["ID Veículo"]) {

        throw new Error(
            "Informe o veículo."
        );

    }


    if (!dados["Passageiro / Setor / Motivo"]) {

        throw new Error(
            "Informe o passageiro, setor ou motivo."
        );

    }


    if (!dados.Itinerário) {

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


    // ========================================================================
    // EMPREGADO
    // ========================================================================

    const empregado =
        document.getElementById("empregado");

    if (empregado) {

        const idEmpregado =
            registro["ID Empregado"] ||
            "";

        const nomeEmpregado =
            registro["Empregado / Matrícula"] ||
            registro.Empregado ||
            "";

        let encontrado = false;


        for (
            let i = 0;
            i < empregado.options.length;
            i++
        ) {

            const option =
                empregado.options[i];

            if (
                idEmpregado &&
                option.value === idEmpregado
            ) {

                empregado.selectedIndex = i;

                encontrado = true;

                break;
            }
        }


        if (!encontrado && nomeEmpregado) {

            for (
                let i = 0;
                i < empregado.options.length;
                i++
            ) {

                const option =
                    empregado.options[i];

                if (
                    option.text.trim() ===
                    nomeEmpregado.trim()
                ) {

                    empregado.selectedIndex = i;

                    break;
                }
            }
        }
    }


    // ========================================================================
    // VEÍCULO
    // ========================================================================

    const veiculo =
        document.getElementById("veiculo");

    if (veiculo) {

        const idVeiculo =
            registro["ID Veículo"] ||
            "";

        const nomeVeiculo =
            registro["Veículo"] ||
            registro.Veiculo ||
            "";

        let encontrado = false;


        for (
            let i = 0;
            i < veiculo.options.length;
            i++
        ) {

            const option =
                veiculo.options[i];

            if (
                idVeiculo &&
                option.value === idVeiculo
            ) {

                veiculo.selectedIndex = i;

                encontrado = true;

                break;
            }
        }


        if (!encontrado && nomeVeiculo) {

            for (
                let i = 0;
                i < veiculo.options.length;
                i++
            ) {

                const option =
                    veiculo.options[i];

                if (
                    option.text.trim() ===
                    nomeVeiculo.trim()
                ) {

                    veiculo.selectedIndex = i;

                    break;
                }
            }
        }
    }


    // ========================================================================
    // DEMAIS CAMPOS
    // ========================================================================

    preencher(
        "passageiro",
        registro["Passageiro / Setor / Motivo"] ||
        registro.Passageiro ||
        ""
    );


    preencher(
        "itinerario",
        registro.Itinerário ||
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
        "ENGINE → LANÇAMENTOS → limparFormulario"
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

export function mostrarErro(mensagem) {

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
// NORMALIZAR DATA
// ============================================================================

function normalizarData(value) {

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

        const partes =
            text.split("/");

        const dia =
            partes[0];

        const mes =
            partes[1];

        const ano =
            partes[2];

        return (
            ano +
            "-" +
            mes +
            "-" +
            dia
        );
    }


    // AAAA-MM-DD
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

function normalizarHora(value) {

    if (!value) {
        return "";
    }


    const text =
        String(value).trim();


    // Data + hora
    if (
        text.indexOf(" ") !== -1
    ) {

        const partes =
            text.split(" ");

        const hora =
            partes[partes.length - 1];

        if (
            /^\d{2}:\d{2}:\d{2}$/.test(
                hora
            )
        ) {

            return hora.substring(
                0,
                5
            );
        }

        if (
            /^\d{2}:\d{2}$/.test(
                hora
            )
        ) {

            return hora;
        }
    }


    // HH:MM:SS
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
