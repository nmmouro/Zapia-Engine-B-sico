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

        Combustivel:
            valor("combustivel"),

        Status:
            valor("status")

    };

                                                                console.log(
        "ENGINE → DADOS VEÍCULO:",
        dados
    );


    // ========================================================================
    // VALIDAÇÕES
    // ========================================================================

    if (!dados.Placa) {

        throw new Error(
            "Informe a placa do veículo."
        );

    }

    if (!dados.Modelo) {

        throw new Error(
            "Informe o modelo do veículo."
        );

    }

    if (!dados.Marca) {

        throw new Error(
            "Informe a marca do veículo."
        );

    }


    // ========================================================================
    // VALIDAR ANO
    // ========================================================================

    if (!dados.Placa) {

        throw new Error(
            "Informe a placa do veículo."
        );

    }

    if (!dados.Modelo) {

        throw new Error(
            "Informe o modelo do veículo."
        );

    }

    if (!dados.Marca) {

        throw new Error(
            "Informe a marca do veículo."
        );

    }

    if (!dados.Status) {

        throw new Error(
            "Informe o status do veículo."
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
        "foto",
        registro.Foto || ""
    );


    preencher(
        "placa",
        registro.Placa || ""
    );


    preencher(
        "modelo",
        registro.Modelo || ""
    );


    preencher(
        "marca",
        registro.Marca || ""
    );


    preencher(
        "ano",
        registro.Ano || ""
    );


    preencher(
        "cor",
        registro.Cor || ""
    );


    preencher(
        "combustivel",
        registro.Combustivel || ""
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

    if (!dados.Placa) {

        throw new Error(
            "Informe a placa do veículo."
        );

    }

    if (!dados.Modelo) {

        throw new Error(
            "Informe o modelo do veículo."
        );

    }

    if (!dados.Marca) {

        throw new Error(
            "Informe a marca do veículo."
        );

    }

    if (!dados.Status) {

        throw new Error(
            "Informe o status do veículo."
        );

    }


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
