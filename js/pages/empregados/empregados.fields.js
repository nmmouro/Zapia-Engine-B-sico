// ============================================================================
// EMPREGADOS FIELDS
// Arquivo: js/pages/empregados/empregados.fields.js
// ============================================================================

import { preencher, valor} from "../../utils/formulario.js";

// ============================================================================
// OBTER DADOS DO FORMULÁRIO
// ============================================================================

export function obterDadosFormulario() {

    const dados = {

        Data: valor("data"),

        Foto: valor("foto"),

        Empregado: valor("empregado"),

        Matrícula: valor("matricula"),

        Diretoria: valor("diretoria"),

        Setor: valor("setor"),

        Usuário: valor("usuario"),

        Condição: valor("condicao"),

        Status: valor("status")

    };


    // ========================================================================
    // VALIDAÇÕES
    // ========================================================================

    if (!dados.Empregado) {
        throw new Error(
            "Informe o nome do empregado."
        );
    }

    if (!dados["Matrícula"]) {
        throw new Error(
            "Informe a matrícula."
        );
    }

    if (!dados.Diretoria) {
        throw new Error(
            "Informe a diretoria."
        );
    }

    if (!dados.Setor) {
        throw new Error(
            "Informe o setor."
        );
    }

    if (!dados.Status) {
        throw new Error(
            "Informe o status."
        );
    }


    console.log(
        "DADOS EMPREGADO →",
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
        registro.ID
    );

    preencher(
        "data",
        normalizarData(registro.Data)
    );

    preencher(
        "foto",
        registro.Foto
    );

    preencher(
        "empregado",
        registro.Empregado
    );

    preencher(
        "matricula",
        registro["Matrícula"]
    );

    preencher(
        "diretoria",
        registro.Diretoria
    );

    preencher(
        "setor",
        registro.Setor
    );

    preencher(
        "usuario",
        registro["Usuário"]
    );

    preencher(
        "condicao",
        registro["Condição"]
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

    document
        .getElementById("formEmpregado")
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
        ?.classList.add("hidden");

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
        /^\d{2}\/\d{2}\/\d{4}$/.test(text)
    ) {

        const [
            dia,
            mes,
            ano
        ] = text.split("/");

        return `${ano}-${mes}-${dia}`;

    }


    // AAAA-MM-DD ou AAAA-MM-DD HH...
    if (
        /^\d{4}-\d{2}-\d{2}/.test(text)
    ) {

        return text.slice(
            0,
            10
        );

    }


function normalizarHora(value) {
  if (!value) return "";
  const text = String(value).trim();

  if (/^\d{2}:\d{2}:\d{2}$/.test(text)) return text.slice(0, 5);
  if (/^\d{2}:\d{2}$/.test(text)) return text;
    

    return "";

}

