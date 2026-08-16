// ============================================================================
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

        Data:
            valor("data"),

        Hora:
            valor("hora"),

        "Empregado / Matrícula":
            valor("empregado"),

        Veículo:
            valor("veiculo"),

        "Passageiro / Setor / Motivo":
            valor("passageiro"),

        Itinerário:
            valor("itinerario"),

        Status:
            valor("status")

    };

                                         console.log(
        "DADOS LANÇAMENTO →",
        dados
    );



    // ========================================================================
    // VALIDAÇÕES
    // ========================================================================

    if (
        !dados["Empregado / Matrícula"]
    ) {

        throw new Error(
            "Informe o empregado."
        );

    }


    if (
        !dados.Veículo
    ) {

        throw new Error(
            "Informe o veículo."
        );

    }


    if (
        !dados["Passageiro / Setor / Motivo"]
    ) {

        throw new Error(
            "Informe o passageiro, setor ou motivo."
        );

    }


    if (
        !dados.Itinerário
    ) {

        throw new Error(
            "Informe o itinerário."
        );

    }


    if (
        !dados.Status
    ) {

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
        "ENGINE → PREENCHER VEÍCULO:",
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
        "empregado",
        registro.Empregado ||
        ""
    );


    preencher(
        "veiculo",
        registro.Veículo ||
        registro.Veiculo ||
        ""
    );


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
        registro.Status || "ATIVO"
    );

}


// ============================================================================
// LIMPAR FORMULÁRIO
// ============================================================================

export function limparFormulario() {

                                                                console.log(
        "ENGINE → NOVO VEÍCULO → limparFormulario NOVA VERSÃO"
    );

    const formulario =
        document.getElementById("formLancamento");

    if (!formulario) {

        console.error(
            "ENGINE → #formLancamento não encontrado."
        );

        return;
    }

    // Limpa todos os campos
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


    // ========================================================================
    // DD/MM/AAAA
    // ========================================================================

    if (
        /^\d{2}\/\d{2}\/\d{4}$/.test(
            text
        )
    ) {

        const [
            dia,
            mes,
            ano
        ] =
            text.split("/");


        return `${ano}-${mes}-${dia}`;

    }


    // ========================================================================
    // AAAA-MM-DD
    // AAAA-MM-DD HH...
    // ========================================================================

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


    // HH:MM:SS → HH:MM
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
