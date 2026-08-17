// ============================================================================
// DASHBOARD HELPERS
// Painel Frota
// Arquivo: js/pages/dashboard/dashboard.helpers.js
// Responsável pelo carregamento e renderização dos dados do Dashboard.
// ============================================================================


// ============================================================================
// CONFIGURAÇÕES
// ============================================================================

const ELEMENTOS = {

    tabelaVeiculos:
        "tabela-veiculos-body",

    tabelaEmpregados:
        "tabela-empregados-body",

    tabelaLancamentos:
        "tabela-lancamentos-body"

};


// ============================================================================
// CARREGAR DASHBOARD
// ============================================================================

export async function carregarDashboard() {

    try {

        const dados = await obterDadosDashboard();


        renderizarVeiculos(

            dados.veiculos

        );


        renderizarEmpregados(

            dados.empregados

        );


        renderizarLancamentos(

            dados.lancamentos

        );

    }

    catch (erro) {

        console.error(

            "Erro ao carregar dashboard:",

            erro

        );

        throw erro;

    }

}


// ============================================================================
// OBTER DADOS DO DASHBOARD
// ============================================================================

async function obterDadosDashboard() {

    /*
     * Este método centraliza a origem dos dados.
     *
     * Posteriormente poderá ser substituído por chamadas
     * para API, banco de dados, serviço ou controller.
     *
     * Exemplo:
     *
     * const resposta = await fetch("/api/dashboard");
     *
     * if (!resposta.ok) {
     *
     *     throw new Error(
     *         "Erro ao consultar dashboard."
     *     );
     *
     * }
     *
     * return await resposta.json();
     */


    return {

        veiculos: [],

        empregados: [],

        lancamentos: []

    };

}


// ============================================================================
// RENDERIZAR VEÍCULOS
// ============================================================================

function renderizarVeiculos(

    veiculos = []

) {

    const tbody = obterElemento(

        ELEMENTOS.tabelaVeiculos

    );


    if (!tbody) {

        return;

    }


    tbody.innerHTML = "";


    if (!veiculos.length) {

        tbody.appendChild(

            criarMensagemVazia(

                4,

                "Nenhum veículo encontrado."

            )

        );

        return;

    }


    veiculos.forEach(

        veiculo => {

            const linha = document.createElement(

                "tr"

            );


            linha.innerHTML = `

                <td>
                    ${escaparHtml(veiculo.codigo)}
                </td>

                <td>
                    ${escaparHtml(veiculo.placa)}
                </td>

                <td>
                    ${escaparHtml(veiculo.veiculo)}
                </td>

                <td>
                    ${escaparHtml(veiculo.modelo)}
                </td>

            `;


            tbody.appendChild(

                linha

            );

        }

    );

}


// ============================================================================
// RENDERIZAR EMPREGADOS
// ============================================================================

function renderizarEmpregados(

    empregados = []

) {

    const tbody = obterElemento(

        ELEMENTOS.tabelaEmpregados

    );


    if (!tbody) {

        return;

    }


    tbody.innerHTML = "";


    if (!empregados.length) {

        tbody.appendChild(

            criarMensagemVazia(

                4,

                "Nenhum empregado encontrado."

            )

        );

        return;

    }


    empregados.forEach(

        empregado => {

            const linha = document.createElement(

                "tr"

            );


            linha.innerHTML = `

                <td>
                    ${escaparHtml(empregado.codigo)}
                </td>

                <td>
                    ${escaparHtml(empregado.nome)}
                </td>

                <td>
                    ${escaparHtml(empregado.cargo)}
                </td>

                <td>
                    ${escaparHtml(empregado.situacao)}
                </td>

            `;


            tbody.appendChild(

                linha

            );

        }

    );

}


// ============================================================================
// RENDERIZAR LANÇAMENTOS
// ============================================================================

function renderizarLancamentos(

    lancamentos = []

) {

    const tbody = obterElemento(

        ELEMENTOS.tabelaLancamentos

    );


    if (!tbody) {

        return;

    }


    tbody.innerHTML = "";


    if (!lancamentos.length) {

        tbody.appendChild(

            criarMensagemVazia(

                6,

                "Nenhum lançamento encontrado."

            )

        );

        return;

    }


    lancamentos.forEach(

        lancamento => {

            const linha = document.createElement(

                "tr"

            );


            linha.innerHTML = `

                <td>
                    ${formatarData(lancamento.data)}
                </td>

                <td>
                    ${escaparHtml(lancamento.veiculo)}
                </td>

                <td>
                    ${escaparHtml(lancamento.empregado)}
                </td>

                <td>
                    ${escaparHtml(lancamento.tipo)}
                </td>

                <td>
                    ${escaparHtml(lancamento.descricao)}
                </td>

                <td>
                    ${formatarValor(lancamento.valor)}
                </td>

            `;


            tbody.appendChild(

                linha

            );

        }

    );

}


// ============================================================================
// ELEMENTO
// ============================================================================

function obterElemento(

    id

) {

    return document.getElementById(

        id

    );

}


// ============================================================================
// MENSAGEM VAZIA
// ============================================================================

function criarMensagemVazia(

    colspan,

    mensagem

) {

    const linha = document.createElement(

        "tr"

    );


    const coluna = document.createElement(

        "td"

    );


    coluna.colSpan = colspan;

    coluna.textContent = mensagem;


    linha.appendChild(

        coluna

    );


    return linha;

}


// ============================================================================
// FORMATAR DATA
// ============================================================================

function formatarData(

    valor

) {

    if (!valor) {

        return "-";

    }


    const data = new Date(

        valor

    );


    if (Number.isNaN(data.getTime())) {

        return valor;

    }


    return new Intl.DateTimeFormat(

        "pt-BR",

        {

            dateStyle: "short"

        }

    ).format(data);

}


// ============================================================================
// FORMATAR VALOR
// ============================================================================

function formatarValor(

    valor

) {

    if (
        valor === null ||
        valor === undefined ||
        valor === ""
    ) {

        return "-";

    }


    const numero = Number(

        valor

    );


    if (Number.isNaN(numero)) {

        return escaparHtml(valor);

    }


    return new Intl.NumberFormat(

        "pt-BR",

        {

            style: "currency",

            currency: "BRL"

        }

    ).format(numero);

}


// ============================================================================
// ESCAPAR HTML
// ============================================================================

function escaparHtml(

    valor

) {

    if (
        valor === null ||
        valor === undefined
    ) {

        return "";

    }


    const elemento = document.createElement(

        "div"

    );


    elemento.textContent = String(

        valor

    );


    return elemento.innerHTML;

}
