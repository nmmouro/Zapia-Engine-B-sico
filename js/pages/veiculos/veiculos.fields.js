// ============================================================================
// VEÍCULOS FIELDS
// Arquivo: js/pages/veiculos/veiculos.fields.js
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

        //Hora:
        //    valor("hora"),

        Foto:
            valor("foto"),

        Placa:
            (valor("placa") || "")
                .trim()
                .toUpperCase(),

        Modelo:
            valor("modelo"),

        Marca:
            valor("marca"),

        Ano:
            valor("ano"),

        Cor:
            valor("cor"),

        Combustível:
            valor("combustivel"),

        Status:
            valor("status")

    };


    // ========================================================================
    // VALIDAÇÕES
    // ========================================================================

    if (!dados.Placa) {

        throw new Error(
            "Informe a placa."
        );

    }


    if (!dados.Modelo) {

        throw new Error(
            "Informe o modelo."
        );

    }


    if (!dados.Status) {

        throw new Error(
            "Informe o status."
        );

    }


    // ========================================================================
    // VALIDAR ANO
    // ========================================================================

    if (dados.Ano) {

        const ano =
            Number(dados.Ano);


        if (
            Number.isNaN(ano) ||
            ano < 2026 ||
            ano > 2030
        ) {

            throw new Error(
                "Ano do veículo inválido."
            );

        }

    }


    console.log(
        "DADOS VEÍCULO →",
        dados
    );


    return dados;

}


// ============================================================================
// PREENCHER FORMULÁRIO
// ============================================================================

export function preencherFormulario(
    registro = {}
) {

    preencher(
        "id",
        registro.ID ?? ""
    );

/*
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

*/
    preencher(
        "foto",
        registro.Foto ?? ""
    );


    preencher(
        "placa",
        registro.Placa ?? ""
    );


    preencher(
        "modelo",
        registro.Modelo ?? ""
    );


    preencher(
        "marca",
        registro.Marca ?? ""
    );


    preencher(
        "ano",
        registro.Ano ?? ""
    );


    preencher(
        "cor",
        registro.Cor ?? ""
    );


    preencher(
        "combustivel",
        registro.Combustível ??
        registro.Combustivel ??
        ""
    );


    preencher(
        "status",
        registro.Status ?? "ATIVO"
    );

}


// ============================================================================
// LIMPAR FORMULÁRIO
// ============================================================================

export function limparFormulario() {

    document
        .getElementById("formVeiculo")
        ?.reset();


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
